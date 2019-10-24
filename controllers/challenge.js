'use strict';
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const messages = require('../config/messages.js');
const Challenge = require('../models/Challenge.js');

module.exports = {
  // getChallenges: async (req, res, next) => {
  //   try {
  //     const challenges = await Challenge.find();
  //     res.status(200).json({
  //       success: true,
  //       challenges: challenges
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ success: false });
  //   }
  // },
  // createChallenge: async (req, res, next) => {
  //   try {
  //     const challenge
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ success: false });
  //   }
  // }
};
