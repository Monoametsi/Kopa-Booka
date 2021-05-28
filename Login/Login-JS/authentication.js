let mail = document.getElementById("emaill");
let pwd = document.getElementById("password");
let invalidLogin = document.getElementById('invalid');
let subBtn = document.getElementById("subBtn");
let check = document.getElementById('meme');

//Email address validation
mail.oninput =	function (){
	emailValidator();
}

function emailValidator(){
	let emailVal = mail.value.trim();

	let mailErr = document.getElementById('mailErr');

	if(emailVal === ''){
		mailErr.style.display = 'flex';
		mailErr.innerText = 'Required';
		mail.classList.add('redBox');
		return false;
	
	}else {
		mailErr.style.display = 'none';
		mail.classList.remove('redBox');
		return true;
	}
}

//Password validation
pwd.oninput = function (){
	passwordValidation();
}

function passwordValidation(){
	let pwdVal = pwd.value.trim();

	let pwdErr = document.getElementById('passwordErr');
	
	if(pwdVal === ''){
		pwdErr.style.display = 'flex';
		pwdErr.innerText = 'Required';
		pwd.classList.add('redBox');
		return false;
	
	}else{
		pwdErr.style.display = 'none';
		pwd.classList.remove('redBox');
		return true;
	}
}

//Submit Validator
subBtn.onclick = () => {
	// let checkedBox = check.checked;
	emailValidator();
	passwordValidation();

	if(emailValidator() === false){
		return emailValidator();

	}else if(passwordValidation() === false){
		return passwordValidation();

	}else{
		return true;
	}
}