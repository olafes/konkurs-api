'use strict';
const dotenv = require('dotenv').config();
const config = require(`./config/config-${process.env.NODE_ENV}.js`);
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const db = config.MongoURI;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.log(err);
  process.exit(1);
});

const app = express();
app.use(express.json())
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./passport/index.js')(passport);
app.use('/', require('./routes/index.js')(passport));
app.use('/user', require('./routes/user.js')(passport));
app.use('/map', require('./routes/map.js')(passport));
app.use('/quest', require('./routes/quest.js')(passport));

module.exports = app.listen(config.port, () => console.log(`Server started on port ${config.port}...`));
