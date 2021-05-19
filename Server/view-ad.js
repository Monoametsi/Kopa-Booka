const ordinal = require('ordinal');
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

	Advertisements.find().then( async (result) => {
		
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
		Viewed_Count,
		Date_Created,
		UploadedImages
		} = result[i]; 

		let idMatcher = (not) => {
			not._id;
			return not._id === id;
		}

		if(Boolean(result.find(idMatcher)) === true){ 
			if(result[i]._id === id){
				
				let updateViewCount = (res) => {
					let ad = { _id: id };
					let viewCountAdded = { $push: { Viewed_Count: 1 }  };
					
					Advertisements.updateOne(ad, viewCountAdded, (err, res) => {
						if(err) throw err;
					})
				}

				let updateUsersViewCount = (res) => {
					let ad = { "My_Ads._id": id };
					let viewCountAdded = { $push: { "My_Ads.$.Viewed_Count": 1 }  };
					
					Users.updateOne(ad, viewCountAdded, (err, res) => {
						if(err) throw console.log(err);
					})
				}
				
				await updateViewCount();

				await updateUsersViewCount();
				
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
					UploadedImages,
					Viewed_Count,
					Date_Created,
					ordinal
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
}