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
var readingTime = require('reading-time');

const cheerio = require('cheerio');

router.get('/remove/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    //console.log(blogpostId);
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

router.get('/getblogs', function(req, res) {
    var blogposts = blogpost
    .find({active: true})
    .exec(function (err, blogposts) {
        if (!err){
            var allBlogposts = [];
            var nBlogposts = blogposts.length;
            var counter = 0;
            if(nBlogposts == 0){
                res.json([]);
            }
            blogposts.forEach(function(thisBlogpost, rindex){
                var thisBlogUser = thisBlogpost.user;
                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{mobile:1, email:1, basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                    if (!err){
                        thisBlogpost.user = thisBlogUserInfo;
                        counter += 1;
                        allBlogposts.push(thisBlogpost);
                        if(counter == nBlogposts){
                            res.json(allBlogposts);   
                        }
                    }
                });

            });
        } else {throw err;}
    });
});

router.get('/userblogs/:userId', function(req, res) {
    var userId = req.params.userId;
    
    var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1, image:1, userType:1},function (err, thisUser) {
        if (!err){
            var thisUserType = thisUser.userType;
            
            if(thisUserType =='Master'){
                var blogposts = blogpost
                .find({})
                .exec(function (err, blogposts) {
                    if (!err){
                    //console.log(JSON.stringify(blogposts));
                    var allBlogposts = [];
                    var nBlogposts = blogposts.length;
                    var counter = 0;
                    if(nBlogposts == 0){
                        res.json([]);
                    }
                    blogposts.forEach(function(thisBlogpost, rindex){
                        
                    var thisBlogUser = thisBlogpost.user;
                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{mobile:1, email:1, basic:1, image:1, userType:1},function (err, thisBlogUserInfo) {
                        if (!err){
                            thisBlogpost.user = thisBlogUserInfo;
                            counter += 1;
                            
                            //console.log(thisBlogpost);
                            allBlogposts.push(thisBlogpost);
                            if(counter == nBlogposts){
                                res.json(allBlogposts);   
                            }
                        }
                    });

                    });
                    } else {throw err;}
                });
            }else{
                var blogposts = blogpost
                .find({user: userId})
                .exec(function (err, blogposts) {
                    if (!err){
                        var allBlogposts = [];
                        var nBlogposts = blogposts.length;
                        var counter = 0;
                        if(nBlogposts == 0){
                            res.json([]);
                        }
                        blogposts.forEach(function(thisBlogpost, rindex){
                            thisBlogpost.user = thisUser;
                            counter += 1;
                            allBlogposts.push(thisBlogpost);
                            if(counter == nBlogposts){   
                                res.json(allBlogposts);   
                            }
                        });
                    } else {throw err;}
                });
            }
        }else {throw err;}
    });

});

router.get('/sanitizeblogposts', function(req, res) {
    
    var blogposts = blogpost
    .find({})
    .exec(function (err, blogposts) {
        if (!err){
            var allBlogposts = [];
            var nBlogposts = blogposts.length;
            var counter = 0;
            if(nBlogposts == 0){
                res.json([]);
            }
            blogposts.forEach(function(thisBlogpost, rindex){
                var thisTitle = thisBlogpost.title;
                var thisContent = thisBlogpost.content;
                
                const $ = cheerio.load(thisContent, {
                    normalizeWhitespace: true,
                    /*xmlMode: true*/
                });
                $('a').attr('target', '_blank').html();
                console.log($.html());
                
                thisBlogpost.content = $.html();
                
                
                thisBlogpost.save(function(err, thisBlogpost) {
                    if (err) return console.error(err);
                    counter += 1;
                    if(counter == nBlogposts){
                        res.json(allBlogposts);   
                    }
                });
                
                
            });
        } else {throw err;}
    });
});


router.get('/slugExists/:query', function(req, res) {
    var query = req.params.query;
    //console.log(query);
    blogpost.find({"urlslug":{'$regex' : query, '$options' : 'i'}}, {urlslug:1},function(err, docs) {
    if (!err){
        if(docs.length == 0){
            res.json(false);
        }else{
            var blogId = docs[0]._id;
            res.json(blogId);
        }
        
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

//to get a particular blogpost with _id blogpostId
router.get('/edit/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    //console.log(blogpostId);
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId })
        .exec(function (err, thisBlogpost) {
            
        if (!err){
            //console.log(thisBlogpost);
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

router.get('/getblogpostFromSlug/:blogpostSlug', function(req, res) {
    var blogpostSlug = req.params.blogpostSlug;
    console.log(blogpostSlug);
    var thisBlogpost = blogpost
        .findOne({ 'urlslug': blogpostSlug })
        .deepPopulate('blogTags')
        .exec(function (err, thisBlogpost) {
        console.log(thisBlogpost);    
        if (!err){
            //console.log(thisBlogpost);
            
            if(thisBlogpost){
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
            }else{
                res.json(false);
            }
            
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
                var stats = readingTime(existingBlogpost.content);
                //console.log(JSON.stringify(stats));
                if(stats)
                    existingBlogpost.readingTime = stats;
                existingBlogpost.save(function(err, existingBlogpost) {
                    if (err) return console.error(err);
                    res.json(existingBlogpost);
                });

            } else {throw err;}
        });
        
        
    }else{
        var newblogpost = new blogpost({});
        for (var property in blogpostForm) {
            newblogpost[property] = blogpostForm[property];
        }
        console.log(JSON.stringify(newblogpost));
        var stats = readingTime(newblogpost.content);
        if(stats)
            newblogpost.readingTime = stats;
        //console.log(JSON.stringify(stats));
        newblogpost.save(function(err, newblogpost) {
            if (err) return console.error(err);
            res.json(newblogpost);
        });
    }
    
    
    
});

router.post('/changeCover', function(req, res) {
    var coverPicForm = req.body;
    var blogpostId = coverPicForm.blogId;
    var image = coverPicForm.image;
    if(blogpostId && image){
        var existingBlogpost = blogpost
        .findOne({_id: blogpostId})
        .exec(function (err, existingBlogpost) {
            if (!err){
                existingBlogpost.coverPhoto = image;
                
                existingBlogpost.save(function(err, existingBlogpost) {
                    if (err) return console.error(err);
                    res.json(existingBlogpost);
                });

            } else {throw err;}
        });
        
        
    }else{
        res.json(false);
    }
});

module.exports = router;