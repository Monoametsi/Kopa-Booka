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

const contact_us_emailer = async (ress, name, email, contactNum, msg) => {

	let emailMessage = `<p>Name: ${ name }</p> <p>Email: ${ email }</p> <p>Contact Number: ${ contactNum }</p> <p>Subject: ${ msg }</p><br> 
	<b>The Kopa Booka Team</b><br>
	Copyright @ Kopa Booka, All rights reserved.`

	let mailInfo = {
		from: 'pt.projects.submission@gmail.com',
		to: 'pt.projects.submission@gmail.com',
		subject: 'Kopa Booka-Contact Us',
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
			return ress.redirect('/contact-us-success');
		}
	}).catch((err) => {
		console.log(err);
		if(err === false){
			return ress.redirect('/contact-us-failure');
		}
	})

}

module.exports = {
	contact_us_emailer
}