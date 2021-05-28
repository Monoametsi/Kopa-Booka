const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const user = require('./mongo_db');
const { Users } = user;

let my_Messages = (req, res) => {

	let token = req.cookies.token;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.redirect('/');
			}else{

				let { email } = decodedToken;

				let findEmail = (result) => {
					return result.Email === email;
				}

				Users.find().then((result) => {
					let emailExist = result.filter(findEmail);

					if(emailExist.length > 0){
						emailExist.map((data) => { 
							let msg = data.Ad_Messages;

							return res.status(200).render('my-messages', { msg });
						});

					}else{
						return res.redirect('/');
					}

				}).catch((err) => {
					console.log(err);
				})
			}
		});

	}else{
		return res.redirect('/');
	}
}

module.exports = {
	my_Messages
}