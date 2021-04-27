const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const profileUpadeFormVal = require('./profile-updateFormVal');
const contactValChecker = require('./contactValCheck');
const { phoneNumFormats, telNumFormats } = contactValChecker;
const { titleSelectValidator, contactNumValidator } = profileUpadeFormVal;
const bcrypt = require('bcryptjs');
const user = require('./mongo_db');
const { Users } = user;

let profileUpdater = (req, res) => {
	let token = req.cookies.token;
	
	let formData = req.body;

	let { name, surname, tel, campus } = formData;
	
	let phoneNumFormatTests = {
	   sixZeroFormatTest : phoneNumFormats.zeroSixZeroFormat.test(tel),
	   sixOneFormatTest : phoneNumFormats.zeroSixOneFormat .test(tel),
	   sixTwoFormatTest : phoneNumFormats.zeroSixTwoFormat.test(tel),
	   sixThreeFormatTest : phoneNumFormats.zeroSixThreeFormat.test(tel),
	   sixFourFormatTest : phoneNumFormats.zeroSixFourFormat.test(tel),
	   sixFiveFormatTest : phoneNumFormats.zeroSixFiveFormat.test(tel),
	   sixSixFormatTest : phoneNumFormats.zeroSixSixFormat.test(tel),
	   sixSevenFormatTest : phoneNumFormats.zeroSixSevenFormat.test(tel),
	   sixEightFormatTest : phoneNumFormats.zeroSixEightFormat.test(tel)
	}

	let telNumFormatTests = {
	   telZeroOneTest : telNumFormats.telZeroOne.test(tel),
	   telZeroTwoTest : telNumFormats.telZeroTwo.test(tel),
	   telZeroThreeTest : telNumFormats.telZeroThree.test(tel),
	   telZeroFourTest : telNumFormats.telZeroFour.test(tel),
	   telZeroFiveTest : telNumFormats.telZeroFive.test(tel)
	}

	let numRegexChecks = {
	   zeroSixFormatTest : phoneNumFormatTests.sixZeroFormatTest || phoneNumFormatTests.sixOneFormatTest|| phoneNumFormatTests.sixTwoFormatTest || phoneNumFormatTests.sixThreeFormatTest || phoneNumFormatTests.sixFourFormatTest || phoneNumFormatTests.sixFiveFormatTest || phoneNumFormatTests.sixSixFormatTest || phoneNumFormatTests.sixSevenFormatTest || phoneNumFormatTests.sixEightFormatTest,
	   sevenFormatTest : phoneNumFormats.zeroSevenFormat.test(tel),
	   eightFormatTest : phoneNumFormats.zeroEightFormat.test(tel),
	   telFormats : telNumFormatTests.telZeroOneTest || telNumFormatTests.telZeroTwoTest || telNumFormatTests.telZeroThreeTest || telNumFormatTests.telZeroFourTest || telNumFormatTests.telZeroFiveTest
	}

	let contactValCheck = {

	   allNumFormatTest : numRegexChecks.zeroSixFormatTest || numRegexChecks.sevenFormatTest || numRegexChecks.eightFormatTest || numRegexChecks.telFormats,

	   findEmpty : tel === '' || tel === undefined || tel === null
	}
	
	let success;

	if(titleSelectValidator(name, surname, campus) === false || contactNumValidator(tel) === false){
		res.status(200).render('profile-post', { success, formData,  contactValCheck });
	}else{

		if(token){
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
				if(err){
					return res.status(400).json({ err });
				}else{
		
					let { email } = decodedToken;

					let updateUserProfile = (email, res) => {
						let myquery = { Email: email };
						let newvalues = { $set: { Name: name, Surname: surname, Tel: tel, Campus: campus } };

						Users.updateOne(myquery, newvalues, (err, res) => {
							if(err) throw err;
						});
					}

					let success = true;
					await updateUserProfile(email);
					res.status(200).render('profile-post', { success, formData,  contactValCheck });

				}
			});
		}else{
			return res.status(401).json({error: 'There\'s a problem'})
		}
	}
}

let getProfileUpdate = async (req, res) => {
	
	let token = req.cookies.token;
	
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				return res.status(400).json({ err });
			}else{

				let { email } = decodedToken;

				await Users.find().then( async (result) => {
					for(let i = 0, len = result.length; i < len; i++){
						emailMatcher = result[i].Email === email;

						if(emailMatcher){
							let { Name, Surname, Tel, Campus } = result[i];

							res.status(200).render('profile', { Name, Surname, Tel, Campus });
						}
					}
				}).catch((err) => {
					console.log(err);
				})
			}
		});
	}else{
		return res.status(401).json({error: 'There\'s a problem'})
	}

}

module.exports = { profileUpdater, getProfileUpdate };