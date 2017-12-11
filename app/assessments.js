var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var assessment = require('../app/models/assessment');
var questionresponse = require('../app/models/questionresponse');
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

router.get('/remove/:assessmentId', function(req, res) {
    var assessmentId = req.params.assessmentId;
    assessment.remove({_id: assessmentId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Question Response removed!');
            res.json(true);
        }                              
    });
});

//to add an assessment
router.post('/save', function(req, res) {
    console.log('Starting assessment save!');
    var thisAssessment = req.body;
    var assessmentTime = 30;
    if(thisAssessment.time){
        assessmentTime = thisAssessment.time;
    }
    var assessmentId = '';
    for(var property in thisAssessment){
        if(property != 'info' && property != 'time'){
            thisAssessment[property] = thisAssessment[property].toString();
        }
        
    }
    var existingAssessment = assessment.findOne({user: thisAssessment.user, test: thisAssessment.test},function (err, existingAssessment) {
        if(existingAssessment){
            for (var property in thisAssessment) {
                existingAssessment[property] = thisAssessment[property];
            }
            existingAssessment.save(function(err, existingAssessment){
                if (err) return console.error(err);
                console.log('Assessment saved: ' + existingAssessment._id);
                res.json(existingAssessment);
            });
        }else{
            existingAssessment = new assessment({});
            for (var property in thisAssessment) {
                existingAssessment[property] = thisAssessment[property];
            }
            existingAssessment._start = moment();
            existingAssessment._end = moment(existingAssessment._start).add(assessmentTime, 'minutes');
            existingAssessment.save(function(err, existingAssessment) {
                if (err) return console.error(err);
                console.log('Assessment saved: ' + existingAssessment._id);
                res.json(existingAssessment);
            }); 
        }
    });
});

router.post('/edit', function(req, res) {
    console.log('Starting assessment fetch!');
    var thisAssessment = req.body;
    var assessmentId = '';
    for(var property in thisAssessment){
        if(property != 'info' || property != 'evaluation'){
            thisAssessment[property] = thisAssessment[property].toString();
        }
    }
    var existingAssessment = assessment.findOne({user: thisAssessment.user, test: thisAssessment.test},function (err, existingAssessment) {
        if(existingAssessment){
            res.json(existingAssessment);
        }else{
            res.json(null);
        }
    });
});

router.post('/submit', function(req, res) {
    console.log('Starting assessment fetch!');
    var thisAssessment = req.body;
    var assessmentId = '';
    for(var property in thisAssessment){
        thisAssessment[property] = thisAssessment[property].toString();
    }
    var existingAssessment = assessment.findOne({user: thisAssessment.user, test: thisAssessment.test},function (err, existingAssessment) {
        if(existingAssessment){
            existingAssessment.submitted = true;
            existingAssessment._submit = moment();
            existingAssessment.save(function(err, existingAssessment) {
                if (err) return console.error(err);
                console.log('Assessment saved: ' + existingAssessment._id);
                res.json(existingAssessment);
            });
        }else{
            res.json(null);
        }
    });
});

router.post('/bulkEnded', function(req, res) {
    
    var existingAssessments = assessment.find({test: '5a17f5f617cb4c07c5dd7f5b'},function (err, existingAssessments) {
        if(existingAssessments){
            
            existingAssessments.forEach(function(existingAssessment, aIndex){
                existingAssessment.submitted = true;
                existingAssessment._submit = moment();
                existingAssessment.save(function(err, existingAssessment) {
                    if (err) return console.error(err);
                    console.log('Assessment saved: ' + existingAssessment._id);
                });
            });
            res.json(true);
        }else{
            res.json(false);
        }
    });
});

router.post('/userevaluate', function(req, res) {
    var thisAssessment = req.body;
    /*thisAssessment = {
        user: '5a2666310b6fdd5a5db743b6',
        test: '5a17f5f617cb4c07c5dd7f5b',
    };*/
    for(var property in thisAssessment){
        if(property != 'info' || property != 'evaluation'){
            thisAssessment[property] = thisAssessment[property].toString();
        }
    }
    
    
    
    var existingAssessment = assessment
        .findOne({user: thisAssessment.user, test: thisAssessment.test})
        //.deepPopulate('test')
        .exec(function (err, existingAssessment) {
            
        if (!err){
            if(existingAssessment){
                var testId = existingAssessment.test.toString();
                var solutionKey = [];
                var testQuestions = question
                    .find({test: testId}, {questions: 1})
                    .deepPopulate('questions')
                    .exec(function (err, testQuestions) {
                    if(testQuestions){
                    var nQuestions = testQuestions.length;    
                    var counter = 0;
                    testQuestions.forEach(function(thisQuesiton, qIndex){
                        var questionId = thisQuesiton._id;
                        var subQuestion = thisQuesiton.questions[0];
                        var subQuestionId = subQuestion._id;
                        var correctOptionId = null;
                        subQuestion.options.forEach(function(thisOption, oIndex){
                            if(thisOption._correct){
                                correctOptionId = thisOption._id;
                            }
                        });
                        var thisKey = {
                            question: questionId.toString(),
                            subquestion: subQuestionId.toString(),
                            option: correctOptionId.toString(),
                        };
                        solutionKey.push(thisKey);
                        counter += 1;
                        
                    if(counter == nQuestions){
                            
                    var userresponses = questionresponse.find({user: thisAssessment.user},function (err, userresponses) {
                        if(userresponses){
                        var attempted = userresponses.length;
                        var unattempted = nQuestions - attempted;
                        var correct = [];    
                        var incorrect = [];    

                        var solutionKeyQuestionIds =  solutionKey.map(function(a) {return a.question;});
                        var solutionKeySubQuestionIds =  solutionKey.map(function(a) {return a.subquestion;});
                        userresponses.forEach(function(thisResponse, rIndex){
                            var thisQuestionId = thisResponse.question.toString();
                            var thisSubQuestionId = thisResponse.subquestion.toString();
                            var thisOptionId = thisResponse.option.toString();
                            var thisPair = {
                                question: thisQuestionId,
                                subquestion: thisSubQuestionId,
                                option: thisOptionId,
                            };

                            var k1Index = solutionKeyQuestionIds.indexOf(thisQuestionId);
                            var k2Index = solutionKeySubQuestionIds.indexOf(thisSubQuestionId);

                            if(k1Index != -1){
                                if(thisOptionId == solutionKey[k1Index].option){
                                    correct.push(thisPair);
                                }else{
                                    incorrect.push(thisPair);
                                }
                            }

                        });
                            var correctAnswers = correct.length;
                            var incorrectAnswers = incorrect.length;
                            
                            console.log('Attempted: ' + attempted);
                            console.log('Unattempted: ' + unattempted);
                            console.log('Correct: ' + correctAnswers);
                            console.log('Incorrect: ' + incorrectAnswers);
                            var score = 3* correctAnswers - 1* incorrectAnswers;
                            var evaluation = {
                                questions:{
                                    attemped: attempted,
                                    unattemped: unattempted,
                                    correct: correctAnswers,
                                    incorrect: incorrectAnswers
                                },
                                score: score
                            };
                            
                            existingAssessment.evaluation = evaluation;
                            existingAssessment.save(function(err, existingAssessment){
                                if (err) return console.error(err);
                                console.log('Assessment saved: ' + existingAssessment._id);
                                res.json(existingAssessment);
                            });
                            

                        }else{
                            res.json(false);
                        }
                    });
                            
                            
                            
                            
                            
                            
                            
                    }
                    });


                        
                    }else{
                        res.json(false);
                    }     
                });
                
                
                
            }else{
                res.json(null);
            }
        } else {throw err;}
    });
    
    /*var existingAssessment = assessment.findOne({user: thisAssessment.user, test: thisAssessment.test},function (err, existingAssessment) {
    if(existingAssessment){
        console.log(existingAssessment);
        var userresponses = questionresponse.find({user: thisAssessment.user},function (err, userresponses) {
            if(userresponses){
                


                //console.log(userresponses);

                res.json(true);
            }else{
                res.json(false);
            }
        });

    }else{
        res.json(false);
    }
    });*/
});
router.post('/submitted', function(req, res) {
    console.log('Starting assessment submission!');
    var thisAssessment = req.body;
    var assessmentId = '';
    for(var property in thisAssessment){
        thisAssessment[property] = thisAssessment[property].toString();
    }
    var existingAssessment = assessment.findOne({user: thisAssessment.user, test: thisAssessment.test},function (err, existingAssessment) {
        if(existingAssessment){
            existingAssessment.submitted = true;
            existingAssessment.save(function(err, existingAssessment){
                if (err) return console.error(err);
                console.log('Assessment saved: ' + existingAssessment._id);
                res.json(existingAssessment);
            });
        }else{
            res.json(null);
        }
    });
});

router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var allAssessments = assessment
        .find({user: userId})
        .exec(function (err, allAssessments) {
        if (!err){
            res.json(allAssessments);
        } else {throw err;}
    });
    
});

router.get('/', function(req, res) {
    var allAssessments = assessment
        .find({})
        //.deepPopulate('user')
        .exec(function (err, allAssessments) {
        if (!err){
            res.json(allAssessments);
            /*var nAssessments = allAssessments.length;
            var allUserIds = allAssessments.map(function(a) {return a.user;});
            
            var allUsers = user.find({_id: allUserIds},{basic:1},function(err, allUsers) {
                var thisUserIds = allUsers.map(function(a) {return a._id.toString();});
                allAssessments.forEach(function(thisAssessment, aIndex){
                    var thisUser = thisAssessment.user.toString();
                    var uIndex = thisUserIds.indexOf(thisUser);
                    
                    if(uIndex != -1){
                        allAssessments[aIndex].user = allUsers[uIndex];
                        console.log(allUsers[uIndex]);
                        console.log(allAssessments[aIndex].user);
                    }
                    
                    if(aIndex == nAssessments-1){
                        res.json(allAssessments);
                    }
                });

            });*/
            
            
            
            
            
        } else {throw err;}
    });
    
});


module.exports = router;