const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/SERVER/i) - 1);
const fs = require('fs');
const uuid = require('uuid');
const fileRenamer = require('./file-renaming');
const catAndCamp = require('./category-db');
const { Category_and_campus_col } = catAndCamp;
const fileValidator = require('./files-validator');
const email_validator = require('./emailValidator');
const profileUpadeFormVal = require('./profile-updateFormVal');
const contactValChecker = require('./contactValCheck');
const { phoneNumFormats, telNumFormats } = contactValChecker;
const { placeAdTitleValidator, contactNumValidator } = profileUpadeFormVal;
const { files_Validator } = fileValidator;
const { emailValidator } = email_validator;
const { file_renamer } = fileRenamer;
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const { Users } = user;

let updateUsersAds = async (req, res) => {

	let token = req.cookies.token;

	let { id } = req.params;
	
	Advertisements.find().then((result) => {
		
		let findId = (usersAdId) => {
			return usersAdId._id === id;
		}
		
		if(result.filter(findId).length === 0){
			res.redirect('/');
		}
	})

	let form = new formidable.IncomingForm({ multiples: true });

	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				res.redirect('/');
			}else{	
					
				Category_and_campus_col.find().then((result) => {	
					form.parse(req, async (err, fields, files) => {
						
					let stringCapitalizer = (Campus) => {

						let arrStr = Campus.split(" ");
						let campusArr = []; 

						arrStr.map((tring) => {
							tring = tring.replace(tring[0], tring[0].toUpperCase());
							campusArr.push(tring);
						});

						return campusArr.toString().replace(/,/g , " ");
					}
	

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

					let phoneNumFormatTests = {
					   sixZeroFormatTest : phoneNumFormats.zeroSixZeroFormat.test(tel.trim()),
					   sixOneFormatTest : phoneNumFormats.zeroSixOneFormat .test(tel.trim()),
					   sixTwoFormatTest : phoneNumFormats.zeroSixTwoFormat.test(tel.trim()),
					   sixThreeFormatTest : phoneNumFormats.zeroSixThreeFormat.test(tel.trim()),
					   sixFourFormatTest : phoneNumFormats.zeroSixFourFormat.test(tel.trim()),
					   sixFiveFormatTest : phoneNumFormats.zeroSixFiveFormat.test(tel.trim()),
					   sixSixFormatTest : phoneNumFormats.zeroSixSixFormat.test(tel.trim()),
					   sixSevenFormatTest : phoneNumFormats.zeroSixSevenFormat.test(tel.trim()),
					   sixEightFormatTest : phoneNumFormats.zeroSixEightFormat.test(tel.trim())
					}

					let telNumFormatTests = {
					   telZeroOneTest : telNumFormats.telZeroOne.test(tel.trim()),
					   telZeroTwoTest : telNumFormats.telZeroTwo.test(tel.trim()),
					   telZeroThreeTest : telNumFormats.telZeroThree.test(tel.trim()),
					   telZeroFourTest : telNumFormats.telZeroFour.test(tel.trim()),
					   telZeroFiveTest : telNumFormats.telZeroFive.test(tel.trim())
					}

					let numRegexChecks = {
					   zeroSixFormatTest : phoneNumFormatTests.sixZeroFormatTest || phoneNumFormatTests.sixOneFormatTest|| phoneNumFormatTests.sixTwoFormatTest || phoneNumFormatTests.sixThreeFormatTest || phoneNumFormatTests.sixFourFormatTest || phoneNumFormatTests.sixFiveFormatTest || phoneNumFormatTests.sixSixFormatTest || phoneNumFormatTests.sixSevenFormatTest || phoneNumFormatTests.sixEightFormatTest,
					   sevenFormatTest : phoneNumFormats.zeroSevenFormat.test(tel.trim()),
					   eightFormatTest : phoneNumFormats.zeroEightFormat.test(tel.trim()),
					   telFormats : telNumFormatTests.telZeroOneTest || telNumFormatTests.telZeroTwoTest || telNumFormatTests.telZeroThreeTest || telNumFormatTests.telZeroFourTest || telNumFormatTests.telZeroFiveTest
					}

					let contactValCheck = {

					   allNumFormatTest : numRegexChecks.zeroSixFormatTest || numRegexChecks.sevenFormatTest || numRegexChecks.eightFormatTest || numRegexChecks.telFormats,

					   findEmpty : tel.trim() === '' || tel === undefined || tel === null || tel.trim().length === 0
					}
					
					let validationEmailChecks = {
						emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
						emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
						emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
					}

					let emailRegexChecks = {
						emailRegEx: validationEmailChecks.emailOneDot.test(mail.trim()) || validationEmailChecks.emailTwoDots.test(mail.trim()) || validationEmailChecks.emailThreeDots.test(mail.trim())
					}
					
					if(placeAdTitleValidator(name, TexBookTitle, AuthorName, EditionNum, TextbookPrice, Description, chooseCats, chooseSubCat, condition, negotiation, campus) === false || contactNumValidator(tel) === false ||  emailValidator(mail) === false || files_Validator(files)[0] === false){

						return res.status(200).render('edit-ad-post', { id, formData, contactValCheck, emailRegexChecks, result, stringCapitalizer, files, files_Validator, file_renamer, dirname, fs, fields });

					}else{

						if(files.uploaded.length === undefined){
							let oldPath = files.uploaded.path;
							let newPath;
							if(dirname === '/app'){
								newPath = dirname + '/imageUploads/' + files.uploaded.name;
							}else{
								newPath = dirname + '\\imageUploads\\' + files.uploaded.name;
							}

							await fs.readFile(oldPath, async function (err, data) {
									if (err) throw err;
									console.log('File read!');

									// Write the file
									await fs.writeFile(newPath, data, function (err) {
										if (err) throw err;
									});

									// Delete the file
									await fs.unlink(oldPath, function (err) {
										if (err) throw err;
									});
								});

							UploadedImages.push(newPath);

						}else if(files.uploaded.length >= 1){
							for(let i = 0; i < files.uploaded.length; i++){
								let oldPath = files.uploaded[i].path;
								let newPath;
								if(dirname === '/app'){
									newPath = dirname + '/imageUploads/' + files.uploaded[i].name;
								}else{
									newPath = dirname + '\\imageUploads\\' + files.uploaded[i].name;
								}

								await fs.readFile(oldPath, async function (err, data) {
									if (err) throw err;
									console.log('File read!');

									// Write the file
									await fs.writeFile(newPath, data, function (err) {
										if (err) throw err;
									});

									// Delete the file
									await fs.unlink(oldPath, function (err) {
										if (err) throw err;
									});
								});

								UploadedImages.push(newPath);

							}
						}
						
						for(imgName in fields){
							if(imgName.search('First_') !== -1){
								let firstImg = imgName.slice(imgName.search('-') + 1, imgName.length);
								let firstImgPath;
								if(dirname === '/app'){
									firstImgPath = `${ dirname }/imageUploads/${ firstImg }`;
								}else{
									firstImgPath = `${ dirname }\\imageUploads\\${ firstImg }`;
								}

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

								Name: name.trim(),
								Mail: mail.trim(),
								Tel: tel.trim(),
								Whatsapp_tel: Whatsapptel.trim(),
								Main_Category: chooseCats.trim(),
								Sub_Category: chooseSubCat.trim(),
								Text_Book_Title: TexBookTitle.trim(),
								Edition_Number: EditionNum.trim(),
								Author_Name: AuthorName.trim(),
								Condition: condition.trim(),
								Text_Book_Price: TextbookPrice.trim(),
								Negotiation: negotiation.trim(),
								Description: Description.trim(),
								Campus: campus.trim(),
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
								
								"My_Ads.$.Name": name.trim(),
								"My_Ads.$.Mail": mail.trim(),
								"My_Ads.$.Tel": tel.trim(),
								"My_Ads.$.Whatsapp_tel": Whatsapptel.trim(),
								"My_Ads.$.Main_Category": chooseCats.trim(),
								"My_Ads.$.Sub_Category": chooseSubCat.trim(),
								"My_Ads.$.Text_Book_Title": TexBookTitle.trim(),
								"My_Ads.$.Edition_Number": EditionNum.trim(),
								"My_Ads.$.Author_Name": AuthorName.trim(),
								"My_Ads.$.Condition": condition.trim(),
								"My_Ads.$.Text_Book_Price": TextbookPrice.trim(),
								"My_Ads.$.Negotiation": negotiation.trim(),
								"My_Ads.$.Description": Description.trim(),
								"My_Ads.$.Campus": campus.trim(),
								"My_Ads.$.Date_Updated": new Date(),
								"My_Ads.$.UploadedImages": UploadedImages
								
								}
							}

							Users.updateOne(userInfo, updatedAd, (err, res) => {
								if(err) throw err;
							});
						}

						let updateMsgAd = (res) => {
							let adMsgId = { "Ad_Messages.msgAd._id":  id }
							let updatedMsgAd = {
								$set: {
								"Ad_Messages.$.msgAd.Name": name.trim(),
								"Ad_Messages.$.msgAd.Mail": mail.trim(),
								"Ad_Messages.$.msgAd.Tel": tel.trim(),
								"Ad_Messages.$.msgAd.Whatsapp_tel": Whatsapptel.trim(),
								"Ad_Messages.$.msgAd.Main_Category": chooseCats.trim(),
								"Ad_Messages.$.msgAd.Sub_Category": chooseSubCat.trim(),
								"Ad_Messages.$.msgAd.Text_Book_Title": TexBookTitle.trim(),
								"Ad_Messages.$.msgAd.Edition_Number": EditionNum.trim(),
								"Ad_Messages.$.msgAd.Author_Name": AuthorName.trim(),
								"Ad_Messages.$.msgAd.Condition": condition.trim(),
								"Ad_Messages.$.msgAd.Text_Book_Price": TextbookPrice.trim(),
								"Ad_Messages.$.msgAd.Negotiation": negotiation.trim(),
								"Ad_Messages.$.msgAd.Description": Description.trim(),
								"Ad_Messages.$.msgAd.Campus": campus.trim(),
								"Ad_Messages.$.msgAd.Date_Updated": new Date(),
								"Ad_Messages.$.msgAd.UploadedImages": UploadedImages
								}
							}

							Users.updateMany(adMsgId, updatedMsgAd, (err, res) => {
								if(err) throw err;
							});

						}
						
						await updateMsgAd();

						await updateAdvertisementDb();

						await updateUserDB();

						return res.redirect(`/edit-ad-success/${ id }`);
					}
				});
			 })
			}
		});

	}else{
		res.redirect('/');
	}
}

let editAdSuccess = (req, res) => {
	let { id } = req.params;
	
	Advertisements.find().then((result) => {
		
		let findId = (usersAdId) => {
			return usersAdId._id === id;
		}
		
		if(result.filter(findId).length > 0){
			res.status(200).render('edit-advert-success');
		}else{
			res.redirect('/');
		}
	})
	
}

module.exports = {
	updateUsersAds,
	editAdSuccess
}