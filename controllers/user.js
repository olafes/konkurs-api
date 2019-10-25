'use strict';
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const passport = require('passport');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const messages = require('../config/messages.js');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(config.google.clientID)
const User = require('../models/User.js');
module.exports = {
  login: async (req, res, next) => {
    res.status(200).json({ success: true, message: messages.user.loginSuccessful });
  },
  register: async (req, res, next) => {
    const errors = validationResult(req).errors;
    console.log(errors);
    if (errors.length) {
      const errs = [];
      let nicknameError = false;
      let emailError = false;
      let passwordError = false;
      for (const err of errors) {
        if (err.param === 'nickname' && !nicknameError) {
            nicknameError = true;
            errs.push({
              param: 'nickname',
              value: err.value,
              message: err.msg
            });
          } else if (err.param === 'email' && !emailError) {
            emailError = true;
            errs.push({
              param: 'email',
              value: err.value,
              message: err.msg
            });
          } else if (err.param === 'password' && !passwordError) {
            passwordError = true;
            errs.push({
              param: 'password',
              value: err.value,
              message: err.msg
            });
          }
      }
      return res.status(200).json({ success: false, message: messages.user.regsiterFailed, errors: errs });
    }
    const { email, password, nickname } = req.body;
    try {
      if ((await User.findOne({ email })))
        return res.status(200).json({ success: false, message: messages.user.regsiterFailed, errors: [{
          "message": messages.user.emailAlreadyInUse,
          "param": "email",
          "value": email
        }]});
      if ((await User.findOne({ nickname })))
        return res.status(200).json({ success: false, message: messages.user.regsiterFailed, errors: [{
          "message": messages.user.nicknameAlreadyInUse,
          "param": "nickname",
          "value": nickname
        }]});
      const hash = await bcrypt.hash(password, config.saltRounds);
      const user = new User({
        authentication: {
          local: {
            enabled: true,
            password: hash
          }
        },
        email: email,
        nickname: nickname
      });
      await user.save();
      req.login(user, err => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false });
        }
        res.status(200).json({ success: true, message: messages.user.registerSuccessful })
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  },
  logout: async (req, res, next) => {
    req.logout();
    res.status(200).json({ success: true, message: messages.user.logoutSuccessful });
  },
  oauth: {
    google: async (req, res, next) => {
      const token = req.body.idToken;
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: token,
          audience: config.google.clientID
        });
        const data = ticket.getPayload();
        let user = await User.findOne({
          'authentication.google.enabled': true,
          'authentication.google.sub': data.sub
        });
        if (!user) {
          user = new User({
            authentication: {
              google: {
                enabled: true,
                sub: data.sub
              }
            },
            email: data.email,
            nickname: data.email.split('@')[0]
          });
          await user.save();
        }
        req.login(user, err => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false });
          }
          console.log(user);
          res.status(200).json({ success: true, message: messages.user.registerSuccessful })
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ success: false });
      }
    }
  },
  profile: async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      email: user.email,
      nickname: user.nickname
    });
  }
}
