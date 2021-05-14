const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const user = require('./mongo_db');
const { Users } = user;

let msgRemover = (req, res) => {
	let token = req.cookies.token;

	let { id } = req.params;

	let deletedBulk = id.split(',');
	
	if(token){

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				res.redirect('/');
			}else{
				
				let { email } = decodedToken;
				
				let msgDeleter = (res) => {

					deletedBulk.map((msgId) => {
						let usersInfo = { Email: email };
						let msgInfo = { msgId: msgId };
						let removedMsg = { $pull: { Ad_Messages: msgInfo } };

						Users.updateOne(usersInfo, removedMsg, (err, res) => {
							if(err) throw console.log(err);
							console.log('Message has been Deleted!!!');
						});

					})
				}

				await msgDeleter();
			}
		});

	}else{
		res.redirect('/');
	}

}

module.exports = {
	msgRemover
}