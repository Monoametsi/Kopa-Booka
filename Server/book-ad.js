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

	var num = 0;
	var number;
	var notFound = false;
	var amountOfAds = [];
	var nexBunch = [];
	var numOfCurrentAds;
	var totalAmountOfAds;
	let { searchQuery } = req.params;

	Advertisements.find().then((result) => {
		//console.log(req.url.search('/Ad-board/page-') !== -1)
		let numOfAdsDisplay = (data) => {
			num++;
			if(num <= 20){
				number = num;
			}else{
				false;
			}
			return number;
		}

		if(Object.keys(req.params).length === 0){
			totalAmountOfAds = result.length;
			numOfCurrentAds = result.map(numOfAdsDisplay)[result.map(numOfAdsDisplay).length - 1];
		}

		if(Object.keys(req.params).length > 0){
			for(let i = 0, len = result.length; i < len; i++){	 

				let { Name, Mail, Tel, Whatsapp_tel, Main_Category, Sub_Category, Text_Book_Title, Edition_Number, Author_Name, Condition, 
						Text_Book_Price, 
						Negotiation, 
						Description, 
						Campus, 
						UploadedImages 
					} = result[i];

				let textBookTileMatcher = (not) => {
					not.Text_Book_Title;
					return not.Text_Book_Title.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
				}

				 if(Boolean(result.find(textBookTileMatcher)) === true){ 
					if(result[i].Text_Book_Title.toLowerCase().search(searchQuery.toLowerCase()) !== -1){ 
						num++;
						if(num <= 20){
							numOfCurrentAds = num;
						}else{
							false;
						}

						amountOfAds.push(result[i]);
						totalAmountOfAds = amountOfAds.length;
						notFound = false;
					} 
					} else { 
						notFound = true 
						break; 
				 } 
			}
		}

		let stringCapitalizer = (UploadedImages, Campus) => {
			let img = UploadedImages[0]; 
			let imgStr = img.toString().replace("C:\\Users\\J_Mosemeng\\Desktop\\Kopa-Booka\\", "\\"); 

			let arrStr = Campus.split(" "); 
			let campusArr = []; 

			arrStr.map((tring) => {
				tring = tring.replace("anyy", "any");
				tring = tring.replace(tring[0], tring[0].toUpperCase());
				campusArr.push(tring);
			}); 
			
			return campusArr.toString().replace(/,/g , " ");
		}

		result.reverse();
		res.status(200).render('BookAd', { result, numOfCurrentAds, req, notFound, totalAmountOfAds, stringCapitalizer});
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = { displayAds };