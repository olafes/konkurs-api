'use strict';
module.exports = {
  port: 8080,
  sessionSecret: process.env.SESSION_SECRET,
  saltRounds: 10,
  MongoURI: `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0-2kr8u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  google: {
    clientID: '490869806290-17bk9lor8fcb091vni1kvanqqjh6o3up.apps.googleusercontent.com'
  }
};
