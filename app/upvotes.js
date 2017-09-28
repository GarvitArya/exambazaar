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



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

router.post('/randomUpvotes', function(req, res){
    var randomUpvoteForm = req.body;
    var thisBlogpost = randomUpvoteForm.blogpost;
    var nUpvotes = randomUpvoteForm.nUpvotes;
    var nCounter = 0;
    if(!nUpvotes){
        nUpvotes = getRandomInt(1,10);
    }
    console.log("nUpvotes is: " + nUpvotes);
    console.log(JSON.stringify(randomUpvoteForm));
    if(thisBlogpost){
        var thisBlogpostInfo = blogpost
        .findOne({_id: thisBlogpost}, {title:1})
        .exec(function (err, thisBlogpostInfo) {
            if (!err){
                if(thisBlogpostInfo){
                    var i = 0;
                    for(i=0; i<nUpvotes; i++){
                        var newupvote = new upvote({
                            blogpost: thisBlogpostInfo._id,
                        });
                        newupvote.save(function(err, newupvote) {
                            if (err) return console.error(err);
                            
                            nCounter += 1;
                            if(nCounter == nUpvotes){
                                console.log(nCounter + ' upvotes added to ' + thisBlogpostInfo.title);
                                res.json(nCounter);
                            }
                        });
                    }
                    
                    
                }else{
                    res.json(false);
                }
            } else {throw err;}
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
                upvote.count({blogpost: thisBlogpost._id}, function(err, docs){
                if (!err){
                    res.json(docs);
                } else {throw err;}
                });
            }else{
                res.json('0');
            }
        } else {throw err;}
    });
});

router.get('/blogpostUserUpvotes/:userId', function(req, res) {
    var userId = req.params.userId;
    console.log('User id is: ' + userId);
    if(userId){
        var existingUserUpvotes = upvote
        .find({user: userId, blogpost: {$exists: true}}, {_id:1, blogpost:1})
        .exec(function (err, existingUserUpvotes) {
            if (!err){
                if(existingUserUpvotes){
                    var blogpostIds =  existingUserUpvotes.map(function(a) {return a.blogpost;});
                    
                    res.json(blogpostIds);
                }else{
                    res.json([]);
                }
            } else {throw err;}
        });
    }else{
        res.json([]);
    }
});

router.get('/allBlogsUpvotesCount', function(req, res) {
    var blogUpvotes = upvote.aggregate(
    [
        {$match: {} },
        {"$group": { "_id": { blogpost: "$blogpost" }, count:{$sum:1}} },
        {$sort:{"count":-1}}

    ],function(err, blogUpvotes) {
    if (!err){
        
        var allUpvotes = [];
        blogUpvotes.forEach(function(thisBlog, index){
            var bUpvote = {
                blogpost: thisBlog._id.blogpost,
                upvotes: thisBlog.count,
            };
            allUpvotes.push(bUpvote);
        });
        res.json(allUpvotes);
    } else {throw err;}
    });
    
    
});

router.post('/removeupvote', function(req, res) {
    var removeupvoteForm = req.body;
    var userId = removeupvoteForm.user;
    var blogpostId = removeupvoteForm.blogpost;
    
    if(userId && blogpostId){
        console.log(userId + ' ' + blogpostId);
        upvote.remove({user: userId, blogpost: blogpostId}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result._id + ' removed!');
                res.json(true);
            }                              
        });
    }else{
        res.json(false);
    }
    
});
router.get('/removeupvote/:upvoteId', function(req, res) {
    var upvoteId = req.params.upvoteId;
    console.log('Upvote id is: ' + upvoteId);
    if(upvoteId){
        
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