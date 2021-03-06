'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
   _id: Number,
   name: String,
   pic: String,
   city: String,
   state: String,
   books: [{
       title: String,
       cover: String,
       authors: [String],
       tags: [String],
       onLoan: Boolean,
       onLoanTo: {uid: Number, uname: String},
       requested: Boolean,
       requestedBy: [{uid: Number, uname: String}]
   }]
});

module.exports = mongoose.model("User", User);