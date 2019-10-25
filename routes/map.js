'use strict';
const messages = require('../config/messages.js');
const router = require('express').Router();
const controller = require('../controllers/map.js');

module.exports = passport => {
  const logged = (req, res, next) => {
    if (!req.user)
      return res.status(200).json({ success: false, message: messages.user.youAreNotLoggedIn });
    next();
  }

// console.log('controller', controller);

  router.get('/', controller.getMarkers);
  router.post('/', controller.createMarkers);
  router.delete('/', controller.deleteMarker);
  return router;
}
