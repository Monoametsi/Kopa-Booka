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
				return res.redirect('/');
			}else{

				let { email } = decodedToken;
				
				let findAd = (usersAdId) => {
					return usersAdId.Email === email;
				}

				Users.find().then((result) => {
					if(result.filter(findAd).length > 0){
						result.filter(findAd).map((userData) => {
							if(userData.Email === email){
								let amountOfAds = userData.My_Ads.length;
								res.status(200).render('my-ads', { userData, process, amountOfAds });
							}
						});
					}else{
						res.redirect('/');
					}
					
				}).catch((err) =>{
					console.log(err);
				})
			}
		});
	}else{
		return res.redirect('/');
	}
}

module.exports = {
	my_Ads
}