/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../api/users/model');

const SECRET = process.env.SECRET;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return (null, {
              id: user._id,
              name: user.name,
              email: user.email,
            });
          }
          return done(null, false);
        }).catch((err) => console.log(err));
    }),
  );
};
