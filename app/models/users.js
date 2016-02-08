'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
   name: String,
   pic: String,
   books: [{
       title: String,
       author: String,
       tags: [String]
   }]
});

module.exports = mongoose.model("User", User);