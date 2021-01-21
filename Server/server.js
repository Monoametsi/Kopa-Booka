const express = require('express');
const path = require('path');
const url = require('url');
const app = express();
const dirname = __dirname.slice(0, __dirname.search(/\\Server/i));

app.use(express.static(path.join(dirname)));

const homePath = path.join(dirname, 'Home', 'Home-HTML', 'index.html');

app.get('/', (req, res) => {
	res.sendFile(homePath);
});

const PORT = process.env.PORT || 8500;

app.listen(PORT, () => {
	console.log('WE LIVE!!!!!')
});