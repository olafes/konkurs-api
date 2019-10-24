'use strict';
const messages = require('../config/messages.js');
const router = require('express').Router();
const controller = require('../controllers/quest.js');

module.exports = passport => {
  const logged = (req, res, next) => {
    if (!req.user)
      return res.status(200).json({ success: false, message: messages.user.youAreNotLoggedIn });
    next();
  }

  router.get('/', controller.getQuests);
  router.post('/', controller.createQuest);
  return router;
}
