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

let success = true;

const emailPwdResetLink = async (email) => {
	
	let reset_password_token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '3d'
	});
	
	let resetPwdLink = `${ process.env.CLIENT_URL }/reset-password/${ reset_password_token }`;
	
	let emailMessage = `<p>Hi there,<br> You recently requested a password reset.<br> 
	Please <a href="/reset-password/${ resetPwdLink }">click here</a> to reset your password.<br></p><br><br>
	The Kopa Booka Team<br>
	Copyright @ Kopa Booka, All rights reserved.`
	
	let mailInfo = {
		from: 'pt.projects.submission@gmail.com',
		to: email,
		subject: 'Reset your password',
		html: emailMessage
	}

	await transporter.sendMail(mailInfo, (err, success) => {
		if(err){
			success = false;
			console.log(`Error: ${ err }`);
		}else{
			success = true;
			console.log(`Sucesss: ${ success }`);
		}
	})

	// if(success === true){
		// return res.redirect();
	// }else{
		// return res.redirect();
	// }

}

module.exports = {
	emailPwdResetLink
}