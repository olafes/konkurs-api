const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  points: {
    type: Number
  },
  info: {
    type: String
  },
  imgPoints_id: {
    type: Number
  },
  imgTick_id: {
    type: Number
  }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
