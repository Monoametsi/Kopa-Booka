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
	}

});

const Users = mongoose.model('Users', userSchema); 

module.exports = { Users };