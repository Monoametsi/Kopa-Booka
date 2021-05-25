const dateFormater = require('./dateFormater');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const catAndCamp = require('./category-db');
const { dateDisplayer } = dateFormater;
const { Advertisements } = ads;
const { Category_and_campus_col } = catAndCamp;

let homePageAds = (req, res) => {
	Advertisements.find().then((result) => {

		let mainCatAdsDisplay = (mainCat) => {
		let mainCategoryAds = [];
			for(i = 0; i < result.length; i++){
				let { Main_Category } = result[i];

				if(Main_Category === mainCat){
					mainCategoryAds.push(result[i]);
				}
			}

			mainCategoryAds.reverse();
			return mainCategoryAds;
		}

		res.status(200).render('index', {
			result,
			mainCatAdsDisplay,
			dateDisplayer
		});
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = {
	homePageAds
}