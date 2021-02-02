const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'pt.projects.submission@gmail.com',
		pass: 'MostAmaz1ng'
	}
});

let success = true;

const mailDeliverer = (email, ress) => {

	let mailOptions = {
		from: 'pt.projects.submission@gmail.com',
		to: email,
		subject: 'Please verify your email address',
		html: '<p>Hi</p> <p>You have successfully created your Kopa Booka account.</p> <p>Your email has not been verified yet. Please do so by clicking on the link bellow:</p> <p><a href="/verify-account-success">Verify your email address</a></p> After you have verified your email address you will be able to log in and use your Kopa Booka account.<br><br> <b>The Kopa Booka team</b> <br> <i>Copyright © Kopa Booka, All rights reserved.</i>'
	}

	let sendMailPromise = new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, content) => {
			if(err){
				success = false;
				reject('Failed');
				console.log('Failed' + '\n' + err);
			}else{
				success = true;
				resolve('Success');
				console.log('Success' + '\n' + content.response);
			}
			transporter.close();
		});
	});

	sendMailPromise.then(() => {
		if(success == true){
			console.log('sent');
			ress.redirect('/register-success');
		}
	}).catch(() => {
		if(success == false){
			console.log('not sent');
		}
	});
}

module.exports = {mailDeliverer}