const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const fs = require('fs');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const user = require('./mongo_db');
const { Users } = user;

let updateUsersAds = async (req, res) => {
	let token = req.cookies.token;

	let { id } = req.params;

	let form = new formidable.IncomingForm({ multiples: true });

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				res.redirect('/');
			}else{
					await form.parse(req, async (err, fields, files) => {

					var UploadedImages = [];

					let formData = fields;
					
					let { email } = decodedToken;

					let {
						name, 
						mail, 
						tel, 
						Whatsapptel,
						chooseCats, 
						chooseSubCat,
						TexBookTitle, 
						EditionNum, 
						AuthorName, 
						condition, 
						TextbookPrice, 
						negotiation, 
						Description, 
						campus
					} = formData;

					if(files.uploaded.length === undefined){
						let oldPath = files.uploaded.path;
						let newPath = dirname + '\\imageUploads\\' + files.uploaded.name;
						fs.rename(oldPath, newPath, (err) => {
							if (err) throw err;
						});

						UploadedImages.push(newPath);

					}else if(files.uploaded.length >= 1){
						for(var i = 0; i < files.uploaded.length; i++){
							let oldPath = files.uploaded[i].path;
							let newPath = dirname + '\\imageUploads\\' + files.uploaded[i].name;
							fs.rename(oldPath, newPath, (err) => {
								if (err) throw err;
							});

						UploadedImages.push(newPath);

						}
					}

					for(imgName in fields){
						if(imgName.search('First_') !== -1){
							let firstImg = imgName.slice(imgName.search('-') + 1, imgName.length);
							let firstImgPath = `C:\\Users\\J_Mosemeng\\Desktop\\Kopa-Booka\\imageUploads\\${ firstImg }`;

							for(i = 0; i < UploadedImages.length; i++){
								if(UploadedImages[i] === firstImgPath){
									UploadedImages.splice(i, 1);
									UploadedImages.unshift(firstImgPath);
								}
							}
						}
					}
					
					let updateAdvertisementDb = (res) => {
						let ad_ID = { _id: id };
						let updatedValues = {
						$set: { 
						
							Name: name,
							Mail: mail,
							Tel: tel,
							Whatsapp_tel: Whatsapptel,
							Main_Category: chooseCats,
							Sub_Category: chooseSubCat,
							Text_Book_Title: TexBookTitle,
							Edition_Number: EditionNum,
							Author_Name: AuthorName,
							Condition: condition,
							Text_Book_Price: TextbookPrice,
							Negotiation: negotiation,
							Description,
							Campus: campus,
							Date_Updated: new Date(),
							UploadedImages
							
							}
						}
						
						Advertisements.updateOne(ad_ID, updatedValues, (err, res) => {
							if(err) throw err;
						});
					}
					
					let updateUserDB = (res) => {
						let userInfo = { Email: email, "My_Ads._id": id };
						let updatedAd = { 
							$set: { 
							
							"My_Ads.$.Name": name,
							"My_Ads.$.Mail": mail,
							"My_Ads.$.Tel": tel,
							"My_Ads.$.Whatsapp_tel": Whatsapptel,
							"My_Ads.$.Main_Category": chooseCats,
							"My_Ads.$.Sub_Category": chooseSubCat,
							"My_Ads.$.Text_Book_Title": TexBookTitle,
							"My_Ads.$.Edition_Number": EditionNum,
							"My_Ads.$.Author_Name": AuthorName,
							"My_Ads.$.Condition": condition,
							"My_Ads.$.Text_Book_Price": TextbookPrice,
							"My_Ads.$.Negotiation": negotiation,
							"My_Ads.$.Description": Description,
							"My_Ads.$.Campus": campus,
							"My_Ads.$.Date_Updated": new Date(),
							"My_Ads.$.UploadedImages": UploadedImages
							
							}
						}
						
						Users.updateOne(userInfo, updatedAd, (err, res) => {
							if(err) throw err;
						});
					}

					await updateAdvertisementDb();

					await updateUserDB();

					return res.redirect('/place-advert-success');
				});
			}
		});
	
	}else{
		res.redirect('/');
	}
}

module.exports = {
	updateUsersAds
}