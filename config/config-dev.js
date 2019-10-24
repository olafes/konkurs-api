'use strict';
module.exports = {
  port: 8080,
  sessionSecret: process.env.SESSION_SECRET,
  saltRounds: 10,
  MongoURI: 'mongodb://localhost:27017/konkurs',
  google: {
    clientID: '490869806290-17bk9lor8fcb091vni1kvanqqjh6o3up.apps.googleusercontent.com'
  }
};
