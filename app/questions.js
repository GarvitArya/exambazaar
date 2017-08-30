var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var question = require('../app/models/question');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');


//to add an question
router.post('/save', function(req, res) {
    var thisQuestion = req.body;
    var questionId = '';
    if(thisQuestion._id){
       questionId = thisQuestion._id;
    }
    console.log(JSON.stringify(thisQuestion));
    
    var existingQuestion = question.findOne({ '_id': questionId },function (err, existingQuestion) {
        console.log(existingQuestion);
        if(existingQuestion){
            for (var property in thisQuestion) {
                existingQuestion[property] = thisQuestion[property];
            }
            existingQuestion.save(function(err, existingQuestion) {
                if (err) return console.error(err);
                res.json(existingQuestion);
            });
        }else{
            existingQuestion = new question({});
            for (var property in thisQuestion) {
                existingQuestion[property] = thisQuestion[property];
            }
            existingQuestion.save(function(err, existingQuestion) {
                if (err) return console.error(err);
                res.json(existingQuestion);
            }); 
        }
    });
});



//to get all questions
router.get('/', function(req, res) {
    //console.log('Here');
    question
        .find({ })
        //.deepPopulate('exam')
        .exec(function (err, docs) {
        if (!err){
            //var questionIds = docs.map(function(a) {return a.name;});
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
    
});

router.get('/exam/:examId', function(req, res) {
    var examId = req.params.examId;
    var allQuestions = question
        .find({exam: examId})
        .exec(function (err, allQuestions) {
        if (!err){
            res.json(allQuestions);
        } else {throw err;}
    });
    
});

router.get('/question/:questionId', function(req, res) {
    var questionId = req.params.questionId;
    var thisQuestion = question
        .findOne({'_id': questionId})
        .deepPopulate('exam')
        .exec(function (err, thisQuestion) {
        if (!err){
            
            //console.log(thisQuestion);
            res.json(thisQuestion);
        } else {throw err;}
    });
    
});

router.get('/readQuestion/:questionId', function(req, res) {
    
    var questionId = req.params.questionId;
    console.log('Reading question: ' + questionId);
    var thisQuestion = question
        .findOne({'_id': questionId})
        .exec(function (err, thisQuestion) {
        if (!err){
            var question = thisQuestion.url.question;
            if(question){
                console.log(question);
                
            }
            //console.log(thisQuestion);
            res.json(thisQuestion);
        } else {throw err;}
    });
    
});

router.get('/remove/:questionId', function(req, res) {
    var questionId = req.params.questionId;
    
    question.remove({_id: questionId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Question removed!');
            res.json(true);
        }                              
    });
    
    
});

router.get('/count', function(req, res) {
    question.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


//to get a particular user with _id userId
router.get('/edit/:questionId', function(req, res) {
    var questionId = req.params.questionId;
    //console.log("Question is " + questionId);
    question
        .findOne({ '_id': questionId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});


module.exports = router;