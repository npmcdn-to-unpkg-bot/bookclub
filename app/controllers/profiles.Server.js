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
                 cover: req.query.cover,
                 onLoan: false,
                 onLoanTo: [],
                 requested: false,
                 requestedBy: []
              });
              
              console.log(result);
              result.save(function(err){if(err){console.log(err);} res.redirect('/profile');});
              
          }
      });
    };
    
    this.rmvBook = function(req, res){
        User.findById(req.user.id, function(err, result) {
            if(err){console.log(err);}
            if(result){
                var x = result.books.splice(result.books.findIndex(function(curr){return curr==req.query.t;}),1);
                //console.log(x + " was removed from user " + result.name + "\n");
                result.save(function(err){if(err){console.log(err);} res.redirect('/profile');});
            }
        })
    }
    
    this.editProfile = function(req, res){
        //get POST data with name, city, and state changes.
        User.findById(req.user.id, function(err, result){
            if(err){res.send("There was an error");}
            if(result){
                result.name = req.body.name;
                result.city = req.body.city;
                result.state = req.body.state;
                
                result.save(function(err){if(err){res.send(err);} res.redirect('/settings#success');});
            }
        });
    };
    
    this.getAll = function(req, res){
        User.distinct("books.title").then(function(result){
           res.send(result);
        }, function(err){res.json({'err': err});});
    };
    
    this.owners = function(req, res){
        var q = decodeURIComponent(req.query.t);
        User.find({'books.title': q}).then(function(result){
            res.json({'owners': result});
        }, function(err){res.json({'err': err});});
    };
    
    this.getBookData = function(req, res){
        var q = decodeURIComponent(req.query.t);
        User.findOne({'books.title': q}, {'books.$': 1}).then(function(result){
            res.json({
                authors: result.books[0].authors,
                tags: result.books[0].tags,
                cover: result.books[0].cover,
                title: result.books[0].title,
               onLoan: result.books[0].onLoan,
               onLoanTo: result.books[0].onLoanTo,
               requested: result.books[0].requested,
               requestedBy: result.books[0].requestedBy
            });
        }, function(err){if(err){res.json({"err": err});}});
    };
    
    this.rqstBook = function(req, res){
        console.log("Requested!");
      //Request t book from u user.
      var t = decodeURIComponent(req.query.t);
      var u = decodeURIComponent(req.query.u);
      if(u == req.user.id){res.json({err: "You can't request a book from yourself!"});}
      User.findOne({'_id': u, 'books.title': t}).then(function(result){
          var x = result.books.findIndex(function(curr){
             return curr.title == t; 
          });
          result.books[x].requested = true;
          if(result.books[x].requestedBy == null){result.books[x].requestedBy = [];} else {
          if(result.books[x].requestedBy.includes(req.user.id)){res.json({err: "You've already requested this book!"});}
          else{result.books[x].requestedBy.push(req.user.id);}}
          result.save(function(err){if(err){res.json({err: err});} res.json({success: "You requested the book: " + result.books[x].title + "!"});});
      }, function(err){res.json({err: err});});
      
    };
    
    this.myReqs = function(req, res){
        User.findById(req.user.id).then(function(result){
            var rArr = [];
            var lArr = [];
            result.books.forEach(function(curr){
                if(curr.requested == true && curr.onLoan == false){
                    rArr.push({title: curr.title, requestedBy: curr.requestedBy});
                } else {
                    if(curr.onLoan){
                        lArr.push({title: curr.title, onLoanTo: curr.onLoanTo});
                    }
                }
            });
            res.json({requests: rArr, loans: lArr});
        });
    };
};