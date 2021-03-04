const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const app = express();
const crypto = require('crypto');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://Book-Advertisers:1234Mose@cluster0.f8oit.mongodb.net/Book-Advertisers?retryWrites=true&w=majority';
const user = require('./mongo_db');
const { Users } = user;
const jsonFilePath = path.join(__dirname, 'registrationData.json');

app.use(express.json());

dotenv.config({path:path.join(__dirname, '.env')});

let verifyToken = (req, res, next) => {
	req.headers['authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4NDU2MTAxZSIsIkVtYWlsIjoiMjE2MDI2NjMzQHN0dWRlbnQudWouYWMuemEiLCJQYXNzd29yZCI6IiQyYSQxMCRwRThZTnU3MHJSNzI0QzN5YjRxQ1NPemJxSWVadjh2YWdqN2w2dXdnMUx0ZkdjMko1OXFudSIsImlzVmVyaWZpZWQiOnRydWUsIl9fdiI6MCwiaWF0IjoxNjE0MzgyMTQzfQ.qey6uSw7v7QCm0hWS_T7JEvVX1JZVpUG9874F9Jq0M0';
	const header = req.headers['authorization'];
	
	let reqToken = header;
	//console.log(reqToken);
	//if(typeof header == 'undefined' ){
	if(reqToken != null || reqToken != 'undefined'){

		jwt.verify(reqToken, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
			if(err){
				res.sendStatus(403);
			} else {
				req.result = result;
				//console.log(req.result);
				next();
			}
		});
	}else {
		res.sendStatus(401);
	}
}

app.get('/', async (req, res) => {
	//req.method = "POST";

	await Users.find().then((result) => {
		const token = jwt.sign(result[0].toJSON(), process.env.ACCESS_TOKEN_SECRET);
		res.json({token});

	}).catch((err) => {
		console.log(err);
	});

});

app.get('/post', verifyToken, (req, res) => {
	let result = req.result;
	res.json({result});
});

const PORT = process.env.PORT || 7500;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
	app.listen(PORT, () => {
		console.log(`Live At ${process.env.PORT}`);
	});
}).catch((err) => {
	console.log(err);
});