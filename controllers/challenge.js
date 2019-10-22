'use strict';
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const messages = require('../config/messages.js');
const Challenge = require('../models/Challenge.js');

module.exports = {
  index: async (req, res, next) => {
    try {
      const challenges = await Challenge.find();
      if (!challenges.length) {
        const chall = new Challenge({
          points: 12,
          info: "costam costam",
          imgPoints_id: 4124,
          imgTick_id: 213213
        });

        await chall.save();
      }
      console.log(challenges);

      res.status(200).json({
        success: true,
        message: "",
        challenges: challenges
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  }
}
