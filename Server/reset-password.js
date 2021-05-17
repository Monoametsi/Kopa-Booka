const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const user = require('./mongo_db');
const { Users } = user;

let reset_password = (req, res) => {
	res.render('reset-password');
}

module.exports = {
	reset_password
}