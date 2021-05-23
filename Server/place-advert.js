const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/SERVER/i) - 1);
const fs = require('fs');
const uuid = require('uuid');
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
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const { Users } = user;

let placeAdvert = async (req, res) => {

	let token = req.cookies.token;

	let form = new formidable.IncomingForm({ multiples: true });
	
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

		   findEmpty : tel.trim() === '' || tel.trim() === undefined || tel.trim() === null || tel.trim().length === 0
		}
		
		let validationEmailChecks = {
			emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
			emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
			emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
		}

		let emailRegexChecks = {
			emailRegEx: validationEmailChecks.emailOneDot.test(mail.trim()) || validationEmailChecks.emailTwoDots.test(mail.trim()) || validationEmailChecks.emailThreeDots.test(mail.trim())
		}

		if(placeAdTitleValidator(name, TexBookTitle, AuthorName, EditionNum, TextbookPrice, Description, chooseCats, chooseSubCat, condition, negotiation, campus) === false || contactNumValidator(tel) === false ||  emailValidator(mail) || files_Validator(files) === false){
			return res.status(200).render('place-advert-post', { formData, contactValCheck, emailRegexChecks, result, stringCapitalizer });

		}else{

		let UserId = uuid.v4().slice(0, uuid.v4().search("-"));

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
		
		

		const adverts = await new Advertisements({
			_id: UserId,
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
			Viewed_Count: [],
			Date_Created: new Date(),
			Date_Updated: "",
			UploadedImages 
		});

		await adverts.save().catch((err) => {
			console.log(err);
		});

		if(token){
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
				if(err){
					return res.status(400).json({ err })
				}else{

					let { email } = decodedToken;

					let users_ad = {
						_id: UserId,
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
						Viewed_Count: [],
						Date_Created: new Date(),
						Date_Updated: "",
						UploadedImages
					}

					let updateUserAds = (email, res) => {
						let myquery = { Email: email };
						let newvalues = { $push: { My_Ads: users_ad } };

						Users.updateOne(myquery, newvalues, (err, res) => {
							if(err) throw err;
						});
					}

					await updateUserAds(email);
				}
			})
		}else{
			res.redirect('/');
		}
		
		return res.redirect('/place-advert-success');
	  }
	});
		
		
		
		
		
		
		
		
	}).catch((err) => {
		console.log(err);
	});
	
}

let placeAdvert_get = (req, res) => {
	res.status(200).render('place-advert', { res, req });
}

let jsEnabledCheck = (req, res) => {
	res.status(200).render('enable-js');
}

module.exports = { placeAdvert, placeAdvert_get, jsEnabledCheck }