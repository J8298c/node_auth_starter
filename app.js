// eslint-disable-next-line global-require
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./configs/passport');

app.listen(process.env.PORT, () => console.log(`app is listening on port: ${process.env.PORT}`));
