'use strict';

var FacebookStrategy = require("passport-facebook");
var User = require("../models/users.js");

module.exports = function(passport){
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
passport.use(new FacebookStrategy({
    clientID: process.env.FACKEY,
    clientSecret: process.env.FACSEC,
    callbackURL: process.env.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, done){
    console.log(profile);
   User.findOne({'profile._id': profile.id}, function(err, user){
       if(err){return done(err);} 
       if(user){
           return done(null, user);
       } else {
           var newUser = new User();

           newUser._id = profile.id;
           newUser.name = profile.name;
           
           
     //      newUser.save(function(err){
     //          if(err){throw err;}
     //     });
           
           return done(null, newUser);
       }
}
);
    
}));
}