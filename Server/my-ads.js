const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const user = require('./mongo_db');
const { Users } = user;

let my_Ads = (req, res) => {
	let token = req.cookies.token;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.status(400).json({ err })
			}else{

				let { email } = decodedToken;

				Users.find().then((result) => {
					
					result.map((userData) => {

						if(userData.Email === email){
							let amountOfAds = userData.My_Ads.length;
							res.status(200).render('my-ads', { userData, process, amountOfAds });
						}
					});
					
				}).catch((err) =>{
					console.log(err);
				})
			}
		});
	}else{
		res.redirect('/');
	}
}

module.exports = {
	my_Ads
}