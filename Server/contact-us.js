const profileUpadeFormVal = require('./profile-updateFormVal');
const contactValChecker = require('./contactValCheck');
const validator = require('./validator');
const { emailValidation } = validator;
const { phoneNumFormats, telNumFormats } = contactValChecker;
const { nameValidator, contactNumValidator } = profileUpadeFormVal;

let contact_us_get = (req, res) => {
	res.status(200).render('contact-us');
}

let contact_us_post = (req, res) => {
	
	let { name, email, tel, subject } = req.body;
	
	let validationEmailChecks = {
		emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
		emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
		emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
	}

	let emailRegexChecks = {
		emailRegEx: validationEmailChecks.emailOneDot.test(email) || validationEmailChecks.emailTwoDots.test(email) || validationEmailChecks.emailThreeDots.test(email)
	}
	
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

	   findEmpty : tel === '' || tel === undefined || tel === null || tel.length === 0
	}

	if(nameValidator(name, subject) === false || contactNumValidator(tel) === false || emailValidation(email) === false){
		res.status(200).render('contact-us-post', { contactValCheck, emailRegexChecks, name, subject, email, tel });
	}else{
		res.status(200).render('contact-us-post', { contactValCheck, emailRegexChecks, name, subject, email, tel });
	}
}

module.exports = {
	contact_us_get,
	contact_us_post
}