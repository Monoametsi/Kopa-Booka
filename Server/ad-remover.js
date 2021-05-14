const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const user = require('./mongo_db');
const { Users } = user;

let adRemover = (req, res) => {
	let { id } = req.params;

	let DeletedBulk = id.replace(/[+]/g, " ").split(' ');

	let token = req.cookies.token;

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.redirect('/');
			}else{

				let { email } = decodedToken;

				let AdDeleter = (res) => {

					DeletedBulk.map((deletedAd) => {
						let removeSelectedAds = { _id: deletedAd };
							Advertisements.deleteOne(removeSelectedAds, (err, res) => {
							if(err) throw err;
							console.log('item from Advertisers DB has been deleted');
						});
					});

				}

				let deleteUsersAd = (res) => {

					DeletedBulk.map((deletedAd) => {
							let removeSelectedAds = { _id: deletedAd };
							let student = { Email: email }
							let removeUsersAds = { $pull: { My_Ads: removeSelectedAds } }

							Users.updateOne(student, removeUsersAds, (err, res) => {
								if(err) throw console.log(err);
								console.log('item from Users DB has been deleted');
							})
					});

				}

				await deleteUsersAd();

				await AdDeleter();

			}
		});
	}else{
		res.redirect('/');
	}
}

module.exports = {
	adRemover
}