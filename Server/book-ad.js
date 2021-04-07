const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const fs = require('fs');
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const catAndCamp = require('./category-db');
const { Advertisements } = ads;
const { Category_and_campus_col } = catAndCamp;
const { Users } = user;

let displayAds = (req, res) => {
	var showSearchedAds = [];
	var isTrue;
	var num = 0;
	var startingNum = 1;
	var notFound = false;
	var numOfCurrentAds;
	var totalAmountOfAds;
	let { searchQuery, pageQuery } = req.params;

	Advertisements.find().then((result) => {

		let numOfAdsDisplay = (data) => {
			return data;
		}

		let lowToHighPrices = (lowPrice, highPrice) => {
			return lowPrice.Text_Book_Price - highPrice.Text_Book_Price;
		}

		let highToLowPrices = (lowPrice, highPrice) => {
			return highPrice.Text_Book_Price - lowPrice.Text_Book_Price;
		}
		
		let sortPrices = (arr, sortMethod) => {
			arr.sort(sortMethod);
		}
		
		let sortListUrl = req.url === `/Ad-board` || req.url === `/Ad-board/latest-Ads` || req.url === `/Ad-board/price-low-to-high` || req.url === `/Ad-board/price-high-to-low`;

		if(sortListUrl){
			startingNum
			totalAmountOfAds = result.length;
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;

		}else if(searchQuery.toLowerCase().search(/page-\d/) !== -1 && req.url.search("/Ad-board/price-high-to-low") !== -1){
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;

			for(let i = 0; i < result.length; i+= 20){
				num++
				if(parseInt(req.url.slice(req.url.search(/\d/))) === num){
					startingNum += i;
					numOfCurrentAds += i;
				}
			}

			if(numOfCurrentAds >= result.length){
				numOfCurrentAds = result.length;
			}

			totalAmountOfAds = result.length;
			notFound = false;
		}else if(searchQuery.toLowerCase().search(/page-\d/) !== -1 && req.url.search("/Ad-board/price-low-to-high") !== -1){
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;

			for(let i = 0; i < result.length; i+= 20){
				num++
				if(parseInt(req.url.slice(req.url.search(/\d/))) === num){
					startingNum += i;
					numOfCurrentAds += i;
				}
			}

			if(numOfCurrentAds >= result.length){
				numOfCurrentAds = result.length;
			}

			totalAmountOfAds = result.length;
			notFound = false;
		}else

		if(searchQuery.toLowerCase().search(/page-\d/) !== -1  || req.url.search("/Ad-board/latest-Ads") !== -1){
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;

			for(let i = 0; i < result.length; i+= 20){
				num++
				if(parseInt(req.url.slice(req.url.search(/\d/))) === num){
					startingNum += i;
					numOfCurrentAds += i;
				}
			}

			if(numOfCurrentAds >= result.length){
				numOfCurrentAds = result.length;
			}

			totalAmountOfAds = result.length;
			notFound = false;
		}else

		if((searchQuery.toLowerCase().search(/page-\d/) === -1 && pageQuery === undefined)){
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
						showSearchedAds.push(result[i]);
						isTrue = true;
						
						totalAmountOfAds = showSearchedAds.length;
						notFound = false;
					} 
					} else { 
						notFound = true 
						break; 
				 } 
			}

			if(isTrue){
				numOfCurrentAds = showSearchedAds.slice(0, 20).map(numOfAdsDisplay).length;
			}
		} else
		
		if((searchQuery.toLowerCase().search(/page-\d/) === -1 && pageQuery.toLowerCase().search(/page-\d/) !== -1)){
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
						showSearchedAds.push(result[i]);
						isTrue = true;
						
						notFound = false;
					} 
					} else { 
						notFound = true 
						break; 
				 } 
			}

			if(isTrue){
				numOfCurrentAds = showSearchedAds.slice(0, 20).map(numOfAdsDisplay).length;

				for(let i = 0; i < showSearchedAds.length; i+= 20){
					num++
					if(parseInt(req.url.slice(req.url.search(/\d/))) === num){
						startingNum += i;
						numOfCurrentAds += i;
					}
				}
				
				totalAmountOfAds = showSearchedAds.length;
						
				if(numOfCurrentAds > totalAmountOfAds){
					numOfCurrentAds = totalAmountOfAds;
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
		res.status(200).render('BookAd', { 
			result, 
			numOfCurrentAds, 
			req, 
			notFound, 
			totalAmountOfAds, 
			stringCapitalizer, 
			startingNum, 
			pageQuery, 
			searchQuery, 
			sortPrices, 
			lowToHighPrices, 
			highToLowPrices,
			Category_and_campus_col
		});
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = { displayAds };