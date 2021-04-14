const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const catAndCamp = require('./category-db');
const { Advertisements } = ads;
const { Category_and_campus_col } = catAndCamp;
const { Users } = user;

let viewAd = (req, res) =>{
	let { id } = req.params;
	Advertisements.find().then((result) => {
		
	let stringCapitalizer = (Campus) => {

		let arrStr = Campus.split(" "); 
		let campusArr = []; 

		arrStr.map((tring) => {
			tring = tring.replace("anyy", "any");
			tring = tring.replace(tring[0], tring[0].toUpperCase());
			campusArr.push(tring);
		}); 
		
		return campusArr.toString().replace(/,/g , " ");
	}
		
	for(let i = 0, len = result.length; i < len; i++){ 
		let {
		_id,
		Name,
		Mail,
		Tel,
		Whatsapp_tel,
		Main_Category,
		Sub_Category,
		Text_Book_Title,
		Edition_Number,
		Author_Name,
		Condition,
		Text_Book_Price,
		Negotiation,
		Description,
		Campus,
		UploadedImages
		} = result[i]; 

		let idMatcher = (not) => {
			not._id;
			return not._id === id;
		}

		if(Boolean(result.find(idMatcher)) === true){ 
			if(result[i]._id === id){ 
				return res.status(200).render('view-ad', {
					_id,
					Mail,
					Tel,
					Whatsapp_tel,
					Main_Category,
					Sub_Category,
					Text_Book_Title,
					Edition_Number,
					Author_Name,
					Condition,
					Text_Book_Price,
					Negotiation,
					Description,
					Campus,
					stringCapitalizer,
					UploadedImages
				});
			}
		}else{
			return res.redirect("/Ad-board");
			break;
		} 


	} 
		
	}).catch((err) => {
		console.log(err);
	});
};

module.exports = {
	viewAd
};