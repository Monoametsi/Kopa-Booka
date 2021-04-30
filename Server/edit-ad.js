const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const catAndCamp = require('./category-db');
const { Category_and_campus_col } = catAndCamp;
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const user = require('./mongo_db');
const { Users } = user;

let edit_ad = (req, res) => {
	let { id } = req.params;
	
	let token = req.cookies.token;
	
	let findAd = (usersAdId) => {
		return usersAdId._id === id;
	}
	
	let stringCapitalizer = (Campus) => {

		let arrStr = Campus.split(" "); 
		let campusArr = []; 

		arrStr.map((tring) => {
			tring = tring.replace(tring[0], tring[0].toUpperCase());
			campusArr.push(tring);
		}); 

		return campusArr.toString().replace(/,/g , " ");
	}
	
	Users.find().then((result) => {
		
		if(token){
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
				
				if(err){
					return res.status(400).json({ err });
				}else{
					
					let { email } = decodedToken;

					result.map((userData) => {
						if(userData.Email === email){
							if(userData.My_Ads.filter(findAd).length > 0){
								userData.My_Ads.filter(findAd).map((ad_Data) => {
									Category_and_campus_col.find().then((result) => {
										return res.status(200).render('edit-ad.ejs', { ad_Data, stringCapitalizer, result });
									}).catch((err) => {
										console.log(err);
									});

								});

							}else{
								return res.redirect('/');
							}
							
						}else{
							return res.redirect('/');
						}
					})
				}
			});
		}else{
			return res.redirect('/');
		}
		
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = {
	edit_ad
}