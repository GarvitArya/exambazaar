var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var blogTag = require('../app/models/blogTag');
var blogpost = require('../app/models/blogpost');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var user = require('../app/models/user');
var email = require('../app/models/email');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var readingTime = require('reading-time');

const cheerio = require('cheerio');

router.get('/remove/:blogTagId', function(req, res) {
    var blogTagId = req.params.blogTagId.toString();
    
    var allBlogposts = blogpost
        .find({blogTags: blogTagId}, {blogTags: 1, title:1 })
        .exec(function (err, allBlogposts) {
            var nBlogposts = allBlogposts.length;
            var counter = 0;
            allBlogposts.forEach(function(thisBlogpost, bindex){
                thisTag = thisBlogpost.blogTags;
                var tagIndex = thisTag.indexOf(blogTagId);
                if(tagIndex != -1){
                    thisBlogpost.blogTags.splice(tagIndex, 1);
                    console.log('Removed from blog: ' + thisBlogpost.title);
                    thisBlogpost.save(function(err, thisBlogpost) {
                        if (err) return console.error(err);
                        counter += 1;
                        if(counter == nBlogposts){
                            blogTag.remove({_id: new mongodb.ObjectID(blogTagId)}, function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(blogTagId + ' removed!');
                                    res.json(true);
                                }                              
                            });
                            
                            
                            
                            
                        }
                    });
                }
            });

        });
    
});

router.get('/usedinBlogs/:blogTagId', function(req, res) {
    var blogTagId = req.params.blogTagId.toString();
    
    var allBlogposts = blogpost
        .find({blogTags: blogTagId}, {blogTags: 1, title:1, urlslug:1 })
        .exec(function (err, allBlogposts) {
            
            res.json(allBlogposts);

        });
    
});

router.get('/blogTagsCount', function(req, res) {
    blogTag.count({active: true}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/blogTagsSummary', function(req, res) {
    
    var allBlogs = blogpost
    .find({}, {blogTags: 1})
    .exec(function (err, allBlogs) {
        if (!err){
            var allBlogTagsId = [];
            var allBlogTags = [];
            var thisBlogTag = null;
            var addBlogTag = null;
            allBlogs.forEach(function(thisBlog, bindex){
                if(thisBlog.blogTags){
                    thisBlogTag = thisBlog.blogTags;
                }   
                if(thisBlogTag && thisBlogTag.length > 0){
                    thisBlogTag.forEach(function(thisTag, tindex){
                        var tagIndex = allBlogTagsId.indexOf(thisTag.toString());
                        if(tagIndex == -1){
                            allBlogTagsId.push(thisTag.toString());
                            addBlogTag = {
                                _id: thisTag,
                                count: 1
                            };
                            allBlogTags.push(addBlogTag);
                        }else{
                            allBlogTags[tagIndex].count += 1;
                        }
                        
                    });
                }
                
            });
            res.json(allBlogTags);
        } else {throw err;}
    });
});


router.get('/', function(req, res) {
    var blogTags = blogTag
    .find({})
    .exec(function (err, blogTags) {
        if (!err){
            var allBlogTags = [];
            var nBlogTags = blogTags.length;
            var counter = 0;
            if(nBlogTags == 0){
                res.json([]);
            }
            blogTags.forEach(function(thisBlogTag, rindex){
                var thisBlogUser = thisBlogTag.user;
                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{mobile:1, email:1, basic:1, image:1, userType:1},function (err, thisBlogUserInfo) {
                    if (!err){
                        thisBlogTag.user = thisBlogUserInfo;
                        counter += 1;
                        allBlogTags.push(thisBlogTag);
                        if(counter == nBlogTags){
                            res.json(allBlogTags);   
                        }
                    }
                });

            });
        } else {throw err;}
    });
});

//to get a particular blogTag with _id blogTagId
router.get('/edit/:blogTagId', function(req, res) {
    var blogTagId = req.params.blogTagId;
    var thisBlogTag = blogTag
        .findOne({ '_id': blogTagId })
        .exec(function (err, thisBlogTag) {
            
        if (!err){
            //console.log(thisBlogTag);
            var userId = thisBlogTag.user;
            var thisUser = user
            .findOne({_id : userId},{basic:1, blogger:1, image:1})
            .exec(function (err, thisUser) {
            if (!err){
                thisBlogTag.user = thisUser;
                res.json(thisBlogTag);
                } else {throw err;}
            });
        } else {throw err;}
    });
});

router.get('/disable/:blogTagId', function(req, res) {
    var blogTagId = req.params.blogTagId;
    var thisBlogTag = blogTag
        .findOne({ '_id': blogTagId })
        //.deepPopulate('coupon')
        .exec(function (err, thisBlogTag) {
            
        if (!err){
            thisBlogTag.active = false;
            thisBlogTag.save(function(err, thisBlogTag) {
                if (err) return console.error(err);
                res.json(thisBlogTag._id);
            });

        } else {throw err;}
    });
});

router.get('/enable/:blogTagId', function(req, res) {
    var blogTagId = req.params.blogTagId;
    var thisBlogTag = blogTag
        .findOne({ '_id': blogTagId })
        //.deepPopulate('coupon')
        .exec(function (err, thisBlogTag) {
            
        if (!err){
            thisBlogTag.active = true;
            thisBlogTag.save(function(err, thisBlogTag) {
                if (err) return console.error(err);
                res.json(thisBlogTag._id);
            });

        } else {throw err;}
    });
});

router.post('/save', function(req, res) {
    var blogTagForm = req.body;
    var blogTagId = blogTagForm._id;
    var user = blogTagForm.user;
    if(blogTagId){
        var existingBlogTag = blogTag
        .findOne({_id: blogTagId})
        .exec(function (err, existingBlogTag) {
            if (!err){
                for (var property in blogTagForm) {
                    if(property != 'user'){
                       existingBlogTag[property] = blogTagForm[property];
                    }
                }
                existingBlogTag.save(function(err, existingBlogTag) {
                    if (err) return console.error(err);
                    res.json(existingBlogTag);
                });
            } else {throw err;}
        });
        
        
    }else{
        var newblogTag = new blogTag({});
        for (var property in blogTagForm) {
            newblogTag[property] = blogTagForm[property];
        }
        newblogTag.save(function(err, newblogTag) {
            if (err) return console.error(err);
            res.json(newblogTag);
        });
    }
});


module.exports = router;