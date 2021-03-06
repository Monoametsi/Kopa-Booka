//Name validation
let userName = document.getElementById('Username');
let	userNameErr = document.getElementById('Username-Err');

userName.oninput = function (){
	titleValidator()
}

function titleValidator(){

	if(userName.value.trim() === '' || userName.value.trim().length === 0 || userName.value === undefined || userName.value === null){
		userNameErr.style.display = 'flex';
		userName.classList.add('redBox');
		userNameErr.innerText = 'Required';
		return false;
		
	}else{
		userNameErr.style.display = 'none';
		userName.classList.remove('redBox');
	}
}

//Contact Number validation
let contactNum = document.getElementById('Userscontact');

contactNum.oninput = function (){
	contactNumValidator();
}

function contactNumValidator(){
  let contactNumErr = document.getElementById('contactNum-Err');
  let contactNumVal = contactNum.value.trim();
  
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

  }else if(contactNumVal === '' || contactNumVal.length === 0){
	contactNumErr.style.display = 'none';
	contactNum.classList.remove('redBox');
	
  }else{
	contactNumErr.style.display = 'flex';
	contactNum.classList.add('redBox');
	contactNumErr.innerText = 'Invalid';
	return false;
  }
}

//Email address validation
let email = document.getElementById('Usersemail');

email.oninput =	function (){
	emailValidator();
}

function emailValidator(){
	let emailVal = email.value.trim();

	let threeDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let oneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let twoDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	
	let threeDotFormat = threeDot.test(emailVal);
	let oneDotFormat = oneDot.test(emailVal);
	let twoDotFormat = twoDot.test(emailVal);
	
	let emailFormats = threeDotFormat || twoDotFormat || oneDotFormat;
	let mailErr = document.getElementById('mailErr');
	
	if(emailVal === '' || emailVal.length === 0 || emailVal === undefined || emailVal === null){
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

//Select field validation
let messageToSeller = document.getElementById('subject');
	
messageToSeller.oninput = function(){
	messageToSellerValidator();
}
	
function messageToSellerValidator(){
	let messageToSellerVal = messageToSeller.value.trim();
	let	messageToSellerErr = document.getElementById('subject-Err');
	
	if(messageToSellerVal === '' || messageToSellerVal.length === 0 ||messageToSellerVal === undefined || messageToSellerVal === null){
		messageToSellerErr.style.display = 'flex';
		messageToSeller.classList.add('Message-redBox');
		messageToSellerErr.innerText = 'Required';
		return false;

	}else{
		messageToSellerErr.style.display = 'none';
		messageToSeller.classList.remove('Message-redBox');
	}
}

//Submit validation
let submitBtn = document.getElementById('submitFormInfo');

submitBtn.onclick = function(){
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
	}
}