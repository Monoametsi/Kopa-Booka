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
				return res.status(400).json({ err });
			}else{

				let { email } = decodedToken;

				let moveObject = (email, res) => {
					let myquery = { Email: email };
					let newvalues = { $set: { isVerified: true } };

					Users.updateOne(myquery, newvalues, (err, res) => {
						if(err) throw err;
					});
				}

				await moveObject(email);
				res.redirect('/verify-account-success');

			}
		});
	}else{
		return res.status(401).json({error: 'There\'s a problem'})
	}

}

module.exports = { token_verifier }