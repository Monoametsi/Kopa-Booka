let emailInputField = document.getElementById('email');

let emailErr = document.getElementById('emailErr');

emailInputField.oninput = () => {
	emailValidation();
}

function emailValidation(){
	let emailInputFieldVal = emailInputField.value.trim();
	let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailRegEx = emailOneDot.test(emailInputFieldVal) || emailTwoDots.test(emailInputFieldVal) || emailThreeDots.test(emailInputFieldVal);
	
	if(emailInputFieldVal === '' || emailInputFieldVal === undefined || emailInputFieldVal === null ||  emailInputFieldVal.length === 0){
		emailErr.style.display = 'flex';
		emailErr.innerText = 'Required';
		emailInputField.classList.add('redBox');
		return false;
	}else if(emailRegEx === false){
		emailErr.style.display = 'flex';
		emailErr.innerText = 'Invalid';
		emailInputField.classList.add('redBox');
		return false;
	}else{
		emailErr.style.display = 'none';
		emailInputField.classList.remove('redBox');
	}
}

let subBtn = document.getElementById('submit');

subBtn.onclick = () => {
	emailValidation();

	if(emailValidation() === false){
		return emailValidation();
	}else{
		return true;
	}
}