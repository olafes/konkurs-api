'use strict';
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const messages = require('../config/messages.js');
const User = require('../models/User.js');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user)
        return done(null, false, { message: messages.user.emailOrPasswordInvalid });
      const match = await bcrypt.compare(password, user.password);
      if (match)
        return done(null, user);
      return done(null, false, { message: messages.user.emailOrPasswordInvalid });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
};
