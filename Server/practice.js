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
	const header = req.headers['authorization'];

	const bearer = header.split(' ');
		
	const bearerToken = bearer[1];
	
	let reqToken = header && bearerToken;

	//if(typeof header == 'undefined' ){
	if(reqToken != null ){

		req.token = bearerToken;
			
		jwt.verify(reqToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
			if(err){
				res.sendStatus(403);
			} else {
				result[0] = data;
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
	//req.method = 'POST';
	res.json({token});
	
});

console.log(process.env.PORT);

const PORT = process.env.PORT || 7500;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
	app.listen(PORT, () => {
		console.log('WE LIVE!!!!!');
	});
}).catch((err) => {
	console.log(err);
});