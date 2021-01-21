const express = require('express');
const app = express();

const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);

console.log(dirname);