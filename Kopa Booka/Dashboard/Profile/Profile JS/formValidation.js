let userName = document.getElementById('first-name');
let	userNameErr = document.getElementById('first-name-Err');
let userSurname = document.getElementById('last-name');
let	userSurnameErr = document.getElementById('last-name-Err');

userName.oninput = function (){
		userNameValidator();
}

function userNameValidator(){
	titleValidator(userName, userNameErr);
}

userSurname.oninput = function (){
		userSurnameValidator();
}

function userSurnameValidator(){
	titleValidator(userSurname, userSurnameErr);
}

function titleValidator(name,errorMessage){	

	if(name.value === ''){
		errorMessage.style.display = 'flex';
		name.classList.add('redBox');
		errorMessage.innerText = 'Required';
		return false;
		
	}else{
		errorMessage.style.display = 'none';
		name.classList.remove('redBox');;	
	}
}

//Email address validation
let email = document.getElementById('mail');

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
	let mailErr = document.getElementById('mail-Err');
	
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

//Contact Number validation
let contactNum = document.getElementById('telNum');

contactNum.oninput = function (){
		contactNumValidator();
}

function contactNumValidator(){
  let contactNumErr = document.getElementById('telNum-Err');
  let contactNumVal = contactNum.value;
  
  let zeroSixZeroFormat = /^[0]{1}[6]{1}[0]{1}[3-9]{1}[0-9]{6}$/;
  let zeroSixOneFormat = /^[0]{1}[6]{1}[1]{1}[0-9]{1}[0-9]{6}$/;
  let zeroSixTwoFormat = /^[0]{1}[6]{1}[2]{1}[0-9]{1}[0-9]{6}$/;
  let zeroSixThreeFormat = /^[0]{1}[6]{1}[3]{1}[0-7]{1}[0-9]{6}$/;
  let zeroSixFourFormat = /^[0]{1}[6]{1}[4]{1}[0-9]{1}[0-9]{6}$/;
  let zeroSixFiveFormat = /^[0]{1}[6]{1}[5]{1}[0-9]{1}[0-9]{6}$/;
  let zeroSixSixFormat = /^[0]{1}[6]{1}[6]{1}[0-5]{1}[0-9]{6}$/;
  let zeroSixSevenFormat = /^[0]{1}[6]{1}[7]{1}[0-9]{1}[0-9]{6}$/;
  let zeroSixEightFormat = /^[0]{1}[6]{1}[8]{1}[0-5]{1}[0-9]{6}$/;
  let zeroSevenFormat = /^[0]{1}[7]{1}[1-34-68-9]{1}[0-9]{7}$/;
  let zeroEightFormat = /^[0]{1}[8]{1}[1-4]{1}[0-9]{7}$/;
  
  let sixZeroFormatTest = zeroSixZeroFormat.test(contactNumVal);
  let sixOneFormatTest = zeroSixOneFormat .test(contactNumVal);
  let sixTwoFormatTest = zeroSixTwoFormat.test(contactNumVal);
  let sixThreeFormatTest = zeroSixThreeFormat.test(contactNumVal);
  let sixFourFormatTest = zeroSixFourFormat.test(contactNumVal);
  let sixFiveFormatTest = zeroSixFiveFormat.test(contactNumVal);
  let sixSixFormatTest = zeroSixSixFormat.test(contactNumVal);
  let sixSevenFormatTest = zeroSixSevenFormat.test(contactNumVal);
  let sixEightFormatTest = zeroSixEightFormat.test(contactNumVal);
  let zeroSixFormatTest = sixZeroFormatTest || sixOneFormatTest|| sixTwoFormatTest || sixThreeFormatTest || sixFourFormatTest || sixFiveFormatTest || sixSixFormatTest || sixSevenFormatTest || sixEightFormatTest;
  let sevenFormatTest = zeroSevenFormat.test(contactNumVal);
  let eightFormatTest = zeroEightFormat.test(contactNumVal);
  
  let telZeroOne = /^[0]{1}[1]{1}[0-8]{1}[0-9]{7}$/;
  let telZeroTwo  = /^[0]{1}[2]{1}[1-37-8]{1}[0-9]{7}$/;
  let telZeroThree  = /^[0]{1}[3]{1}[1-69]{1}[0-9]{7}$/;
  let telZeroFour  = /^[0]{1}[4]{1}[0-9]{1}[0-9]{7}$/;
  let telZeroFive  = /^[0]{1}[5]{1}[1-46-8]{1}[0-9]{7}$/;
  let telZeroOneTest = telZeroOne.test(contactNumVal);
  let telZeroTwoTest = telZeroTwo.test(contactNumVal);
  let telZeroThreeTest = telZeroThree.test(contactNumVal);
  let telZeroFourTest = telZeroFour.test(contactNumVal);
  let telZeroFiveTest = telZeroFive.test(contactNumVal);
  let telFormats = telZeroOneTest || telZeroTwoTest || telZeroThreeTest || telZeroFourTest || telZeroFiveTest;

  if(zeroSixFormatTest || sevenFormatTest || eightFormatTest || telFormats){  
	contactNumErr.style.display = 'none';
	contactNum.classList.remove('redBox');
	
  }else if(contactNumVal == ''){
	contactNumErr.style.display = 'flex';
	contactNum.classList.add('redBox');
	contactNumErr.innerText = 'Required';
	
  }else{
	contactNumErr.style.display = 'flex';
	contactNum.classList.add('redBox');
	contactNumErr.innerText = 'Invalid';
	return false;
  }
}

//Select list validation
let selectCampus = document.getElementById('select-campus');
let selectCampusErr = document.getElementById('select-campus-Err');
		
function selectListValidator(name,errorMessage){
	let nameVal = name.value;
	let nameErr = errorMessage;
	
	if(nameVal == 'select campus'){
		errorMessage.style.display = 'flex';
		name.classList.add('redBox');
		errorMessage.innerText = 'Required';
		return false;
		
	}else {
		errorMessage.style.display = 'none';
		name.classList.remove('redBox');
	}
}

function selectCampusValidator(){
	selectListValidator(selectCampus,selectCampusErr);
		selectCampus.onchange = function(){
		selectListValidator(selectCampus,selectCampusErr);
	}
}


let submitUpdateBtn = document.getElementById('submit-update');
	
submitUpdateBtn.onclick = function submitValidator(event){
	event.preventDefault();
	
	if(userNameValidator()){
		return userNameValidator();
		
	}else if(userSurnameValidator()){
		return userSurnameValidator();
		
	}else if(emailValidator()){
		return emailValidator();

	}else if(contactNumValidator()){
		return contactNumValidator();

	}else if(selectCampusValidator()){
		return selectCampusValidator();
	}
}

let newPwd = document.getElementById('newPass');
let oldPwd = document.getElementById('Oldpass');

newPwd.oninput = function(){
	newPasswordValidation();
}

oldPwd.oninput = function(){
	oldPasswordValidation();
}

function newPasswordValidation(){

	let newPwdVal = newPwd.value;
	let newPwdErr = document.getElementById('newPass-Err');
	let findUpperCase = newPwdVal.search(/[A-Z]/);
	let findLowerCase = newPwdVal.search(/[a-z]/);
	let findSpecialChar = newPwdVal.search(/[!/@/#/$/%/&/'/*/+/-///=/?/^/_/`/{/|/}/~/]/);
	let findDigit = newPwdVal.search(/[0-9]/);
	
	if(newPwdVal === ''){
		newPwdErr.style.display = 'flex';
		newPwd.classList.add('redBox');
		newPwdErr.innerText = 'Required';
		return false;
		
	}else if(!(newPwdVal.length >= 7) || !(newPwdVal.length <= 16)){
		newPwdErr.style.display = 'flex';
		newPwd.classList.add('redBox');
		newPwdErr.innerText = 'Must be between 7 to 16 characters';
		return false;
		
	}else if(findLowerCase === -1){
		newPwdErr.style.display = 'flex';
		newPwd.classList.add('redBox');
		newPwdErr.innerText = 'Include atleast 1 lowecase character';
		return false;
		
	}else if(findUpperCase === -1){
		newPwdErr.style.display = 'flex';
		newPwd.classList.add('redBox');
		newPwdErr.innerText = 'Include atleast 1 Uppercase character';
		return false;
		
	}else if(findDigit === -1){
		newPwdErr.style.display = 'flex';
		newPwd.classList.add('redBox');
		newPwdErr.innerText = 'Include atleast 1 numeric digit';
		return false;
		
	}else if(findSpecialChar === -1){
		newPwdErr.style.display = 'flex';
		newPwd.classList.add('redBox');
		newPwdErr.innerText = 'Include atleast 1 special character';
		return false;
		
	}else{
		newPwdErr.style.display = 'none';
		newPwd.classList.remove('redBox');
	}
}

function oldPasswordValidation(){

	let oldPwdVal = oldPwd.value;
	let oldPwdErr = document.getElementById('oldPass-Err');
	
	if(oldPwdVal === ''){
		oldPwdErr.style.display = 'flex';
		oldPwdErr.innerText = 'Required';
		oldPwd.classList.add('redBox');
		return false;
		
	}else {
		oldPwdErr.style.display = 'none';
		oldPwd.classList.remove('redBox');
		
	}
}

//Submit validation 
let subPwdBtn = document.getElementById('submitPassWord');
subPwdBtn.onclick = function(){
	submitPwd(event);
}

function submitPwd(action){
	action.preventDefault();

	if(newPasswordValidation()){
		return newPasswordValidation();

	}else if(oldPasswordValidation()){
		return oldPasswordValidation();
	}
}