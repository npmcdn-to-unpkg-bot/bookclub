'use strict';

var express = require("express");
var routes = require("./app/routes/routes.js");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

require('dotenv').load();
require("./app/config/passport.js")(passport);

var app = express();

mongoose.connect(process.env.MONGOLAB_URI);

app.use('/public', express.static(process.cwd() + '/app/public'));
app.use('/app/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(session({
  secret: 'JohnHancock',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(passport.initialize());
app.use(passport.session());


routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Listening on port " + port + "...");
})