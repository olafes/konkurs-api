'use strict';
const messages = require('../config/messages.js');
const { check } = require('express-validator');
const router = require('express').Router();
const controller = require('../controllers/user.js');
const User = require('../models/User.js');

module.exports = passport => {
  const logged = (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: messages.user.youAreNotLoggedIn });
    next();
  }
  const notLogged = (req, res, next) => {
    if (req.user)
      return res.status(400).json({ message: messages.user.youAreAlreadyLogged });
    next();
  }

  router.post('/login', notLogged, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({});
      }
      if (!user)
        return res.status(401).send({ message: info.message });
      req.login(user, err => {
        if (err) {
          console.log(err);
          return res.status(500).json({});
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
    .matches(/^[a-z0-9_-]+$/)
    .withMessage(messages.user.nicknameFormat)
  ], controller.register);
  router.post('/logout', controller.logout);
  // router.post('/oauth/google', passport.authenticate('google'), controller.oauth.google);
  router.post('/oauth/google', notLogged, controller.oauth.google);
  router.get('/profile', logged, controller.profile);
  return router;
}
