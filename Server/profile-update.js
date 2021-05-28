const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const profileUpadeFormVal = require('./profile-updateFormVal');
const contactValChecker = require('./contactValCheck');
const { phoneNumFormats, telNumFormats } = contactValChecker;
const { titleSelectValidator, contactNumValidator } = profileUpadeFormVal;
const bcrypt = require('bcryptjs');
const catAndCamp = require('./category-db');
const { Category_and_campus_col } = catAndCamp;
const user = require('./mongo_db');
const { Users } = user;

let profileUpdater = (req, res) => {
	let token = req.cookies.token;
	
	let formData = req.body;

	let { name, surname, tel, campus } = formData;
	
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

	let success;
	
	Category_and_campus_col.find().then((categories) => {
		
		if(titleSelectValidator(name.trim(), surname.trim(), campus.trim()) === false || contactNumValidator(tel.trim()) === false){

			return res.status(200).render('profile-post', { success, formData,  contactValCheck, categories });
		
		}else{

			if(token){
				jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
					if(err){
						return res.redirect('/');
					}else{
			
						let { email } = decodedToken;

						let updateUserProfile = (res) => {
							let myquery = { Email: email.trim() };
							let newvalues = { $set: { Name: name.trim(), Surname: surname.trim(), Tel: tel.trim(), Campus: campus.trim() } };

							Users.updateOne(myquery, newvalues, (err, res) => {
								if(err) throw err;
							});
						}

						let success = true;
						
						await updateUserProfile();
						
						return res.status(200).render('profile-post', { success, formData,  contactValCheck, categories });

					}
				});
			}else{
				return res.redirect('/');
			}
		}
	
	}).catch((err) => { 
		console.log(err); 
	})

}

let getProfileUpdate = async (req, res) => {
	
	let token = req.cookies.token;
	
	Category_and_campus_col.find().then((categories) => {

		if(token){
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
				if(err){
					return res.redirect('/');
				}else{

					let { email } = decodedToken;

					await Users.find().then( async (result) => {
						for(let i = 0, len = result.length; i < len; i++){
							emailMatcher = result[i].Email === email;

							if(emailMatcher){
								let { Name, Surname, Tel, Campus } = result[i];

								res.status(200).render('profile', { Name, Surname, Tel, Campus, categories });
							}
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			});
		}else{
			return res.redirect('/');
		}

	}).catch((err) => { 
		console.log(err) 
	})

}

module.exports = { profileUpdater, getProfileUpdate };