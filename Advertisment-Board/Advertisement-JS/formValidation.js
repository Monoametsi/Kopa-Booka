//Name validation
let userName = document.getElementById('Username');
let	userNameErr = document.getElementById('Username-Err');

userName.oninput = function (){
	userNameValidator();
}

function userNameValidator(){
	titleValidator();
}

function titleValidator(){
	let icon = document.getElementsByClassName("ikon")[0];
	
	if(userName.value === ''){
		userNameErr.style.display = 'flex';
		userName.classList.add('redBox');
		userNameErr.innerText = 'Required';
		icon.classList.add('redBorder', 'Shadow');
		icon.classList.remove('Icon-boxShadower');
		return false;
		
	}else{
		userNameErr.style.display = 'none';
		userName.classList.remove('redBox');
		icon.classList.remove('redBorder', 'Shadow');
		icon.classList.add('Icon-boxShadower');
	}
}

//Contact Number validation
let contactNum = document.getElementById('Users-contact');

contactNum.oninput = function (){
		contactNumValidator();
}

function contactNumValidator(){
  let contactNumErr = document.getElementById('contactNum-Err');
  let contactNumVal = contactNum.value;
  let icon = document.getElementsByClassName("ikon")[1];
  
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
	icon.classList.remove('redBorder', 'Shadow');
	icon.classList.add('Icon-boxShadower');
	
  }else if(contactNumVal == ''){
	contactNumErr.style.display = 'none';
	contactNum.classList.remove('redBox');
	icon.classList.remove('redBorder', 'Shadow');
	icon.classList.add('Icon-boxShadower');
	
  }else{
	contactNumErr.style.display = 'flex';
	contactNum.classList.add('redBox');
	contactNumErr.innerText = 'Invalid';
	icon.classList.add('redBorder', 'Shadow');
	icon.classList.remove('Icon-boxShadower');
	return false;
  }
}

//Email address validation
let email = document.getElementById('Users-email');

email.oninput =	function (){
	emailValidator();
}

function emailValidator(){
	let icon = document.getElementsByClassName("ikon")[2];
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
		icon.classList.add('redBorder', 'Shadow');
		icon.classList.remove('Icon-boxShadower');
		return false;
	
	}else if(emailFormats){
		mailErr.style.display = 'none';
		email.classList.remove('redBox');
		icon.classList.remove('redBorder', 'Shadow');
		icon.classList.add('Icon-boxShadower');
	
	}else{
		mailErr.style.display = 'flex';
		mailErr.innerText = 'Invalid email';
		email.classList.add('redBox');
		icon.classList.add('redBorder', 'Shadow');
		icon.classList.remove('Icon-boxShadower');
		return false;
	}
}

//Select field validation

let messageToSeller = document.getElementById('subject');
	
messageToSeller.oninput = function(){
	messageToSellerValidator();
}
	
function messageToSellerValidator(){
	let messageToSellerVal = messageToSeller.value;
	let	messageToSellerErr = document.getElementById('subject-Err');
	
	if(messageToSellerVal === ''){
		messageToSellerErr.style.display = 'flex';
		messageToSeller.classList.add('Message-redBox');
		messageToSellerErr.innerText = 'Required';
		return false;

	}else{
		messageToSellerErr.style.display = 'none';
		messageToSeller.classList.remove('Message-redBox');
	}
}

//OnFocus and OnBlur functions
let formFields = document.getElementsByClassName("inputField-styling");

function fieldOnFocus(inputField){
	let icons = inputField.parentElement.children[0];

	if(icons.className.search('redBorder') === -1){
		icons.classList.add('Icon-boxShadower');

	}else{
		icons.classList.add('redBorder', 'Shadow');
	}
}

function fieldOnBlur(inputField){
		let icons = inputField.parentElement.children[0];
		icons.classList.remove('Icon-boxShadower', 'Shadow');
}

for(i = 0; i < formFields.length; i++){
	formFields[i].onfocus = function (){
		fieldOnFocus(this);
	}
	
	formFields[i].onblur = function(){
		fieldOnBlur(this);
	}
}

let searchInputField = document.getElementById("searcher");

searchInputField.onfocus = function (){
		fieldOnFocus(this);
}

searchInputField.onblur = function(){
		fieldOnBlur(this);
}

//Submit validation
let submitBtn = document.getElementById('submitFormInfo');

submitBtn.onclick = function(event){
	event.preventDefault();
	let icons = document.getElementsByClassName("ikon");

	if(userNameValidator()){
		return userNameValidator();

	}else if(contactNumValidator()){
		return contactNumValidator();

	}else if(emailValidator()){
		return emailValidator();

	}else if(messageToSellerValidator()){
		return messageToSellerValidator();
	}

	for(i = 0; i < icons.length; i++){
		icons[i].classList.remove('Icon-boxShadower','Shadow');
	}
}

let searchBtn = document.getElementById('search-btn');
let searchInput = document.getElementById('searcher');

let searchInputFunc = () => {
	let searchInputVal = searchInput.value;

	if(searchInputVal.length === 0){
		window.location.assign('http://localhost:8500/Ad-board');
	}else{
		window.location.assign(`http://localhost:8500/Ad-board/${searchInputVal}`);
	}
}

searchBtn.onclick = function(){
	searchInputFunc();
}

searchInput.onkeypress = (event) => {
	let searchInputVal = searchInput.value;

	if(event.keyCode === 13){
		event.preventDefault();
		searchInputFunc();
	}
}