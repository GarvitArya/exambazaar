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

//to bulk save evaluations
router.post('/bulksave', function(req, res) {
    var evals = req.body;
    var _exam = evals._exam;
    var studentEvals = evals.studentEvals;
    //console.log("Exam is: " + JSON.stringify(evals));
    
    var itemsProcessed = 0;
    studentEvals.forEach(function(thisEval, index){
        var _student = thisEval._student;
        var score = thisEval.score;
        var feedback = thisEval.feedback;
        var absent = thisEval.absent;
        thisEval = eval.findOne({ '_exam': _exam, '_student': _student },function (err, thisEval) {
            if (err) return handleError(err);
            if(thisEval){
                //update the eval
                thisEval.score = score;
                thisEval.absent = absent;
                thisEval.feedback = feedback;
                thisEval.save(function(err, thisEval) {
                    if (err) return console.error(err);
                });
            }else{
                //create new eval
                var newEval = new eval({
                    _exam: _exam,
                    _student: _student,
                    score: score,
                    feedback: feedback,
                    absent: absent
                });
                newEval.save(function(err, newEval) {
                    if (err) return console.error(err);
                    console.log("New evaluation saved");
                });
            }
        });
    });
    
    res.send("Done");
    
    
});

//to get all evals for an exam
router.get('/:examId', function(req, res) {
    var examId = req.params.examId;
    console.log("Evals for exam:" + examId);
    eval.find({'_exam': examId}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/edit/:evalId', function(req, res) {
    var evalId = req.params.evalId;
    //console.log(evalId);
    eval
        .findOne({ '_id': evalId })
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The teacher name is: ' + JSON.stringify(teacher.batchlist));
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/analysis/:evalId', function(req, res) {
    var evalId = req.params.evalId;
    
    var thisEval = eval
        .findOne({ '_id': evalId })
        .deepPopulate('_student _exam _exam._subject _exam._subject._batch _exam._subject._teacher _exam._subject._secondTeacher _exam._subject._globalSubject')
        .exec(function (err, thisEval) {
        if (!err){ 
            var examId = thisEval._exam;
            var allEvals =  eval
                .find({ '_exam': examId }, {_student:1, score:1, absent: 1})
                .deepPopulate('_student')
                .exec(function (err, allEvals) {
                if (!err){
                    allEvals.forEach(function(thisStudentEval, studentEvalIndex){
                        //console.log(thisStudentEval._student);
                        thisStudentEval._student = thisStudentEval._student.basic;
                    });
                    var evalSummary = {
                        studentEval: thisEval,
                        otherEvals: allEvals
                    };
                    res.json(evalSummary);
                }
                });
            
        } else {throw err;}
    });
});
module.exports = router;