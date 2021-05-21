const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/SERVER/i) - 1);
const fs = require('fs');
const uuid = require('uuid');
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const { Users } = user;

let placeAdvert = async (req, res) => {

	let token = req.cookies.token;

	let form = new formidable.IncomingForm({ multiples: true });

	console.log(form);

	form.parse(req, async (err, fields, files) => {
		var UploadedImages = [];

		let formData = fields;

		let {
			name, 
			mail, 
			tel, 
			Whatsapptel,
			chooseCats, 
			chooseSubCat,
			TexBookTitle, 
			EditionNum, 
			AuthorName, 
			condition, 
			TextbookPrice, 
			negotiation, 
			Description, 
			campus 
		} = formData;

		let UserId = uuid.v4().slice(0, uuid.v4().search("-"));

		if(files.uploaded.length === undefined){
			let oldPath = files.uploaded.path;
			let newPath = dirname + '\\imageUploads\\' + files.uploaded.name;
			fs.rename(oldPath, newPath, (err) => {
				if (err) throw err;
			});

			UploadedImages.push(newPath);
	
		}else if(files.uploaded.length >= 1){
			for(var i = 0; i < files.uploaded.length; i++){
				let oldPath = files.uploaded[i].path;
				let newPath = dirname + '\\imageUploads\\' + files.uploaded[i].name;
				fs.rename(oldPath, newPath, (err) => {
					if (err) throw err;
				});

				UploadedImages.push(newPath);

			}
		}
		
		for(imgName in fields){
			if(imgName.search('First_') !== -1){
				let firstImg = imgName.slice(imgName.search('-') + 1, imgName.length);
				let firstImgPath = `${ dirname }\\imageUploads\\${ firstImg }`;

				for(i = 0; i < UploadedImages.length; i++){
					if(UploadedImages[i] === firstImgPath){
						UploadedImages.splice(i, 1);
						UploadedImages.unshift(firstImgPath);
					}
				}
			}
		}
		
		

		const adverts = await new Advertisements({
			_id: UserId,
			Name: name,
			Mail: mail,
			Tel: tel,
			Whatsapp_tel: Whatsapptel,
			Main_Category: chooseCats,
			Sub_Category: chooseSubCat,
			Text_Book_Title: TexBookTitle,
			Edition_Number: EditionNum,
			Author_Name: AuthorName,
			Condition: condition,
			Text_Book_Price: TextbookPrice,
			Negotiation: negotiation,
			Description,
			Campus: campus,
			Viewed_Count: [],
			Date_Created: new Date(),
			Date_Updated: "",
			UploadedImages 
		});

		await adverts.save().catch((err) => {
			console.log(err);
		});

		if(token){
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
				if(err){
					return res.status(400).json({ err })
				}else{

					let { email } = decodedToken;

					let users_ad = {
						_id: UserId,
						Name: name,
						Mail: mail,
						Tel: tel,
						Whatsapp_tel: Whatsapptel,
						Main_Category: chooseCats,
						Sub_Category: chooseSubCat,
						Text_Book_Title: TexBookTitle,
						Edition_Number: EditionNum,
						Author_Name: AuthorName,
						Condition: condition,
						Text_Book_Price: TextbookPrice,
						Negotiation: negotiation,
						Description,
						Campus: campus,
						Viewed_Count: [],
						Date_Created: new Date(),
						Date_Updated: "",
						UploadedImages
					}

					let updateUserAds = (email, res) => {
						let myquery = { Email: email };
						let newvalues = { $push: { My_Ads: users_ad } };

						Users.updateOne(myquery, newvalues, (err, res) => {
							if(err) throw err;
						});
					}

					await updateUserAds(email);
				}
			})
		}else{
			res.redirect('/');
		}
		
		
		return res.redirect('/place-advert-success');

	});

}

module.exports = { placeAdvert }