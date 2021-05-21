const express = require('express');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const homePage = require('./home-page');
const contactUs = require('./contact-us');
const resetPassword = require('./reset-password');
const forgotPassword = require('./forget-password');
const messageRemover = require('./msg-remover');
const myMessages = require('./my-messages');
const buyersMessage = require('./return-url');
const adUpdater = require('./edit-ad-post.js');
const adEditer = require('./edit-ad.js');
const removeAd = require('./ad-remover');
const usersAds = require('./my-ads');
const token_Error = require('./token-error');
const regFailure = require('./registration_failure');
const viewAdDetails = require('./view-ad');
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

//module functions
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
const { viewAd, /*clicked*/ } = viewAdDetails;
const { homePageAds } = homePage;
const { registeration_failure } = regFailure;
const { tokenErr } = token_Error;
const { my_Ads } = usersAds;
const { adRemover } = removeAd;
const { edit_ad } = adEditer;
const { updateUsersAds } = adUpdater;
const { messageOfInterest } = buyersMessage;
const { my_Messages } = myMessages;
const { msgRemover } = messageRemover;
const { forgot_password, forgot_password_post, forgot_password_confirm, forgot_password_failuer } = forgotPassword;
const { reset_password_post, reset_password_get, reset_password_confirmation, reset_password_token_failure, reset_password_not_found } = resetPassword;
const { contact_us_get, contact_us_post, contact_us_success, contact_us_failure } = contactUs;
//module functions

const jsonFilePath = path.join(__dirname, 'registrationData.json');
const dotenv = require('dotenv');

app.use(express.static(path.join(dirname, 'Home')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname, 'Registration')));
app.use(express.static(path.join(dirname, 'Account-verification')));
app.use(express.static(path.join(dirname, 'register-outcome')));
app.use(express.static(path.join(dirname, 'Dashboard')));
app.use(express.static(path.join(dirname, 'Dashboard', 'Profile')));
app.use(express.static(path.join(dirname, 'Dashboard', 'My-Ads')));
app.use(express.static(path.join(dirname, 'Dashboard', 'My-Messages')));
app.use(express.static(path.join(dirname, 'Forgot-Password')));
app.use(express.static(path.join(dirname, 'reset-password')));
app.use(express.static(path.join(dirname, 'Post-Ad-page')));
app.use(express.static(path.join(dirname, 'Textbook-info')));
app.use(express.static(path.join(dirname, 'About-Us')));
app.use(express.static(path.join(dirname, 'Advertisment-Board')));
app.use(express.static(path.join(dirname, 'register-outcome')));
app.use(express.static(path.join(dirname, 'Contact')));
app.use(express.static(path.join(dirname, 'Login')));
app.use(express.static(path.join(dirname, 'Privacy-Policy')));
app.use(express.static(path.join(dirname, 'Terms-of-Use')));
app.use(express.static(path.join(dirname, 'registration-failure')));
app.use(express.static(path.join(dirname, 'imageUploads')));
app.use(cookieParser());
dotenv.config({path: path.join(__dirname, '.env')});
app.use(express.static(dirname));
app.set('view engine', 'ejs');

app.get('/', checkCurrentUser, homePageAds);


//Search Results
app.get('/Ad-board', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/latest-Ads/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/price-low-to-high/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/price-high-to-low/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery/latest-Ads', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery/price-low-to-high', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery/price-high-to-low', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/latest-Ads', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-low-to-high', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-high-to-low', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/latest-Ads/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-low-to-high/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/price-high-to-low/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery/latest-Ads/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery/price-low-to-high/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/category/:searchQuery/price-high-to-low/:pageQuery', checkCurrentUser, displayAds);

app.get('/Ad-board/:searchQuery/:pageQuery', checkCurrentUser, displayAds);

app.post('/return-url?', messageOfInterest);
//Search Results

//View-ad
app.get('/view-ad/:id', checkCurrentUser, viewAd);

// app.get('/clicked/:id', checkCurrentUser, clicked);
//View-ad

//About-Us
app.get('/About-Us', checkCurrentUser, (req, res) => {
	res.status(200).render('About-Us');
});
//About-Us

//Contact-Us
app.get('/contact-us', checkCurrentUser, contact_us_get);

app.post('/contact-us', checkCurrentUser, contact_us_post);

app.get('/contact-us-success', checkCurrentUser, contact_us_success);

app.get('/contact-us-failure', checkCurrentUser, contact_us_failure);
//Contact-Us


//Registration
app.get('/register', checkCurrentUser, (req, res) => {
	res.status(200).render('registerGet');
});

app.post('/register', checkCurrentUser, Register);

app.get('/register-success', checkCurrentUser, (req, res) => {	
	res.status(200).render('register-success');
});

app.get('/registeration-failure', checkCurrentUser, (req, res) => {
	res.status(200).render('registration_failure')
});

app.post('/registeration-failure', checkCurrentUser, registeration_failure);
//Registration


app.get('/email-verification/:token', token_verifier);

app.get('/verify-account-success', checkCurrentUser, (req, res) => {
	res.status(200).render('verfication-success');
});

//token-err handler
app.get('/token-error', checkCurrentUser, (req, res) => {
	res.status(200).render('token-error');
});

app.post('/token-error', checkCurrentUser, tokenErr);

app.get('/token-not-found', checkCurrentUser, (req, res) => {
	res.status(200).render('token-not-found');
});
//token-err handler

//Login
app.get('/login', requireLoginAuth, checkCurrentUser, (req, res) => {
	let emailMatcher, auth, verifiedCheck;
	emailMatcher = true;
	auth = true;
	verifiedCheck = true;
	res.status(200).render('login', { emailMatcher, auth, verifiedCheck } );
});

app.post('/login', requireLoginAuth, checkCurrentUser, Login);

app.get('/logout', requireAuth, checkCurrentUser, logout);
//Login

//Forget-Password

app.get('/forgot-password', checkCurrentUser, forgot_password);

app.post('/forgot-password', checkCurrentUser, forgot_password_post);

app.get('/forgot-password-confirmation', checkCurrentUser, forgot_password_confirm);

app.get('/forgot-password-failure', checkCurrentUser, forgot_password_failuer);

app.get('/reset-password/:usersToken', checkCurrentUser, reset_password_get);

app.post('/reset-password/:usersToken', checkCurrentUser, reset_password_post);

app.get('/reset-password-confirmation', checkCurrentUser, reset_password_confirmation);

app.get('/reset-password-token-failure', checkCurrentUser, reset_password_token_failure);

app.get('/email-not-found', checkCurrentUser, reset_password_not_found);

//Forget-Password


//Dashboard
app.get('/Dashboard', requireAuth, checkCurrentUser, (req, res) => {
	res.status(200).render('dashboard');
});

app.get('/Profile', requireAuth, checkCurrentUser, getProfileUpdate);

app.post('/Profile', requireAuth, checkCurrentUser, profileUpdater);

app.post('/password', requireAuth, checkCurrentUser, passwordUpdater);

app.get('/my-ads', requireAuth, checkCurrentUser, my_Ads);

app.get('/edit-ad/:id', requireAuth, checkCurrentUser, edit_ad);

app.post('/edit-ad/:id', requireAuth, checkCurrentUser, updateUsersAds);

app.post('/delete/:id', adRemover);

app.post('/delete-message/:id', msgRemover);

app.get('/my-messages', requireAuth, checkCurrentUser, my_Messages);
//Dashboard

//Place-Advert
app.get('/place-advert', checkCurrentUser, (req, res) => {
	res.status(200).render('place-advert', { res, req });
});

app.post('/place-advert', requireAuth, checkCurrentUser, placeAdvert);

app.get('/place-advert-success', checkCurrentUser, (req, res) => {
	res.status(200).render('place-advert-success');
});
//Place-Advert

app.get('/enable-js', checkCurrentUser, (req, res) => {
	res.status(200).render('enable-js');
});

app.get('/privacy-policy', checkCurrentUser, (req, res) => {
	res.status(200).render('privacy-policy');
});

app.get('/terms-of-use', checkCurrentUser, (req, res) => {
	res.status(200).render('terms-of-use');
});

const PORT = process.env.PORT || 8500;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
	app.listen(PORT, () => {
		console.log(`Live At ${process.env.PORT}`);
	});
}).catch((err) => {
	console.log(err);
});