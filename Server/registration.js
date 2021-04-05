const ejs = require('ejs');
const registration = require('./registration');
const validator = require('./validator');
const emailVerification = require('./emailVerification');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { passwordEmailValidation } = validator;
const { mailDeliverer } = emailVerification;
const user = require('./mongo_db');
const { Users } = user;

let Register = async (req, res) => {
	let json = req.body;
	let { email, password, passConfirmation } = json;

	let validationPasswordChecks = {
		findEmpty: password === '' || password === undefined || password === null,
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
	
	let salt = await bcrypt.genSalt();
	
	let pass = await bcrypt.hash(password, salt);

	let newEntry = {
		UserId: uuid.v4().slice(0, uuid.v4().search("-")),
		Email: email,
		Password: pass,
		isVerified: false,
		Name: '',
		Surname: '',
		Tel: '',
		Campus: ''
	}

	let { UserId, Email, Password, isVerified, Name, Surname, Tel, Campus } = newEntry;

	let emailMatcher = (not) => {
		return not.Email === email;
	}

	if(passwordEmailValidation(password, passConfirmation, email) === false){
		return res.render('register', { result, Users, emailMatcher, validationPasswordChecks, emailRegexChecks, json });

	}else{

		Users.find().then((result) => {
			if(Boolean(result.find(emailMatcher)) !== true){

				const user = new Users({
					_id: UserId, 
					Email, 
					Password, 
					isVerified,
					Name,
					Surname, 
					Tel,
					Campus
				});

				user.save().then( async () => {
					await mailDeliverer(email, res);
				});

			}else{
				res.render('register', { result, Users, emailMatcher, validationPasswordChecks, emailRegexChecks, json });
			}

		}).catch((err) => {
			console.log(err);
		});
	}
}

module.exports = { Register }