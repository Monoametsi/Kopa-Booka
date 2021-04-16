const ejs = require('ejs');
const emailVerification = require('./emailVerification');
const user = require('./mongo_db');
const emailValidation = require('./emailValidator');
const { emailValidator } = emailValidation;
const { mailDeliverer } = emailVerification;
const { Users } = user;

let registeration_failure = async (req, res) => {
	let formData = req.body;

	let { email } = formData;

	let notFound;

	let validationEmailChecks = {
		emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
		emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
		emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
	}

	let emailRegexChecks = {
		emailRegEx: validationEmailChecks.emailOneDot.test(email) || validationEmailChecks.emailTwoDots.test(email) || validationEmailChecks.emailThreeDots.test(email)
	}

	let emailMatcher = (not) => {
		return not.Email === email;
	}

	if(emailValidator(email) === false){

		return res.status(200).render('registration_failure_post', { email, notFound, emailRegexChecks });
	}else{

	 await	Users.find().then( async (result) => {
				if(Boolean(result.find(emailMatcher)) === true){
					await mailDeliverer(email, res);
				}else{
					notFound = true;
					return res.status(200).render('registration_failure_post', { email, notFound, emailRegexChecks });
				}
			}).catch((err) =>{
				console.log(err);
			});
	}
}

module.exports = {
	registeration_failure
}