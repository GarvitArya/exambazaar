var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
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
    console.log("Exam is: " + JSON.stringify(examName));
    var existingExam = exam.findOne({ '_id': examId },function (err, existingExam) {
        if(existingExam){
            for (var property in thisExam) {
                existingExam[property] = thisExam[property];
                //console.log(existingExam[property]);
            }
            console.log("Exam is: " + JSON.stringify(existingExam));
            existingExam.save(function(err, existingExam) {
                if (err) return console.error(err);
                console.log(existingExam._id + " saved!");
                res.json('Done');
            });
        }else{
           var this_exam = new exam({
                name : thisExam.name,
                displayname : thisExam.displayname,
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
                qualify : thisExam.qualify,
                colleges : thisExam.qualify,
                doubts : thisExam.qualify
            });
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
            console.log(docs);
            res.json(docs);
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
            allExams.forEach(function(thisExam, index){
                if(thisExam.stream.name == streamName){
                    streamExams.push(thisExam);
                }
            });
            console.log(streamExams);
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
            console.log(thisExam);
            res.json(thisExam);
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
    console.log("Exam is " + examId);
    exam
        .findOne({ '_id': examId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

module.exports = router;