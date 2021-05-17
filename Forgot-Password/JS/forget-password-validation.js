let email = document.getElementById('email');
let emailErr = document.getElementById('error-alerter'); 

let width = document.getElementById('width-num');

// window.onresize = () => {
	// width.innerHTML = window.innerWidth;
// }

let emailValidation = () => {
	let emailVal = email.value;
	let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailRegEx = emailOneDot.test(emailVal) || emailTwoDots.test(emailVal) || emailThreeDots.test(emailVal);

	if(emailVal === "" || emailVal.length === 0  || emailVal === null || emailVal === undefined){
		emailErr.style.display = 'flex';
		emailErr.innerText = 'Required';
		email.classList.add('redBox');
		return false;
	}else if(emailRegEx === false){
		emailErr.style.display = 'flex';
		emailErr.innerText = 'Invalid';
		email.classList.add('redBox');
		return false;
	}else{
		emailErr.style.display = 'none';
		email.classList.remove('redBox');
	}
}

email.oninput = () => {
	emailValidation();
}

let submitBtn = document.getElementById('sub-btn');

submitBtn.onclick = () => {
	emailValidation();
	
	if(emailValidation() === false){
		return emailValidation();
	}else{
		return true;
	}
}