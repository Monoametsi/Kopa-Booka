const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const fs = require('fs');
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const { Users } = user;

let displayAds = (req, res) => {
	Advertisements.find().then((result) => {
		let num = 0;
		let numOfAdsDisplay = (data) => {
			num++;
			return num;
		}
		
		let numOfAds = result.map(numOfAdsDisplay).length;
		result.reverse();
		res.status(200).render('BookAd', { result, numOfAds });
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = { displayAds };