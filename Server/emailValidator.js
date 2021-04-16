let emailValidator = (emailInputFieldVal) => {
	let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailRegEx = emailOneDot.test(emailInputFieldVal) || emailTwoDots.test(emailInputFieldVal) || emailThreeDots.test(emailInputFieldVal);
	
	if(emailInputFieldVal === '' || emailInputFieldVal === undefined || emailInputFieldVal === null ||  emailInputFieldVal.length === 0){
		return false;
	}else if(emailRegEx === false){;
		return false;
	}
}

module.exports = {
	emailValidator
}