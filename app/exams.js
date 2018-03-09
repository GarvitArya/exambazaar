var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var stream = require('../app/models/stream');
var blogpost = require('../app/models/blogpost');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an exam
router.post('/save', function(req, res) {
    var thisExam = req.body;
    var examId = req.body._id;
    var examName = thisExam.name;
    //console.log("Exam is: " + JSON.stringify(thisExam.cycle));
    var existingExam = exam.findOne({ '_id': examId },function (err, existingExam) {
        if(existingExam){
            for (var property in thisExam) {
                existingExam[property] = thisExam[property];
                //console.log(existingExam[property]);
            }
            //console.log("Exam is: " + JSON.stringify(existingExam));
            existingExam.save(function(err, existingExam) {
                if (err) return console.error(err);
                //console.log(existingExam._id + " saved!");
                res.json('Done');
            });
        }else{
            var this_exam = new exam({});
            for (var property in thisExam) {
                this_exam[property] = thisExam[property];
            }
           /*var this_exam = new exam({
                name : thisExam.name,
                displayname : thisExam.displayname,
                rank : thisExam.rank,
                stream : thisExam.stream,
                what : thisExam.what,
                brochure : thisExam.brochure,
                website : thisExam.website,
                appear : thisExam.appear,
                registration : thisExam.registration,
                dates : thisExam.dates,
                syllabus : thisExam.syllabus,
                pattern : thisExam.pattern,
                preparation : thisExam.preparation,
                studysource : thisExam.studysource,
                previouspapers : thisExam.previouspapers,
                resultFormat : thisExam.resultFormat,
                qualify : thisExam.qualify,
                colleges : thisExam.qualify,
                doubts : thisExam.qualify
            });*/
            this_exam.save(function(err, this_exam) {
                if (err) return console.error(err);
                res.json(this_exam._id);
            }); 
        }
        
    });
});

//to get all exams
router.get('/', function(req, res) {
    //console.log('Here');
    exam
        .find({ })
        .deepPopulate('stream')
        .exec(function (err, docs) {
        if (!err){
            //var examNames = docs.map(function(a) {return a.name;});
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
    
});
router.get('/basic', function(req, res) {
    //console.log('Here');
    exam
        .find({active: true}, {name:1, displayname: 1, stream:1, rank: 1, seoname: 1, active:1})
        .deepPopulate('stream')
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
    
});

function slugify(string) {
      return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    };

router.get('/generateurlslugs', function(req, res) {
    res.json(true);
    
    
    var allExams = exam
        .find({active: true}, {name:1, exam_page_name: 1})
        //.deepPopulate('stream')
        .exec(function (err, allExams) {
        if (!err){
            
            allExams.forEach(function(thisExam, index){
                var examName = thisExam.exam_page_name + " Exam";
                
                thisExam.urlslug = slugify(examName);
                
                
                thisExam.save(function(err, thisExam) {
                if (err) return console.error(err);
                    console.log("Exam saved " + thisExam._id);
                    //res.json('Done');
                });
                
            });
            
        } else {throw err;}
    });
    
});

router.get('/markTrueFalse', function(req, res) {
    //console.log('Here');
    exam
        .find({}, {active: 1, active2:1})
        .exec(function (err, allExams) {
        if (!err){
            console.log(allExams.length);
            var nExams = allExams.length;
            var counter = 0;
            var trues = 0;
            var falses = 0;
            allExams.forEach(function(thisExam, index){
                console.log(typeof thisExam.active);
                if(thisExam.active == 'true'){
                    thisExam.active = true;
                    thisExam.save(function(err, thisExam) {
                    if (err) return console.error(err);
                        console.log("Exam saved " + thisExam._id);
                        //res.json('Done');
                    });
                }
                if(thisExam.active2){
                    trues += 1;
                    //thisExam.active2 = true;
                    thisExam.active = thisExam.active2;
                    thisExam.save(function(err, thisExam) {
                    if (err) return console.error(err);
                        console.log("Exam saved " + thisExam._id);
                        //res.json('Done');
                    });
                }else{
                    falses += 1;
                    thisExam.active = thisExam.active2;
                    thisExam.save(function(err, thisExam) {
                    if (err) return console.error(err);
                        console.log("Exam saved " + thisExam._id);
                        //res.json('Done');
                    });
                }
                counter += 1;
                if(counter == nExams){
                    console.log("Trues " + trues);
                    console.log("Falses " + falses);
                }
            });
            res.json(true);
            
        } else {throw err;}
    });
    
});

router.get('/stream/:streamName', function(req, res) {
    var streamName = req.params.streamName;
    
    var thisStream = stream
        .findOne({ 'name': streamName },{_id: 1})
        .exec(function (err, thisStream) {
        if (!err){ 
            if(thisStream){
                var streamId = thisStream._id.toString();
                var allExams = exam
                .find({stream: streamId, active: true}, {name:1, displayname:1, seoname: 1})
                .exec(function (err, allExams) {
                if (!err){
                    res.json(allExams);
                } else {throw err;}
            });
                
            }else{
                res.json([]);
            }
        } else {throw err;}
    });
    
    
    
});

router.get('/streamexam', function(req, res) {
    
    var allDegrees = blogpost
    .find({'blogSeries': 'Degrees', active: true}, {title: 1, urlslug: 1})
    .exec(function (err, allDegrees) {
    if (!err){
        var allDegreeIds = allDegrees.map(function(a) {return a._id.toString();});

        var allActiveStreams = stream
        .find({}, {displayname: 1, rank: 1, active: 1, name: 1, logo: 1})
        .sort("-rank")
        .exec(function (err, allActiveStreams) {
        if (!err){
            var streamIds = allActiveStreams.map(function(a) {return a._id.toString();});
            var streamNameRanks = allActiveStreams.map(function(a) {return {stream: a.displayname, logo: a.logo, rank: a.rank, active: a.active, name: a.name, degreeblogs: []};});

            var allActiveExams = exam
                .find({stream: {$exists: true}},{stream:1, seoname:1, rank: 1, name:1, examdegrees: 1, active: 1})
                .sort("-rank")
                .exec(function (err, allActiveExams) {
                if (!err){
                var streamExams = {};
                allActiveExams.forEach(function(thisExam, index){
                    var thisStreamId = thisExam.stream.toString();
                    var thisDegrees = thisExam.examdegrees;

                    var sIndex = streamIds.indexOf(thisStreamId);
                    if(sIndex != -1){
                        var thisStreamName = streamNameRanks[sIndex].stream;
                        if(!streamExams[thisStreamName]){
                            streamExams[thisStreamName] = [];

                        }
                        streamExams[thisStreamName].push(thisExam);

                        thisDegrees.forEach(function(thisBlogId, index){
                            var dIndex = allDegreeIds.indexOf(thisBlogId.toString());
                            if(dIndex != -1){
                                var thisStreamBlogs = streamNameRanks[sIndex].degreeblogs.map(function(a) {return a._id.toString();});
                                var tIndex = thisStreamBlogs.indexOf(thisBlogId.toString());

                                if(tIndex == -1){
                                    streamNameRanks[sIndex].degreeblogs.push(allDegrees[dIndex]);
                                }

                                //thisExam.examdegrees[index] = allDegrees[dIndex];
                            }

                        });
                    }

                });
                //console.log(streamExams);
                var streamExams = {
                    streamranks: streamNameRanks,   
                    streamexams: streamExams,   
                };
                res.json(streamExams);
                } else {throw err;}
            });

        } else {throw err;}
    });


    } else {throw err;}
    });
    
    
    
    
});
router.get('/exam/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam
        .findOne({'name': examName})
        .deepPopulate('stream')
        .exec(function (err, thisExam) {
        if (!err){
            //console.log(thisExam);
            res.json(thisExam);
        } else {throw err;}
    });
});

router.get('/examUrlSlug/:examUrlSlug', function(req, res) {
    var examUrlSlug = req.params.examUrlSlug;
    var thisExam = exam
        .findOne({'urlslug': examUrlSlug})
        .deepPopulate('stream')
        .exec(function (err, thisExam) {
        if (!err){
            //console.log(thisExam);
            res.json(thisExam);
        } else {throw err;}
    });
});
router.get('/exambasic/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam
        .findOne({'name': examName}, {logo:1, name:1, displayname: 1, rank: 1, seoname: 1, website: 1, briefDescription:1, frequency: 1, cycle:1})
        .exec(function (err, thisExam) {
        if (!err){
            //console.log(thisExam);
            res.json(thisExam);
        } else {throw err;}
    });
});
router.get('/pattern/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam
        .findOne({'name': examName},{exampattern:1})
        .deepPopulate('exampattern')
        .exec(function (err, thisExam) {
        if (!err){
            var exampattern = null;
            if(thisExam.exampattern){
                exampattern = thisExam.exampattern;
            }
            res.json(exampattern);
        } else {throw err;}
    });
});
router.get('/patternUrlSlug/:examUrlSlug', function(req, res) {
    var examUrlSlug = req.params.examUrlSlug;
    var thisExam = exam
        .findOne({'urlslug': examUrlSlug},{exampattern:1})
        .deepPopulate('exampattern')
        .exec(function (err, thisExam) {
        if (!err){
            var exampattern = null;
            if(thisExam.exampattern){
                exampattern = thisExam.exampattern;
            }
            res.json(exampattern);
        } else {throw err;}
    });
});
router.get('/books/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam
        .findOne({'name': examName},{exambooks:1})
        .deepPopulate('exambooks')
        .exec(function (err, thisExam) {
        if (!err){
            var exambooks = null;
            if(thisExam.exambooks){
                exambooks = thisExam.exambooks;
            }
            res.json(exambooks);
        } else {throw err;}
    });
});
router.get('/booksUrlSlug/:examUrlSlug', function(req, res) {
    var examUrlSlug = req.params.examUrlSlug;
    var thisExam = exam
        .findOne({'urlslug': examUrlSlug},{exambooks:1})
        .deepPopulate('exambooks')
        .exec(function (err, thisExam) {
        if (!err){
            var exambooks = null;
            if(thisExam.exambooks){
                exambooks = thisExam.exambooks;
            }
            res.json(exambooks);
        } else {throw err;}
    });
});
router.get('/degrees/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam
        .findOne({'name': examName},{examdegrees:1})
        //.deepPopulate('examdegrees')
        .exec(function (err, thisExam) {
        if (!err){
            var examdegrees = null;
            if(thisExam.examdegrees){
                examdegrees = thisExam.examdegrees;
            }
            var fullexamdegrees = [];
            if(!examdegrees){
                examdegrees = [];
                res.json(null);
            }else{
                
                examdegrees.forEach(function(thisBlogId, index){
                    examdegrees[index] = thisBlogId.toString();
                });
                var blogposts = blogpost
                    .find({_id: { $in : examdegrees }, active: true}, {title:1, coverPhoto: 1, urlslug: 1, readingTime: 1, seoDescription: 1})
                    .exec(function(err, blogposts) {
                    if (!err){
                        res.json(blogposts);
                    } else {throw err;}
                });
            }
            
            
        } else {throw err;}
    });
});
router.get('/degreesUrlSlug/:examUrlSlug', function(req, res) {
    var examUrlSlug = req.params.examUrlSlug;
    var thisExam = exam
        .findOne({'urlslug': examUrlSlug},{examdegrees:1})
        //.deepPopulate('examdegrees')
        .exec(function (err, thisExam) {
        if (!err){
            var examdegrees = null;
            if(thisExam.examdegrees){
                examdegrees = thisExam.examdegrees;
            }
            var fullexamdegrees = [];
            if(!examdegrees){
                examdegrees = [];
                res.json(null);
            }else{
                
                examdegrees.forEach(function(thisBlogId, index){
                    examdegrees[index] = thisBlogId.toString();
                });
                var blogposts = blogpost
                    .find({_id: { $in : examdegrees }, active: true}, {title:1, coverPhoto: 1, urlslug: 1, readingTime: 1, seoDescription: 1})
                    .exec(function(err, blogposts) {
                    if (!err){
                        res.json(blogposts);
                    } else {throw err;}
                });
            }
            
            
        } else {throw err;}
    });
});
router.get('/count', function(req, res) {
    exam.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


//to get a particular user with _id userId
router.get('/edit/:examId', function(req, res) {
    var examId = req.params.examId;
    //console.log("Exam is " + examId);
    exam
        .findOne({ '_id': examId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.post('/addCoverPhoto', function(req, res) {
    var newCoverPhotoForm = req.body;
    var coverphoto = newCoverPhotoForm.coverphoto;
    var examId = newCoverPhotoForm.examId;
    //console.log('Express received: ' + JSON.stringify(newCoverPhotoForm));
    
    var thisExam = exam
        .findOne({ _id: examId }, {officialpaperscoverphoto:1})
        .exec(function (err, thisExam) {
        if (!err){
            
            if(thisExam){
                thisExam.officialpaperscoverphoto = coverphoto;
                thisExam.save(function(err, thisExam) {
                    if (err) return console.error(err);
                    //console.log("Logo data saved for " + thisExam._id);
                    res.json('Done');
                });
            }else{
                console.log('No such exam');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

router.post('/addLogo', function(req, res) {
    var newLogoForm = req.body;
    var logo = newLogoForm.logo;
    var examId = newLogoForm.examId;
    //console.log('Express received: ' + JSON.stringify(newLogoForm));
    
    var thisExam = exam
        .findOne({ _id: examId }, {logo:1})
        .exec(function (err, thisExam) {
        if (!err){
            
            if(thisExam){
                thisExam.logo = logo;
                thisExam.save(function(err, thisExam) {
                    if (err) return console.error(err);
                    //console.log("Logo data saved for " + thisExam._id);
                    res.json('Done');
                });
            }else{
                console.log('No such exam');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

module.exports = router;