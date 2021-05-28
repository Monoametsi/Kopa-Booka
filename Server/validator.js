let passwordEmailValidation = (pwdVal, passConfVal) => {

	let findUpperCase = pwdVal.search(/[A-Z]/);
	let findLowerCase = pwdVal.search(/[a-z]/);
	let findSpecialChar = pwdVal.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/);
	let findDigit = pwdVal.search(/[0-9]/);

	if(pwdVal === '' || pwdVal === undefined || pwdVal === null || pwdVal.length === 0){
		return false;
		
	}else if(!(pwdVal.length >= 7) || !(pwdVal.length <= 16)){
		return false;
		
	}else if(findLowerCase === -1){
		return false;
		
	}else if(findUpperCase === -1){
		return false;
		
	}else if(findDigit === -1){
		return false;
		
	}else if(findSpecialChar === -1){
		return false;

	}else if(pwdVal !== passConfVal){
		return false;

	}
}

let emailValidation = (emailFieldVal) => {

	let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailRegEx = emailOneDot.test(emailFieldVal) || emailTwoDots.test(emailFieldVal) || emailThreeDots.test(emailFieldVal);

	if(emailFieldVal === '' || emailFieldVal.length === 0 || emailFieldVal === undefined || emailFieldVal === null){
		return false;

	}else if(emailRegEx === false){
		return false;

	}
}

module.exports = { passwordEmailValidation, emailValidation };