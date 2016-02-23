'use strict';
var p = process.cwd() + '/app';
var pSjs = require("../controllers/profiles.Server.js");

module.exports = function(app, passport){
 
    var pSjsI = new pSjs();
 
    function isLoggedIn(req, res, next){
        req.session.redirect_url = req.originalUrl;
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
    
    app.route('/browse')
    .get(function(req, res){
       res.sendFile(p + '/public/browse.html');
    });
    
    app.route('/book/:booktitle')
    .get(function(req, res){
        res.sendFile(p + '/public/specificBook.html');
    });
    
    app.route('/settings')
    .get(isLoggedIn, function(req, res){
        res.sendFile(p + '/public/settings.html');
    });
    
    app.route('/myRequests')
    .get(isLoggedIn, function(req, res){
        res.sendFile(p + "/public/myRequests.html");
    });
    
    app.route('/myReqs')
    .get(isLoggedIn, pSjsI.myReqs);
    
    app.route('/my')
    .get(isLoggedIn, pSjsI.myProfile);
    
    app.route('/myid')
    .get(isLoggedIn, function(req, res) {
        res.json({myid: req.user.id});
    });
    
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
    
    app.route('/rqstbk')
    .get(isLoggedIn, pSjsI.rqstBook);
    
    app.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
    
    app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        failureRedirect: '/login'
    }), function(req, res){
        if(req.session.redirect_url){res.redirect(req.session.redirect_url);} else {res.redirect('/profile');}
    });
    
    //Books API begins here.
    
    app.route('/booksapi/getall')
    .get(pSjsI.getAll);
    
    app.route('/booksapi/whoownsme')
    .get(pSjsI.owners);
    
    app.route('/booksapi/getbook')
    .get(pSjsI.getBookData);
    
};