let mail = document.getElementById("emaill");
let pwd = document.getElementById("password");
let invalidLogin = document.getElementById('invalid');
let subBtn = document.getElementById("subBtn");
let check = document.getElementById('meme');

let userData = {
	email: '216026633@student.uj.ac.za',
	passWord: 'Mose@1234'
}

//Email address validation
mail.oninput =	function (){
	emailValidator();
}

function emailValidator(){
	let emailVal = mail.value;

	let mailErr = document.getElementById('mailErr');
	
	if(emailVal === ''){
		mailErr.style.display = 'flex';
		mailErr.innerText = 'Required';
		mail.classList.add('redBox');
		return false;
	
	}else if(invalidLogin.style.display === 'flex'){
		pwd.classList.add('redBox');
		
	}else{
		mailErr.style.display = 'none';
		mail.classList.remove('redBox');
	}
}

//Password validation
pwd.oninput = function (){
	passwordValidation();
}

function passwordValidation(){
	let pwdVal = pwd.value;

	let pwdErr = document.getElementById('passwordErr');
	
	if(pwdVal === ''){
		pwdErr.style.display = 'flex';
		pwdErr.innerText = 'Required';
		pwd.classList.add('redBox');
		return false;
	
	}else if(invalidLogin.style.display === 'flex'){
		pwd.classList.add('redBox');
		
	}else{
		pwdErr.style.display = 'none';
		pwd.classList.remove('redBox');
	}
}

subBtn.onclick = function(event){
	event.preventDefault();
	let checkedBox = check.checked;
	let mailVal = mail.value;
	let pwdVal = pwd.value;
	let pwdErr = document.getElementById('passwordErr');
	let mailErr = document.getElementById('mailErr');

	if(mailVal === '' && pwdVal === ''){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Required';
		mailErr.style.display = 'flex';
		mail.classList.add('redBox');
		mailErr.innerText = 'Required';
		return false;

	}else if(mailVal === '' && pwdVal.length > 0){
		pwdErr.style.display = 'none';
		pwd.classList.remove('redBox');
		mailErr.style.display = 'flex';
		mail.classList.add('redBox');
		mailErr.innerText = 'Required';
		return false;

	}else if(mailVal.length > 0 && pwdVal === ''){
		pwdErr.style.display = 'flex';
		mailErr.style.display = 'none';
		mail.classList.remove('redBox');
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Required';
		return false;

	}else if(!(mailVal === userData.email && pwdVal === userData.passWord)){
		invalidLogin.style.display = 'flex';
		mail.classList.add('redBox');
		pwd.classList.add('redBox');
		pwdErr.style.display = 'none';
		mailErr.style.display = 'none';
		return false;

	}else if((mailVal === userData.email && pwdVal === userData.passWord) && (checkedBox === true)){
		invalidLogin.style.display = 'none';
		pwdErr.style.display = 'none';
		mailErr.style.display = 'none';
		mail.classList.remove('redBox');
		pwd.classList.remove('redBox');
		setTimeout(
			function()
			{
				alert('Welcome you are logged in, you will never be forgotten.');
			},300);

	}else{
		setTimeout(
			function()
			{
				alert('Welcome you are logged in.');
			},300);
		invalidLogin.style.display = 'none';
		pwdErr.style.display = 'none';
		mailErr.style.display = 'none';
		mail.classList.remove('redBox');
		pwd.classList.remove('redBox');
	}
}