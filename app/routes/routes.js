'use strict';
var p = process.cwd() + '/app';
var pSjs = require("../controllers/profiles.Server.js");

module.exports = function(app, passport){
 
    var pSjsI = new pSjs();
 
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/login');
        }
    }

    app.route('/')
    .get(function(req, res){
        res.sendFile(p + '/public/index.html');
    });
    
    app.route('/profile')
    .get(isLoggedIn, function(req, res){
        res.sendFile(p + '/public/profile.html');
    });
    
    app.route('/login')
    .get(function(req, res){
        res.sendFile(p + '/public/login.html');
    });
    
    app.route('/my')
    .get(isLoggedIn, pSjsI.myProfile);
    
    app.route('/addbook')
    .get(isLoggedIn, pSjsI.createBook);
    
    app.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
    
    app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }))
    
}