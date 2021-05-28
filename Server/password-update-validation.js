let newPasswordValidation = (newPassword) => {

	let newPwdVal = newPassword.trim();
	let findUpperCase = newPwdVal.search(/[A-Z]/);
	let findLowerCase = newPwdVal.search(/[a-z]/);
	let findSpecialChar = newPwdVal.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/);
	let findDigit = newPwdVal.search(/[0-9]/);
	
	if(newPwdVal === '' || newPwdVal === undefined || newPwdVal === null || newPwdVal.length === 0){
		return false;

	}else if(!(newPwdVal.length >= 7) || !(newPwdVal.length <= 16)){
		return false;

	}else if(findLowerCase === -1){
		return false;

	}else if(findUpperCase === -1){
		return false;

	}else if(findDigit === -1){
		return false;

	}else if(findSpecialChar === -1){
		return false;

	}else{
		return true;
	}
}

let oldPasswordValidation = (comparingPasswords, passwordInput) => {

	if(passwordInput === '' || passwordInput === undefined || passwordInput === null || passwordInput.length === 0){
		return false;

	}else if(passwordInput.length > 0 && comparingPasswords !== true) {
		return false;

	}else{
		return true;
	}
}

module.exports = { oldPasswordValidation, newPasswordValidation }