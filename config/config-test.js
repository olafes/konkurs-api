'use strict';
module.exports = {
  port: 8080,
  sessionSecret: process.env.SESSION_SECRET,
  saltRounds: 10,
  MongoURI: 'mongodb://localhost:27017/test-konkurs'
};
