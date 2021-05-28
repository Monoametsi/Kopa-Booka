const registration = require('./registration');
const validator = require('./validator');
const emailVerification = require('./emailVerification');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { passwordEmailValidation, emailValidation } = validator;
const { mailDeliverer } = emailVerification;
const user = require('./mongo_db');
const { Users } = user;

let Register = async (req, res) => {
	let json = req.body;
	let { email, password, passConfirmation } = json;

	let mail = email.trim();

	let pwd = password.trim();

	let pwdConf = passConfirmation.trim();

	let validationPasswordChecks = {
		findEmpty: pwd === '' || pwd === undefined || pwd === null || pwd.length === 0,
		findLength: (!(pwd.length >= 7) || !(pwd.length <= 16)),
		findUpperCase: pwd.search(/[A-Z]/) === -1,
		findLowerCase: pwd.search(/[a-z]/) === -1,
		findSpecialChar: pwd.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/) === -1,
		findDigit: pwd.search(/[0-9]/) === -1,
		findMatch: pwd !== pwdConf
	}

	let validationEmailChecks = {
		emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
		emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
		emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
	}

	let emailRegexChecks = {
		emailRegEx: validationEmailChecks.emailOneDot.test(mail) || validationEmailChecks.emailTwoDots.test(mail) || validationEmailChecks.emailThreeDots.test(mail)
	}
	
	let salt = await bcrypt.genSalt();
	
	let pass = await bcrypt.hash(pwd, salt);

	let newEntry = {
		UserId: uuid.v4().slice(0, uuid.v4().search("-")),
		Email: mail,
		Password: pass,
		isVerified: false,
		My_Ads: [],
		Ad_Messages: [],
		Name: '',
		Surname: '',
		Tel: '',
		Campus: ''
	}

	let { UserId, Email, Password, isVerified, My_Ads, Ad_Messages, Name, Surname, Tel, Campus } = newEntry;
	
	let alreadyExists;

	let emailMatcher = (not) => {
		return not.Email === mail;
	}

	Users.find().then((result) => {

		if(passwordEmailValidation(pwd, pwdConf) === false || emailValidation(mail) === false){
			return res.render('register', { emailMatcher, validationPasswordChecks, emailRegexChecks, mail, alreadyExists });

		}else{
			if(Boolean(result.find(emailMatcher)) !== true){

				const user = new Users({
					_id: UserId, 
					Email, 
					Password, 
					isVerified,
					My_Ads,
					Ad_Messages,
					Name,
					Surname, 
					Tel,
					Campus
				});

				user.save().then( async () => {
					await mailDeliverer(mail, res);
				});

			}else{
				alreadyExists = true;
				return res.render('register', { emailMatcher, validationPasswordChecks, emailRegexChecks, mail, alreadyExists });
			}
		}

	}).catch((err) => {
		console.log(err);
	});
}

module.exports = { Register }