const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

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

let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: 'pt.projects.submission@gmail.com',
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		refreshToken: REFRESH_TOKEN,
		accessToken: accessToken(),
	}
});

var success = true;

const emailPwdResetLink = async (email,ress) => {

	let reset_password_token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '3d'
	});

	let resetPwdLink = `${ process.env.CLIENT_URL }/reset-password/${ reset_password_token }`;

	let emailMessage = `<p>Hi there,</p> <p>You recently requested a password reset.</p> 
	<p>Please <a href="${ resetPwdLink }" style="color: rgba(0,0,250,1);">click here</a> to reset your password.</p><br>
	<b>The Kopa Booka Team</b><br>
	Copyright @ Kopa Booka, All rights reserved.`

	let mailInfo = {
		from: 'pt.projects.submission@gmail.com',
		to: email,
		subject: 'Reset your password',
		html: emailMessage
	}

	let sendResetLink =  new Promise((resolve, reject) => {
		transporter.sendMail(mailInfo, (err, successMsg) => {
			if(err){
				success = false;
				reject(success);
				console.log(`Error: ${ err }`);
				return success;
			}else{
				success = true;
				resolve(success);
				console.log(`Sucesss: ${ successMsg.response }`);
				return success;
			}
			transporter.close();
		});
	});

	sendResetLink.then((result) => {
		console.log(`Result: ${ result }`);
		if(result === true){
			return ress.redirect('/forgot-password-confirmation');
		}
	}).catch((err) => {
		console.log(err);
		if(err === false){
			return ress.redirect('/forgot-password-failure');
		}
	})

}

module.exports = {
	emailPwdResetLink
}