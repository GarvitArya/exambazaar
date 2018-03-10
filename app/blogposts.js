var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var blogpost = require('../app/models/blogpost');
var coaching = require('../app/models/coaching');
var user = require('../app/models/user');
var view = require('../app/models/view');
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
    var limit = 4;
    var thisExam = exam
        .findOne({'name': examName}, {_id:1, name:1})
        .exec(function (err, thisExam) {
        if (!err){
            
            if(thisExam){
                var examId = thisExam._id.toString();
                var examblogposts = blogpost
                .find({active: true, exams:examId})
                .limit(limit)
                .exec(function (err, examblogposts) {
                    if (!err){
                        var nBlogs = examblogposts.length;
                        var examblogpostsIds = examblogposts .map(function(a) {return a._id;});
                        var required = 8 - nBlogs;
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
                var required = 8;
                var additionalblogposts = blogpost
                .find({_id: { $nin: examblogpostsIds }, active: true}).limit(required)
                .limit(limit)
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

router.get('/suggestedblogsbyUrlSlug/:examUrlSlug', function(req, res) {
    var examUrlSlug = req.params.examUrlSlug;
    var limit = 4;
    var thisExam = exam
        .findOne({'urlslug': examUrlSlug}, {_id:1, name:1})
        .exec(function (err, thisExam) {
        if (!err){
            
            if(thisExam){
                var examId = thisExam._id.toString();
                var examblogposts = blogpost
                .find({active: true, exams:examId})
                .limit(limit)
                .exec(function (err, examblogposts) {
                    if (!err){
                        var nBlogs = examblogposts.length;
                        var examblogpostsIds = examblogposts .map(function(a) {return a._id;});
                        var required = 8 - nBlogs;
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
                var required = 8;
                var additionalblogposts = blogpost
                .find({_id: { $nin: examblogpostsIds }, active: true}).limit(required)
                .limit(limit)
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
router.get('/topCoaching/:examName', function(req, res) {
    var examName = req.params.examName;
    
    var thisExam = exam
        .findOne({'name': examName}, {_id:1, name:1})
        .exec(function (err, thisExam) {
        if (!err){
            
            if(thisExam){
                var examId = thisExam._id.toString();
                var examblogposts = blogpost
                .find({active: true, exams:examId, blogSeries: 'Expert Reviews'}, {urlslug:1, title: 1, coachingGroups: 1})
                .exec(function (err, examblogposts) {
                    if (!err){
                    var allowed = ['_id', 'title', 'coachingGroups', 'urlslug'];    
                    var nBlogs = examblogposts.length;
                    var bCounter = 0;
                    var allBlogs = [];
                    examblogposts.forEach(function(thisBlogpost, rindex){
                        var thisBlog = {};
                        for (var property in thisBlogpost) {
                            if(allowed.indexOf(property) != -1){
                               thisBlog[property] = thisBlogpost[property]; 
                            }
                             
                        }
                        var groupNames = coaching.aggregate(
                        [
                            {$match: {disabled: false, type: 'Coaching', 'groupName': { $in : thisBlogpost.coachingGroups} } },
                            {"$group": { "_id": { city: "$city" }, count:{$sum:1}, logo: { $first: "$logo" }, name: { $addToSet: "$name" } } },
                            {$sort:{"count":-1}}

                        ],function(err, groupNames) {
                        if (!err){
                            bCounter += 1;
                            thisBlog.coachings = groupNames;
                            allBlogs.push(thisBlog);
                            if(bCounter == nBlogs){
                                //console.log(allBlogs);
                                res.json(allBlogs);
                            }
                            
                        } else {throw err;}
                        });
                       
                        

                        
                    });


                    } else {throw err;}
                });
            }else{
                res.json([]);
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
router.post('/suggestedblogstream', function(req, res) {
    var streamInfo = req.body;
    var streamName = streamInfo.streamName;
    var examName = streamInfo.examName;
    
    var streamInfo = req.body;
    var skip = 0;
    var limit = 4;
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    
    var thisExam = exam
        .findOne({'name': examName}, {_id:1})
        .exec(function (err, thisExam) {
        if (!err){
            if(thisExam){
                var examId = thisExam._id.toString();
                var blogposts = blogpost
                .find({active: true, exams: examId, blogSeries: {$ne: "Expert Reviews"}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1})
                .sort({_published: -1})
                .limit(limit)
                .skip(skip)
                .exec(function (err, blogposts) {
                    if (!err){
                        //var allBlogposts = [];
                        var nBlogposts = blogposts.length;
                        var counter = 0;
                        if(nBlogposts == 0){
                            res.json([]);
                        }


                        blogposts.forEach(function(thisBlogpost, rindex){
                            var thisBlogUser = thisBlogpost.user;
                            var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                if (!err){
                                    thisBlogpost.user = thisBlogUserInfo;
                                    counter += 1;
                                    //allBlogposts.push(thisBlogpost);
                                    if(counter == nBlogposts){
                                        res.json(blogposts);   
                                    }
                                }
                            });
                        });
                    } else {throw err;}
                });
                
                
            }else{
                var blogposts = blogpost
                .find({active: true}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1})
                .sort({_published: -1})
                .limit(limit)
                .skip(skip)
                .exec(function (err, blogposts) {
                    if (!err){
                        //var allBlogposts = [];
                        var nBlogposts = blogposts.length;
                        var counter = 0;
                        if(nBlogposts == 0){
                            res.json([]);
                        }


                        blogposts.forEach(function(thisBlogpost, rindex){
                            var thisBlogUser = thisBlogpost.user;
                            var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                if (!err){
                                    thisBlogpost.user = thisBlogUserInfo;
                                    counter += 1;
                                    //allBlogposts.push(thisBlogpost);
                                    if(counter == nBlogposts){
                                        res.json(blogposts);   
                                    }
                                }
                            });
                        });
                    } else {throw err;}
                });
            }  
        } else {throw err;}
    });
    
    
});

/*router.post('/EdBitesstream', function(req, res) {
    var streamInfo = req.body;
    var skip = 0;
    var limit = 4;
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    
    var blogposts = blogpost
    .find({active: true, blogSeries: 'EdBites'}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1})
    .sort({_published: -1})
    .limit(limit)
    .skip(skip)
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
                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                    if (!err){
                        thisBlogpost.user = thisBlogUserInfo;
                        counter += 1;
                        allBlogposts.push(thisBlogpost);
                        if(counter == nBlogposts){
                            res.json(blogposts);   
                        }
                    }
                });
            });
        } else {throw err;}
    });
});*/

router.post('/EdBitesstream', function(req, res) {
    var streamInfo = req.body;
    //console.log(streamInfo);
    //var streamName = streamInfo.streamName;
    var streamId = null;
    if(streamInfo.streamId && mongoose.Types.ObjectId.isValid(streamInfo.streamId)){
        streamId = streamInfo.streamId.toString();
    }
    console.log(streamId);
    var skip = 0;
    var limit = 4;
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    var included = ['EdBites'];
    
    if(streamId){
        var allExams = exam
            .find({'stream': streamId}, {_id:1})
            .exec(function (err, allExams) {
            if (!err){
                if(allExams){
                    var allExamIds =  allExams.map(function(a) {return a._id;});
                    console.log(allExamIds);
                    var blogposts = blogpost
                    .find({active: true, exams: { $in : allExamIds }, blogSeries: {$in: included}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            //var allBlogposts = [];
                            var nBlogposts = blogposts.length;
                            console.log(nBlogposts);
                            var counter = 0;
                            if(nBlogposts == 0){
                                res.json([]);
                            }


                            blogposts.forEach(function(thisBlogpost, rindex){
                                var thisBlogUser = thisBlogpost.user;
                                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                    if (!err){
                                        thisBlogpost.user = thisBlogUserInfo;
                                        counter += 1;
                                        //allBlogposts.push(thisBlogpost);
                                        if(counter == nBlogposts){
                                            res.json(blogposts);   
                                        }
                                    }
                                });
                            });
                        } else {throw err;}
                    });


                }else{
                    var blogposts = blogpost
                    .find({active: true, blogSeries: {$in: included}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            //var allBlogposts = [];
                            var nBlogposts = blogposts.length;
                            var counter = 0;
                            if(nBlogposts == 0){
                                res.json([]);
                            }


                            blogposts.forEach(function(thisBlogpost, rindex){
                                var thisBlogUser = thisBlogpost.user;
                                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                    if (!err){
                                        thisBlogpost.user = thisBlogUserInfo;
                                        counter += 1;
                                        //allBlogposts.push(thisBlogpost);
                                        if(counter == nBlogposts){
                                            res.json(blogposts);   
                                        }
                                    }
                                });
                            });
                        } else {throw err;}
                    });
                }  
            } else {throw err;}
        });
    }else{
        var blogposts = blogpost
        .find({active: true, blogSeries: {$in: included}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
        .sort({_published: -1})
        .limit(limit)
        .skip(skip)
        .exec(function (err, blogposts) {
            if (!err){
                //var allBlogposts = [];
                var nBlogposts = blogposts.length;
                var counter = 0;
                if(nBlogposts == 0){
                    res.json([]);
                }


                blogposts.forEach(function(thisBlogpost, rindex){
                    var thisBlogUser = thisBlogpost.user;
                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                        if (!err){
                            thisBlogpost.user = thisBlogUserInfo;
                            counter += 1;
                            //allBlogposts.push(thisBlogpost);
                            if(counter == nBlogposts){
                                res.json(blogposts);   
                            }
                        }
                    });
                });
            } else {throw err;}
        });
    }
    
    
    
    
});

router.get('/allblogsbasic', function(req, res) {
    var allBlogs = blogpost
        .find({}, {title: 1, urlslug:1, active: 1, _published: 1})
        .exec(function (err, allBlogs) {
            
        if (!err){
            if(allBlogs){
                res.json(allBlogs);
            }else{
                res.json(null);
            }
        } else {throw err;}
    });
    
    
});

router.post('/blogAnalytics', function(req, res) {
    var analyticsForm = req.body;
    var start = analyticsForm.start;
    var end = analyticsForm.end;
    
    start = moment(start).startOf('day').toDate();
    end = moment(end).endOf('day').toDate();
    
    var blogAnalytics = view.aggregate(
    [
        {$match: { state: 'showblog', _date: {$gte: start, $lt: end} }},
        {"$group": { "_id": { url: "$url", title: "$title" }, count:{$sum:1} } },
    ],function(err, blogAnalytics) {
    if (!err){
        var blogViews = [];
        var counter = 0;
        var nBlogs = blogAnalytics.length;
        
        if(nBlogs == 0){
            res.json([]);
        }
        blogAnalytics.forEach(function(thisBlog, bindex){
            var newView = {
                blogurl: thisBlog._id.url,
                views: thisBlog.count
            };
            blogViews.push(newView);
            counter += 1;
            if(counter == nBlogs){
                res.json(blogViews);
            }
        });
    } else {throw err;}
    });
    
    
    
});



router.post('/streamblogstream', function(req, res) {
    var streamInfo = req.body;
    var streamId = null;
    if(streamInfo.streamId && mongoose.Types.ObjectId.isValid(streamInfo.streamId)){
        streamId = streamInfo.streamId.toString();
    }
    var skip = 0;
    var limit = 4;
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    var excluded = ['EdBites','Expert Reviews'];
    
    if(streamId){
        var allExams = exam
            .find({'stream': streamId}, {_id:1})
            .exec(function (err, allExams) {
            if (!err){
                if(allExams){
                    var allExamIds =  allExams.map(function(a) {return a._id;});
                    console.log(allExamIds);
                    var blogposts = blogpost
                    .find({active: true, exams: { $in : allExamIds }, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            //var allBlogposts = [];
                            var nBlogposts = blogposts.length;
                            console.log(nBlogposts);
                            var counter = 0;
                            if(nBlogposts == 0){
                                res.json([]);
                            }


                            blogposts.forEach(function(thisBlogpost, rindex){
                                var thisBlogUser = thisBlogpost.user;
                                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                    if (!err){
                                        thisBlogpost.user = thisBlogUserInfo;
                                        counter += 1;
                                        //allBlogposts.push(thisBlogpost);
                                        if(counter == nBlogposts){
                                            res.json(blogposts);   
                                        }
                                    }
                                });
                            });
                        } else {throw err;}
                    });


                }else{
                    var blogposts = blogpost
                    .find({active: true, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            //var allBlogposts = [];
                            var nBlogposts = blogposts.length;
                            var counter = 0;
                            if(nBlogposts == 0){
                                res.json([]);
                            }


                            blogposts.forEach(function(thisBlogpost, rindex){
                                var thisBlogUser = thisBlogpost.user;
                                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                    if (!err){
                                        thisBlogpost.user = thisBlogUserInfo;
                                        counter += 1;
                                        //allBlogposts.push(thisBlogpost);
                                        if(counter == nBlogposts){
                                            res.json(blogposts);   
                                        }
                                    }
                                });
                            });
                        } else {throw err;}
                    });
                }  
            } else {throw err;}
        });
    }else{
        var blogposts = blogpost
        .find({active: true, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
        .sort({_published: -1})
        .limit(limit)
        .skip(skip)
        .exec(function (err, blogposts) {
            if (!err){
                //var allBlogposts = [];
                var nBlogposts = blogposts.length;
                var counter = 0;
                if(nBlogposts == 0){
                    res.json([]);
                }


                blogposts.forEach(function(thisBlogpost, rindex){
                    var thisBlogUser = thisBlogpost.user;
                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                        if (!err){
                            thisBlogpost.user = thisBlogUserInfo;
                            counter += 1;
                            //allBlogposts.push(thisBlogpost);
                            if(counter == nBlogposts){
                                res.json(blogposts);   
                            }
                        }
                    });
                });
            } else {throw err;}
        });
    }
    
    
    
    
});

router.post('/infographicstream', function(req, res) {
    
    var skip = 0;
    var limit = 4;
    var excluded = [];
    var included = [];
    var streamId = null;
    var streamInfo = req.body;
    if(streamInfo.streamId && mongoose.Types.ObjectId.isValid(streamInfo.streamId)){
        streamId = streamInfo.streamId.toString();
    }
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    if(streamInfo && streamInfo.limit){
        limit = streamInfo.limit;
    }
    if(streamInfo && streamInfo.excluded && streamInfo.excluded.length > 0){
        excluded = streamInfo.excluded;
    }
    if(streamInfo && streamInfo.included && streamInfo.included.length > 0){
        included = streamInfo.included;
    }
    /*console.log('Limit and skip are:');
    console.log(limit + " | " + skip);
    console.log('---------------------');
    console.log('Stream Id is:');
    console.log(streamId);
    console.log('---------------------');
    console.log('Included are:');
    console.log(included);
    console.log('---------------------');
    console.log('Excluded are:');
    console.log(excluded);
    console.log('---------------------');*/
    
    
    if(streamId){
        var allExams = exam
            .find({'stream': streamId}, {_id:1})
            .exec(function (err, allExams) {
            if (!err){
                if(allExams){
                    var allExamIds =  allExams.map(function(a) {return a._id;});
                    var blogposts = blogpost
                    .find({active: true, exams: { $in : allExamIds }, infographic: {"$nin": [ null, "" ]}}, {title:1, urlslug:1, infographic: 1, infographicThumbnail: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            res.json(blogposts); 
                        } else {throw err;}
                    });


                }else{
                    //console.log('I am here');
                    var blogposts = blogpost
                    .find({active: true, infographic: {"$nin": [ null, "" ]}}, {title:1, urlslug:1, infographic: 1, infographicThumbnail: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            res.json(blogposts);
                        } else {throw err;}
                    });
                }  
            } else {throw err;}
        });
    }else{

        var blogposts = blogpost
        .find({active: true, infographic: {"$nin": [ null, "" ]}}, {title:1, urlslug:1, infographic: 1, infographicThumbnail: 1})
        .sort({_published: -1})
        .limit(limit)
        .skip(skip)
        .exec(function (err, blogposts) {
            if (!err){
                console.log(blogposts);
                res.json(blogposts);
            } else {throw err;}
        });
    }
    
    
});

router.post('/blogstream', function(req, res) {
    
    var skip = 0;
    var limit = 4;
    var excluded = [];
    var included = [];
    var streamId = null;
    var streamInfo = req.body;
    if(streamInfo.streamId && mongoose.Types.ObjectId.isValid(streamInfo.streamId)){
        streamId = streamInfo.streamId.toString();
    }
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    if(streamInfo && streamInfo.limit){
        limit = streamInfo.limit;
    }
    if(streamInfo && streamInfo.excluded && streamInfo.excluded.length > 0){
        excluded = streamInfo.excluded;
    }
    if(streamInfo && streamInfo.included && streamInfo.included.length > 0){
        included = streamInfo.included;
    }
    /*console.log('Limit and skip are:');
    console.log(limit + " | " + skip);
    console.log('---------------------');
    console.log('Stream Id is:');
    console.log(streamId);
    console.log('---------------------');
    console.log('Included are:');
    console.log(included);
    console.log('---------------------');
    console.log('Excluded are:');
    console.log(excluded);
    console.log('---------------------');*/
    
    
    if(included.length > 0){
        if(streamId){
            var allExams = exam
                .find({'stream': streamId}, {_id:1})
                .exec(function (err, allExams) {
                if (!err){
                    if(allExams){
                        var allExamIds =  allExams.map(function(a) {return a._id;});
                        var blogposts = blogpost
                        .find({active: true, exams: { $in : allExamIds }, blogSeries: {$in: included}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                        .sort({_published: -1})
                        .limit(limit)
                        .skip(skip)
                        .exec(function (err, blogposts) {
                            if (!err){
                                var nBlogposts = blogposts.length;
                                var counter = 0;
                                if(nBlogposts == 0){
                                    res.json([]);
                                }

                                blogposts.forEach(function(thisBlogpost, rindex){
                                    var thisBlogUser = thisBlogpost.user;
                                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                        if (!err){
                                            thisBlogpost.user = thisBlogUserInfo;
                                            counter += 1;
                                            if(counter == nBlogposts){
                                                res.json(blogposts);   
                                            }
                                        }
                                    });
                                });
                            } else {throw err;}
                        });


                    }else{
                        var blogposts = blogpost
                        .find({active: true, blogSeries: {$in: included}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                        .sort({_published: -1})
                        .limit(limit)
                        .skip(skip)
                        .exec(function (err, blogposts) {
                            if (!err){
                                var nBlogposts = blogposts.length;
                                var counter = 0;
                                if(nBlogposts == 0){
                                    res.json([]);
                                }
                                blogposts.forEach(function(thisBlogpost, rindex){
                                    var thisBlogUser = thisBlogpost.user;
                                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                        if (!err){
                                            thisBlogpost.user = thisBlogUserInfo;
                                            counter += 1;
                                           
                                            if(counter == nBlogposts){
                                                res.json(blogposts);   
                                            }
                                        }
                                    });
                                });
                            } else {throw err;}
                        });
                    }  
                } else {throw err;}
            });
        }else{
            var blogposts = blogpost
            .find({active: true, blogSeries: {$in: included}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
            .sort({_published: -1})
            .limit(limit)
            .skip(skip)
            .exec(function (err, blogposts) {
                if (!err){
                    var nBlogposts = blogposts.length;
                    var counter = 0;
                    if(nBlogposts == 0){
                        res.json([]);
                    }


                    blogposts.forEach(function(thisBlogpost, rindex){
                        var thisBlogUser = thisBlogpost.user;
                        var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                            if (!err){
                                thisBlogpost.user = thisBlogUserInfo;
                                counter += 1;
                                if(counter == nBlogposts){
                                    res.json(blogposts);   
                                }
                            }
                        });
                    });
                } else {throw err;}
            });
        }
        
        
    }else{
        if(streamId){
            var allExams = exam
                .find({'stream': streamId}, {_id:1})
                .exec(function (err, allExams) {
                if (!err){
                    if(allExams){
                        var allExamIds =  allExams.map(function(a) {return a._id;});
                        var blogposts = blogpost
                        .find({active: true, exams: { $in : allExamIds }, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                        .sort({_published: -1})
                        .limit(limit)
                        .skip(skip)
                        .exec(function (err, blogposts) {
                            if (!err){
                                var nBlogposts = blogposts.length;
                                var counter = 0;
                                if(nBlogposts == 0){
                                    res.json([]);
                                }

                                blogposts.forEach(function(thisBlogpost, rindex){
                                    var thisBlogUser = thisBlogpost.user;
                                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                        if (!err){
                                            thisBlogpost.user = thisBlogUserInfo;
                                            counter += 1;
                                            if(counter == nBlogposts){
                                                res.json(blogposts);   
                                            }
                                        }
                                    });
                                });
                            } else {throw err;}
                        });


                    }else{
                        var blogposts = blogpost
                        .find({active: true, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                        .sort({_published: -1})
                        .limit(limit)
                        .skip(skip)
                        .exec(function (err, blogposts) {
                            if (!err){
                                var nBlogposts = blogposts.length;
                                var counter = 0;
                                if(nBlogposts == 0){
                                    res.json([]);
                                }
                                blogposts.forEach(function(thisBlogpost, rindex){
                                    var thisBlogUser = thisBlogpost.user;
                                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                        if (!err){
                                            thisBlogpost.user = thisBlogUserInfo;
                                            counter += 1;
                                           
                                            if(counter == nBlogposts){
                                                res.json(blogposts);   
                                            }
                                        }
                                    });
                                });
                            } else {throw err;}
                        });
                    }  
                } else {throw err;}
            });
        }else{
            var blogposts = blogpost
            .find({active: true, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
            .sort({_published: -1})
            .limit(limit)
            .skip(skip)
            .exec(function (err, blogposts) {
                if (!err){
                    var nBlogposts = blogposts.length;
                    var counter = 0;
                    if(nBlogposts == 0){
                        res.json([]);
                    }


                    blogposts.forEach(function(thisBlogpost, rindex){
                        var thisBlogUser = thisBlogpost.user;
                        var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                            if (!err){
                                thisBlogpost.user = thisBlogUserInfo;
                                counter += 1;
                                if(counter == nBlogposts){
                                    res.json(blogposts);   
                                }
                            }
                        });
                    });
                } else {throw err;}
            });
        }
    }
    
    
});

    

router.post('/inspirationblogstream', function(req, res) {
    var streamInfo = req.body;
    var streamId = null;
    if(streamInfo.streamId && mongoose.Types.ObjectId.isValid(streamInfo.streamId)){
        streamId = streamInfo.streamId.toString();
    }
    var skip = 0;
    var limit = 4;
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    var excluded = ['Top 10 Online', 'Best Books', 'Exam Page', 'Best Schools', 'Degrees', 'Expert Reviews', 'EdBites' ];
    
    if(streamId){
        var allExams = exam
            .find({'stream': streamId}, {_id:1})
            .exec(function (err, allExams) {
            if (!err){
                if(allExams){
                    var allExamIds =  allExams.map(function(a) {return a._id;});
                    console.log(allExamIds);
                    var blogposts = blogpost
                    .find({active: true, exams: { $in : allExamIds }, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            //var allBlogposts = [];
                            var nBlogposts = blogposts.length;
                            console.log(nBlogposts);
                            var counter = 0;
                            if(nBlogposts == 0){
                                res.json([]);
                            }


                            blogposts.forEach(function(thisBlogpost, rindex){
                                var thisBlogUser = thisBlogpost.user;
                                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                    if (!err){
                                        thisBlogpost.user = thisBlogUserInfo;
                                        counter += 1;
                                        //allBlogposts.push(thisBlogpost);
                                        if(counter == nBlogposts){
                                            res.json(blogposts);   
                                        }
                                    }
                                });
                            });
                        } else {throw err;}
                    });


                }else{
                    var blogposts = blogpost
                    .find({active: true, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
                    .sort({_published: -1})
                    .limit(limit)
                    .skip(skip)
                    .exec(function (err, blogposts) {
                        if (!err){
                            //var allBlogposts = [];
                            var nBlogposts = blogposts.length;
                            var counter = 0;
                            if(nBlogposts == 0){
                                res.json([]);
                            }


                            blogposts.forEach(function(thisBlogpost, rindex){
                                var thisBlogUser = thisBlogpost.user;
                                var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                                    if (!err){
                                        thisBlogpost.user = thisBlogUserInfo;
                                        counter += 1;
                                        //allBlogposts.push(thisBlogpost);
                                        if(counter == nBlogposts){
                                            res.json(blogposts);   
                                        }
                                    }
                                });
                            });
                        } else {throw err;}
                    });
                }  
            } else {throw err;}
        });
    }else{
        var blogposts = blogpost
        .find({active: true, blogSeries: {$nin: excluded}}, {title:1, urlslug:1, user: 1, coverPhoto:1, _published:1, seoDescription: 1, blogSeries: 1, readingTime: 1})
        .sort({_published: -1})
        .limit(limit)
        .skip(skip)
        .exec(function (err, blogposts) {
            if (!err){
                //var allBlogposts = [];
                var nBlogposts = blogposts.length;
                var counter = 0;
                if(nBlogposts == 0){
                    res.json([]);
                }


                blogposts.forEach(function(thisBlogpost, rindex){
                    var thisBlogUser = thisBlogpost.user;
                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1, userType:1, blogger:1},function (err, thisBlogUserInfo) {
                        if (!err){
                            thisBlogpost.user = thisBlogUserInfo;
                            counter += 1;
                            //allBlogposts.push(thisBlogpost);
                            if(counter == nBlogposts){
                                res.json(blogposts);   
                            }
                        }
                    });
                });
            } else {throw err;}
        });
    }
    
    
    
    
});
router.get('/headerBlogs', function(req, res) {
    var excluded = ['EdBites','Expert Reviews'];
    
    var blogposts = blogpost
        .find({active: true, blogSeries: {$nin: excluded}}, {title:1, user:1,urlslug:1, readingTime:1, _published:1, blogSeries: 1})
        .limit(5)
        .sort({_published: -1})
        .exec(function (err, blogposts) {
        if (!err){
            if(blogposts){
                var nBlogposts = blogposts.length;
                if(nBlogposts.length){
                    res.json(null);
                }else{
                    var allBlogposts = [];
                    var counter = 0;
                    blogposts.forEach(function(thisBlogpost, rindex){
                        var thisBlogUser = thisBlogpost.user;
                        var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1, image:1},function (err, thisBlogUserInfo) {
                            if (!err){
                                thisBlogpost.user = thisBlogUserInfo;
                                counter += 1;
                                allBlogposts.push(thisBlogpost);
                                if(counter == nBlogposts){
                                    allBlogposts.sort(function(a,b){
                                      return new Date(b._published) - new Date(a._published);
                                    });
                                    res.json(allBlogposts);   
                                }
                            }
                        });
                    });
                }
            }else{
                res.json(null);
            }
            
        } else {throw err;}
    });
    /*var blogposts = blogpost.find({active: true, blogSeries: {$ne:'EdBites'}},{title:1, user:1,urlslug:1, readingTime:1, _created:1},function(err, blogposts) {
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
    }).sort( [['_published', -1]] ).limit(4);
    */
});

router.get('/userblogs/:userId', function(req, res) {
    var userId = req.params.userId;
    
    var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1, image:1, userType:1},function (err, thisUser) {
        if (!err){
            var thisUserType = thisUser.userType;
            var thisUserId = thisUser._id.toString();
            var internIds = ['5a1831f0bd2adb260055e352', '59c8a3683bee001b2643fa18', '59369dea8a9d754dbd9ead2a'];
            if(thisUserType =='Master' || internIds.indexOf(thisUserId) != -1){
                var blogposts = blogpost
                .find({},{title: 1, user: 1, _created: 1, _published: 1, active: 1, blogSeries: 1, urlslug:1})
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
                    var thisBlogUserInfo = user.findOne({ '_id': thisBlogUser },{basic:1},function (err, thisBlogUserInfo) {
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
                .find({user: userId},{title: 1, user: 1, _created: 1, _published: 1, active: 1, blogSeries: 1, urlslug:1})
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
                    counter += 1;
                    if(counter == nBlogposts){
                        res.json(true);   
                    }
                }
                /*else{
                    
                    thisBlogpost.blogSeries = "";
                    thisBlogpost.save(function(err, thisBlogpost) {
                        if (err) return console.error(err);
                        counter += 1;
                        if(counter == nBlogposts){
                            res.json(true);   
                        }
                    });
                }*/ 
            });
        } else {throw err;}
    });
});
router.get('/markAllExpertReviews', function(req, res) {
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
                var find = "Expert Reviews |";
                var fIndex = thisTitle.indexOf(find);
                thisBlogpost._published = thisBlogpost._created;
                if(fIndex != -1){
                    thisBlogpost.blogSeries = "Expert Reviews";
                    thisBlogpost.save(function(err, thisBlogpost) {
                        if (err) return console.error(err);
                        counter += 1;
                        console.log(thisBlogpost.title + " saved!");
                        if(counter == nBlogposts){
                            res.json(true);   
                        }
                    });
                }else{
                    counter += 1;
                    if(counter == nBlogposts){
                        res.json(true);   
                    }
                }
            });
        } else {throw err;}
    });
});
router.get('/markAllExamPatterns', function(req, res) {
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
                var find = "exam pattern";
                var find2 = "EXAM PATTERN";
                var fIndex = thisTitle.toLowerCase().indexOf(find);
                thisBlogpost._published = thisBlogpost._created;
                if(fIndex != -1){
                    thisBlogpost.blogSeries = "Exam Pattern";
                    
                    var fIndex2 = thisTitle.indexOf(find2);
                    if(fIndex2 != -1){
                        thisBlogpost.title = thisBlogpost.title.replace(find2, "Exam Pattern");
                    }
                    thisBlogpost.save(function(err, thisBlogpost) {
                        if (err) return console.error(err);
                        counter += 1;
                        console.log(thisBlogpost.title + " saved!");
                        if(counter == nBlogposts){
                            res.json(true);   
                        }
                    });
                }else{
                    counter += 1;
                    if(counter == nBlogposts){
                        res.json(true);   
                    }
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

router.get('/oneOff', function(req, res) {
    var idSeries = [
    {_id:"59b392df93c12f7249407948", series:"Best Books",},
{_id:"59b6bded3995b654f42c4421", series:"Best Books",},
{_id:"59b8bfa783491c7188c95134", series:"Best Books",},
{_id:"59bcecb4478bc84f3d61c77b", series:"Best Books",},
{_id:"59c68b56930cdc36a00b0f22", series:"Best Books",},
{_id:"59dfb261bf2e2b184f277d87", series:"Best Books",},
{_id:"59e5e80ce6ae2e1317e2d403", series:"Best Books",},
{_id:"59ef74838e5d940cb4fffc41", series:"Best Books",},
{_id:"5a27dd2e89c3742048a69051", series:"Best Books",},
{_id:"59c78eb32e9b4b3189483354", series:"Best Schools",},
{_id:"59cb2d8acb949048880252f0", series:"Best Schools",},
{_id:"59ccab38b0f13759585b1402", series:"Best Schools",},
{_id:"59f089fe748f040346cf7d6d", series:"Best Schools",},
{_id:"5a004eee33cf6046eb88c1cd", series:"Best Schools",},
{_id:"5a29239a61e5ec28dfa31b26", series:"Best Schools",},
{_id:"5a2beb65a5e4731d40c085bb", series:"Best Schools",},
{_id:"5a3504f0b1f83f22e2babde4", series:"Best Schools",},
{_id:"5998463b0bf13b5aed3471bd", series:"Build Resume",},
{_id:"59a27eb66e750272f1c588c4", series:"Build Resume",},
{_id:"59abb92feac7b55e0c16c511", series:"Build Resume",},
{_id:"59d349e3f50f80629d29e174", series:"Build Resume",},
{_id:"59e63a246bd00d2b5c426f0d", series:"Build Resume",},
{_id:"59731f29bc969b0253505a4b", series:"Build Resume",},
{_id:"59bb6e1bfb6ab544fa4fafe5", series:"Build Resume",},
{_id:"59c0dc00b10c6d7746ce4370", series:"Build Resume",},
{_id:"59d8dfaf7668b112aa7a38a6", series:"Build Resume",},
{_id:"5a2691beac132e75fd4719ba", series:"Build Resume",},
{_id:"5a26a594ad18e60224f820d1", series:"Build Resume",},
{_id:"5a26ab6eec3bd709766d6775", series:"Build Resume",},
{_id:"5a2fe2f2ada780347d82ff29", series:"Build Resume",},
{_id:"598c91b374fa4b5860787bb4", series:"Career",},
{_id:"59ba0bb349987357ea34b1c5", series:"Career",},
{_id:"59d278f68d08101bc89051c4", series:"Career",},
{_id:"59cb6e14cb9490488802539e", series:"Degrees",},
{_id:"59ccce7f19d4486386526e48", series:"Degrees",},
{_id:"59d24cd38d08101bc8904c35", series:"Degrees",},
{_id:"59d356e6f50f80629d29e31f", series:"Degrees",},
{_id:"59d5dcfb53223c63ecd754a3", series:"Degrees",},
{_id:"59d5f11a451e130209f69b5e", series:"Degrees",},
{_id:"59d5fed2286739124a827ed5", series:"Degrees",},
{_id:"59d78791abe69c4ea24f84cc", series:"Degrees",},
{_id:"59d8e7ab9eee2416c166a762", series:"Degrees",},
{_id:"59db1ef75d25515c5106ed69", series:"Degrees",},
{_id:"59f0931e6ff23f089f5aa934", series:"Degrees",},
{_id:"59f0b0ca84126924ee33a3e4", series:"Degrees",},
{_id:"59fc301c1845a75df2b565f9", series:"Degrees",},
{_id:"59fc36a4d486a960951ed0bf", series:"Degrees",},
{_id:"59fc4f1ef6c3986decf273f5", series:"Degrees",},
{_id:"5a252e002fe23d54b3e3484b", series:"Degrees",},
{_id:"5a252e6fc9e583554cc5bcd3", series:"Degrees",},
{_id:"5a2fe9d8b671783a9f5bff57", series:"Degrees",},
{_id:"5a2ffa3020b4ef4867a81008", series:"Degrees",},
{_id:"59b4fb1f7d0b5a52cc8503a7", series:"EdBites",},
{_id:"59b53542033cbc5fa9d38bfc", series:"EdBites",},
{_id:"59b697c423a129499ca2c650", series:"EdBites",},
{_id:"59b7ce325e3b382b5b623c5a", series:"EdBites",},
{_id:"59b9276c4e1e811157deee33", series:"EdBites",},
{_id:"59ba62a1ca9b8877e45d47ad", series:"EdBites",},
{_id:"59bbd04ad7dde1755d710f7f", series:"EdBites",},
{_id:"59bd1360478bc84f3d61cb00", series:"EdBites",},
{_id:"59be6012535f823a840e3c7e", series:"EdBites",},
{_id:"59bfad55a7b25828dc8728d2", series:"EdBites",},
{_id:"59c10a23bf64ab1062c34dfa", series:"EdBites",},
{_id:"59c271b226798c725de7608a", series:"EdBites",},
{_id:"59c3a6daa09cab581dc5b610", series:"EdBites",},
{_id:"59c4e9400225622e5dd413f6", series:"EdBites",},
{_id:"59c62b1b53e63c193ef243bc", series:"EdBites",},
{_id:"59c90bd10d56a84969f40f9c", series:"EdBites",},
{_id:"59ca33a426038f1e970b46c4", series:"EdBites",},
{_id:"59cb84dccb94904888025409", series:"EdBites",},
{_id:"59ccc2fd2b246e5e61975952", series:"EdBites",},
{_id:"59ce2211f6c0cb52d041e6be", series:"EdBites",},
{_id:"59cf3f05cc73e52b6d9ddc66", series:"EdBites",},
{_id:"59d09c9b9a5353215ecfb1ad", series:"EdBites",},
{_id:"59d236b5452bc4120cbfdae0", series:"EdBites",},
{_id:"59d38e7c5978177816894618", series:"EdBites",},
{_id:"59d4dd3b80a2876feb5c79e0", series:"EdBites",},
{_id:"59d633f2ac461957b773d75a", series:"EdBites",},
{_id:"59d77987882fd83f99db5a07", series:"EdBites",},
{_id:"59d7b3a1d4d3577aaa9a4033", series:"EdBites",},
{_id:"59da35da1c55b236d757829d", series:"EdBites",},
{_id:"59db7521b949640a526704f2", series:"EdBites",},
{_id:"59dcbfbee9882d122fc0216f", series:"EdBites",},
{_id:"59de1718fd9cab2dfd07472b", series:"EdBites",},
{_id:"59dfa0a95e39c403e9f02fb4", series:"EdBites",},
{_id:"59e0cbc21244b9744c91f80d", series:"EdBites",},
{_id:"59e394ce8404306ad99c09cd", series:"EdBites",},
{_id:"59e4c7000ce3df0203aacbcf", series:"EdBites",},
{_id:"59e6459d75c4e62cdebebbcb", series:"EdBites",},
{_id:"59e76be32c62a710dae763fd", series:"EdBites",},
{_id:"59ee083ee7f71069c2e74038", series:"EdBites",},
{_id:"59eed6872012bb264d726ccf", series:"EdBites",},
{_id:"59ef47b835259e70b01dce0c", series:"EdBites",},
{_id:"59f061f9bfa3dd721f72b296", series:"EdBites",},
{_id:"59f08b8a4efe96046cae17a1", series:"EdBites",},
{_id:"59f19682d9376216a7674456", series:"EdBites",},
{_id:"59f21dc95a2fd555be4d956a", series:"EdBites",},
{_id:"59f3766b0c4e9d71585fae44", series:"EdBites",},
{_id:"59f611989bd3363d24b8ccd0", series:"EdBites",},
{_id:"59f72465ff7c22732f3b834f", series:"EdBites",},
{_id:"59f884d803404d2c5afdaf27", series:"EdBites",},
{_id:"59f9d2aa1206b64ad6fef5e4", series:"EdBites",},
{_id:"59fb2741bcf8fa0352b618ed", series:"EdBites",},
{_id:"59fcbe55192ee027b13d3882", series:"EdBites",},
{_id:"59fde66bc7836f3ea5086cab", series:"EdBites",},
{_id:"59ff15655286bf3ba05a0052", series:"EdBites",},
{_id:"5a0077e4fb320a59544833ea", series:"EdBites",},
{_id:"5a01527f2a6b2025729e782d", series:"EdBites",},
{_id:"5a02d9dfcea118187332c6a9", series:"EdBites",},
{_id:"5a0473e20974966da1b4dbd6", series:"EdBites",},
{_id:"5a06ccea76c466559ddb7b55", series:"EdBites",},
{_id:"5a07364011c8f319e14bea91", series:"EdBites",},
{_id:"5a0848f84955623dd7a76818", series:"EdBites",},
{_id:"5a0989cdab7082179fdff7e7", series:"EdBites",},
{_id:"5a0c195709b3644a9df9b423", series:"EdBites",},
{_id:"5a0d4289d1a6a47ae1ad90d1", series:"EdBites",},
{_id:"5a0de3b7093ec856a17b029e", series:"EdBites",},
{_id:"5a0ea392011d8a18fe68137e", series:"EdBites",},
{_id:"5a0fe7c58b98cc462ebd8218", series:"EdBites",},
{_id:"5a114e7008093f48e679c814", series:"EdBites",},
{_id:"5a12e0de84ceb0439df5566a", series:"EdBites",},
{_id:"5a142bba1b588f61c2490b03", series:"EdBites",},
{_id:"5a15520440037a746704685f", series:"EdBites",},
{_id:"5a16c09f1b1ebf0471e4ac36", series:"EdBites",},
{_id:"5a1802d64aa7770ede19da0b", series:"EdBites",},
{_id:"5a19547a4278021d65df7359", series:"EdBites",},
{_id:"5a1a946a3d02c13472364547", series:"EdBites",},
{_id:"5a1c1d00c5bab517bfc58c06", series:"EdBites",},
{_id:"5a1d70f0263e6f2935fa8b0d", series:"EdBites",},
{_id:"5a1ee008fb54f94e59912f24", series:"EdBites",},
{_id:"5a2026c65027a027020de61a", series:"EdBites",},
{_id:"5a2163204f88613b60d71a85", series:"EdBites",},
{_id:"5a22df95f9d46821e6374514", series:"EdBites",},
{_id:"5a244014b6bf550cb11a05da", series:"EdBites",},
{_id:"5a257d48c88d0772acabdc6f", series:"EdBites",},
{_id:"5a269f114547997e2347948b", series:"EdBites",},
{_id:"5a27a5c06053a01004966ed5", series:"EdBites",},
{_id:"5a2910620d67201cc2ac4b14", series:"EdBites",},
{_id:"5a2ab764b90a972a9177be14", series:"EdBites",},
{_id:"5a2c2709d7261c3477505015", series:"EdBites",},
{_id:"5a2e2c40ac5d66414d006c36", series:"EdBites",},
{_id:"5a2e88aae27580731f639870", series:"EdBites",},
{_id:"5a2f748f61b4b454c085779f", series:"EdBites",},
{_id:"5a311aab1ba1d335d07e7de0", series:"EdBites",},
{_id:"5a32aa991f64e8551d0d0fef", series:"EdBites",},
{_id:"5a340019f846f903f9ca2059", series:"EdBites",},
{_id:"5a3556de0144164e2b145df3", series:"EdBites",},
{_id:"5a36a9171d74e23fa111b978", series:"EdBites",},
{_id:"5a37d0bf9e9daa30c78a9296", series:"EdBites",},
{_id:"5a39209e88c83d519d410ca2", series:"EdBites",},
{_id:"5a3a881723778827d6bec4c1", series:"EdBites",},
{_id:"5a3bd1e1fdbf5f55aad101d6", series:"EdBites",},
{_id:"59c8f55946997b4008442842", series:"Exam Pattern",},
{_id:"59c9e4994e6bdb0143fc9133", series:"Exam Pattern",},
{_id:"59ca6f3e9547ee3554689a69", series:"Exam Pattern",},
{_id:"59ca74d29547ee3554689a7c", series:"Exam Pattern",},
{_id:"59cb732fcb949048880253b4", series:"Exam Preparation",},
{_id:"5a00a84f1cef026af8f68dd2", series:"Exam Preparation",},
{_id:"5a13c034544bdf25a6e20249", series:"Exam Preparation",},
{_id:"5a2277e38a3c485df903471a", series:"Exam Preparation",},
{_id:"5a2a9ce180fe0d207fc8171b", series:"Exam Preparation",},
{_id:"596e5e7a081ae111c6af0b17", series:"Exam Preparation",},
{_id:"598abbf7ebd152409a445c19", series:"Exam Preparation",},
{_id:"596e6aa1081ae111c6af0c1d", series:"Expert Reviews",},
{_id:"59d1d0a31dc4097bb9cc4ac3", series:"Expert Reviews",},
{_id:"59d23a0e8d08101bc89049b0", series:"Expert Reviews",},
{_id:"59d3cc00efa9681231bee959", series:"Expert Reviews",},
{_id:"59d3d1a71c37a812e8da9680", series:"Expert Reviews",},
{_id:"59d66221cbc0ce268171f640", series:"Expert Reviews",},
{_id:"59dc81e7185eae21185d695f", series:"Expert Reviews",},
{_id:"59dc94535e0f7e6885b31974", series:"Expert Reviews",},
{_id:"59dc94a92eb7dc6a368470ba", series:"Expert Reviews",},
{_id:"59dca365e1cecb1ff276e7f4", series:"Expert Reviews",},
{_id:"59ddd7abcf8d170f7184aa25", series:"Expert Reviews",},
{_id:"59e71a3efd263476922d7aa8", series:"Expert Reviews",},
{_id:"59f0d5cac4bbb743e5b59aa4", series:"Expert Reviews",},
{_id:"59f0da47059c3e45cf7d4b09", series:"Expert Reviews",},
{_id:"59f0dda160866c471e13e6ea", series:"Expert Reviews",},
{_id:"59f1ea7b24a08242e1bbb475", series:"Expert Reviews",},
{_id:"59f1f20c6d3f5e44c85b85b2", series:"Expert Reviews",},
{_id:"59f1fd3712dbf449bcb168ab", series:"Expert Reviews",},
{_id:"59f21093e532f34f96a25eef", series:"Expert Reviews",},
{_id:"59f2ca7daf7142227a1fc19a", series:"Expert Reviews",},
{_id:"59f2ce215b8a1223b98e950e", series:"Expert Reviews",},
{_id:"59f45e0cd61fe85eec5f9585", series:"Expert Reviews",},
{_id:"5a054ccad153e65259767624", series:"Expert Reviews",},
{_id:"5a0ad9a03e541173f5224338", series:"Expert Reviews",},
{_id:"5a0bdcec771d23173f892583", series:"Expert Reviews",},
{_id:"5a0bed243e361d25d0bd6aad", series:"Expert Reviews",},
{_id:"5a0c303370f16e567aa6f1b4", series:"Expert Reviews",},
{_id:"5a0c304670f16e567aa6f1b6", series:"Expert Reviews",},
{_id:"5a0c9d0e5541ec0f5b0c7f63", series:"Expert Reviews",},
{_id:"5a0cb2b428d76a17a14f8afc", series:"Expert Reviews",},
{_id:"5a0d3031df8f4f70501b0b2d", series:"Expert Reviews",},
{_id:"5a0d370bff3dfc751171fa62", series:"Expert Reviews",},
{_id:"5a0d39faff3dfc751171fa84", series:"Expert Reviews",},
{_id:"5a0d416c5aec08799759dc8b", series:"Expert Reviews",},
{_id:"5a0d43f2d1a6a47ae1ad90da", series:"Expert Reviews",},
{_id:"5a0d4cf2d7d3ea7f374a02ae", series:"Expert Reviews",},
{_id:"5a0d564eadb145081aaa2c44", series:"Expert Reviews",},
{_id:"5a0d67456c3bbf0f0480b53b", series:"Expert Reviews",},
{_id:"5a0d6bc2303ce412ba96b580", series:"Expert Reviews",},
{_id:"5a0d6c1dad02d41344b289af", series:"Expert Reviews",},
{_id:"5a0d6e21d04f88140ea34631", series:"Expert Reviews",},
{_id:"5a0d7048d04f88140ea34666", series:"Expert Reviews",},
{_id:"5a0d73fd4c4d6316affdecc5", series:"Expert Reviews",},
{_id:"5a0da16e3cf9c02ebce52883", series:"Expert Reviews",},
{_id:"5a0dab322874ab33602963ba", series:"Expert Reviews",},
{_id:"5a0db264cfff6a38018e22d3", series:"Expert Reviews",},
{_id:"5a0dc1616f52943f7868b4e4", series:"Expert Reviews",},
{_id:"5a0df0035b972b5cd8bd0113", series:"Expert Reviews",},
{_id:"5a0df8679e58ec5febee95a7", series:"Expert Reviews",},
{_id:"5a0eef5c37467d4823120e2e", series:"Expert Reviews",},
{_id:"5a105939a23ed879506c7b14", series:"Expert Reviews",},
{_id:"5a105aadba83727a4a095b56", series:"Expert Reviews",},
{_id:"5a105ca5ba83727a4a095b8f", series:"Expert Reviews",},
{_id:"5a105cb4cc8b297ba319efbc", series:"Expert Reviews",},
{_id:"5a10631a893da47f369faf67", series:"Expert Reviews",},
{_id:"5a11c8c5d012836bcd2d105a", series:"Expert Reviews",},
{_id:"5a11c8d2d012836bcd2d105c", series:"Expert Reviews",},
{_id:"5a11c8d7d012836bcd2d1078", series:"Expert Reviews",},
{_id:"5a11c8ded012836bcd2d107b", series:"Expert Reviews",},
{_id:"5a11d017f9c0306dbe9b7acd", series:"Expert Reviews",},
{_id:"5a11d039f9c0306dbe9b7ad1", series:"Expert Reviews",},
{_id:"5a11d040f9c0306dbe9b7ad3", series:"Expert Reviews",},
{_id:"5a11d632c62f966fa64f9707", series:"Expert Reviews",},
{_id:"5a167cfca3225b67ee332a91", series:"Expert Reviews",},
{_id:"5a1688fdeaa60a6d598d3a6f", series:"Expert Reviews",},
{_id:"5a16a04b6098b8753d90e71d", series:"Expert Reviews",},
{_id:"5a16aad42d8fc77990d1d7e0", series:"Expert Reviews",},
{_id:"5a16beaa1b1ebf0471e4ac1e", series:"Expert Reviews",},
{_id:"5a1bf8f65235ee7f688dc1a6", series:"Expert Reviews",},
{_id:"5a1eda2b5efbb7485b8b0c1c", series:"Expert Reviews",},
{_id:"5a1eda325efbb7485b8b0c1e", series:"Expert Reviews",},
{_id:"5a1eda69126ce3492ef38c67", series:"Expert Reviews",},
{_id:"5a1eda6e126ce3492ef38c69", series:"Expert Reviews",},
{_id:"5a1edabc54aa7d496b72c831", series:"Expert Reviews",},
{_id:"5a1edb0054aa7d496b72c836", series:"Expert Reviews",},
{_id:"5a1edb369700d14a738b2b06", series:"Expert Reviews",},
{_id:"5a22b876c601d703ca7c8eb9", series:"Expert Reviews",},
{_id:"5a00460fbec4cc4181c08c31", series:"Job",},
{_id:"5a09710b3ffc8e7878d48c0e", series:"Job",},
{_id:"5a02d72c24033f17b4c21c71", series:"Parents Corner",},
{_id:"59731432f112f46a166f2ebb", series:"Top 10 Online",},
{_id:"59733286a135090a55579587", series:"Top 10 Online",},
{_id:"597706a0f959d2116d606018", series:"Top 10 Online",},
{_id:"597870ed119b830c8956df43", series:"Top 10 Online",},
{_id:"5979f8663f57c37127d94a7d", series:"Top 10 Online",},
{_id:"5985aab109803e29210c26f3", series:"Top 10 Online",},

    
];
    res.json(true);
    var allIds = idSeries.map(function(a) {return a._id;});
    
    var changecounter = 0;
    var counter = 0;
    var allBlogs = blogpost
        .find({ '_id': { $in : allIds} }, { blogSeries: 1})
        .exec(function (err, allBlogs) {
            
        if (!err){
            if(allBlogs){
                var nBlogs = allBlogs.length;
                console.log(nBlogs);
                allBlogs.forEach(function(rBlogpost, bindex){
                    var bIndex = allIds.indexOf(rBlogpost._id.toString());
                    
                    if(bIndex != -1){
                        
                        var newSeries = idSeries[bIndex].series;
                        if(newSeries != rBlogpost.blogSeries){
                            changecounter += 1;
                            
                            rBlogpost.blogSeries = newSeries;
                            rBlogpost.save(function(err, rBlogpost) {
                            if (err) return     console.error(err);
                                console.log("Saved: " + rBlogpost._id + " " + rBlogpost.blogSeries + " to " + newSeries);
                                //res.json(rBlogpost._id);
                            });
                        }
                        counter += 1;
                        if(counter == nBlogs){
                            console.log("Total " + changecounter + " changes!");
                        }
                        
                    }
                    
                });
                
            }else{
                //res.json(null);
            }
        } else {throw err;}
    });
});



router.get('/recommenedBlogs/:blogpostSlug', function(req, res) {
    // 25, 25, 25, 25
    var recommenedBlogs = {
        blogSeries: [],
        blogAuthor: [],
        examBlogs: [],
        coachingBlogs: [],
    };
    var excludedList = ['EdBites'];
    var examBlogsExcludedList = ['Expert Reviews']; //'Degrees'
    var blogpostSlug = req.params.blogpostSlug;
    
    var thisBlogpost = blogpost
        .findOne({ 'urlslug': blogpostSlug }, { blogSeries: 1, exams : 1, coachingGroups: 1, user: 1 })
        //.deepPopulate('blogTags')
        .exec(function (err, thisBlogpost) {
            
        if (!err){
            if(thisBlogpost){
            var examArray = [];
            var coachingArray = [];
            var blogSeries = null;
            var blogAuthor = null;

            if(thisBlogpost.blogSeries && thisBlogpost.blogSeries != ''){
                blogSeries = thisBlogpost.blogSeries
            }
            if(thisBlogpost.user){
                blogAuthor = thisBlogpost.user.toString();
            }
            if(thisBlogpost.exams && thisBlogpost.exams.length > 0){
                examArray = thisBlogpost.exams;
            }
            if(thisBlogpost.coachingGroups && thisBlogpost.coachingGroups.length > 0){
                coachingArray = thisBlogpost.coachingGroups;
            }
            

            //console.log(blogSeries + " | " + blogAuthor + " | " + examArray.length  + " | " + coachingArray.length);

            /**/
            var blogposts = blogpost
            .find({ _id: {$ne: thisBlogpost._id.toString() },active: true, blogSeries: {$nin: excludedList} , $or: [ {blogSeries : blogSeries}, { user: blogAuthor }, { exams: { $in: examArray } }, { coachingGroups: { $in: coachingArray } }  ] }, {title: 1, blogSeries: 1, exams: 1, coachingGroups: 1, user: 1, coverPhoto: 1, readingTime: 1, _published: 1, seoDescription: 1, urlslug: 1})
            .sort( { _published: -1 } )
            //.limit(50)
            .exec(function (err, blogposts) {
            if (!err){

                if(blogposts && blogposts.length > 0){
                    var nBlogs = blogposts.length;
                    var counter = 0;
                    if(nBlogs == 0){
                        res.json(recommenedBlogs);
                    }
                    
                    console.log(blogposts.length);
                    if(!thisBlogpost.exams){
                        thisBlogpost.exams = [];
                    }
                    if(!thisBlogpost.coachingGroups){
                        thisBlogpost.coachingGroups = [];
                    }
                    blogposts.forEach(function(rBlogpost, bindex){
                        var rUser = null;
                        if(rBlogpost.user){
                            rUser = rBlogpost.user.toString();
                        }
                        //console.log(rUser + " | " + blogAuthor);

                        if(rUser == blogAuthor){
                            recommenedBlogs.blogAuthor.push(rBlogpost);
                        }else if(rBlogpost.blogSeries == blogSeries){
                            recommenedBlogs.blogSeries.push(rBlogpost);
                        }else if(rBlogpost.exams && thisBlogpost.exams && thisBlogpost.exams.length > 0 && (examBlogsExcludedList.indexOf(rBlogpost.blogSeries) == -1)){
                            console.log("--- " + rBlogpost.blogSeries + " --- " + examBlogsExcludedList.indexOf(rBlogpost.blogSeries) );
                            var commonElements = [];
                           
                            rBlogpost.exams.forEach(function(thisExam, eindex){
                                if(thisBlogpost.exams.indexOf(thisExam) != -1){
                                    commonElements.push(thisExam);
                                }


                            });
                            if(commonElements.length > 0){
                                recommenedBlogs.examBlogs.push(rBlogpost);
                            }

                        }else if(rBlogpost.coachingGroups && thisBlogpost.coachingGroups){
                            var commonElements = [];
                            rBlogpost.coachingGroups.forEach(function(thisCoaching, cindex){
                                console.log(thisCoaching);
                                if(thisBlogpost.coachingGroups.indexOf(thisCoaching) != -1){
                                    commonElements.push(thisCoaching);
                                }


                            });
                            console.log(commonElements);
                            if(commonElements.length > 0){
                                recommenedBlogs.coachingBlogs.push(rBlogpost);
                            }

                        }

                        counter += 1;
                        if(counter == nBlogs){
                            var nLimit = 4;
                            if(recommenedBlogs.blogSeries.length > nLimit){
                                recommenedBlogs.blogSeries = recommenedBlogs.blogSeries.slice(0, nLimit);
                            }
                            if(recommenedBlogs.blogAuthor.length > nLimit){
                                recommenedBlogs.blogAuthor = recommenedBlogs.blogAuthor.slice(0, nLimit);
                            }
                            if(recommenedBlogs.examBlogs.length > nLimit){
                                recommenedBlogs.examBlogs = recommenedBlogs.examBlogs.slice(0, nLimit);
                            }
                            if(recommenedBlogs.coachingBlogs.length > nLimit){
                                recommenedBlogs.coachingBlogs = recommenedBlogs.coachingBlogs.slice(0, nLimit);
                            }
                            
                            res.json(recommenedBlogs);
                        }
                    });
                }else{
                    res.json([]);
                }

            } else {throw err;}
            });

            /*var blogposts = blogpost
            .find({ active: true , $or: [ {blogSeries : blogSeries}, { user: blogAuthor }, { exams: { $in: examArray } }, { coachingGroups: { $in: coachingArray } }  ] }, {title: 1, blogSeries: 1, exams: 1, coachingGroups: 1})
            .sort( { _published: -1 } )
            .exec(function (err, blogposts) {
            if (!err){

                if(blogposts && blogposts.length > 0){
                    console.log(blogposts.length);
                    if(!thisBlogpost.exams){
                        thisBlogpost.exams = [];
                    }
                    if(!thisBlogpost.coachingGroups){
                        thisBlogpost.coachingGroups = [];
                    }
                    blogposts.forEach(function(thisBlogpost, bindex){
                        console.log(thisBlogpost.blogSeries + " | " + thisBlogpost.title + " | " + thisBlogpost.exams.length + " | " + thisBlogpost.coachingGroups.length );
                    });
                }else{
                    //res.json([]);
                }

            } else {throw err;}
            });*/


            //res.json(thisBlogpost);
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
                .findOne({_id : userId},{basic:1, blogger:1, image:1, facebookId: 1})
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
        
        var allProviderBlogposts = coaching
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

router.post('/clone', function(req, res) {
    
    var cloneForm = req.body;
    console.log(cloneForm);
    var fromId = cloneForm.from.toString();
    var userId = cloneForm.userId.toString();
    var title = cloneForm.title;
    var urlslug = cloneForm.urlslug;
    
    
    
    
    if(fromId && userId && title){
        var existingBlogpost = blogpost
        .findOne({_id: fromId})
        .exec(function (err, existingBlogpost) {
            if (!err){
            if(existingBlogpost){
                var newBlogPost = new blogpost({});
                var excludedList = ['_id', 'upvotes','_v', '_created', '_published', '_saved', '_autosaved', 'flipboard', 'title' ];
                var includedList = ["readingTime", "coverPhoto", "infographic", "content", "blogTags", "blogSeries", "exams", "coachingGroups", "seoKeywords", "seoDescription"];
                for (var property in existingBlogpost) {
                     if(includedList.indexOf(property.toString()) != -1){
                        newBlogPost[property] = existingBlogpost[property];
                    }
                }
                newBlogPost.active = false;
                newBlogPost.user = userId;
                newBlogPost.title = title;
                newBlogPost.urlslug = urlslug;
                newBlogPost.save(function(err, newBlogPost) {
                    if (err) return console.error(err);
                    console.log('New Blog saved with Id: ' + newBlogPost._id);
                    res.json(newBlogPost);
                });
                
            }else{
                res.json(null);
            }
            } else {throw err;}
        });
        
        
    }else{
        res.json(null);
    }
    
    
    
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
        blogpostForm.user = blogpostForm.user._id.toString();
    }
    
    if(blogpostId){
        var existingBlogpost = blogpost
        .findOne({_id: blogpostId})
        .deepPopulate('blogTags')
        .exec(function (err, existingBlogpost) {
            if (!err){
            if(existingBlogpost){
                
                if(savedBy){
                    if(!blogpostForm.user){
                        blogpostForm.user = savedBy;
                    }
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
            console.log(blogpostForm);
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