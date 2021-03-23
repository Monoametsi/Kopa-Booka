let titleSelectValidator = (name, surname, listVal) => {	

	if(name === '' || name === undefined || name === null || surname === '' || surname === undefined || surname === null || listVal === 'select campus'){
		return false;

	}else{
		return true;
	}
}

let contactNumValidator = (contactNumVal) => {

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
	return true;
	
  }else if(contactNumVal === '' || contactNumVal === undefined || contactNumVal === null){
	return false;
	
  }else{
	return false;
  }
}

module.exports = { titleSelectValidator, contactNumValidator };