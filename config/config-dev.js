'use strict';
module.exports = {
  port: 8080,
  sessionSecret: process.env.SESSION_SECRET,
  saltRounds: 10,
  MongoURI: 'mongodb://localhost:27017/konkurs',
  google: {
    clientID: '765380157329-qkpmq9v5f32m71ca3vopi6m031s2q69u.apps.googleusercontent.com'
  }
};
