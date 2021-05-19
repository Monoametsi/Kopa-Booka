const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const user = require('./mongo_db');
const { Users } = user;

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email) => {
	return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { 
		expiresIn: '3d'
	});
}

let Login = async (req, res) => {
	let formData = req.body;

	let { mail, pwd, RememberMe } = formData;

	let mailPwdMatcher = (not) => {
		not.Email;
		return not.Email === mail;
	}

	await Users.find().then( async (result) => {
		//console.log(`Boolean is: ${Boolean(result.find(mailPwdMatcher))}`);
		let auth, emailMatcher, verifiedCheck;

		if(result.length > 0){
			for(let i = 0, len = result.length; i < len; i++){
				emailMatcher = result[i].Email === mail;

				if(Boolean(result.find(mailPwdMatcher)) === true){
					if(emailMatcher){
						let { Email, Password, isVerified } = result[i];
						verifiedCheck = isVerified;
						auth = await bcrypt.compare(pwd, Password);

						if(!verifiedCheck || !auth){
							res.render('login', { emailMatcher, auth, verifiedCheck });
						}else {
							const token = createToken(Email);
							res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
							res.redirect('/Dashboard');
						}
					}
				}else{
					return res.render('login', { emailMatcher, auth, verifiedCheck });
				}
			}
		}else{
			return res.render('login', { emailMatcher, auth, verifiedCheck });
		}

	}).catch((err) => {
		console.log(err);
	});
}

const requireLoginAuth = (req, res, next) => {
	const token = req.cookies.token;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			if(err){
				console.log(err.message);
				next();
			} else {
				console.log(decodedToken);
				res.redirect('/');
			}
		});
	} else {
		next();
	}
}

const logout = (req, res) => {
	res.cookie('token', '', { maxAge: 1 });
	res.redirect('/');
}

const checkCurrentUser = (req, res, next) => {
	const token = req.cookies.token;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				res.locals.user = null;
				res.locals.req = req;
				next();
			} else {

				let { email } = decodedToken;

				let mailPwdMatcher = (not) => {
					not.Email;
					return not.Email === email;
				}

				let user = await Users.find().then((result) => {
					if(Boolean(result.find(mailPwdMatcher)) === true){
						res.locals.user = email;
						res.locals.req = req;
					}
				}).catch((err) => {
					console.log(err);
				});

				next();
			}
		});
	}else {
		res.locals.user = null;
		res.locals.req = req;
		next();
	}
}

module.exports = { Login, requireLoginAuth, logout, checkCurrentUser }