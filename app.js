/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line global-require
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT, () => console.log(`app is listening on port: ${process.env.PORT}`));
