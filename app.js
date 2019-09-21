/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line global-require
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const userRouter = require('./api/users/router');

const app = express();

require('./config/passport.config')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

/**
 * server logger for dev mode
 */
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    if (req.body) console.info(req.body, 'the rquest body');
    if (req.params) console.info(req.params, 'the req params');
    if (req.query) console.info(req.query, 'the req query');
    console.log(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
    next();
  });
}

app.use('/users', userRouter);

app.listen(process.env.PORT, () => console.log(`app is listening on port: ${process.env.PORT}`));
