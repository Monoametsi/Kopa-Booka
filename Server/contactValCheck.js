let phoneNumFormats = {
   zeroSixZeroFormat : /^[0]{1}[6]{1}[0]{1}[3-9]{1}[0-9]{6}$/,
   zeroSixOneFormat : /^[0]{1}[6]{1}[1]{1}[0-9]{1}[0-9]{6}$/,
   zeroSixTwoFormat : /^[0]{1}[6]{1}[2]{1}[0-9]{1}[0-9]{6}$/,
   zeroSixThreeFormat : /^[0]{1}[6]{1}[3]{1}[0-7]{1}[0-9]{6}$/,
   zeroSixFourFormat : /^[0]{1}[6]{1}[4]{1}[0-9]{1}[0-9]{6}$/,
   zeroSixFiveFormat : /^[0]{1}[6]{1}[5]{1}[0-9]{1}[0-9]{6}$/,
   zeroSixSixFormat : /^[0]{1}[6]{1}[6]{1}[0-5]{1}[0-9]{6}$/,
   zeroSixSevenFormat : /^[0]{1}[6]{1}[7]{1}[0-9]{1}[0-9]{6}$/,
   zeroSixEightFormat : /^[0]{1}[6]{1}[8]{1}[0-5]{1}[0-9]{6}$/,
   zeroSevenFormat : /^[0]{1}[7]{1}[1-34-68-9]{1}[0-9]{7}$/,
   zeroEightFormat : /^[0]{1}[8]{1}[1-4]{1}[0-9]{7}$/
}

let telNumFormats = {
   telZeroOne : /^[0]{1}[1]{1}[0-8]{1}[0-9]{7}$/,
   telZeroTwo  : /^[0]{1}[2]{1}[1-37-8]{1}[0-9]{7}$/,
   telZeroThree  : /^[0]{1}[3]{1}[1-69]{1}[0-9]{7}$/,
   telZeroFour  : /^[0]{1}[4]{1}[0-9]{1}[0-9]{7}$/,
   telZeroFive  : /^[0]{1}[5]{1}[1-46-8]{1}[0-9]{7}$/
}

module.exports = { phoneNumFormats, telNumFormats };