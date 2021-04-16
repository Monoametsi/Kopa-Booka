const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

	_id: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	},
	isVerified: {
		type: Boolean,
		required: true
	},
	Name: {
		type: String,
		required: false
	},
	Surname: {
		type: String,
		required: false
	},
	Tel: {
		type: String,
		required: false
	},
	Campus: {
		type: String,
		required: false
	},
	My_Ads: {
		type: Array,
		required: false
	},
	Ad_Messages: {
		type: Array,
		required: false
	}

});

const Users = mongoose.model('Users', userSchema); 

module.exports = { Users };