const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  nickname: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('User', UserSchema);
