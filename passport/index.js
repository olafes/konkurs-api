'use strict';
const bcrypt = require('bcrypt');
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const messages = require('../config/messages.js');
const User = require('../models/User.js');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
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
      console.log('??', { email });
      console.log('??', user);
      if (!user || !user.authentication.local.enabled) {
        console.log('huj');
        return done(null, false, { success: false, message: messages.user.emailOrPasswordInvalid });
      }
      const match = await bcrypt.compare(password, user.authentication.local.password);
      if (match)
        return done(null, user);
      return done(null, false, { success: false, message: messages.user.emailOrPasswordInvalid });
    } catch (err) {
      return done(err);
    }
  }));
};
