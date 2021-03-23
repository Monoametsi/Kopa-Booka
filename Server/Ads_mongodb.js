const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ads_schema = new Schema({

	_id: {
		type: String,
		required: true
	},
	Name: {
		type: String,
		required: true
	},
	Mail: {
		type: String,
		required: true
	},
	Tel: {
		type: String,
		required: true
	},
	Whatsapp_tel: {
		type: String,
		required: false
	},
	Main_Category: {
		type: String,
		required: true
	},
	Sub_Category: {
		type: String,
		required: true
	},
	Text_Book_Title: {
		type: String,
		required: true
	},
	Edition_Number: {
		type: String,
		required: true
	},
	Author_Name: {
		type: String,
		required: true
	},
	Condition: {
		type: String,
		required: true
	},
	Text_Book_Price: {
		type: String,
		required: true
	},
	Negotiation: {
		type: String,
		required: true
	},
	Description: {
		type: String,
		required: true
	},
	Campus: {
		type: String,
		required: true
	},
	UploadedImages: {
		type: Array,
		required: true
	}

});

const Advertisements = mongoose.model('Advertisements', ads_schema);

module.exports = { Advertisements };