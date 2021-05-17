let pwd = document.getElementById('pwd');
let passConfirm = document.getElementById('confirm_pwd');

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
	let pwdErr = document.getElementById('pwd-error-alerter');
	let passConfErr = document.getElementById('confirm-pwd-error-alerter');
	let findUpperCase = pwdVal.search(/[A-Z]/);
	let findLowerCase = pwdVal.search(/[a-z]/);
	let findSpecialChar = pwdVal.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/);
	let findDigit = pwdVal.search(/[0-9]/);
	
	if(pwdVal === '' || pwdVal === undefined || pwdVal === null){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
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
	let pwdErr = document.getElementById('pwd-error-alerter');
	let passConfErr = document.getElementById('confirm-pwd-error-alerter');
	
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

//Submit validation 
let subBtn = document.getElementById('sub-btn');
subBtn.onclick = () => {
	passwordValidation();
	passwordCofirmation();

	if(passwordValidation() === false){
		return passwordValidation();
		
	}else if(passwordCofirmation() === false){
		return passwordCofirmation();
	}else{
		return true;
	}
}