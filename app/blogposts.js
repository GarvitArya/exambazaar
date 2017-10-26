var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var blogpost = require('../app/models/blogpost');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var user = require('../app/models/user');
var email = require('../app/models/email');
var exam = require('../app/models/exam');
var moment = require('moment');

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
    
    blogpost.remove({_id: new mongodb.ObjectID(blogpostId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(blogpostId + ' removed!');
            res.json("Done");
        }                              
    });
});

router.get('/verify/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    var thisBlogpost = blogpost.find({"_id":blogpostId}, {urlslug:1},function(err, docs) {
    if (!err){
        if(docs.length == 0){
            res.json(false);
        }else{
            var blogId = docs[0]._id;
            res.json(blogId);
        }
        
    } else {throw err;}
    });
    
    
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

router.get('/suggestedblogs/:examName', function(req, res) {
    var examName = req.params.examName;
    
    var thisExam = exam
        .findOne({'name': examName}, {_id:1, name:1})
        .exec(function (err, thisExam) {
        if (!err){
            
            
            if(thisExam){
                var examId = thisExam._id.toString();
                var examblogposts = blogpost
                .find({active: true, exams:examId})
                .exec(function (err, examblogposts) {
                    if (!err){
                        var nBlogs = examblogposts.length;
                        var examblogpostsIds = examblogposts .map(function(a) {return a._id;});
                        var required = 4 - nBlogs;
                        if(required > 0){
                            var additionalblogposts = blogpost
                            .find({_id: { $nin: examblogpostsIds }, active: true}).limit(required)
                            .exec(function (err, additionalblogposts) {
                                examblogposts = examblogposts.concat(additionalblogposts);
                                var allBlogposts = [];
                                var nBlogposts = examblogposts.length;
                                var counter = 0;
                                if(nBlogposts == 0){
                                    res.json([]);
                                }
                                examblogposts.forEach(function(thisBlogpost, rindex){
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

                            });

                        }else{
                            var allBlogposts = [];
                            var nBlogposts = examblogposts.length;
                            var counter = 0;
                            if(nBlogposts == 0){
                                res.json([]);
                            }
                            examblogposts.forEach(function(thisBlogpost, rindex){
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
                        }

                    } else {throw err;}
                });
            }else{
                var required = 4;
                var additionalblogposts = blogpost
                .find({_id: { $nin: examblogpostsIds }, active: true}).limit(required)
                .exec(function (err, additionalblogposts) {
                    examblogposts = examblogposts;
                    var allBlogposts = [];
                    var nBlogposts = examblogposts.length;
                    var counter = 0;
                    if(nBlogposts == 0){
                        res.json([]);
                    }
                    examblogposts.forEach(function(thisBlogpost, rindex){
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

                });
            }
            
            
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

router.get('/headerBlogs', function(req, res) {
    
    var blogposts = blogpost.find({active: true, blogSeries: {$ne:'EdBites'}},{title:1, user:1,urlslug:1, readingTime:1, _created:1},function(err, blogposts) {
    if (!err){
        var allBlogposts = [];
        var nBlogposts = blogposts.length;
        var counter = 0;
        if(nBlogposts == 0){
            res.json([]);
        }
        blogposts.forEach(function(thisBlogpost, rindex){
            var thisBlogUser = thisBlogpost.user;
            var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, blogger:1},function (err, thisBlogUserInfo) {
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
    }).sort( [['_id', -1]] ).limit(4);
    
});

router.get('/userblogs/:userId', function(req, res) {
    var userId = req.params.userId;
    
    var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1, image:1, userType:1},function (err, thisUser) {
        if (!err){
            var thisUserType = thisUser.userType;
            var thisUserId = thisUser._id.toString();
            var internIds = ['594ac4d15b78f012b45cc2a3', '59c7c2dc0a239d4416c2473f'];
            if(thisUserType =='Master' || internIds.indexOf(thisUserId) != -1){
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
                        
                    var thisBlogUser = thisBlogpost.user;
                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{mobile:1, email:1, basic:1, image:1, userType:1},function (err, thisBlogUserInfo) {
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
                res.json(false);
            }
            blogposts.forEach(function(thisBlogpost, rindex){
                var thisTitle = thisBlogpost.title;
                var thisContent = thisBlogpost.content;
                //var find = "EXAM PATTERN";
                
                //thisBlogpost.title = thisTitle.replace("EXAM PATTERN", "Exam Pattern");
                const $ = cheerio.load(thisContent, {
                    normalizeWhitespace: true,
                    /*xmlMode: true*/
                });
                $('a').attr('target', '_blank').html();
                
                thisBlogpost.content = $.html();
                
                
                thisBlogpost.save(function(err, thisBlogpost) {
                    if (err) return console.error(err);
                    counter += 1;
                    if(counter == nBlogposts){
                        res.json(true);   
                    }
                });
                
                
            });
        } else {throw err;}
    });
});

router.get('/markAllEdbites', function(req, res) {
    
    var blogposts = blogpost
    .find({}, {title: 1, _created: 1})
    .exec(function (err, blogposts) {
        if (!err){
            var allBlogposts = [];
            var nBlogposts = blogposts.length;
            var counter = 0;
            if(nBlogposts == 0){
                res.json(false);
            }
            blogposts.forEach(function(thisBlogpost, rindex){
                var thisTitle = thisBlogpost.title;
                var find = "EdBites";
                var fIndex = thisTitle.indexOf(find);
                thisBlogpost._published = thisBlogpost._created;
                if(fIndex != -1){
                    thisBlogpost.blogSeries = "EdBites";
                    thisBlogpost.save(function(err, thisBlogpost) {
                        if (err) return console.error(err);
                        counter += 1;
                        if(counter == nBlogposts){
                            res.json(true);   
                        }
                    });
                }else{
                    
                    thisBlogpost.blogSeries = "";
                    thisBlogpost.save(function(err, thisBlogpost) {
                        if (err) return console.error(err);
                        counter += 1;
                        if(counter == nBlogposts){
                            res.json(true);   
                        }
                    });
                }
                
            });
        } else {throw err;}
    });
});


router.get('/slugExists/:query', function(req, res) {
    var query = req.params.query;
    //{'$regex' : query, '$options' : 'i'}
    blogpost.find({"urlslug":query}, {urlslug:1},function(err, docs) {
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
    
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId })
        .deepPopulate('blogTags')
        .exec(function (err, thisBlogpost) {
            
        if (!err){
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
                res.json(null);
            }
        } else {throw err;}
    });
});

router.get('/markEdbites/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId }, {blogSeries: 1})
        .exec(function (err, thisBlogpost) {
            
        if (!err){
            if(thisBlogpost){
                thisBlogpost.blogSeries = "EdBites";
                thisBlogpost.save(function(err, thisBlogpost) {
                if (err) return console.error(err);
                    res.json(thisBlogpost._id);
                });
            }else{
                res.json(null);
            }
        } else {throw err;}
    });
});

router.get('/unmarkEdbites/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId }, {blogSeries: 1})
        .exec(function (err, thisBlogpost) {
            
        if (!err){
            if(thisBlogpost){
                thisBlogpost.blogSeries = "";
                thisBlogpost.save(function(err, thisBlogpost) {
                if (err) return console.error(err);
                    res.json(thisBlogpost._id);
                });
            }else{
                res.json(null);
            }
        } else {throw err;}
    });
});

router.get('/remove/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    if(blogpostId){
        blogpost.remove({blogpost: blogpostId}, function(err, result) {
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


router.get('/getblogpostFromSlug/:blogpostSlug', function(req, res) {
    var blogpostSlug = req.params.blogpostSlug;
    var thisBlogpost = blogpost
        .findOne({ 'urlslug': blogpostSlug })
        .deepPopulate('blogTags')
        .exec(function (err, thisBlogpost) {
        if (!err){
            
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
            var timeNow = new Date();
            thisBlogpost._published = timeNow;
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
function compareDates(dateTimeA, dateTimeB) {
    //returns 1 if dateTimeA > dateTimeB
    dateTimeA = new Date(dateTimeA);
    var momentA = moment(dateTimeA,"DD/MM/YYYY");
    var momentB = moment(dateTimeB,"DD/MM/YYYY");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
};
router.get('/setToLastSavedVersion/:blogpostId', function(req, res) {
    var blogpostId = req.params.blogpostId;
    var thisBlogpost = blogpost
        .findOne({ '_id': blogpostId })
        .deepPopulate('blogTags')
        .exec(function (err, thisBlogpost) {
        if (!err){
            if(thisBlogpost && thisBlogpost._saved){
                nsaves = thisBlogpost._saved.length;
                var lastUserSavedBlog = null;
                var lastUserSavedBlogDate = new Date("2016-01-01");
                thisBlogpost._saved.forEach(function(thisBlog, sindex){
                    var saveDate = thisBlog._date;
                    var cDate = compareDates(saveDate, lastUserSavedBlogDate);
                    if(cDate == 1){
                        lastUserSavedBlogDate = saveDate;
                        lastUserSavedBlog = thisBlog;
                    }
                });
                console.log(lastUserSavedBlogDate);
                console.log(lastUserSavedBlog);
                res.json(lastUserSavedBlog);
                
            }else{
                res.json(null);
            }

        } else {throw err;}
    });
});

router.post('/save', function(req, res) {
    var blogpostForm = req.body;
    
    var blogpostId = null;
    if(blogpostForm._id){
        blogpostId = blogpostForm._id.toString();
    }
    
    var savedBy = blogpostForm.savedBy.toString();
    var autosave = blogpostForm.autosave; 
    var user = blogpostForm.user;
    if(blogpostForm.user && blogpostForm.user._id){
        user = blogpostForm.user._id.toString();
    }
    
    if(blogpostId){
        var existingBlogpost = blogpost
        .findOne({_id: blogpostId})
        .deepPopulate('blogTags')
        .exec(function (err, existingBlogpost) {
            if (!err){
            if(existingBlogpost){
                
                if(savedBy){
                    var timeNow = new Date();
                    for (var property in blogpostForm) {
                        if(property != '_id' && property != 'upvotes' && property != '_v'){
                            existingBlogpost[property] = blogpostForm[property];
                        }
                    }
                    var stats = readingTime(existingBlogpost.content);
                    if(stats)
                        existingBlogpost.readingTime = stats;
                    
                    var newSaved = {
                        autosave: autosave,
                        user: savedBy,
                        title: existingBlogpost.title,
                        content: existingBlogpost.content,
                        coverPhoto: existingBlogpost.coverPhoto,
                        blogTags: existingBlogpost.blogTags,
                        blogSeries: existingBlogpost.blogSeries,
                        exams: existingBlogpost.exams,
                        coachingGroups: existingBlogpost.coachingGroups,
                        //active: existingBlogpost.active,
                        _date: timeNow
                    }
                    //console.log(newSaved);
                    if(autosave){
                        existingBlogpost._autosaved = newSaved;
                    }else{
                       if(!existingBlogpost._saved){
                            existingBlogpost._saved = [];
                        }
                        if(!existingBlogpost._autosaved._id){
                            existingBlogpost._autosaved = newSaved;
                            existingBlogpost._autosaved.autosave = true;
                        }
                        var userIds = existingBlogpost._saved.map(function(a) {return a.user;});
                        userIds.forEach(function(thisUser, rindex){
                            userIds[rindex] = thisUser.toString();
                        });
                        var uIndex = userIds.indexOf(savedBy);
                        if(uIndex != -1){
                            existingBlogpost._saved[uIndex] = newSaved;
                        }else{
                            existingBlogpost._saved.push(newSaved);
                        }
                    }
                    
                    existingBlogpost.save(function(err, existingBlogpost) {
                        if (err) return console.error(err);
                        res.json(existingBlogpost);
                    });
                }else{
                    res.json(null);
                }
                
                
            }else{
                res.json(null);
            }
            } else {throw err;}
        });
        
        
    }else{
        
        
        
        if(savedBy){
            var timeNow = new Date();
            var newblogpost = new blogpost({});
            for (var property in blogpostForm) {
                newblogpost[property] = blogpostForm[property];
            }
            var stats = readingTime(newblogpost.content);
            if(stats)
                newblogpost.readingTime = stats;
            
            var newSaved = {
                autosave: autosave,
                user: savedBy,
                title: newblogpost.title,
                content: newblogpost.content,
                coverPhoto: newblogpost.coverPhoto,
                blogTags: newblogpost.blogTags,
                blogSeries: newblogpost.blogSeries,
                exams: newblogpost.exams,
                coachingGroups: newblogpost.coachingGroups,
                //active: newblogpost.active,
                _date: timeNow
            }
            //console.log(newSaved);
            if(autosave){
                newblogpost._autosaved = newSaved;
            }else{
               if(!newblogpost._saved){
                    newblogpost._saved = [];
                }
                if(!newblogpost._autosaved._id){
                    newblogpost._autosaved = newSaved;
                }
                var userIds = newblogpost._saved.map(function(a) {return a.user;});
                userIds.forEach(function(thisUser, rindex){
                    userIds[rindex] = thisUser.toString();
                });
                var uIndex = userIds.indexOf(savedBy);
                if(uIndex != -1){
                    newblogpost._saved[uIndex] = newSaved;
                }else{
                    newblogpost._saved.push(newSaved);
                }
            }
            
            newblogpost.save(function(err, newblogpost) {
                if (err) return console.error(err);
                res.json(newblogpost);
            });
        }else{
            res.json(null);
        }
        
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