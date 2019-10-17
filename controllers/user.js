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
    res.status(200).json({ message: messages.user.loginSuccessful });
  },
  register: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ message: messages.user.loginFailed, errors: errors.array() });
    const { email, password, nickname } = req.body;
    try {
      if ((await User.findOne({ email })))
        return res.status(422).json({ message: messages.user.loginFailed, errors: [{
          "msg": messages.user.emailAlreadyInUse,
          "param": "email",
          "value": email,
          "location": "body"
        }]});
      if ((await User.findOne({ nickname })))
        return res.status(422).json({ message: messages.user.loginFailed, errors: [{
          "msg": messages.user.nicknameAlreadyInUse,
          "param": "nickname",
          "value": nickname,
          "location": "body"
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
          return res.status(500).json({});
        }
        res.status(200).json({ message: messages.user.registerSuccessful })
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({});
    }
  },
  logout: async (req, res, next) => {
    req.logout();
    res.status(200).json({ message: messages.user.logoutSuccessful });
  },
  oauth: {
    google: async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ message: messages.user.loginFailed, errors: errors.array() });
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
            email: data.email
          });
          await user.save();
        }
        req.login(user, err => {
          if (err) {
            console.log(err);
            return res.status(500).json({});
          }
          console.log(user);
          res.status(200).json({ message: messages.user.registerSuccessful })
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({});
      }
    }
  },
  profile: async (req, res, next) => {
    console.log('profile called', req.user);
    const user = req.user;
    res.status(200).json({
      email: user.email,
      nickname: user.nickname
    });
  }
}
