var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var assessment = require('../app/models/assessment');
var questionresponse = require('../app/models/questionresponse');
var qmarkforreview = require('../app/models/qmarkforreview');
var qview = require('../app/models/qview');
var question = require('../app/models/question');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');

//moment.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
//moment.tz.link("Asia/Calcutta|Asia/Kolkata");

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

/*router.get('/remove/:assessmentId', function(req, res) {
    var assessmentId = req.params.assessmentId;
    
    
    assessment.remove({_id: assessmentId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Assessment removed!');
            res.json(true);
        }                              
    });
});*/

router.post('/removeAssessment', function(req, res) {
    var thisAssessment = req.body;
    var userId = thisAssessment.userId;
    var testId = thisAssessment.testId;
    
    //console.log(testId);
    var allQuestions = question.find({ 'test': testId }, {questions: 1},function (err, allQuestions) {
        var allsubquestions = [];
        if(allQuestions){
            allQuestions.forEach(function(thisQuestion, qIndex){
                allsubquestions = allsubquestions.concat(thisQuestion.questions);
            });
        }
        var testSubQuestionsIds = allsubquestions.map(function(a) {return a._id.toString();});
        console.log(testSubQuestionsIds.length);
        
        if(testSubQuestionsIds && testSubQuestionsIds.length > 0){
            questionresponse.remove({subquestion: {$in: testSubQuestionsIds}, user: userId}, function(err, result) {
                if (err) {console.log(err);} else{
                    qmarkforreview.remove({subquestion: {$in: testSubQuestionsIds}, user: userId}, function(err, result) {
                        if (err) {console.log(err);} else{
                            qview.remove({subquestion: {$in: testSubQuestionsIds}, user: userId}, function(err, result) {
                                if (err) {console.log(err);} else{
                                    assessment.remove({user: userId, test: testId}, function(err, result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Assessment removed!');
                                            res.json(true);
                                        }                              
                                    });
                                }                              
                            });
                        }                              
                    });
                }                              
            });
            //questionresponse
            //qmarkforreview
            //qview
            
            /*assessment.remove({user: userId, test: testId}, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Assessment removed!');
                    res.json(true);
                }                              
            });*/
        }else{
            res.json(false);   
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
    var timewithbreak = assessmentTime;
    if(thisAssessment.timewithbreak){
        timewithbreak = thisAssessment.timewithbreak;
    }
    console.log(timewithbreak);
    var assessmentId = '';
    for(var property in thisAssessment){
        if(property != 'info' && property != 'time' && property != 'timewithbreak'){
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
            existingAssessment._start = moment.utc();
            existingAssessment._end = moment.utc(existingAssessment._start).add(assessmentTime, 'minutes');
            existingAssessment._endwithbreak = moment.utc(existingAssessment._start).add(timewithbreak, 'minutes');
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

router.post('/recent', function(req, res) {
    console.log('Starting latest assessments');
    var limit = 8;
    
    var existingAssessments = assessment.find({$and: [ {"evaluation.score": {$exists: true}}, { "evaluation.score": {$ne: "0"} } ]}, {evaluation: 1, info: 1, user: 1, test: 1, _end: 1},function (err, existingAssessments) {
        if(existingAssessments){
            var nAssessments = existingAssessments.length;
            var counter = 0;
            
            var allTestIds = existingAssessments.map(function(a) {return a.test.toString();});
            var allUserIds = existingAssessments.map(function(a) {return a.user.toString();});
            
            var allAssessments = [];
            
            var allTests = test.find({_id: allTestIds}, {name: 1, maxScore: 1},function (err, allTests) {
                
                var allUsers = user.find({_id: allUserIds}, {basic: 1, image: 1},function (err, allUsers) {
                    var theseTestIds = allTests.map(function(a) {return a._id.toString();});
                    var theseUserIds = allUsers.map(function(a) {return a._id.toString();});
                    existingAssessments.forEach(function(thisAssessment, aIndex){
                        var testId = thisAssessment.test.toString();
                        var userId = thisAssessment.user.toString();
                        var tIndex = theseTestIds.indexOf(testId);
                        var uIndex = theseUserIds.indexOf(userId);
                        if(tIndex != -1 && uIndex != -1){
                            var newAssessment = {
                                test: {
                                    _id: testId,
                                    name: allTests[tIndex].name,
                                    maxScore: allTests[tIndex].maxScore,
                                },
                                user:{
                                    _id: thisAssessment.user,
                                    name: allUsers[uIndex].basic.name,
                                    image: allUsers[uIndex].image,
                                },
                                evaluation:{
                                    score: thisAssessment.evaluation.score,
                                    questions: thisAssessment.evaluation.questions,
                                },
                            };
                            allAssessments.push(newAssessment);
                        }
                        counter += 1;
                        if(counter == nAssessments){
                            //console.log(allAssessments);
                            res.json(allAssessments);
                        }
                });
                });
            });
            
            
            
            
        }else{
            res.json(null);
        }
    }).limit(limit).sort("-_end");
});

router.post('/rate', function(req, res) {
    console.log('Starting assessment rate!');
    var thisAssessment = req.body;
    for(var property in thisAssessment){
        thisAssessment[property] = thisAssessment[property].toString();
    }
    
    var existingAssessment = assessment.findOne({user: thisAssessment.user, test: thisAssessment.test},function (err, existingAssessment) {
        if(existingAssessment){
            if(thisAssessment.rating == 0){
                thisAssessment.rating = null;
            }
            existingAssessment.userRating = thisAssessment.rating;
            existingAssessment.save(function(err, existingAssessment) {
                if (err) return console.error(err);
                console.log('Assessment saved: ' + existingAssessment._id);
                res.json(true);
            });
            
        }else{
            res.json(false);
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
    var assessmentId = null;
    if(thisAssessment._id){
        assessmentId = thisAssessment._id.toString();
    }
    if(assessmentId){
        var existingAssessment = assessment
        .findOne({_id: assessmentId})
        .deepPopulate('test')
        .exec(function (err, existingAssessment) {
            
        if (!err){
            if(existingAssessment){
                var testId = existingAssessment.test._id.toString();
                var testSimulate = existingAssessment.test.simulate;
                
                var solutionKey = [];
                var testQuestions = question
                    .find({test: testId}, {questions: 1})
                    .deepPopulate('questions')
                    .exec(function (err, testQuestions) {
                    if(testQuestions){
                    var nQuestions = 0;   
                    var testQuestionsIds = testQuestions.map(function(a) {return a._id.toString();});
                        
                    var counter = 0;
                        
                    testQuestions.forEach(function(thisQuestion, qIndex){
                        nQuestions += thisQuestion.questions.length;
                    });
                     testQuestions.forEach(function(thisQuestion, qIndex){
                    var questionId = thisQuestion._id;
                    thisQuestion.questions.forEach(function(subQuestion, sIndex){
                        var subQuestionId = subQuestion._id;
                        var correctOptionId = null;
                        var correctNumericalAnswers = null;
                       
                        if(subQuestion.type == 'mcq'){
                            if(subQuestion.mcqma){
                            var thisKey = {
                                question: questionId.toString(),
                                subquestion: subQuestionId.toString(),
                                marking: subQuestion.marking,
                                type: subQuestion.type,
                                mcqma: subQuestion.mcqma,
                                options: [],
                            };
                            subQuestion.options.forEach(function(thisOption, oIndex){
                            if(thisOption._correct){
                                correctOptionId = thisOption._id.toString();
                                thisKey.options.push(correctOptionId);
                                
                                
                                counter += 1;
                                if(oIndex == subQuestion.options.length - 1){
                                    solutionKey.push(thisKey);
                                }
                            }    
                            });    
                                
                                
                            }else{
                            subQuestion.options.forEach(function(thisOption, oIndex){
                            if(thisOption._correct){
                                correctOptionId = thisOption._id;

                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    option: correctOptionId.toString(),
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }


                            });
                                
                                
                            }
                            
                        }
                        
                        if(subQuestion.type == 'numerical'){
                            
                            if(subQuestion.numericalAnswerType == 'Exact'){
                                correctNumericalAnswers = subQuestion.numericalAnswers;
                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    numericalAnswerType: subQuestion.numericalAnswerType,
                                    numericalAnswers: correctNumericalAnswers,
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }else if (subQuestion.numericalAnswerType == 'Range'){
                                numericalAnswerRange = subQuestion.numericalAnswerRange;
                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    numericalAnswerType: subQuestion.numericalAnswerType,
                                    numericalAnswerRange: numericalAnswerRange,
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }
                            
                        }
                        
                        if(counter == nQuestions){
                        
                            
                        var userresponses = questionresponse.find({user: thisAssessment.user, question : { $in : testQuestionsIds } },function (err, userresponses) {
                        if(userresponses){
                            
                            
                            
                        
                        var correct = [];    
                        var incorrect = [];    

                        var solutionKeyQuestionIds =  solutionKey.map(function(a) {return a.question;});
                        var solutionKeySubQuestionIds =  solutionKey.map(function(a) {return a.subquestion;});
                        var pivoteduserresponses = [];
                        
                        userresponses.forEach(function(thisResponse, rIndex){
                            var sqIds = [];
                            if(pivoteduserresponses.length > 0){
                                sqIds = pivoteduserresponses.map(function(a) {return a.subquestion.toString();});
                            }
                            var thisIndex = sqIds.indexOf(thisResponse.subquestion.toString());
                            if(thisIndex == -1){
                            var newResponse = {
                                option: thisResponse.option,
                                subquestion: thisResponse.subquestion,
                                question: thisResponse.question,
                                user: thisResponse.user,
                            };
                            if(newResponse){
                                newResponse.numericalAnswer = thisResponse.numericalAnswer;
                            }
                            pivoteduserresponses.push(newResponse);
                            }else{
                            if(!pivoteduserresponses[thisIndex].options){
                                pivoteduserresponses[thisIndex].options = [pivoteduserresponses[thisIndex].option];
                            }
                            pivoteduserresponses[thisIndex].options.push(thisResponse.option);
                            }

                            
                        });    
                        //abcd1234
                            
                        var attempted = pivoteduserresponses.length;
                        var unattempted = nQuestions - attempted;
                        pivoteduserresponses.forEach(function(thisResponse, rIndex){

                        var thisQuestionId = thisResponse.question.toString();
                        var thisSubQuestionId = thisResponse.subquestion.toString();

                        var k1Index = solutionKeyQuestionIds.indexOf(thisQuestionId);
                        var k2Index = solutionKeySubQuestionIds.indexOf(thisSubQuestionId);
                        
                        if(k2Index != -1){
                        var subQuestionType = solutionKey[k2Index].type;
                        var subQuestionMCQMA = solutionKey[k2Index].mcqma;
                        var subQuestionMarking = solutionKey[k2Index].marking;
                            
                        var thisPair = {
                            questionId: thisQuestionId,
                            //question: question,
                            //subquestionId: thisSubQuestionId,
                            
                            
                            subquestion: thisSubQuestionId,
                            subQuestionType: subQuestionType,
                            marking: subQuestionMarking,
                            //userresponse: thisResponse,
                        };
                        if(subQuestionType == 'mcq'){
                            if(subQuestionMCQMA){
                                
                                var thisOptions = [];
                                if(thisResponse.options){
                                    thisOptions = thisResponse.options;
                                }else if(thisResponse.option){
                                    thisOptions = [thisResponse.option];
                                }
                                var answerKeyOptions = [];
                                
                                if(solutionKey[k2Index].options){
                                    answerKeyOptions = solutionKey[k2Index].options;
                                }else if(solutionKey[k2Index].option){
                                    answerKeyOptions = [solutionKey[k2Index].option];
                                }
                                var exactMatch = true;
                                if(thisOptions.length != answerKeyOptions.length){
                                    exactMatch = false;
                                }
                                thisOptions.forEach(function(thisUserOption, aIndex){
                                    var oIndex = answerKeyOptions.indexOf(thisUserOption.toString());
                                    if(oIndex == -1){
                                        exactMatch = false;
                                    }else{
                                        answerKeyOptions.splice(oIndex, 1);
                                    }
                                });
                                
                                if(answerKeyOptions.length > 0){
                                    exactMatch = false;
                                }
                                
                                if(exactMatch && thisOptions.length > 0){
                                    correct.push(thisPair);
                                }else if(!exactMatch && thisOptions.length > 0){
                                    incorrect.push(thisPair);
                                }
                                
                                
                                
                            }else{
                                var thisOptionId = null;
                                if(thisResponse.option){
                                    thisOptionId = thisResponse.option.toString();

                                    if(thisOptionId == solutionKey[k2Index].option){

                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                }
                                
                                
                            }
                            
                            
                        }else if (subQuestionType == 'numerical'){
                            var thisNumericalAnswer = null;
                            if(thisResponse.numericalAnswer){
                                thisNumericalAnswer = Number(thisResponse.numericalAnswer);
                                var numericalType = solutionKey[k2Index].numericalAnswerType;

                                if(numericalType == 'Exact'){
                                    var correctResponse = false;
                                    var numericalAnswers = solutionKey[k2Index].numericalAnswers;
                                    numericalAnswers.forEach(function(thisAnswer, aIndex){
                                        if(thisNumericalAnswer == Number(thisAnswer)){
                                            correctResponse = true;
                                        }
                                    });
                                    
                                    if(correctResponse){
                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                }else if(numericalType == 'Range'){
                                    var numericalAnswerRange = solutionKey[k2Index].numericalAnswerRange;
                                    var minRange = Number(numericalAnswerRange.min);
                                    var maxRange = Number(numericalAnswerRange.max);
                                    
                                    if(thisNumericalAnswer >= minRange && thisNumericalAnswer <= maxRange){
                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                    
                                }

                            }
                        }
                            
                        }else{
                            console.log('SOMETHING WENT VERY WRONG!!!');
                        }
                            
                        


                        
                        });
                            
                        var correctAnswers = correct.length;
                        var incorrectAnswers = incorrect.length;

                        console.log('Attempted: ' + attempted);
                        console.log('Unattempted: ' + unattempted);
                        console.log('Correct: ' + correctAnswers);
                        console.log('Incorrect: ' + incorrectAnswers);
                        var score = 0;
                            
                        correct.forEach(function(thisSubQuestionAttempt, aIndex){
                            var correctScore = 3;
                            var incorrectScore = -1;
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.correct){
                                correctScore = Number(thisSubQuestionAttempt.marking.correct);
                            }
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.incorrect){
                                incorrectScore = Number(thisSubQuestionAttempt.marking.incorrect);
                            }
                            
                            score += correctScore;
                        });
                        incorrect.forEach(function(thisSubQuestionAttempt, aIndex){
                            var correctScore = 3;
                            var incorrectScore = -1;
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.correct){
                                correctScore = Number(thisSubQuestionAttempt.marking.correct);
                            }
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.incorrect){
                                incorrectScore = Number(thisSubQuestionAttempt.marking.incorrect);
                            }
                            
                            score += incorrectScore;
                        });
                        score = Math.round(score * 100) / 100;
                        console.log('Score is: ' + score);
                        
                        var accuracy = 0;
                        if(attempted > 0){
                           accuracy = Math.round(100*correctAnswers / attempted, 2);
                        }
                        var attemptedPercentage = Math.round(100 * attempted / (attempted + unattempted));     
                        var percentageScore = 0;
                        if(existingAssessment.test.maxScore){
                            percentageScore = Number( 100 * score / existingAssessment.test.maxScore);
                        }    
                            
                        var evaluation = {
                            questions:{
                                attemped: attempted,
                                unattemped: unattempted,
                                correct: correctAnswers,
                                incorrect: incorrectAnswers,
                                total: correctAnswers + incorrectAnswers,
                                attemptedPercentage: attemptedPercentage,
                                
                            },
                            marked:{
                                correct: correct,
                                incorrect: incorrect,
                            },
                            score: score,
                            percentageScore: percentageScore,
                            accuracy: accuracy,
                            
                        };

                        existingAssessment.evaluation = evaluation;
                        existingAssessment.submitted = true;
                        existingAssessment._submit = moment();
                        existingAssessment.save(function(err, existingAssessment){
                            if (err) return console.error(err);
                            console.log('Assessment saved: ' + existingAssessment._id);
                            res.json(existingAssessment);
                        });    

                        }else{
                            res.json(null);
                        }
                        });
                        

                        }     
                    });
                
                    });
                
                    }else{
                        res.json(null);
                    }
                });
            }else{
                res.json(null);
            }
        } else {throw err;}
    });
    }else{
    var existingAssessment = assessment
        .findOne({user: thisAssessment.user, test: thisAssessment.test})
        .deepPopulate('test')
        .exec(function (err, existingAssessment) {
            
        if (!err){
            if(existingAssessment){
                var testId = existingAssessment.test._id.toString();
                var testSimulate = existingAssessment.test.simulate;
                
                var solutionKey = [];
                var testQuestions = question
                    .find({test: testId}, {questions: 1})
                    .deepPopulate('questions')
                    .exec(function (err, testQuestions) {
                    if(testQuestions){
                    var nQuestions = 0;   
                    var testQuestionsIds = testQuestions.map(function(a) {return a._id.toString();});
                        
                    var counter = 0;
                        
                    testQuestions.forEach(function(thisQuestion, qIndex){
                        nQuestions += thisQuestion.questions.length;
                    });
                    testQuestions.forEach(function(thisQuestion, qIndex){
                    var questionId = thisQuestion._id;
                    thisQuestion.questions.forEach(function(subQuestion, sIndex){
                        var subQuestionId = subQuestion._id;
                        var correctOptionId = null;
                        var correctNumericalAnswers = null;
                       
                        if(subQuestion.type == 'mcq'){
                            if(subQuestion.mcqma){
                            var thisKey = {
                                question: questionId.toString(),
                                subquestion: subQuestionId.toString(),
                                marking: subQuestion.marking,
                                type: subQuestion.type,
                                mcqma: subQuestion.mcqma,
                                options: [],
                            };
                            subQuestion.options.forEach(function(thisOption, oIndex){
                                
                            if(thisOption._correct){
                                correctOptionId = thisOption._id.toString();
                                thisKey.options.push(correctOptionId);
                                
                                counter += 1;
                                
                            }
                            if(oIndex == subQuestion.options.length - 1){
                                solutionKey.push(thisKey);
                            }    
                            });    
                                
                                
                            }else{
                            subQuestion.options.forEach(function(thisOption, oIndex){
                            if(thisOption._correct){
                                correctOptionId = thisOption._id;

                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    option: correctOptionId.toString(),
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }


                            });
                                
                                
                            }
                            
                        }
                        
                        if(subQuestion.type == 'numerical'){
                            
                            if(subQuestion.numericalAnswerType == 'Exact'){
                                correctNumericalAnswers = subQuestion.numericalAnswers;
                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    numericalAnswerType: subQuestion.numericalAnswerType,
                                    numericalAnswers: correctNumericalAnswers,
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }else if (subQuestion.numericalAnswerType == 'Range'){
                                numericalAnswerRange = subQuestion.numericalAnswerRange;
                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    numericalAnswerType: subQuestion.numericalAnswerType,
                                    numericalAnswerRange: numericalAnswerRange,
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }
                            
                        }
                        
                        if(counter == nQuestions){
                        
                            
                        var userresponses = questionresponse.find({user: thisAssessment.user, question : { $in : testQuestionsIds } },function (err, userresponses) {
                        if(userresponses){
                            
                            
                            
                        
                        var correct = [];    
                        var incorrect = [];
                            
                        var solutionKeyQuestionIds =  solutionKey.map(function(a) {return a.question.toString();});
                        var solutionKeySubQuestionIds =  solutionKey.map(function(a) {return a.subquestion.toString();});
                        var pivoteduserresponses = [];
                        
                        userresponses.forEach(function(thisResponse, rIndex){
                            var sqIds = [];
                            if(pivoteduserresponses.length > 0){
                                sqIds = pivoteduserresponses.map(function(a) {return a.subquestion.toString();});
                            }
                            var thisIndex = sqIds.indexOf(thisResponse.subquestion.toString());
                            if(thisIndex == -1){
                            var newResponse = {
                                option: thisResponse.option,
                                subquestion: thisResponse.subquestion,
                                question: thisResponse.question,
                                user: thisResponse.user,
                            };
                            if(newResponse){
                                newResponse.numericalAnswer = thisResponse.numericalAnswer;
                            }
                            pivoteduserresponses.push(newResponse);
                            }else{
                            if(!pivoteduserresponses[thisIndex].options){
                                pivoteduserresponses[thisIndex].options = [pivoteduserresponses[thisIndex].option];
                            }
                            pivoteduserresponses[thisIndex].options.push(thisResponse.option);
                            }

                            
                        });    
                        //abcd1234
                            
                        var attempted = pivoteduserresponses.length;
                        var unattempted = nQuestions - attempted;
                        pivoteduserresponses.forEach(function(thisResponse, rIndex){

                        var thisQuestionId = thisResponse.question.toString();
                        var thisSubQuestionId = thisResponse.subquestion.toString();

                        var k1Index = solutionKeyQuestionIds.indexOf(thisQuestionId);
                        var k2Index = solutionKeySubQuestionIds.indexOf(thisSubQuestionId);
                        
                        if(k2Index != -1){
                        var subQuestionType = solutionKey[k2Index].type;
                        var subQuestionMCQMA = solutionKey[k2Index].mcqma;
                        var subQuestionMarking = solutionKey[k2Index].marking;
                            
                        var thisPair = {
                            questionId: thisQuestionId,
                            //question: question,
                            //subquestionId: thisSubQuestionId,
                            
                            
                            subquestion: thisSubQuestionId,
                            subQuestionType: subQuestionType,
                            marking: subQuestionMarking,
                            //userresponse: thisResponse,
                        };
                        if(subQuestionType == 'mcq'){
                            if(subQuestionMCQMA){
                                
                                var thisOptions = [];
                                if(thisResponse.options){
                                    thisOptions = thisResponse.options;
                                }else if(thisResponse.option){
                                    thisOptions = [thisResponse.option];
                                }
                                var answerKeyOptions = [];
                                
                                if(solutionKey[k2Index].options){
                                    answerKeyOptions = solutionKey[k2Index].options;
                                }else if(solutionKey[k2Index].option){
                                    answerKeyOptions = [solutionKey[k2Index].option];
                                }
                                var exactMatch = true;
                                var countMatch = 0;
                                var anyIncorrect = false;
                                if(thisOptions.length != answerKeyOptions.length){
                                    exactMatch = false;
                                }
                                thisOptions.forEach(function(thisUserOption, aIndex){
                                    var oIndex = answerKeyOptions.indexOf(thisUserOption.toString());
                                    if(oIndex == -1){
                                        exactMatch = false;
                                        anyIncorrect = true;
                                    }else{
                                        answerKeyOptions.splice(oIndex, 1);
                                        countMatch += 1;
                                    }
                                });
                                
                                if(answerKeyOptions.length > 0){
                                    exactMatch = false;
                                }
                                
                                if(exactMatch && thisOptions.length > 0){
                                    correct.push(thisPair);
                                }else if(!exactMatch && thisOptions.length > 0){
                                    thisPair.countMatch = countMatch;
                                    thisPair.anyIncorrect = anyIncorrect;
                                    incorrect.push(thisPair);
                                }
                                
                                
                                
                            }else{
                                var thisOptionId = null;
                                if(thisResponse.option){
                                    thisOptionId = thisResponse.option.toString();

                                    if(thisOptionId == solutionKey[k2Index].option){

                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                }
                                
                                
                            }
                            
                            
                        }else if (subQuestionType == 'numerical'){
                            var thisNumericalAnswer = null;
                            if(thisResponse.numericalAnswer){
                                thisNumericalAnswer = Number(thisResponse.numericalAnswer);
                                var numericalType = solutionKey[k2Index].numericalAnswerType;

                                if(numericalType == 'Exact'){
                                    var correctResponse = false;
                                    var numericalAnswers = solutionKey[k2Index].numericalAnswers;
                                    numericalAnswers.forEach(function(thisAnswer, aIndex){
                                        if(thisNumericalAnswer == Number(thisAnswer)){
                                            correctResponse = true;
                                        }
                                    });
                                    
                                    if(correctResponse){
                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                }else if(numericalType == 'Range'){
                                    var numericalAnswerRange = solutionKey[k2Index].numericalAnswerRange;
                                    var minRange = Number(numericalAnswerRange.min);
                                    var maxRange = Number(numericalAnswerRange.max);
                                    
                                    if(thisNumericalAnswer >= minRange && thisNumericalAnswer <= maxRange){
                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                    
                                }

                            }
                        }
                            
                        }else{
                            console.log('SOMETHING WENT VERY WRONG!!!');
                        }
                            
                        //console.log(correct);
                        //console.log(incorrect);
                            
                        


                        
                        });
                            
                        var correctAnswers = correct.length;
                        var incorrectAnswers = incorrect.length;

                        console.log('Attempted: ' + attempted);
                        console.log('Unattempted: ' + unattempted);
                        console.log('Correct: ' + correctAnswers);
                        console.log('Incorrect: ' + incorrectAnswers);
                        var score = 0;
                            
                        correct.forEach(function(thisSubQuestionAttempt, aIndex){
                            var correctScore = 3;
                            var incorrectScore = -1;
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.correct){
                                correctScore = Number(thisSubQuestionAttempt.marking.correct);
                            }
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.incorrect){
                                incorrectScore = Number(thisSubQuestionAttempt.marking.incorrect);
                            }
                            thisSubQuestionAttempt.score = correctScore;
                            score += correctScore;
                        });
                        incorrect.forEach(function(thisSubQuestionAttempt, aIndex){
                            var correctScore = 3;
                            var incorrectScore = -1;
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.correct){
                                correctScore = Number(thisSubQuestionAttempt.marking.correct);
                            }
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.incorrect){
                                incorrectScore = Number(thisSubQuestionAttempt.marking.incorrect);
                            }
                           
                            if(thisSubQuestionAttempt.anyIncorrect){
                                score += incorrectScore;
                                thisSubQuestionAttempt.score = incorrectScore;
                            }else if(!thisSubQuestionAttempt.anyIncorrect && thisSubQuestionAttempt.countMatch &&  thisSubQuestionAttempt.countMatch > 0){
                                score += Number(thisSubQuestionAttempt.countMatch);
                                thisSubQuestionAttempt.score = Number(thisSubQuestionAttempt.countMatch);
                            }else{
                                score += incorrectScore;
                                thisSubQuestionAttempt.score = incorrectScore;
                            }
                            
                        });
                        score = Math.round(score * 100) / 100;
                        console.log('Score is: ' + score);
                            
                        var accuracy = 0;
                        if(attempted > 0){
                           accuracy = Math.round(100*correctAnswers / attempted, 2);
                        }
                        var attemptedPercentage = Math.round(100 * attempted / (attempted + unattempted)); 
                        var percentageScore = 0;
                        if(existingAssessment.test.maxScore){
                            percentageScore = Number( 100 * score / existingAssessment.test.maxScore);
                        }    
                            
                        var evaluation = {
                            questions:{
                                attemped: attempted,
                                unattemped: unattempted,
                                correct: correctAnswers,
                                incorrect: incorrectAnswers,
                                total: correctAnswers + incorrectAnswers,
                                attemptedPercentage: attemptedPercentage,
                                
                            },
                            marked:{
                                correct: correct,
                                incorrect: incorrect,
                            },
                            score: score,
                            percentageScore: percentageScore,
                            accuracy: accuracy,
                            
                        };

                        existingAssessment.evaluation = evaluation;
                        existingAssessment.submitted = true;
                        existingAssessment._submit = moment();
                        existingAssessment.save(function(err, existingAssessment){
                            if (err) return console.error(err);
                            console.log('Assessment saved: ' + existingAssessment._id);
                            res.json(existingAssessment);
                        });    

                        }else{
                            res.json(null);
                        }
                        });
                        

                        }     
                    });
                
                    });
                
                    }else{
                        res.json(null);
                    }
                });
            }else{
                res.json(null);
            }
        } else {throw err;}
    });
    }
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
        .deepPopulate('test test.exam')
        .exec(function (err, allAssessments) {
        if (!err){
            res.json(allAssessments);
        } else {throw err;}
    });
    
});

router.post('/usertest', function(req, res) {
    var thisAssessment = req.body;
    var userId = thisAssessment.userId;
    var testId = thisAssessment.testId;
    var assessmentId = '';
    
    var existingAssessment = assessment.findOne({user: userId, test: testId},function (err, existingAssessment) {
        res.json(existingAssessment);
    });
});

router.get('/', function(req, res) {
    var limit = 400;
    var allAssessments = assessment
        .find({})
        //.limit(limit)
        //.sort('-_created')
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

router.get('/revaluateAll', function(req, res) {
    console.log('Revaluating All');
    var allAssessments = assessment
        .find({},{_id: 1, user: 1})
        //.limit(limit)
        //.sort('-_created')
        //.deepPopulate('user')
        .exec(function (err, allAssessments) {
        if (!err){
            res.json(true);
            
            allAssessments.forEach(function(thisAssessment, aIndex){
                var assessmentId = null;
    if(thisAssessment._id){
        assessmentId = thisAssessment._id.toString();
    }
    if(assessmentId){
        console.log('Revaluating ' + assessmentId);
        var existingAssessment = assessment
        .findOne({_id: assessmentId})
        .deepPopulate('test')
        .exec(function (err, existingAssessment) {
            
        if (!err){
            if(existingAssessment){
                var testId = existingAssessment.test._id.toString();
                var testSimulate = existingAssessment.test.simulate;
                
                var solutionKey = [];
                var testQuestions = question
                    .find({test: testId}, {questions: 1})
                    .deepPopulate('questions')
                    .exec(function (err, testQuestions) {
                    if(testQuestions){
                    var nQuestions = 0;   
                    var testQuestionsIds = testQuestions.map(function(a) {return a._id.toString();});
                        
                    var counter = 0;
                        
                    testQuestions.forEach(function(thisQuestion, qIndex){
                        nQuestions += thisQuestion.questions.length;
                    });
                    testQuestions.forEach(function(thisQuestion, qIndex){
                    var questionId = thisQuestion._id;
                    thisQuestion.questions.forEach(function(subQuestion, sIndex){
                        var subQuestionId = subQuestion._id;
                        var correctOptionId = null;
                        var correctNumericalAnswers = null;
                       
                        if(subQuestion.type == 'mcq'){
                            subQuestion.options.forEach(function(thisOption, oIndex){
                                if(thisOption._correct){
                                    correctOptionId = thisOption._id;

                                    var thisKey = {
                                        question: questionId.toString(),
                                        subquestion: subQuestionId.toString(),
                                        marking: subQuestion.marking,
                                        type: subQuestion.type,
                                        option: correctOptionId.toString(),
                                    };
                                    solutionKey.push(thisKey);
                                    counter += 1;
                                }


                            });
                        }
                        
                        if(subQuestion.type == 'numerical'){
                            
                            if(subQuestion.numericalAnswerType == 'Exact'){
                                correctNumericalAnswers = subQuestion.numericalAnswers;
                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    numericalAnswerType: subQuestion.numericalAnswerType,
                                    numericalAnswers: correctNumericalAnswers,
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }else if (subQuestion.numericalAnswerType == 'Range'){
                                numericalAnswerRange = subQuestion.numericalAnswerRange;
                                var thisKey = {
                                    question: questionId.toString(),
                                    subquestion: subQuestionId.toString(),
                                    marking: subQuestion.marking,
                                    type: subQuestion.type,
                                    numericalAnswerType: subQuestion.numericalAnswerType,
                                    numericalAnswerRange: numericalAnswerRange,
                                };
                                solutionKey.push(thisKey);
                                counter += 1;
                            }
                            
                        }
                        
                        if(counter == nQuestions){
                        
                            
                        var userresponses = questionresponse.find({user: thisAssessment.user, question : { $in : testQuestionsIds } },function (err, userresponses) {
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

                        var k1Index = solutionKeyQuestionIds.indexOf(thisQuestionId);
                        var k2Index = solutionKeySubQuestionIds.indexOf(thisSubQuestionId);
                        
                        
                        if(k2Index != -1){
                        var subQuestionType = solutionKey[k2Index].type;
                        var subQuestionMarking = solutionKey[k2Index].marking;
                            
                        var thisPair = {
                            questionId: thisQuestionId,
                            //question: question,
                            //subquestionId: thisSubQuestionId,
                            
                            
                            subquestion: thisSubQuestionId,
                            subQuestionType: subQuestionType,
                            marking: subQuestionMarking,
                            //userresponse: thisResponse,
                        };

                        if(subQuestionType == 'mcq'){
                            var thisOptionId = null;
                            if(thisResponse.option){
                                thisOptionId = thisResponse.option.toString();

                                if(thisOptionId == solutionKey[k2Index].option){
                                    
                                    correct.push(thisPair);
                                }else{
                                    incorrect.push(thisPair);
                                }
                            }
                        }else if (subQuestionType == 'numerical'){
                            var thisNumericalAnswer = null;
                            if(thisResponse.numericalAnswer){
                                thisNumericalAnswer = Number(thisResponse.numericalAnswer);
                                var numericalType = solutionKey[k2Index].numericalAnswerType;

                                if(numericalType == 'Exact'){
                                    var correctResponse = false;
                                    var numericalAnswers = solutionKey[k2Index].numericalAnswers;
                                    numericalAnswers.forEach(function(thisAnswer, aIndex){
                                        if(thisNumericalAnswer == Number(thisAnswer)){
                                            correctResponse = true;
                                        }
                                    });
                                    
                                    if(correctResponse){
                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                }else if(numericalType == 'Range'){
                                    var numericalAnswerRange = solutionKey[k2Index].numericalAnswerRange;
                                    var minRange = Number(numericalAnswerRange.min);
                                    var maxRange = Number(numericalAnswerRange.max);
                                    
                                    if(thisNumericalAnswer >= minRange && thisNumericalAnswer <= maxRange){
                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                    
                                }

                            }
                        }
                            
                        }else{
                            console.log('SOMETHING WENT VERY WRONG!!!');
                        }
                        
                            
                        


                        
                        });
                            
                        var correctAnswers = correct.length;
                        var incorrectAnswers = incorrect.length;
                            
                        /*console.log('Attempted: ' + attempted);
                        console.log('Unattempted: ' + unattempted);
                        console.log('Correct: ' + correctAnswers);
                        console.log('Incorrect: ' + incorrectAnswers);*/
                        var score = 0;
                            
                        correct.forEach(function(thisSubQuestionAttempt, aIndex){
                            var correctScore = 3;
                            var incorrectScore = -1;
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.correct){
                                correctScore = Number(thisSubQuestionAttempt.marking.correct);
                            }
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.incorrect){
                                incorrectScore = Number(thisSubQuestionAttempt.marking.incorrect);
                            }
                            
                            score += correctScore;
                        });
                        incorrect.forEach(function(thisSubQuestionAttempt, aIndex){
                            var correctScore = 3;
                            var incorrectScore = -1;
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.correct){
                                correctScore = Number(thisSubQuestionAttempt.marking.correct);
                            }
                            if(thisSubQuestionAttempt.marking && thisSubQuestionAttempt.marking.incorrect){
                                incorrectScore = Number(thisSubQuestionAttempt.marking.incorrect);
                            }
                            
                            score += incorrectScore;
                        });
                        score = Math.round(score * 100) / 100;
                        //console.log('Score is: ' + score);
                            
                        var evaluation = {
                            questions:{
                                attemped: attempted,
                                unattemped: unattempted,
                                correct: correctAnswers,
                                incorrect: incorrectAnswers
                            },
                            marked:{
                                correct: correct,
                                incorrect: incorrect,
                            },
                            score: score
                        };

                        existingAssessment.evaluation = evaluation;
                        //console.log('Ready to save: ' + existingAssessment._id);
                        existingAssessment.save(function(err, existingAssessment){
                            if (err) return console.error(err);
                            console.log('Assessment saved: ' + existingAssessment._id);
                            //res.json(existingAssessment);
                        });    

                        }else{
                            console.log('Found no user response!');
                            //res.json(null);
                        }
                        });
                        

                        }     
                    });
                
                    });
                
                    }else{
                        res.json(null);
                    }
                });
            }else{
                res.json(null);
            }
        } else {throw err;}
    });
    }
                
                
            });
            
            
            
            
        } else {throw err;}
    });
    
});

module.exports = router;