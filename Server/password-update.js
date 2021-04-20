const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const passwordUpadeVal = require('./password-update-validation');
const { oldPasswordValidation, newPasswordValidation } = passwordUpadeVal;
const bcrypt = require('bcryptjs');
const user = require('./mongo_db');
const { Users } = user;

let passwordUpdater = async (req, res) => {
	let token = req.cookies.token;

	let formData = req.body;

	let { password, passwordConfirmation } = formData;

	let validationPasswordChecks = {
		findEmpty: passwordConfirmation === '' || passwordConfirmation === undefined || passwordConfirmation === null,
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
				return res.status(400).json({ err });
			}else{

				let { email } = decodedToken;

				await Users.find().then( async (result) => {
					for(let i = 0, len = result.length; i < len; i++){
						emailMatcher = result[i].Email === email;

						if(emailMatcher){
							let { Name, Surname, Tel, Campus, Password } = result[i];

							let oldPassword = Password;

							let comparingPasswords = await bcrypt.compare(password, oldPassword);

							if(oldPasswordValidation(comparingPasswords, password) === false || newPasswordValidation(passwordConfirmation) === false){
								res.status(200).render('password-update', { Name, success, Surname, Tel, Campus, validationPasswordChecks, comparingPasswords, formData });
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
								res.status(200).render('password-update', { Name, success, Surname, Tel, Campus, validationPasswordChecks, comparingPasswords, formData });
							}
						}
					}
				}).catch((err) => {
					console.log(err);
				})
			}
		});
	}else{
		return res.status(401).json({error: 'There\'s a problem'})
	}
}

module.exports = { passwordUpdater }