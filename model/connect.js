// var mongoose
// require
// mongoose
var mongoose = require('mongoose');

// mongoose
// .promise
// global.Promise
// there is a global promise
mongoose.Promise = require('bluebird');

// config
// get mongo config
var config = require('../config').mongo;

// db url
var dbUrl = config.url();
// db option
var dbOption = config.mongoOptions;
// mongoose
// .connect
// db url
// db option
mongoose.connect(dbUrl, dbOption);

// look it is exports.xxxx, not module.exports, so this is a func.
exports.mongoose = mongoose;
