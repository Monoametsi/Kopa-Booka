//Name validation
let userName = document.getElementById('Username');
let	userNameErr = document.getElementById('Username-Err');

userName.oninput = function (){
	let icon = document.getElementsByClassName("ikon")[0];
	
	titleValidator();

	if(titleValidator() === false){
		icon.classList.add('redBorder', 'Shadow');
	}else{
		icon.classList.add('Icon-boxShadower');
	}
}

function titleValidator(){
	let icon = document.getElementsByClassName("ikon")[0];

	if(userName.value.trim() === '' || userName.value.trim() === undefined || userName.value.trim() === null || userName.value.trim().length === 0){
		userNameErr.style.display = 'flex';
		userName.classList.add('redBox');
		userNameErr.innerText = 'Required';
		icon.classList.add('redBorder');
		icon.classList.remove('Icon-boxShadower');
		return false;
		
	}else{
		userNameErr.style.display = 'none';
		userName.classList.remove('redBox');
		icon.classList.remove('redBorder', 'Shadow');
		return userName.value.trim();
	}
}

//Contact Number validation
let contactNum = document.getElementById('Users-contact');

contactNum.oninput = function (){
	let icon = document.getElementsByClassName("ikon")[1];
	
	contactNumValidator();
	
	if(contactNumValidator() === false){
		icon.classList.add('redBorder', 'Shadow');
	}else{
		icon.classList.add('Icon-boxShadower');
	}
}

function contactNumValidator(){
  let contactNumErr = document.getElementById('contactNum-Err');
  let contactNumVal = contactNum.value.trim();
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
	return contactNumVal;
	
  }else if(contactNumVal == '' || contactNumVal === undefined || contactNumVal === null ||contactNumVal.length === 0){
	contactNumErr.style.display = 'none';
	contactNum.classList.remove('redBox');
	icon.classList.remove('redBorder', 'Shadow');
	return contactNumVal;
	
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
	let icon = document.getElementsByClassName("ikon")[2];
	
	emailValidator();

	if(emailValidator() === false){
		icon.classList.add('redBorder', 'Shadow');
	}else{
		icon.classList.add('Icon-boxShadower');
	}
}

function emailValidator(){
	let icon = document.getElementsByClassName("ikon")[2];
	let emailVal = email.value.trim();
	let threeDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let oneDot =  /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let twoDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let threeDotFormat = threeDot.test(emailVal);
	let oneDotFormat = oneDot.test(emailVal);
	let twoDotFormat = twoDot.test(emailVal);
	let emailFormats = threeDotFormat || twoDotFormat || oneDotFormat;
	let mailErr = document.getElementById('mailErr');
	
	if(emailVal === '' || emailVal === undefined || emailVal === null || emailVal.length === 0){
		mailErr.style.display = 'flex';
		mailErr.innerText = 'Required';
		email.classList.add('redBox');
		icon.classList.add('redBorder');
		icon.classList.remove('Icon-boxShadower');
		return false;
	
	}else if(emailFormats){
		mailErr.style.display = 'none';
		email.classList.remove('redBox');
		icon.classList.remove('redBorder', 'Shadow');
		return emailVal;
	
	}else{
		mailErr.style.display = 'flex';
		mailErr.innerText = 'Invalid email';
		email.classList.add('redBox');
		icon.classList.add('redBorder');
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
	let messageToSellerVal = messageToSeller.value.trim();
	let	messageToSellerErr = document.getElementById('subject-Err');
	
	if(messageToSellerVal === '' || messageToSellerVal === undefined || messageToSellerVal === null || messageToSellerVal.length === 0){
		messageToSellerErr.style.display = 'flex';
		messageToSeller.classList.add('Message-redBox');
		messageToSellerErr.innerText = 'Required';
		return false;

	}else{
		messageToSellerErr.style.display = 'none';
		messageToSeller.classList.remove('Message-redBox');
		return messageToSellerVal;
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

//Submit validation
let submitBtn = document.getElementById('submitFormInfo');
let sellersContactNum = document.getElementById('Post-Id'); 
let successBoxCont = document.getElementById('box-cont');

submitBtn.onclick = function(){
	let icons = document.getElementsByClassName("ikon");
	let form = document.getElementById("form");
	let formActionAttr = document.getElementById("form").action;

	titleValidator();
	contactNumValidator();
	emailValidator();
	messageToSellerValidator();

	if(titleValidator() === false){
		return titleValidator();

	}else if(contactNumValidator() === false){
		return contactNumValidator();

	}else if(emailValidator() === false){
		return emailValidator();

	}else if(messageToSellerValidator() === false){
		return messageToSellerValidator();
	}else{

		let formData = new URLSearchParams();

		let userInput = {
		  firstname: titleValidator(),
		  tel: contactNumValidator(),
		  email: emailValidator(),
		  Post_Id: sellersContactNum.value.trim(),
		  subject: messageToSellerValidator() 
		}

		for(formValue in userInput){
			formData.append(formValue, userInput[formValue].trim());
		}

		fetch(formActionAttr, {
			body: formData,
			method: 'POST'
		}).then( async (response) => {
			let formdata = await response;

			return formdata;
		}).then((result) => {
			form.style.display = "none";
			successBoxCont.style.display = "flex";
		}).catch((err) => {
			console.log(err);
		});

		return false;
	}

	for(i = 0; i < icons.length; i++){
		icons[i].classList.remove('Icon-boxShadower','Shadow');
	}
}