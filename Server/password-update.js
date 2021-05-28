const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const passwordUpadeVal = require('./password-update-validation');
const { oldPasswordValidation, newPasswordValidation } = passwordUpadeVal;
const bcrypt = require('bcryptjs');
const catAndCamp = require('./category-db');
const { Category_and_campus_col } = catAndCamp;
const user = require('./mongo_db');
const { Users } = user;

let passwordUpdater = async (req, res) => {
	let token = req.cookies.token;

	let formData = req.body;

	let { password, passwordConfirmation } = formData;
	
	password = password.trim();
	
	passwordConfirmation = passwordConfirmation.trim();

	let validationPasswordChecks = {
		findEmpty: passwordConfirmation === '' || passwordConfirmation === undefined || passwordConfirmation === null || passwordConfirmation.length === 0,
		findLength: (!(passwordConfirmation.length >= 7) || !(passwordConfirmation.length <= 16)),
		findUpperCase: passwordConfirmation.search(/[A-Z]/) === -1,
		findLowerCase: passwordConfirmation.search(/[a-z]/) === -1,
		findSpecialChar: passwordConfirmation.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/) === -1,
		findDigit: passwordConfirmation.search(/[0-9]/) === -1,
	}

	let success;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.redirect('/');
			}else{

				let { email } = decodedToken;
				
				
				Category_and_campus_col.find().then( async (categories) => {
					await Users.find().then( async (result) => {
						for(let i = 0, len = result.length; i < len; i++){
							emailMatcher = result[i].Email === email;

							if(emailMatcher){
								let { Name, Surname, Tel, Campus, Password } = result[i];

								let oldPassword = Password;

								let comparingPasswords = await bcrypt.compare(password, oldPassword);

								if(oldPasswordValidation(comparingPasswords, password) === false || newPasswordValidation(passwordConfirmation) === false){
									return res.status(200).render('password-update', { Name, success, Surname, Tel, Campus, validationPasswordChecks, comparingPasswords, formData, categories });
								}else{
									success = true;

									let salt = await bcrypt.genSalt();

									let newPassword = await bcrypt.hash(passwordConfirmation, salt);

									let updateUserProfile = (email, res) => {
										let myquery = { Email: email };
										let newvalues = { $set: { Password: newPassword } };

										Users.updateOne(myquery, newvalues, (err, res) => {
											if(err) throw err;
										});
									}

							  await updateUserProfile(email);
									return res.status(200).render('password-update', { Name, success, Surname, Tel, Campus, validationPasswordChecks, comparingPasswords, formData, categories });
								}
							}
						}
					}).catch((err) => {
						console.log(err);
					})
				
				}).catch((err) => {
					console.log(err);
				})
			}
		});
	}else{
		return res.redirect('/');
	}
}

module.exports = { passwordUpdater }