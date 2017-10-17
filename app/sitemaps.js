var express = require('express');
var router = express.Router();
var request = require("request");
var config = require('../config/mydatabase.js');
var stream = require('../app/models/stream');
var exam = require('../app/models/exam');
var blogpost = require('../app/models/blogpost');
var targetStudyProvider = require('../app/models/targetStudyProvider');

router.post('/p0', function(req, res) {
    var urls = ["https://www.exambazaar.com"];
    res.json(urls);
});
router.post('/p1', function(req, res) {
    var prefix = "https://www.exambazaar.com/stream";
    var separator = "/";
    var urls = [];
    urls.push(prefix);
    var allStreams = stream.find({active: {$ne: false}}, {name:1}, function(err, allStreams) {
    if (!err){
        var nStreams = allStreams.length;
        var counter = 0;
        allStreams.forEach(function(thisStream, index){
            var thisURL = prefix + separator + encodeURIComponent(thisStream.name);
            urls.push(thisURL);
            counter+= 1;
            if(counter == nStreams){
                res.json(urls);
            }
        });
    } else {throw err;}
    });
});

router.post('/blogurls', function(req, res) {
    //var mainblog = "https://www.exambazaar.com/blog";
    var prefix = "https://www.exambazaar.com/blogpost";
    var separator = "/";
    var urls = [];
    //urls.push(mainblog);
    //urls.push(prefix);
    var allBlogs = blogpost.find({active: true}, {urlslug:1}, function(err, allBlogs) {
    if (!err){
        var nBlogs = allBlogs.length;
        var counter = 0;
        allBlogs.forEach(function(thisBlog, index){
            var thisURL = prefix + separator + thisBlog.urlslug;
            urls.push(thisURL);
            counter+= 1;
            if(counter == nBlogs){
                res.json(urls);
            }
        });
    } else {throw err;}
    });
});

router.post('/blogrss', function(req, res) {
    //var mainblog = "https://www.exambazaar.com/blog";
    var prefix = "https://www.exambazaar.com/blogpost";
    var separator = "/";
    var urls = [];
    //urls.push(mainblog);
    //urls.push(prefix);
    var allBlogs = blogpost.find({active: true}, {title:1, seoDescription:1, _published:1, urlslug:1}, function(err, allBlogs) {
    if (!err){
        var nBlogs = allBlogs.length;
        var counter = 0;
        allBlogs.forEach(function(thisBlog, index){
            var thisURL = prefix + separator + thisBlog.urlslug;
            thisBlog.urlslug = thisURL;
            urls.push(thisBlog);
            counter+= 1;
            if(counter == nBlogs){
                res.json(urls);
            }
        });
    } else {throw err;}
    });
});

router.post('/exams', function(req, res) {
    //var mainblog = "https://www.exambazaar.com/blog";
    var prefix = "https://www.exambazaar.com/exam";
    var separator = "/";
    var urls = [];
    var allExams = exam.find({active: true}, {name:1}, function(err, allExams) {
    if (!err){
        var nExams = allExams.length;
        var counter = 0;
        allExams.forEach(function(thisExam, index){
            var examName = encodeURIComponent(thisExam.name);
            var thisURL = prefix + separator + examName;
            urls.push(thisURL);
            counter+= 1;
            if(counter == nExams){
                res.json(urls);
            }
        });
    } else {throw err;}
    });
});

router.post('/p2', function(req, res) {
    var prefix = "https://www.exambazaar.com/stream";
    var separator = "/";
    var urls = [];
    var allStreams = stream.find({active: {$ne: false}}, {name:1}, function(err, allStreams) {
    if (!err){
        var nStreams = allStreams.length;
        var scounter = 0;
        allStreams.forEach(function(thisStream, sindex){
            var thisStreamId = thisStream._id;
            var allExams = exam.find({active: {$ne: false}, stream: thisStreamId}, {name:1}, function(err, allExams) {
            if (!err){
                scounter += 1;
                var nExams = allExams.length;
                var ecounter = 0;
                allExams.forEach(function(thisExam, eindex){
                    var thisURL = prefix + separator + encodeURIComponent(thisStream.name) + separator + encodeURIComponent(thisExam.name);
                    urls.push(thisURL);
                    ecounter+= 1;
                    if(ecounter == nExams && scounter == nStreams){
                        res.json(urls);
                    }
                });
            } else {throw err;}
            });    
            
        });
    } else {throw err;}
    });
});
router.post('/p3', function(req, res) {
    var prefix = "https://www.exambazaar.com/stream";
    var separator = "/";
    var urls = [];
    
    
    var allCities = targetStudyProvider.distinct( ("city"),function(err, allCities) {
    if (!err){
        var nCities = allCities.length;
        var cCounter = 0;
        
        var allStreams = stream.find({active: {$ne: false}, name:{$ne: 'other'}}, {name:1}, function(err, allStreams) {
        if (!err){
            var nStreams = allStreams.length;
            var scounter = 0;
            allStreams.forEach(function(thisStream, sindex){
                var thisStreamId = thisStream._id;
                var allExams = exam.find({active: {$ne: false}, stream: thisStreamId}, {name:1}, function(err, allExams) {
                if (!err){
                    scounter += 1;
                    var nExams = allExams.length;
                    var ecounter = 0;
                    allExams.forEach(function(thisExam, eindex){
                        ecounter+= 1;
                        allCities.forEach(function(thisCity, cindex){
                            var thisURL = prefix + separator + encodeURIComponent(thisStream.name) + separator + encodeURIComponent(thisExam.name)+ separator + encodeURIComponent(thisCity);
                            urls.push(thisURL);
                            //console.log(thisURL);
                            
                            if(ecounter == nExams && scounter == nStreams && cindex == nCities - 1){
                                res.json(urls);
                            }
                            
                        });

                        
                    });
                } else {throw err;}
                });    

            });
        } else {throw err;}
        });
        
    } else {throw err;}
    }); 
});

router.post('/p3Aggregate', function(req, res) {
    var cityExamCounts = [];
    var allExams = exam.find({active: {$ne: false}}, {name:1}, function(err, allExams) {
        var nExams = allExams.length;
        var eCounter = 0;
        if (!err){
            allExams.forEach(function(thisExam, eindex){
                var thisExamId = thisExam._id;
                var groupNames = targetStudyProvider.aggregate(
                [
                    {$match: {disabled: false, exams: thisExamId, type:'Coaching'} },
                    {"$group": { "_id": { city: "$city" }, count:{$sum:1} } },
                    {$sort:{"count":-1}}
                ],function(err, groupNames) {
                if (!err){
                    groupNames.forEach(function(thisPair, index){
                        var newCityExamCount = {
                            exam: encodeURIComponent(thisExam.name),
                            city: encodeURIComponent(thisPair._id.city),
                            count: thisPair.count,
                        };
                        cityExamCounts.push(newCityExamCount);
                    });
                    eCounter += 1;
                    if(eCounter == nExams){
                        res.json(cityExamCounts);
                    }
                } else {throw err;}
                });
            });
        } else {throw err;}
    });
});

router.post('/p5', function(req, res) {
    var prefix = "https://www.exambazaar.com/group";
    var separator = "/";
    var urls = [];
    var examStreams = [];
    
    var allStreams = stream.find({active: {$ne: false}, name:{$ne: 'other'}}, {name:1}, function(err, allStreams) {
    if (!err){
        var nStreams = allStreams.length;
        var scounter = 0;
        allStreams.forEach(function(thisStream, sindex){
            var thisStreamId = thisStream._id;
            var allExams = exam.find({active: {$ne: false}, stream: thisStreamId}, {name:1}, function(err, allExams) {
            if (!err){
            scounter += 1;
            var nExams = allExams.length;
            var ecounter = 0;
            allExams.forEach(function(thisExam, eindex){
            ecounter+= 1;
            var newExamStream = {
                examId: thisExam._id,
                exam: thisExam.name,
                stream: thisStream.name,
            };
            examStreams.push(newExamStream);
            if(ecounter == nExams && scounter == nStreams){
                var examStreamIds = examStreams.map(function(a) {return a.examId.toString();});
                //console.log(examStreamIds);
                var groupNames = targetStudyProvider.aggregate(
                [
                    {$match: {disabled: false, exams: {$exists: true}} },
                    {"$group": { "_id": { groupName: "$groupName", city: "$city" }, exams: { $addToSet: "$exams" } } },
                    {$sort:{"count":-1}}
                ],function(err, groupNames) {
                if (!err){
                    var gCounter = 0;
                    var nGroups = groupNames.length;
                    groupNames.forEach(function(thisGroup, gindex){
                        gCounter += 1;
                        var coachingName = thisGroup._id.groupName;
                        var cityName = thisGroup._id.city;
                        var thisExamIds = thisGroup.exams[0];
                        var nExamIds = thisExamIds.length;
                        var exCounter = 0;
                        thisExamIds.forEach(function(thisExamId, eindex){
                            exCounter += 1;
                            var exsIndex = examStreamIds.indexOf(thisExamId.toString());
                            //console.log(thisExamId + " " + exsIndex);
                            if(exsIndex != -1){
                                var examStreamPair = examStreams[exsIndex];
                                var thisURL = prefix + separator + encodeURIComponent(examStreamPair.stream) + separator + encodeURIComponent(examStreamPair.exam)+ separator + encodeURIComponent(cityName) + separator + encodeURIComponent(coachingName);
                                urls.push(thisURL);
                                //console.log(thisURL);
                            }
                            //var thisURL = prefix + separator + encodeURIComponent(thisStream.name) + separator + encodeURIComponent(thisExam.name)+ separator + encodeURIComponent(thisCity) + separator + encodeURIComponent(thisGroup._id.groupName);
                            //urls.push(thisURL);
                            //console.log(thisURL);
                            //console.log(thisGroup);

                            if(gCounter == nGroups && exCounter == nExamIds){
                                res.json(urls);
                            }

                        });

                    });
                } else {throw err;}
                });





            }



            });
            } else {throw err;}
            });    

        });
    } else {throw err;}
    });
    
    
});


module.exports = router;