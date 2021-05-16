const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const emailValidation = require('./emailValidator');
//const emailResetLink = require('./reset-password');
const user = require('./mongo_db');
const { Users } = user;
const { emailValidator } = emailValidation;
//const { emailPwdResetLink } = emailResetLink;

let forgot_password = (req, res) => {
	res.render('forget-password');
}

let forgot_password_post = (req, res) => {
	let formData = req.body;
	
	let notFound;
	
	let { email } = formData;
	
	let findEmail = (usersEmail) =>{
		usersEmail.Email === email;
	}

	let validationEmailChecks = {
		emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
		emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
		emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
	}

	let emailRegexChecks = {
		emailRegEx: validationEmailChecks.emailOneDot.test(email) || validationEmailChecks.emailTwoDots.test(email) || validationEmailChecks.emailThreeDots.test(email)
	}

	Users.find().then((result) => {

		if(emailValidator(email) === false){
			return res.render('forgot-password-post', { emailRegexChecks, email, notFound });
		}else{
			if(result.filter(findEmail).length > 0){
				result.filter(findEmail).map((usersEmail) => {
					let foundEmail = usersEmail;

					//return emailPwdResetLink(foundEmail);
				});
			}else{
				notFound = true;
				return res.render('forgot-password-post', { emailRegexChecks, email, notFound });
			}
		}

	}).catch((err) => {
		console.log(err);
	})
}

let forgot_password_confirm = (req, res) => {
	res.render('forget-password-confirmation');
}

let forgot_password_failuer = (req, res) => {
	res.render('forget-password-confirmation');
}

module.exports = {
	forgot_password,
	forgot_password_post,
	forgot_password_confirm,
	forgot_password_failuer
}