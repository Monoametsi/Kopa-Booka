const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
//https://t.co/dRW7cCihOu?amp=1
dotenv.config({path:path.join(__dirname, '.env')});

const CLIENT_ID = process.env.CLIENT_ID.toString();
const CLIENT_SECRET = process.env.CLIENT_SECRET.toString();
const REDIRECT_URL = process.env.REDIRECT_URL.toString();
const REFRESH_TOKEN = process.env.REFRESH_TOKEN.toString();

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

let accessToken = async () => {
	const accessToken = await oAuth2Client.getAccessToken();
	return accessToken;
}

/*
let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: 'pt.projects.submission@gmail.com',
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		refreshToken: REFRESH_TOKEN,
		accessToken: accessToken()
	}
});
*/

let success = true;

const mailDeliverer = async (email, ress) => {

	let token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '3d'
	});

	let mailUrl = `${process.env.CLIENT_URL}/email-verification/${token}`;

	let mailOptions = {
		from: 'pt.projects.submission@gmail.com',
		to: email,
		subject: 'Please verify your email address',
		html: `<p>Hi</p> <p>You have successfully created your Kopa Booka account.</p> 
		<p>Your email has not been verified yet. Please do so by clicking on the link bellow:</p>
		<p><a href="${mailUrl}" target="_blank">Verify your email address</a></p>
		<p>After you have verified your email address you will be able to log in and use your Kopa Booka account.<p>
		<b>The Kopa Booka team</b>
		<i>Copyright © Kopa Booka, All rights reserved.</i>`
	}

	let sendMailPromise = new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, content) => {
			if(err){
				success = false;
				reject('Failed');
				console.log(`Failed: ${err}`);
			}else{
				success = true;
				resolve('Success');
				console.log(`Success: ${content.response}`);
			}
			transporter.close();
		});
	});

	sendMailPromise.then(() => {
		if(success === true){
			console.log('Sent');
			return ress.redirect('/register-success');
		}
	}).catch(() => {
		if(success === false){
			console.log('Not sent');
			return ress.redirect('/registeration-failure');
		}
	});
}

module.exports = { mailDeliverer }