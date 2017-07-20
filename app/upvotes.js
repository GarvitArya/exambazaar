var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var upvote = require('../app/models/upvote');
var blogpost = require('../app/models/blogpost');
var user = require('../app/models/user');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/removeupvote/:upvoteId', function(req, res) {
    var upvoteId = req.params.upvoteId;
    console.log('Upvote id is: ' + upvoteId);
    if(upvoteId){
        upvote.remove({_id: new mongodb.ObjectID(upvoteId)}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(upvoteId + ' removed!');
                res.json(true);
            }                              
        });
    }else{
        res.json(false);
    }
    
});

router.get('/blogpostUpvoteCount/:blogpostSlug', function(req, res) {
    var blogpostSlug = req.params.blogpostSlug;
    var thisBlogpost = blogpost
        .findOne({ 'urlslug': blogpostSlug }, {_id: 1})
        .exec(function (err, thisBlogpost) {  
        if (!err){
            if(thisBlogpost){
                console.log(thisBlogpost._id);
                upvote.count({blogpost: thisBlogpost._id}, function(err, docs){
                if (!err){
                    console.log(docs);
                    res.json(docs);
                } else {throw err;}
                });
            }else{
                res.json('0');
            }
        } else {throw err;}
    });
});
router.post('/blogpostUserUpvote', function(req, res){
    var userUpvoteForm = req.body;
    var thisUser = userUpvoteForm.user;
    var thisBlogpost = userUpvoteForm.blogpost;
    console.log(JSON.stringify(userUpvoteForm));
    if(thisUser && thisBlogpost){
        var existingUserUpvote = upvote
        .findOne({user: thisUser, blogpost: thisBlogpost}, {_id:1})
        .exec(function (err, existingUserUpvote) {
            if (!err){
                if(existingUserUpvote){
                    res.json(existingUserUpvote._id);
                }else{
                    res.json(false);
                }
            } else {throw err;}
        });
    }else{
        res.json(false);
    }
        
});

router.post('/save', function(req, res) {
    var upvoteForm = req.body;
    var upvoteId = upvoteForm._id;
    
    if(upvoteId){
        console.log('Something is wrong');
        var existingUpvote = upvote
        .findOne({_id: upvoteId})
        .exec(function (err, existingUpvote) {
            if (!err){
                for (var property in upvoteForm) {
                    existingUpvote[property] = upvoteForm[property];
                }
                existingUpvote.save(function(err, existingUpvote) {
                    if (err) return console.error(err);
                    res.json(existingUpvote);
                });

            } else {throw err;}
        });
        
        
    }else{
        var newupvote = new upvote({});
        console.log(newupvote);
        for (var property in upvoteForm) {
            newupvote[property] = upvoteForm[property];
        }
        console.log(JSON.stringify(newupvote));
        //console.log(JSON.stringify(stats));
        newupvote.save(function(err, newupvote) {
            if (err) return console.error(err);
            res.json(newupvote);
        });
    }
    
});


module.exports = router;