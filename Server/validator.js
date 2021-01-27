let passwordEmailValidation = (pwdVal, passConfVal, res, emailFieldVal) => {

	let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailRegEx = emailOneDot.test(emailFieldVal) || emailTwoDots.test(emailFieldVal) || emailThreeDots.test(emailFieldVal);

	let findUpperCase = pwdVal.search(/[A-Z]/);
	let findLowerCase = pwdVal.search(/[a-z]/);
	let findSpecialChar = pwdVal.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/);
	let findDigit = pwdVal.search(/[0-9]/);
	
	if(pwdVal === '' || emailFieldVal === ''){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Required to fill in all fields.</h1>');
		return false;
		
	}else if(!(pwdVal.length >= 7) || !(pwdVal.length <= 16)){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Must be between 7 to 16 characters</h1>');
		return false;
		
	}else if(findLowerCase === -1){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Include atleast 1 lowecase character</h1>');
		return false;
		
	}else if(findUpperCase === -1){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Include atleast 1 Uppercase character</h1>');
		return false;
		
	}else if(findDigit === -1){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Include atleast 1 numeric digit</h1>');
		return false;
		
	}else if(findSpecialChar === -1){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Include atleast 1 special character</h1>');
		return false;

	}else if(pwdVal !== passConfVal){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Passwords dont match!</h1>');
		return false;

	}else if(emailRegEx === false){
		res.send('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Invalid email</h1>');
		return false;

	}
}

module.exports = {passwordEmailValidation};