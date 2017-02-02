var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var teacher = require('../app/models/teacher');
var subject = require('../app/models/subject');
var exam = require('../app/models/exam');
var eval = require('../app/models/eval');
var batch = require('../app/models/batch');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a teacher
router.post('/add', function(req, res) {
    var thisExam = req.body;
    var thisSubjectId = thisExam._subject;
    console.log("Exam is: " + JSON.stringify(thisExam));
    //console.log("Institute is: " + JSON.stringify(thisInstitute));
    //console.log(thisSubjectId);
    
    thisSubject = subject.findOne({ '_id': thisSubjectId },function (err, thisSubject) {
        if (err) return handleError(err);
        
        var this_exam = new exam({
            _subject:thisSubject._id,
            info: {
                name: thisExam.info.name,    
                type: thisExam.info.type,   
                date: thisExam.info.date, 
                maxMarks: thisExam.info.maxMarks,  
                weightage: thisExam.info.weightage  
            }
        });
        this_exam.save(function(err, this_exam) {
            if (err) return console.error(err);
            console.log("Saved exam with id: " + this_exam._id);
            
            //save teacher in the institute data
            thisSubject._exams.push(this_exam);
            thisSubject.save(function(err, thisSubject) {
                if (err) return console.error(err);
                console.log("Saved exam in the subject ");
            });
            //save reference to institute
            res.json(thisSubject._id);
        });
    });
});

//to get all teachers
router.get('/', function(req, res) {
    exam.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular teacher with _id teacherId
router.get('/edit/:examId', function(req, res) {
    var examId = req.params.examId;
    console.log(examId);
    exam
        .findOne({ '_id': examId })
        .deepPopulate('_subject _subject._batch _subject._globalSubject _subject._batch.students')
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});
module.exports = router;