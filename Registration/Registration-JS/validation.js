let pwd = document.getElementById('password');
let passConfirm = document.getElementById('passConf');

pwd.oninput = () => {
	passwordValidation();
}

pwd.addEventListener("focusout", passwordCofirmation);

passConfirm.oninput = () => {
	passwordCofirmation();
}

function passwordValidation(){
	let pwdVal = pwd.value;
	let passConfVal = passConfirm.value;
	let pwdErr = document.getElementById('passwordErr');
	let passConfErr = document.getElementById('passConfErr');
	let findUpperCase = pwdVal.search(/[A-Z]/);
	let findLowerCase = pwdVal.search(/[a-z]/);
	let findSpecialChar = pwdVal.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/);
	let findDigit = pwdVal.search(/[0-9]/);
	
	if(pwdVal === ''){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		passConfErr.style.display = 'none';
		passConfirm.classList.remove('redBox');
		pwdErr.innerText = 'Required';
		return false;
		
	}else if(!(pwdVal.length >= 7) || !(pwdVal.length <= 16)){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Must be between 7 to 16 characters';
		return false;
		
	}else if(findLowerCase === -1){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Include atleast 1 lowecase character';
		return false;
		
	}else if(findUpperCase === -1){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Include atleast 1 Uppercase character';
		return false;
		
	}else if(findDigit === -1){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Include atleast 1 numeric digit';
		return false;
		
	}else if(findSpecialChar === -1){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Include atleast 1 special character';
		return false;

	}else{
		pwdErr.style.display = 'none';
		pwd.classList.remove('redBox');
		return true;
	}
}

function passwordCofirmation(){
	let pwdVal = pwd.value;
	let passConfVal = passConfirm.value;
	let pwdErr = document.getElementById('passwordErr');
	let passConfErr = document.getElementById('passConfErr');
	
	if(pwdVal === passConfVal){
		passConfErr.style.display = 'none';
		passConfirm.classList.remove('redBox');
		return true;
	}else{
		passConfErr.style.display = 'flex';
		passConfErr.innerText = 'Passwords dont match!';
		passConfirm.classList.add('redBox');
		return false;
	}
}

//Email address validation
let emailField = document.getElementById('Usersemail');

emailField.oninput =	() => {
	emailValidation();
}

emailField.oninput = function(){
	emailValidation();
}

function emailValidation(){
	let emailFieldVal = emailField.value;
	let emailErr = document.getElementById('mailErr');
	let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailRegEx = emailOneDot.test(emailFieldVal) || emailTwoDots.test(emailFieldVal) || emailThreeDots.test(emailFieldVal);

	if(emailFieldVal === ''){
		emailErr.style.display = 'flex';
		emailErr.innerHTML = 'Required';
		emailField.classList.add('redBox');
		return false;

	}else if(emailRegEx === false){
		emailErr.style.display = 'flex';
		emailErr.innerHTML = 'Invalid';
		emailField.classList.add('redBox');
		return false;

	}else{
		emailErr.style.display = 'none';
		emailField.classList.remove('redBox');
		return true;
	}
}

//Submit validation 
let subBtn = document.getElementById('sub');
subBtn.onclick = () => {
	emailValidation();
	passwordValidation();
	passwordCofirmation();

	if(emailValidation() === false){
		return emailValidation();

	}else if(passwordValidation() === false){
		return passwordValidation();
		
	}else if(passwordCofirmation() === false){
		return passwordCofirmation();
	}else{
		return true;
	}
}