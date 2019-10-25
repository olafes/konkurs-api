'use strict';
const config = require(`../config/config-${process.env.NODE_ENV}.js`);
const messages = require('../config/messages.js');
const Marker = require('../models/Marker.js');

module.exports = {
  getMarkers: async (req, res, next) => {
    try {
      const markers = [];
      for (const marker of (await Marker.find())) {
        markers.push({
          id: marker._id,
          type: marker.type,
          latitude: marker.latitude,
          longitude: marker.longitude,
          addedBy: marker.addedBy,
          addedDate: marker.addedDate
        });
      }
      res.status(200).json({
        success: true,
        markers: markers
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  },
  createMarkers : async (req, res, next) => {
    try {
      if (Array.isArray(req.body)) {
        for (const marker of req.body) {
          await (new Marker({
            type: marker.type,
            latitude: marker.latitude,
            longitude: marker.longitude,
            addedBy: marker.addedBy
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
  },
  deleteMarker : async (req, res, next) => {
    try {
      await Marker.deleteOne({ _id: req.params.id });
      res.status(200).json({
        success: true
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  }
}
