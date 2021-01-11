let pwd = document.getElementById('password');
let passConfirm = document.getElementById('passConf');

pwd.oninput = function(){
	passwordValidation();
}

passConfirm.oninput = function(){
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
		pwdErr.innerText = 'Required';
		return false;
		
	}else if(!(pwdVal.length >= 7) || !(pwdVal.length <= 16)){
		pwdErr.style.display = 'flex';
		passConfErr.style.display = 'none';
		pwd.classList.add('redBox');
		passConfirm.classList.remove('redBox');
		pwdErr.innerText = 'Must be between 7 to 16 characters';
		return false;
		
	}else if(findLowerCase === -1){
		pwdErr.style.display = 'flex';
		passConfErr.style.display = 'none';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Include atleast 1 lowecase character';
		return false;
		
	}else if(findUpperCase === -1){
		pwdErr.style.display = 'flex';
		passConfErr.style.display = 'none';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Include atleast 1 Uppercase character';
		return false;
		
	}else if(findDigit === -1){
		pwdErr.style.display = 'flex';
		passConfErr.style.display = 'none';
		pwd.classList.add('redBox');
		passConfirm.classList.remove('redBox');
		pwdErr.innerText = 'Include atleast 1 numeric digit';
		return false;
		
	}else if(findSpecialChar === -1){
		pwdErr.style.display = 'flex';
		passConfErr.style.display = 'none';
		pwd.classList.add('redBox');
		passConfirm.classList.remove('redBox');
		pwdErr.innerText = 'Include atleast 1 special character';
		return false;
		
	}else{
		pwdErr.style.display = 'none';
		pwd.classList.remove('redBox');
	}
}

function passwordCofirmation(){
	
	let pwdVal = pwd.value;
	let passConfVal = passConfirm.value;
	let pwdErr = document.getElementById('passwordErr');
	let passConfErr = document.getElementById('passConfErr');
	
	if (pwdVal === ''){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Required';
		return false;
		
	}else if(pwdVal === passConfVal){
		passConfErr.style.display = 'none';
		passConfirm.classList.remove('redBox');
		
	}else{
		pwd.classList.add('redBox');
		passConfErr.style.display = 'flex';
		passConfErr.innerText = 'Passwords dont match!';
		passConfirm.classList.add('redBox');
		return false;
	}
}

//Email address validation
let email = document.getElementById('Usersemail');

email.oninput =	function (){
	emailValidator();
}

function emailValidator(){
	let emailVal = email.value;
	
	let threeDot = /^\w+([\.\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]?\w+)*@[a-zA-Z0-9]+([-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2}\.[a-zA-Z]{2}\.[a-zA-Z]{2}$/;
	let oneDot = /^\w+([\.\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]?\w+)*@[a-zA-Z0-9]+([-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,15}$/;
	let twoDot = /^\w+([\.\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]?\w+)*@[a-zA-Z0-9]+([-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2}\.[a-zA-Z]{2}$/;
	
	let threeDotFormat = threeDot.test(emailVal);
	let oneDotFormat = oneDot.test(emailVal);
	let twoDotFormat = twoDot.test(emailVal);
	
	let emailFormats = threeDotFormat || twoDotFormat || oneDotFormat;
	let mailErr = document.getElementById('mailErr');
	
	if(emailVal === ''){
		mailErr.style.display = 'flex';
		mailErr.innerText = 'Required';
		email.classList.add('redBox');
		return false;
	
	}else if(emailFormats){
		mailErr.style.display = 'none';
		email.classList.remove('redBox');
	
	}else{
		mailErr.style.display = 'flex';
		mailErr.innerText = 'Invalid email';
		email.classList.add('redBox');
		return false;
	}
}

//Submit validation 
let subBtn = document.getElementById('sub');
subBtn.onclick = function(){
	submitData(event);
}

function submitData(action){
	action.preventDefault();

	if(emailValidator()){
		return emailValidator();

	}else if(passwordValidation()){
		return passwordValidation();
		
	}else if(passwordCofirmation()){
		return passwordCofirmation();

	}
}