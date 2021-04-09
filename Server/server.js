const express = require('express');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const login = require('./login');
const placeAd = require('./place-advert');
const adDisplay = require('./book-ad');
const profileUpdate = require('./profile-update');
const passwordUpdate = require('./password-update');
const authMiddleWare = require('./authMiddleWare');
const tokenVerifier = require('./token-verification');
const registration = require('./registration');
const validator = require('./validator');
const emailVerification = require('./emailVerification');
const path = require('path');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const mongoUrl = process.env.Database.toString();
const dirname = __dirname.slice(0, __dirname.search(/SERVER/i) - 1);
const { passwordEmailValidation } = validator;
const { mailDeliverer } = emailVerification;
const user = require('./mongo_db');
const { Users } = user;
const { profileUpdater, getProfileUpdate } = profileUpdate;
const { placeAdvert, jsEnabledCheck } = placeAd;
const { Login, requireLoginAuth, logout, checkCurrentUser } = login;
const { passwordUpdater } = passwordUpdate;
const { requireAuth } = authMiddleWare;
const { token_verifier } = tokenVerifier;
const { Register } = registration;
const { displayAds } = adDisplay;
const jsonFilePath = path.join(__dirname, 'registrationData.json');
const dotenv = require('dotenv');

app.use(express.static(path.join(dirname, 'Home')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname, 'Registration')));
app.use(express.static(path.join(dirname, 'Account-verification')));
app.use(express.static(path.join(dirname, 'register-outcome')));
app.use(express.static(path.join(dirname, 'Dashboard')));
app.use(express.static(path.join(dirname, 'Dashboard', 'Profile')));
app.use(express.static(path.join(dirname, 'Post-Ad-page')));
app.use(express.static(path.join(dirname, 'About-Us')));
app.use(express.static(path.join(dirname, 'Advertisment-Board')));
app.use(express.static(path.join(dirname, 'register-outcome')));
app.use(express.static(path.join(dirname, 'Contact')));
app.use(express.static(path.join(dirname, 'Login')));
app.use(express.static(path.join(dirname, 'imageUploads')));
app.use(cookieParser());
dotenv.config({path: path.join(__dirname, '.env')});
app.use(express.static(dirname));
app.set('view engine', 'ejs');

console.log(path.join(dirname, 'Home'));

app.get('/', checkCurrentUser, (req, res) => {
	res.status(200).render('index');
});

app.get('/Ad-board', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/latest-Ads/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/price-low-to-high/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/price-high-to-low/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/latest-Ads', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-low-to-high', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-high-to-low', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/latest-Ads/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-low-to-high/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-high-to-low/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/:pageQuery', checkCurrentUser, displayAds);

app.get('/About-Us', checkCurrentUser, (req, res) => {
	res.status(200).render('About-Us');
});

app.get('/contact-us', checkCurrentUser, (req, res) => {
	res.status(200).render('contact-us');
});

app.get('/register', checkCurrentUser, (req, res) => {
	res.status(200).render('registerGet');
});

app.post('/register', checkCurrentUser, Register);

app.get('/register-success', checkCurrentUser, (req, res) => {	
	res.status(200).render('register-success');
});

app.get('/email-verification/:token', token_verifier);

app.get('/verify-account-success', checkCurrentUser, (req, res) => {
	res.status(200).render('verfication-success');
});

app.get('/login', requireLoginAuth, checkCurrentUser, (req, res) => {
	let emailMatcher, auth, verifiedCheck;
	emailMatcher = true;
	auth = true;
	verifiedCheck = true;
	res.status(200).render('login', { emailMatcher, auth, verifiedCheck } );
});

app.post('/login', requireLoginAuth, checkCurrentUser, Login);

app.get('/logout', requireAuth, checkCurrentUser, logout);

app.get('/Dashboard', requireAuth, checkCurrentUser, (req, res) => {
	res.status(200).render('dashboard');
});

app.get('/Profile', requireAuth, checkCurrentUser, getProfileUpdate);

app.post('/Profile', requireAuth, checkCurrentUser, profileUpdater);

app.post('/password', requireAuth, checkCurrentUser, passwordUpdater);

app.get('/place-advert', checkCurrentUser, (req, res) => {
	res.status(200).render('place-advert', { res, req });
});

app.post('/place-advert', requireAuth, checkCurrentUser, placeAdvert);

app.get('/place-advert-success', checkCurrentUser, (req, res) => {
	res.status(200).render('place-advert-success');
});

app.get('/enable-js', checkCurrentUser, (req, res) => {
	res.status(200).render('enable-js');
});

const PORT = process.env.PORT || 8500;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
	app.listen(PORT, () => {
		console.log(`Live At ${process.env.PORT}`);
	});
}).catch((err) => {
	console.log(err);
});