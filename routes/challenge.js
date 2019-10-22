'use strict';
const messages = require('../config/messages.js');
const router = require('express').Router();
const controller = require('../controllers/challenge.js');

module.exports = passport => {
  const logged = (req, res, next) => {
    if (!req.user)
      return res.status(200).json({ success: false, message: messages.user.youAreNotLoggedIn });
    next();
  }

  // router.get('/', logged, controller.index);
  router.get('/', controller.index);
  return router;
}
