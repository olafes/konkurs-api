'use strict';
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const messages = require('../config/messages.js');
const Quest = require('../models/Quest.js');

module.exports = {
  getQuests: async (req, res, next) => {
    try {
      const quests = await Quest.find();
      res.status(200).json({
        success: true,
        quests: quests
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  },
  createQuest : async (req, res, next) => {
    try {
      const { description, points } = req.body;
      new Quest({
        description,
        points
      }).save();
      res.status(200).json({
        success: true
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  }
}
