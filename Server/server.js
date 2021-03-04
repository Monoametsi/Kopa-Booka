const express = require('express');
const http = require('http');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const validator = require('./validator');
const emailVerification = require('./emailVerification');
const path = require('path');
const url = require('url');
const app = express();
const crypto = require('crypto');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const mongoUrl = process.env.Database.toString();
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const { passwordEmailValidation } = validator;
const { mailDeliverer } = emailVerification;
const user = require('./mongo_db');
const { Users } = user;
const jsonFilePath = path.join(__dirname, 'registrationData.json');
const dotenv = require('dotenv');

app.use(express.static(path.join(dirname, 'Home')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname, 'Registration')));
app.use(express.static(path.join(dirname, 'Account-verification')));
app.use(express.static(path.join(dirname, 'register-outcome')));
dotenv.config({path: path.join(__dirname, '.env')});
app.use(express.static(dirname));
app.set('view engine', 'ejs');

const homePath = path.join(dirname, 'Home', 'Home-HTML', 'index.html');
const homePath2 = path.join(dirname, 'Registration', 'Registration-HTML', 'register.html');
const homePath3 = path.join(dirname, 'register-outcome', 'HTML', 'register-success.html');
const homePath4 = path.join(dirname, 'Account-verification', 'HTML', 'verfication-success.html');

app.get('/', (req, res) => {
	res.status(200).render('index');
});

app.post('/register', async (req, res) => {
	let json = req.body;
	let { email, password, passConfirmation } = json;

	let validationPasswordChecks = {
		findEmpty: password === '' || password === undefined,
		findLength: (!(password.length >= 7) || !(password.length <= 16)),
		findUpperCase: password.search(/[A-Z]/) === -1,
		findLowerCase: password.search(/[a-z]/) === -1,
		findSpecialChar: password.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/) === -1,
		findDigit: password.search(/[0-9]/) === -1,
		findMatch: password !== passConfirmation
	}

	let validationEmailChecks = {
		emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
		emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
		emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
	}

	let emailRegexChecks = {
		emailRegEx: validationEmailChecks.emailOneDot.test(email) || validationEmailChecks.emailTwoDots.test(email) || validationEmailChecks.emailThreeDots.test(email)
	}
	
	let pass = await bcrypt.hash(password, 10);

	let newEntry = {
			UserId: uuid.v4().slice(0, uuid.v4().search("-")),
			Email: email,
			Password: pass,
			isVerified: false
	}

	let { UserId, Email, Password, isVerified } = newEntry;

	let emailMatcher = (not) => {
		return not.Email === email;
	}

	if(passwordEmailValidation(password, passConfirmation, email) === false){
		return res.render('register', { result, Users, emailMatcher, validationPasswordChecks, emailRegexChecks, json});

	}else{

		Users.find().then((result) => {
			if(Boolean(result.find(emailMatcher)) !== true){

				const user = new Users({
					_id: UserId, 
					Email, 
					Password, 
					isVerified
				});

				user.save().then( async () => {
					await mailDeliverer(email, res);
				});

			}else{
				res.render('register', {result, Users, emailMatcher, validationPasswordChecks, emailRegexChecks, json});
			}

		}).catch((err) => {
			console.log(err);
		});
	}
});

app.get('/register', (req, res) => {
	res.sendFile(homePath2);
});

app.get('/register-success', (req, res) => {	
	res.sendFile(homePath3);
});

app.get('/email-verification/:token', async (req, res) => {

	let { token } = req.params;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.status(400).json({err});
			}else{

				let { email } = decodedToken;

				let moveObject = (email, res) => {
					let myquery = { Email: email };
					let newvalues = { $set: { isVerified: true } };

					Users.updateOne(myquery, newvalues, (err, res) => {
						if(err) throw err;
					});
				}

				await moveObject(email);
				res.redirect('/verify-account-success');
		
			}
		});
	}else{
		return res.status(401).json({error: 'There\'s a problem'})
	}

});

app.get('/verify-account-success', (req, res) => {
	res.sendFile(homePath4);
});

const PORT = process.env.PORT || 8500;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
	app.listen(PORT, () => {
		console.log(`Live At ${process.env.PORT}`);
	});
}).catch((err) => {
	console.log(err);
});