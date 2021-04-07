const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));
const fs = require('fs');
const uuid = require('uuid');
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const { Advertisements } = ads;
const { Users } = user;

let placeAdvert = async (req, res) => {
	let form = new formidable.IncomingForm({ multiples: true });

	await form.parse(req, async (err, fields, files) => {
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
		console.log(files.uploaded.length === undefined);
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

		/*
		
		let firstImgPath = dirname + '\\imageUploads\\' + imgInput;
		
		if(imgInput){
			for(i = 0; i < UploadedImages.length; i++){
				if(UploadedImages[i] === firstImgPath){
					UploadedImages.splice(i, 1);
					UploadedImages.unshift(firstImgPath);
				}
			}
		}*/

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
			UploadedImages 
		});

		await adverts.save().catch((err) => {
				//console.log(err);
			});

	});

	return res.redirect('/place-advert-success');
}

/*form.on('fileBegin', (name, file) => {
	file.path = dirname + '/imageUploads/' + file.name;
});

form.on('file', (name, file) => {
	console.log('Uploaded ' + file.name);
});*/

module.exports = { placeAdvert }