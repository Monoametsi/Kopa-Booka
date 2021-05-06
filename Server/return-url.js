const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const user = require('./mongo_db');
const { Users } = user;

let messageOfInterest = async (req, res) => {
	let formData = req.body;
	
	let {
	  firstname,
	  tel,
	  email,
	  Post_Id,
	  subject 
	} = formData;
	
	let findIndex = (ads) => {
		return ads._id === Post_Id;
	}
	
	let userInput = {
	  firstname,
	  tel,
	  email,
	  Post_Id,
	  subject,
	  date_created: new Date()
	}

	await Users.find().then((result) => {

		result.map((userData) => {

			let adPosition = userData.My_Ads.filter(findIndex);

				adPosition.map( async (map) => { 
					let num = userData.My_Ads.indexOf(map);

					if(userData.My_Ads[num]._id === Post_Id){
						console.log(userData.Email);

						let updateUsersMessages = (res) => {
							let usersInfo = { Email: userData.Email };
							let buyersMessage = { $push: { Ad_Messages: userInput } }
							
							Users.updateOne(usersInfo, buyersMessage, (err, res) => {
								if(err) throw err;
							})
						}

						await updateUsersMessages();
					}
				});
		});
		
	}).catch((err) => {
		console.log(err);
	});

	for(formUrl in req.query){
		res.redirect(`/${ formUrl }`);
	}
}

module.exports = {
	messageOfInterest
}