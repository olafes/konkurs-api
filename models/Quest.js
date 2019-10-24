const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  description: {
    type: String
  },
  points: {
    type: Number
  }
});

module.exports = mongoose.model('Quest', QuestSchema);
