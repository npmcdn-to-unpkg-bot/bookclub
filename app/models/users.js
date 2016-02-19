'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
   _id: Number,
   name: String,
   pic: String,
   books: [{
       title: String,
       cover: String,
       authors: [String],
       tags: [String]
   }]
});

module.exports = mongoose.model("User", User);