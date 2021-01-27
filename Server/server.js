const express = require('express');
const fs = require('fs');
const validator = require('./validator');
const path = require('path');
const url = require('url');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const {passwordEmailValidation} = validator;
let not_Verified = [];
const jsonFilePath = path.join(__dirname, 'formData.json');

app.use(express.static(path.join(dirname, 'Home')));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(dirname, 'Advertisment-Board')));
app.use(express.static(dirname));

const homePath = path.join(dirname, 'Home', 'Home-HTML', 'index.html');
//const homePath2 = path.join(dirname, 'Advertisment-Board', 'Advertisement-HTML', 'Book.html');

app.get('/', (req, res) => {
	res.sendFile(homePath);
});

app.post('/register', (req, res) => {
	let json = req.body;
	let {email, password, passConfirmation} = json;
	
	let newEntry = {
			UserId: uuid.v4().slice(0, uuid.v4().search("-")),
			Email: email,
			Password: password,
			PasswordConfirmation: passConfirmation,
			status: 'active'
		}
		
	let newUser = {};
	
	let jsonFileStrcuture = (k,v) => {
		if(v instanceof Array)
		return JSON.stringify(v);
		return v;
	}

	if(passwordEmailValidation(password, passConfirmation, res, email) === false){
		return passwordEmailValidation(password, passConfirmation, res, email);

	}else{
		not_Verified.push(newEntry);
		newUser.Not_Verified = not_Verified;

		//for(i = 0; i < not_Verified.length; i++){
		//	console.log(i);
		//}

		fs.appendFile(jsonFilePath, JSON.stringify(newUser, jsonFileStrcuture, 3), (err) => {
		  if (err) throw err;
		});
		
		console.log(newUser);
		res.json(newUser);
	}
});

//app.get('/books', (req, res) => {
//	res.sendFile(homePath2);
//});

const PORT = process.env.PORT || 8500;

app.listen(PORT, () => {
	console.log('WE LIVE!!!!!')
});