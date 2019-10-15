'use strict';
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const passport = require('passport');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const messages = require('../config/messages.js');
const User = require('../models/User.js');
module.exports = {
  login: async (req, res, next) => {
    res.status(200).json({ message: messages.user.loginSuccessful });
  },
  register: async (req, res, next) => {
    console.log('???');
    const { email, password, nickname } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ message: messages.user.loginFailed, errors: errors.array() });
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
        method: 'local',
        email: email,
        password: hash,
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
  }
}
