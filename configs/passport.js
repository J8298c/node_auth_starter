const mongoose = require('mongoose');
const passport = require('passport');
const Localstrategy = require('passport-local');

const User = require('../users/model');

passport.use(new Localstrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { error: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));
