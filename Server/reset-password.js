const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const validator = require('./validator');
const { passwordEmailValidation, emailValidation } = validator;
const user = require('./mongo_db');
const { Users } = user;

let reset_password_get = (req, res) => {
	res.render('reset-password');
}

let reset_password_post = (req, res) => {

	//let { usersToken } = req.params;

	let { 
		pwd, 
		confirm_pwd 
	} = req.body;

	let validationPasswordChecks = {
		findEmpty: pwd === '' || pwd === undefined || pwd === null|| pwd.length === 0,
		findLength: (!(pwd.length >= 7) || !(pwd.length <= 16)),
		findUpperCase: pwd.search(/[A-Z]/) === -1,
		findLowerCase: pwd.search(/[a-z]/) === -1,
		findSpecialChar: pwd.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/) === -1,
		findDigit: pwd.search(/[0-9]/) === -1,
		findMatch: pwd !== confirm_pwd
	}

	Users.find().then((result) => {

		if(passwordEmailValidation(pwd, confirm_pwd) === false){
			res.render('reset-password-post', { validationPasswordChecks, pwd, confirm_pwd  });
		}else{

			// if(usersToken){
				// jwt.verify(usersToken, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
					// if(err){
						// res.redirect('/');
					// }else{
						
						// let { email } = decodedToken;
						
						// let findEmail = (usersEmail) =>{
							// return usersEmail.Email === email;
						// }
						
						// if(result.filter(findEmail).length > 0){
							// result.filter(findEmail).map( async (usersInfo) => {

									// let salt = await bcrypt.genSalt();

									// let newPassword = await bcrypt.hash(confirm_pwd, salt);

									// let updateUserProfile = (email, res) => {
										// let myquery = { Email: email };
										// let newvalues = { $set: { Password: newPassword } };

										// Users.updateOne(myquery, newvalues, (err, res) => {
											// if(err) throw err;
										// });
									// }

							  // await updateUserProfile(email);
							  
							 // res.redirect('/');
							// })
						// }else{
							// res.redirect('/');
						// }
						
					// }
				// });
			// }else{
				// res.redirect('/');
			// }
			
		}
		

	}).catch((err) => {
		console.log(err);
	});
}

module.exports = {
	reset_password_post,
	reset_password_get
}