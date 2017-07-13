var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
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

router.get('/remove/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    console.log(blogpostId);
    blogpost.remove({_id: new mongodb.ObjectID(blogpostId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(blogpostId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/blogpostsCount', function(req, res) {
    blogpost.count({active: true}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/', function(req, res) {
    var blogposts = blogpost
        .find({})
        .exec(function (err, blogposts) {
        if (!err){
            var allBlogposts = [];
            var nBlogposts = blogposts.length;
            var counter = 0;
            
            blogposts.forEach(function(thisBlogpost, rindex){
                var userId = thisBlogpost.user;
                var instituteId = thisBlogpost.institute;
                
                var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1, image:1},function (err, thisUser) {
                    if (!err){
                        thisBlogpost.user = thisUser;
                        
                        var thisProvider = targetStudyProvider.findOne({ '_id': instituteId },{name:1, logo:1, city:1},function (err, thisProvider) {
                            if (!err){
                                thisBlogpost.institute = thisProvider;
                                allBlogposts.push(thisBlogpost);
                                counter += 1;
                                if(counter == nBlogposts){
                                    //console.log(allBlogposts);   
                                    res.json(allBlogposts);   
                                }
                                
                            }else {throw err;}
                        });
                        
                        
                        
                    }else {throw err;}
                });
                
            });
            
            //res.json(blogposts);
        } else {throw err;}
    });
});
//to get a particular blogpost with _id blogpostId
router.get('/edit/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId, active: true })
        //.deepPopulate('coupon')
        .exec(function (err, thisBlogpost) {
            
        if (!err){
            console.log(thisBlogpost);
            var userId = thisBlogpost.user;
            var thisUser = user
            .findOne({_id : userId},{basic:1, blogger:1, image:1})
            //.deepPopulate('exams exams.stream')
            .exec(function (err, thisUser) {
            if (!err){
                thisBlogpost.user = thisUser;
                res.json(thisBlogpost);
                } else {throw err;}
            });
        } else {throw err;}
    });
});

router.get('/disable/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId })
        //.deepPopulate('coupon')
        .exec(function (err, thisBlogpost) {
            
        if (!err){
            thisBlogpost.active = false;
            thisBlogpost.save(function(err, thisBlogpost) {
                if (err) return console.error(err);
                res.json(thisBlogpost._id);
            });

        } else {throw err;}
    });
});

router.get('/enable/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId })
        //.deepPopulate('coupon')
        .exec(function (err, thisBlogpost) {
            
        if (!err){
            thisBlogpost.active = true;
            thisBlogpost.save(function(err, thisBlogpost) {
                if (err) return console.error(err);
                res.json(thisBlogpost._id);
            });

        } else {throw err;}
    });
});

//to get all blogposts for a user
router.get('/user/:userId', function(req, res) {
    
    var userId = req.params.userId;
    
    var blogposts = blogpost
    .find({user: userId})
    .sort( { _created: -1 } )
    //.deepPopulate('institute institute.exams institute.exams.stream')
    .exec(function (err, blogposts) {
    if (!err){
        var basicBlogposts = [];
        var groupNames = [];
        var counter = 0;
        var nLength = blogposts.length;
        
        var blogpostInstituteIds =  blogposts.map(function(a) {return a.institute;});
        
        var allProviderBlogposts = targetStudyProvider
            .find({_id : { $in : blogpostInstituteIds }, disabled: {$ne: true}},{name:1 , groupName:1, exams:1, disabled: 1, city:1, logo:1, address:1, pincode:1})
            .deepPopulate('exams exams.stream')
            .exec(function (err, allProviderBlogposts) {
            if (!err){
                
            var instituteIds = allProviderBlogposts.map(function(a) {return a._id.toString();});

            blogposts.forEach(function(thisBlogpost, rindex){
                var iIndex = instituteIds.indexOf(thisBlogpost.institute.toString());
                thisBlogpost.institute = allProviderBlogposts[iIndex];

                if(thisBlogpost.institute && !thisBlogpost.institute.disabled){
                    
                    basicBlogposts.push(thisBlogpost);
                 
                }
                counter = counter + 1;
                if(counter == nLength){

                    res.json(basicBlogposts);
                }
                });
                
                
            } else {throw err;}
        });

        if(nLength == 0){
            res.json([]);
        }
    } else {throw err;}
    });
});


//to get all blogposts for an institute
router.post('/groupBlogposts', function(req, res) {
    var instituteIdArray = req.body;
    //console.log(instituteIdArray);
    var basicBlogposts = [];
    
    var blogposts = blogpost
        .find({institute: { $in : instituteIdArray }, active: true})
        .deepPopulate('user')
        .exec(function(err, blogposts) {
        if (!err){
            
            var counter = 0;
            var nLength = blogposts.length;
            blogposts.forEach(function(thisBlogpost, index){
                thisBlogpost.user.logins = [];
                counter = counter + 1;
                basicBlogposts.push(thisBlogpost);
                if(counter == nLength){
                    res.json(basicBlogposts);
                }
            });
            
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
});

router.post('/existingBlogpost', function(req, res) {
    var userInstituteForm = req.body;
    
    var userId = userInstituteForm.user;
    var instituteIdArray = userInstituteForm.instituteIdArray;
    
    
    var existingBlogposts = blogpost
        .find({user: userId, institute: { $in : instituteIdArray }})
        //.deepPopulate('institute user')
        .exec(function (err, existingBlogposts) {
        if (!err){
            if(existingBlogposts){
                res.json(existingBlogposts);
            }else{
                res.json(null);
            }
              
        } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var blogpostForm = req.body;
    var blogpostId = blogpostForm._id;
    var user = blogpostForm.user;
    
    
    if(blogpostId){
        var existingBlogpost = blogpost
        .findOne({user: user, _id: blogpostId})
        .exec(function (err, existingBlogpost) {
            if (!err){
                for (var property in blogpostForm) {
                    if(property != 'user'){
                       existingBlogpost[property] = blogpostForm[property];
                    }
                    
                }
                existingBlogpost.save(function(err, existingBlogpost) {
                    if (err) return console.error(err);
                    res.json(existingBlogpost._id);
                });

            } else {throw err;}
        });
        
        
    }else{
        var newblogpost = new blogpost({});
        for (var property in blogpostForm) {
            newblogpost[property] = blogpostForm[property];
        }
        console.log(newblogpost);
        newblogpost.save(function(err, newblogpost) {
            if (err) return console.error(err);
            res.json(newblogpost._id);
        });
    }
    
    
    
});

module.exports = router;