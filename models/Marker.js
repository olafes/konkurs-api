'use strict';
const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
  type: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  addedBy: {
    type: String
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Marker', MarkerSchema);
