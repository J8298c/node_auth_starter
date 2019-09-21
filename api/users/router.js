/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./model');

const router = express.Router();

router.get('/profile/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    return res.status(200).json({ message: 'julio' });
  } catch (err) {
    console.log(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && Object.keys(user).length) {
      const errorMSG = 'Email is already registered';
      return res.status(400).json({ message: errorMSG });
    }
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then((eluser) => res.status(200).json(eluser))
          .catch((saveerr) => res.status(400).json({ error: saveerr }));
      });
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const errorMessage = 'User not found';
      return res.status(400).json({ errorMessage });
    }
    bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 }, (err, token) => {
            if (err) return res.status(500).json({ error: 'Error signing token' });
            return res.status(200).json({ success: true, token: `Bearer ${token}` });
          });
        } else {
          const errorMsg = 'Pssword is incorrect';
          res.status(400).json({ error: errorMsg });
        }
      });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
