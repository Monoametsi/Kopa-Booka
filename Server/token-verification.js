const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('./mongo_db');
const { Users } = user;

let token_verifier = async (req, res) => {

	let { token } = req.params;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.redirect('/token-error');
			}else{

				let { email } = decodedToken;

				let emailMatcher = (not) => {
					return not.Email === email;
				}

		await	Users.find().then( async (result) => {
					if(Boolean(result.find(emailMatcher)) === true){
						let moveObject = (email, res) => {
						let myquery = { Email: email };
						let newvalues = { $set: { isVerified: true } };

						Users.updateOne(myquery, newvalues, (err, res) => {
								if(err) throw err;
							});
						}

						await moveObject(email);
						return res.redirect('/verify-account-success');
					}else{
						return res.redirect('/token-not-found');
					}

				}).catch((err) => {
					console.log(err);
				});

			}
		});
	}else{
		return res.redirect('/token-error');
	}

}

module.exports = { token_verifier }