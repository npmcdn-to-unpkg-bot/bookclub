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
    
    app.route('/settings')
    .get(isLoggedIn, function(req, res){
        res.sendFile(p + '/public/settings.html');
    });
    
    app.route('/my')
    .get(isLoggedIn, pSjsI.myProfile);
    
    app.route('/th/:theirid')
    .get(pSjsI.theirProfile);
    
    app.route('/profile/:theirid')
    .get(function(req, res) {
        if(req.user != null && req.params.theirid == req.user.id){
            res.redirect('/profile');
        } else {
        res.sendFile(p + '/public/theirProfile.html');
        }
    });
    
    app.route('/changemy')
    .post(pSjsI.editProfile);
    
    app.route('/addbook')
    .get(isLoggedIn, pSjsI.createBook);
    
    app.route('/rmvbk')
    .get(isLoggedIn, pSjsI.rmvBook);
    
    app.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
    
    app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }))
    
}