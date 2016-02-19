'use strict';

var User = require("../models/users.js");

module.exports = function(){
    
    this.myProfile = function(req, res){
        User.findById(req.user.id, function(err, result){
            if(err){console.log(err);}
           if(result){res.json(result);}
           else{res.json({error: 1});}
        });
    };
    
    this.theirProfile = function(req, res){
        User.findById(req.params.theirid, function(err, result){
            if(err){console.log(err);}
            if(result){res.json(result);}
            else{res.json({error: 1, msg: "User does not exist."});}
        });
    };
    
    this.createBook = function(req, res){
      User.findById(req.user.id, function(err, result){
          if(err){console.log(err);}
          if(result){
              result.books.push({
                 title: req.query.title,
                 authors: req.query.author.split(","),
                 tags: req.query.tags.split(","),
                 cover: req.query.cover
              });
              
              console.log(result);
              result.save(function(err){if(err){console.log(err);} res.redirect('/profile');});
              
          }
      });
    };
};