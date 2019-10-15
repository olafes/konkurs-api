'use strict';
module.exports = {
  port: 8080,
  sessionSecret: 'asdsadsagfawqdad',
  saltRounds: 10,
  MongoURI: `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0-2kr8u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
};
