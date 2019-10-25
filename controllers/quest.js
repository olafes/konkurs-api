'use strict';
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const messages = require('../config/messages.js');
const Quest = require('../models/Quest.js');

module.exports = {
  getQuests: async (req, res, next) => {
    try {
      const quests = [];
      for (const quest of (await Quest.find())) {
        quests.push({
          description: quest.description,
          points: quest.points
        });
      }
      res.status(200).json({
        success: true,
        quests: quests
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  },
  createQuests : async (req, res, next) => {
    try {
      if (Array.isArray(req.body)) {
        for (const quest of req.body) {
          await (new Quest({
            description: quest.description,
            points: quest.points
          }).save());
        }
      }
      res.status(200).json({
        success: true
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  }
}
