var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var question = require('../app/models/question');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/changeUser', function(req, res) {
    var userId = '58900bd8fc519c0a04be52e8';
    var allQuestions = cisaved
        .find({user: userId},{user: 1})
        .exec(function (err, allQuestions) {
        if (!err){
            allQuestions.forEach(function(thisQuestion, qIndex){
                thisQuestion.user = '5a04512a63c45b592385f27b';
                thisQuestion.save(function(err, thisQuestion) {
                    if (err) return console.error(err);
                    console.log('Object saved: ' + thisQuestion._id);
                });
            });
            
            res.json(allQuestions);
        } else {throw err;}
    });
    
});

router.post('/questionToPost', function(req, res) {
    var examArray = req.body;
    console.log(examArray);
    //, images: { $exists: true, $ne: null }
    var thisQuestion = question
        .findOne({exam: {$in: examArray}, images: { $exists: true, $eq: null }}) //, $where: "this.questions.length == 1"
        .deepPopulate('exam test')
        .exec(function (err, thisQuestion) {
        if (!err){
            console.log(thisQuestion);
            res.json(thisQuestion);
        } else {throw err;}
    });
});

router.post('/buildPostSchedule', function(req, res) {
    var buildParams = req.body;
    var examArray = buildParams.examArray;
    console.log(examArray);
    var thisQuestion = question
        .findOne({exam: {$in: examArray}, images: { $exists: true, $ne: null }}) //, $where: "this.questions.length == 1"
        .deepPopulate('exam test')
        .exec(function (err, thisQuestion) {
        if (!err){
            console.log(thisQuestion);
            res.json(thisQuestion);
        } else {throw err;}
    });
});

//to add an question
router.post('/save', function(req, res) {
    console.log('Starting question save!');
    var thisQuestion = req.body;
    var questionId = '';
    if(thisQuestion._id){
       questionId = thisQuestion._id;
    }
    console.log(JSON.stringify(thisQuestion));
    
    var existingQuestion = question.findOne({ '_id': questionId },function (err, existingQuestion) {
        //console.log(existingQuestion);
        if(existingQuestion){
            for (var property in thisQuestion) {
                existingQuestion[property] = thisQuestion[property];
            }
            existingQuestion.save(function(err, existingQuestion) {
                if (err) return console.error(err);
                console.log('Question saved: ' + existingQuestion._id);
                res.json(existingQuestion);
            });
        }else{
            existingQuestion = new question({});
            for (var property in thisQuestion) {
                existingQuestion[property] = thisQuestion[property];
            }
            existingQuestion.save(function(err, existingQuestion) {
                if (err) return console.error(err);
                console.log('Question saved: ' + existingQuestion._id);
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

router.get('/markMCQs', function(req, res) {
    console.log('Marking MCQ subquestions');
    var allQuestions = question
        .find({ }, {type:1, questions: 1})
        //.limit(1)
        //.deepPopulate('exam')
        .exec(function (err, allQuestions) {
        if (!err){
            var standardMarking = {
                correct: '3',
                incorrect: '-1',
            };
            
            allQuestions.forEach(function(thisQuestion, qIndex){
                thisQuestion.questions.forEach(function(thisSubQuestion, sIndex){
                    if(!thisSubQuestion.marking){
                        //console.log('I am here');
                        thisSubQuestion.marking = standardMarking;
                    }
                    /*if(!thisSubQuestion.type){
                        thisSubQuestion.type = 'mcq';
                    }*/
                    
                });
                //console.log(thisQuestion);
                thisQuestion.save(function(err, thisQuestion) {
                    if (err) return console.error(err);
                    console.log('Question type marked: ' + thisQuestion._id);
                });
            });
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

router.get('/markAnswerExists', function(req, res) {
    res.json(true);
    question
        .find({}, {questions: 1})
        //.deepPopulate('exam')
        .exec(function (err, allQuestions) {
        if (!err){
            allQuestions.forEach(function(thisQuestion, qIndex){
                var valid = false;
                var subQuestions = thisQuestion.questions;
                subQuestions.forEach(function(thisSubQuestion, sqIndex){
                    var thisOptions = thisSubQuestion.options;
                    thisOptions.forEach(function(thisOption, oIndex){
                        if(thisOption._correct){
                            valid = true;
                        }
                        
                    });
                });
                
                if(valid){
                    thisQuestion._answerExists = true;
                    thisQuestion.save(function(err, thisQuestion) {
                        if (err) return console.error(err);
                        console.log(thisQuestion._answerExists + ' Question saved: ' + thisQuestion._id);
                    });
                }else{
                    thisQuestion._answerExists = false;
                    thisQuestion.save(function(err, thisQuestion) {
                        if (err) return console.error(err);
                        console.log(thisQuestion._answerExists + ' Question saved: ' + thisQuestion._id);
                    });
                }
            });
        } else {throw err;}
    });
    
});

router.get('/exam/randomQuestion/:examId', function(req, res) {
    var examId = req.params.examId.toString();
    var allQuestions = question
        .find({exam: examId, active: true, _answerExists: true}, {_id: 1})
        .limit(100)
        .exec(function (err, allQuestions) {
        if (!err){
            
            var nQuestions = allQuestions.length;
            if(nQuestions > 0){
                var rIndex = Math.floor(Math.random() * (nQuestions - 1 - 0) + 0);
                thisQuestion = allQuestions[rIndex];
                res.json(thisQuestion._id);
            }else{
                res.json(null);
            }
            
            
            
        } else {throw err;}
    });
    
});


router.get('/testQuestions/:testId', function(req, res) {
    var testId = req.params.testId;
    var allQuestions = question
        .find({test: testId})
        .exec(function (err, allQuestions, mockPaper, official) {
        if (!err){
            res.json(allQuestions);
        } else {throw err;}
    });
    
});



router.get('/question/:questionId', function(req, res) {
    var questionId = req.params.questionId;
    var thisQuestion = question
        .findOne({'_id': questionId})
        //.deepPopulate('test')
        .exec(function (err, thisQuestion) {
        if (!err){
            var testId = thisQuestion.test;
            
            var thisTest = test
                .findOne({ '_id': testId },{name: 1, description: 1})
                //.deepPopulate('_master.contact')
                .exec(function (err, thisTest) {
                if (!err){
                    if(thisTest){
                        thisQuestion.test = thisTest;
                        //console.log(thisQuestion.test);
                        res.json(thisQuestion);
                    }else{
                        res.json(null);
                    }
                    
                    
                } else {throw err;}
            });
            
        } else {throw err;}
    });
    
});

router.get('/markCreator/:testId', function(req, res) {
    var creatorId = '5a0a975e7e56384fa04379ab';
    var testId = req.params.testId;
    res.json('Done');
    var allQuestions = question
        .find({'test': testId},{_createdBy: 1})
        .exec(function (err, allQuestions) {
        if (!err){
            console.log(allQuestions.length);
            
            allQuestions.forEach(function(thisQuestion, qIndex){
                thisQuestion._createdBy = creatorId;
                thisQuestion.save(function(err, thisQuestion) {
                    if (err) return console.error(err);
                    console.log('Question saved: ' + thisQuestion._id);
                });
            });
            
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
    var questionId = req.params.questionId.toString();
    var thisQuestion = question
        .findOne({'_id': questionId})
        .exec(function (err, thisQuestion) {
        if (!err){
            var testId = thisQuestion.test.toString();
            var thisTest = test
                .findOne({ '_id': testId },{name: 1, description: 1})
                .exec(function (err, thisTest) {
                if (!err){
                    console.log(thisTest);
                    if(thisTest){
                        thisQuestion.test = thisTest;
                        res.json(thisQuestion);
                    }else{
                        res.json(null);
                    }


                } else {throw err;}
            });

        } else {throw err;}
    });
});


module.exports = router;