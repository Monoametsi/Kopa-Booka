const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const user = require('./mongo_db');
const { Users } = user;

let forgot_password = (req, res) => {
	res.render('forget-password');
}



module.exports = {
	forgot_password 
}