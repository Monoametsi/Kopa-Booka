const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const validator = require('./validator');
const path = require('path');
const url = require('url');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const {passwordEmailValidation} = validator;
const jsonFilePath = path.join(__dirname, 'registrationData.json');

app.use(express.static(path.join(dirname, 'Home')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname, 'Registration')));
app.use(express.static(dirname));
//app.set('views', './views');
app.set('view engine', 'ejs');

const homePath = path.join(dirname, 'Home', 'Home-HTML', 'index.html');
const homePath2 = path.join(dirname, 'Advertisment-Board', 'Advertisement-HTML', 'Book.html');

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/user-registration', (req, res) => {
	let json = req.body;
	let {email, password, passConfirmation} = json;
	
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
		for(i = 0; i < not.length; i++){
			return not[i].Email;
		}
	}

	if(passwordEmailValidation(password, passConfirmation, res, email) === false){
		return passwordEmailValidation(password, passConfirmation, res, email);

	}else{
		let jsonData = fs.readFileSync(jsonFilePath);

		let prom = new Promise((resolve, reject) => {
			if(newEntry){
				newUser.not_Verified.push(newEntry);
				resolve('User Added');
			}else{
				reject('Not added');
			}
		});
		prom.then(() => {
			if(Object.keys(jsonData).length === 0){
				fs.writeFile(jsonFilePath, JSON.stringify(newUser, null, " "), (err) => {
					if (err) throw err;
				});
				res.send('Done');
			}

		}).then(() => {
			let formData = JSON.parse(jsonData);

			let { not_Verified } = formData;
			not_Verified.push(newEntry);

			if(Object.keys(jsonData).length > 0 && emailMatcher(not_Verified) !== email){
				fs.writeFile(jsonFilePath, JSON.stringify(formData, null, " "), (err) => {
					if (err) throw err;
				});
			}else{
				res.send('An account with this email address has already been registered. Please Login or Reset your Password.');
			}
		}).then(() => {
			res.send('Done');
		}).catch(() => {
			console.log('failed');
		});
	}
});

app.get('/register', (req, res) => {
	res.render('register');
});

const PORT = process.env.PORT || 8500;

app.listen(PORT, () => {
	console.log('WE LIVE!!!!!')
});