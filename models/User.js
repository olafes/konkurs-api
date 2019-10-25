'use strict';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  authentication: {
    local: {
      enabled: {
        type: Boolean,
        default: false
      },
      password: {
        type: String
      }
    },
    google: {
      enabled: {
        type: Boolean,
        default: false
      },
      sub: {
        type: String
      }
    }
  },
  email: {
    type: String
  },
  nickname: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
