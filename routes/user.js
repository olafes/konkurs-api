'use strict';
const messages = require('../config/messages.js');
const { check } = require('express-validator');
const router = require('express').Router();
const controller = require('../controllers/user.js');
const User = require('../models/User.js');

module.exports = passport => {
  const logged = (req, res, next) => {
    if (!req.user)
      return res.status(200).json({ success: false, message: messages.user.youAreNotLoggedIn });
    next();
  }
  const notLogged = (req, res, next) => {
    if (req.user)
      return res.status(200).json({ success: false, message: messages.user.youAreAlreadyLogged });
    next();
  }

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false });
      }
      if (!user)
        return res.status(200).send({ success: false, message: messages.user.emailOrPasswordInvalid });
      req.login(user, err => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false });
        }
        next();
      });
    })(req, res, next);
  }, controller.login);
  router.post('/register', notLogged, [
    check('email').isEmail()
    .withMessage(messages.user.notValidEmail),
    check('password').isLength({ min: 6 })
    .withMessage(messages.user.passwordLength),
    check('nickname').isLength({ min: 3, max: 32})
    .withMessage(messages.user.nicknameLength)
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(messages.user.nicknameFormat)
  ], controller.register);
  router.post('/logout', controller.logout);
  router.post('/oauth/google', notLogged, controller.oauth.google);
  router.get('/profile', logged, controller.profile);
  return router;
}
