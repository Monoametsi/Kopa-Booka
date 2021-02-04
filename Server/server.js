const express = require('express');
const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const ejsLint = require('ejs-lint');
const validator = require('./validator');
const emailVerification = require('./emailVerification');
const path = require('path');
const url = require('url');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const {passwordEmailValidation} = validator;
const {mailDeliverer} = emailVerification;
const jsonFilePath = path.join(__dirname, 'registrationData.json');

app.use(express.static(path.join(dirname, 'Home')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname, 'Registration')));
app.use(express.static(path.join(dirname, 'Account-verification')));
app.use(express.static(path.join(dirname, 'register-outcome')));
app.use(express.static(dirname));
//app.set('views', './views');
app.set('view engine', 'ejs');

const homePath = path.join(dirname, 'Home', 'Home-HTML', 'index.html');
const homePath2 = path.join(dirname, 'Registration', 'Registration-HTML', 'register.html');
const homePath3 = path.join(dirname, 'register-outcome', 'HTML', 'register-success.html');
const homePath4 = path.join(dirname, 'Account-verification', 'HTML', 'verfication-success.html');

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/register', (req, res) => {
	let json = req.body;
	let {email, password, passConfirmation} = json;
	
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

	let newEntry = {
			UserId: uuid.v4().slice(0, uuid.v4().search("-")),
			Email: email,
			Password: password,
			PasswordConfirmation: passConfirmation,
			status: 'active'
		}

	let newUser = {
		not_Verified: [],
		Verified: []
	};

	let emailMatcher = (not) => {
		//console.log(not.Email);
		return not.Email === email;
	}

	let jsonData = fs.readFileSync(jsonFilePath);

	if(passwordEmailValidation(password, passConfirmation, email) === false){
		return res.render('register', { jsonData, emailMatcher, validationPasswordChecks, emailRegexChecks, password, passConfirmation, email, json});

	}else{

		let dataInsertProm = new Promise((resolve, reject) => {
			if(newEntry){
				newUser.not_Verified.push(newEntry);
				resolve('User Added');
			}else{
				reject('Not added');
			}
		});

		dataInsertProm.then(() => {
			if(Object.keys(jsonData).length === 0){
				fs.writeFile(jsonFilePath, JSON.stringify(newUser, null, " "), (err) => {
					if (err) throw err;
				});
				res.redirect('/register-email-verification');
			}

		}).then(() => {
			let formData = JSON.parse(jsonData);

			let { not_Verified, Verified } = formData;
			
			if(Object.keys(jsonData).length > 0 && Boolean(not_Verified.find(emailMatcher)) !== true && Boolean(Verified.find(emailMatcher)) !== true){
				not_Verified.push(newEntry);
				fs.writeFile(jsonFilePath, JSON.stringify(formData, null, " "), (err) => {
					if (err) throw err;
				});
				res.redirect('/register-email-verification');
			}else{
				res.render('register', {jsonData, emailMatcher, validationPasswordChecks, emailRegexChecks, password, passConfirmation, email, json});
			}
		}).catch(() => {
			console.log('failed');
		});
	}
});

app.get('/register', (req, res) => {
	if(req.method === "GET"){
		res.sendFile(homePath2);
	}else if(req.method === "POST"){
		res.render('register');
	}
});

app.get('/register-email-verification', (req, res) => {
	let jsonData = fs.readFileSync(jsonFilePath);
	let formData = JSON.parse(jsonData);

	let { not_Verified } = formData;

	mailDeliverer(not_Verified[not_Verified.length - 1].Email, res);
});

app.get('/register-success', (req, res) => {	
	res.sendFile(homePath3);
});

app.get(/email-verification/, (req, res) => {
	let jsonData = fs.readFileSync(jsonFilePath);
	let formData = JSON.parse(jsonData);

	let { not_Verified, Verified} = formData;
	
	let strConvert = /email-verification/;
	let q = url.parse(req.url, true);
	let email = q.pathname.slice(strConvert.toString().length, q.pathname.length);

	let moveObject = (array, array2, email) => {
	  for(var i = 0, len = array.length; i < len; i++) {
		  if (array[i].Email === email) {
			  index = i;
			  array2.push(array[index]);
			  array.splice(index, 1);
			  fs.writeFile(jsonFilePath, JSON.stringify(formData, null, " "), (err) => {
					if (err) throw err;
				});
			  break;
		  }
	  }
	}

	moveObject(not_Verified, Verified, email);

	res.redirect('/verify-account-success');
});

app.get('/verify-account-success', (req, res) => {
	res.sendFile(homePath4);
});

const PORT = process.env.PORT || 8500;

app.listen(PORT, () => {
	console.log('WE LIVE!!!!!');
});