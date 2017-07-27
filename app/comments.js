var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var comment = require('../app/models/comment');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var user = require('../app/models/user');
var blogpost = require('../app/models/blogpost');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/remove/:commentId', function(req, res) {
    var commentId = req.params.commentId;
    //console.log(commentId);
    comment.remove({_id: new mongodb.ObjectID(commentId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(commentId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/commentsCount', function(req, res) {
    comment.count({active: true}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/', function(req, res) {
    var comments = comment
    .find({})
    .exec(function (err, comments) {
        if (!err){
            var allcomments = [];
            var ncomments = comments.length;
            var counter = 0;
            if(ncomments == 0){
                res.json([]);
            }
            comments.forEach(function(thiscomment, rindex){
                var thisCommentUser = thiscomment.user;
                var thisCommentUserInfo = user.findOne({ '_id': thisCommentUser },{mobile:1, email:1, basic:1, image:1, userType:1},function (err, thisCommentUserInfo) {
                    if (!err){
                        thiscomment.user = thisCommentUserInfo;
                        counter += 1;
                        allcomments.push(thiscomment);
                        if(counter == ncomments){
                            res.json(allcomments);   
                        }
                    }
                });

            });
        } else {throw err;}
    });
});

//to get a particular comment with _id commentId
router.get('/edit/:commentId', function(req, res) {
    var commentId = req.params.commentId;
    var thiscomment = comment
        .findOne({ '_id': commentId })
        .exec(function (err, thiscomment) {
            
        if (!err){
            //console.log(thiscomment);
            var userId = thiscomment.user;
            var thisUser = user
            .findOne({_id : userId},{basic:1, image:1})
            .exec(function (err, thisUser) {
            if (!err){
                thiscomment.user = thisUser;
                res.json(thiscomment);
                } else {throw err;}
            });
        } else {throw err;}
    });
});

router.get('/blogpostComments/:blogpostSlug', function(req, res) {
    var blogpostSlug = req.params.blogpostSlug;
    
    var thisBlogpost = blogpost
        .findOne({ 'urlslug': blogpostSlug }, {_id: 1})
        .exec(function (err, thisBlogpost) {
            if (!err){
                if(thisBlogpost){
                    
                    var allComments = comment
                    .find({ 'blogpost': thisBlogpost._id })
                    .exec(function (err, allComments) {
                    if (!err){
                        var nLength = allComments.length;
                        var counter = 0;

                        allComments.forEach(function(thiscomment, rindex){
                            var userId = thiscomment.user;
                            var thisUser = user
                            .findOne({_id : userId},{basic:1, image:1})
                            .exec(function (err, thisUser) {
                            if (!err){
                                thiscomment.user = thisUser;
                                counter += 1;
                                if(counter == nLength){
                                    res.json(allComments);
                                }

                                } else {throw err;}
                            });

                        });
                        if(nLength == 0){
                            res.json([]);
                        }

                    } else {throw err;}
                });
                }else{
                    res.json([]);
                }
            }else {throw err;}
    });
    
    
    
    
});

router.get('/disable/:commentId', function(req, res) {
    var commentId = req.params.commentId;
    var thiscomment = comment
        .findOne({ '_id': commentId })
        //.deepPopulate('coupon')
        .exec(function (err, thiscomment) {
            
        if (!err){
            thiscomment.active = false;
            thiscomment.save(function(err, thiscomment) {
                if (err) return console.error(err);
                res.json(thiscomment._id);
            });

        } else {throw err;}
    });
});

router.get('/enable/:commentId', function(req, res) {
    var commentId = req.params.commentId;
    var thiscomment = comment
        .findOne({ '_id': commentId })
        //.deepPopulate('coupon')
        .exec(function (err, thiscomment) {
            
        if (!err){
            thiscomment.active = true;
            thiscomment.save(function(err, thiscomment) {
                if (err) return console.error(err);
                res.json(thiscomment._id);
            });

        } else {throw err;}
    });
});

router.post('/userBlogpostcomment', function(req, res) {
    var commentForm = req.body;
    var userId = commentForm.user;
    var blogpostId = commentForm.blogpost;
    
    
    if(userId && blogpostId){
        var existingcomment = comment
        .findOne({user: userId, blogpost: blogpostId})
        .exec(function (err, existingcomment) {
            if (!err){
                res.json(existingcomment);
            } else {throw err;}
        });
    }else{
        res.json(null);
    }
});


router.post('/save', function(req, res) {
    var commentForm = req.body;
    var commentId = commentForm._id;
    var user = commentForm.user;
    if(commentId){
        var existingcomment = comment
        .findOne({user: user, _id: commentId})
        .exec(function (err, existingcomment) {
            if (!err){
                for (var property in commentForm) {
                    if(property != 'user'){
                       existingcomment[property] = commentForm[property];
                    }
                }
                existingcomment.save(function(err, existingcomment) {
                    if (err) return console.error(err);
                    res.json(existingcomment);
                });
            } else {throw err;}
        });
        
        
    }else{
        var newcomment = new comment({});
        for (var property in commentForm) {
            newcomment[property] = commentForm[property];
        }
        newcomment.save(function(err, newcomment) {
            if (err) return console.error(err);
            res.json(newcomment);
        });
    }
});


module.exports = router;