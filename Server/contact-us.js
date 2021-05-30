const contactUsEmailer = require('./contact-us-email');
const profileUpadeFormVal = require('./profile-updateFormVal');
const contactValChecker = require('./contactValCheck');
const validator = require('./validator');
const { emailValidation } = validator;
const { phoneNumFormats, telNumFormats } = contactValChecker;
const { nameValidator, contactUsNumValidator } = profileUpadeFormVal;
const { contact_us_emailer } = contactUsEmailer;

let contact_us_get = (req, res) => {
	res.status(200).render('contact-us');
}

let contact_us_post = async (req, res) => {
	
	let { name, email, tel, subject } = req.body;
	
	let validationEmailChecks = {
		emailOneDot: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
		emailTwoDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/,
		emailThreeDots: /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/
	}

	let emailRegexChecks = {
		emailRegEx: validationEmailChecks.emailOneDot.test(email.trim()) || validationEmailChecks.emailTwoDots.test(email.trim()) || validationEmailChecks.emailThreeDots.test(email.trim())
	}
	
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

	   findEmpty : tel.trim() === '' || tel.trim().length === 0
	}

	if(nameValidator(name.trim(), subject.trim()) === false || contactUsNumValidator(tel.trim()) === false || emailValidation(email.trim()) === false){
		return res.status(200).render('contact-us-post', { contactValCheck, emailRegexChecks, name, subject, email, tel });
	}else{
		await contact_us_emailer(res, name.trim(), email.trim(), tel.trim(), subject.trim());
	}
}

let contact_us_success = (req, res) => {
	res.status(200).render('contact-us-success');
}

let contact_us_failure = (req, res) => {
	res.status(200).render('contact-us-failure');
}

module.exports = {
	contact_us_get,
	contact_us_post,
	contact_us_success,
	contact_us_failure
}