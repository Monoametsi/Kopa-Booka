const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const user = require('./mongo_db');
const { Users } = user;

let adRemover = (req, res) => {
	let { id } = req.params;
	
	let token = req.cookies.token;
	
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.redirect('/');
			}else{

				let { email } = decodedToken;

				let deletedAd = { _id: id};

				let AdDeleter = (collection, res) => {
					collection.deleteOne(deletedAd, (err, res) => {
						if(err) throw err;
						console.log('item from Advertisers DB has been deleted');
					});
				}

				let deleteUsersAd = (collection, res) => {
					let student = { Email: email }
					let deleteAd = { $pull: { My_Ads: deletedAd } }

					collection.updateOne(student, deleteAd, (err, res) => {
						if(err) throw console.log(err);
						console.log('item from Users DB has been deleted');
					})
				}

				await deleteUsersAd(Users);

				await AdDeleter(Advertisements);

			}
		});
	}else{
		res.redirect('/');
	}
}

module.exports = {
	adRemover
}