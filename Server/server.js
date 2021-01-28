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
let x = true;
const jsonFilePath = path.join(__dirname, 'registrationData.json');

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
		
	let newUser = {
		not_Verified: [],
		Verified: []
	};

	//let name = (newAdverter) => {
	//	for(i = 0; i < newAdverter.not_Verified.length; i++){
	//		return newAdverter.not_Verified[i].Email;
	//	}
	//}

	if(passwordEmailValidation(password, passConfirmation, res, email) === false){
		return passwordEmailValidation(password, passConfirmation, res, email);

	}else{
		let jsonData = fs.readFileSync(jsonFilePath);
		//newUser.not_Verified.push(newEntry);
		let prom = new Promise((resolve, reject) => {
			if(x){
				console.log('1the');
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
			}

		}).then(() => {
			let formData = JSON.parse(jsonData);
			console.log(formData);
			let { not_Verified } = formData;
			not_Verified.push(newEntry);
			console.log(not_Verified);
			if(Object.keys(jsonData).length > 0){
				fs.writeFile(jsonFilePath, JSON.stringify(formData, null, " "), (err) => {
					if (err) throw err;
				});
			}
		}).then(() => {
			res.send('Done');
		}).catch(() => {
			//console.log(JSON.parse(jsonData));
			console.log('failed');
		});

		//console.log(name() === newEntry.Email);
	}
});

//app.get('/books', (req, res) => {
//	res.sendFile(homePath2);
//});

const PORT = process.env.PORT || 8500;

app.listen(PORT, () => {
	console.log('WE LIVE!!!!!')
});