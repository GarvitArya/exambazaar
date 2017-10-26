var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
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
    var allExams = exam
        .find({ })
        .deepPopulate('stream')
        .exec(function (err, allExams) {
        if (!err){
            var streamExams = [];
            //console.log(allExams);
            allExams.forEach(function(thisExam, index){
                //console.log(thisExam);
                if(thisExam.stream.name == streamName){
                    streamExams.push(thisExam);
                }
            });
            //console.log(streamExams);
            res.json(streamExams);
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