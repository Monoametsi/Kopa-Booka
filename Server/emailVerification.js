const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
const path = require('path');

dotenv.config({path:path.join(__dirname, '.env')});

let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'pt.projects.submission@gmail.com',
		pass: 'MostAmaz1ng'
	}
});

let success = true;

const mailDeliverer = (email, ress) => {
	let token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);

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
			ress.redirect('/register-success');
		}
	}).catch(() => {
		if(success === false){
			console.log('Not sent');
		}
	});
}

module.exports = { mailDeliverer }