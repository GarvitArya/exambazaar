var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');

var config = require('../config/mydatabase.js');
var user = require('../app/models/user');
var view = require('../app/models/view');
var assessment = require('../app/models/assessment');
var question = require('../app/models/question');
var questionresponse = require('../app/models/questionresponse');
var review = require('../app/models/review');
var coupon = require('../app/models/coupon');
var userrefer = require('../app/models/userrefer');
var email = require('../app/models/email');
var cisaved = require('../app/models/cisaved');
var question = require('../app/models/question');
var blogpost = require('../app/models/blogpost');
var mongoose = require('mongoose');
var coaching = require('../app/models/coaching');
var helper = require('sendgrid').mail;
var sendGridCredential = require('../app/models/sendGridCredential');
var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');

var procmon1 = null;
function totalUserCount(){
    user.count({}, function(err, docs) {
    if (!err){
        var res = {
            users:{
                all: docs,
            },
        };
        prevDayUserCount(res);
    } else {throw err;}
    });
};
function prevDayUserCount(res){
    var start = moment().subtract(1, 'day').startOf('day');
    var end = moment().subtract(1, 'day').endOf('day');
    
    user.count({_created: {  $gte : start, $lte : end}}, function(err, docs) {
    if (!err){
        res.users.prevDay = docs;
        totalViewCount(res);
    } else {throw err;}
    });
};
function totalViewCount(res){
    view.count({}, function(err, docs) {
    if (!err){
        res.views = {
            all: docs
        };
        prevDayViewCount(res);
    } else {throw err;}
    });
};
function prevDayViewCount(res){
    var start = moment().subtract(1, 'day').startOf('day');
    var end = moment().subtract(1, 'day').endOf('day');
    
    view.count({_date: {  $gte : start, $lte : end}}, function(err, docs) {
    if (!err){
        res.views.prevDay = docs;
        totalProviderCount(res);
    } else {throw err;}
    });
};
function totalProviderCount(res){
    coaching.count({}, function(err, docs) {
    if (!err){
        res.providers = {
            all: docs,
        };
        prevDayProviderCount(res);
    } else {throw err;}
    });
};
function prevDayProviderCount(res){
    var start = moment().subtract(1, 'day').startOf('day');
    var end = moment().subtract(1, 'day').endOf('day');
    
    coaching.count({_created: {  $gte : start, $lte : end}}, function(err, docs) {
    if (!err){
        res.providers.prevDay= docs;
        totalReviewCount(res);
    } else {throw err;}
    });
};
function totalReviewCount(res){
    review.count({}, function(err, docs) {
    if (!err){
        res.reviews = {
            all: docs
        };
        prevDayReviewCount(res);
    } else {throw err;}
    });
};
function prevDayReviewCount(res){
    var start = moment().subtract(1, 'day').startOf('day');
    var end = moment().subtract(1, 'day').endOf('day');
    review.count({_date: {  $gte : start, $lte : end}}, function(err, docs) {
    if (!err){
        res.reviews.prevDay = docs;
        totalQuestionCount(res);
    } else {throw err;}
    });
};

function totalQuestionCount(res){
    question.count({}, function(err, docs) {
    if (!err){
        res.questions = {
            all: docs
        };
        prevDayQuestionCount(res);
    } else {throw err;}
    });
};
function prevDayQuestionCount(res){
    var start = moment().subtract(1, 'day').startOf('day');
    var end = moment().subtract(1, 'day').endOf('day');
    question.count({_created: {  $gte : start, $lte : end}}, function(err, docs) {
    if (!err){
        res.questions.prevDay = docs;
        totalBlogCount(res);
    } else {throw err;}
    });
};

function totalBlogCount(res){
    blogpost.count({active: true}, function(err, docs) {
    if (!err){
        res.blogs = {
            all: docs
        };
        prevDayBlogCount(res);
    } else {throw err;}
    });
};
function prevDayBlogCount(res){
    var start = moment().subtract(1, 'day').startOf('day');
    var end = moment().subtract(1, 'day').endOf('day');
    blogpost.count({_created: {  $gte : start, $lte : end}, active: true}, function(err, docs) {
    if (!err){
        res.blogs.prevDay = docs;
        router.procmon(res);
    } else {throw err;}
    });
};

router.helper = function(){
    totalUserCount();
    //console.log(userStats);
};
router.procmon = function(stats){
    console.log(stats);
    var templateName = 'EB Internal - Procmon - 1';
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    
    var to = 'gaurav@exambazaar.com';
    
    sendGridCredential.findOne({'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    var from_email = new helper.Email(fromEmail);
                    
                    var to_email = new helper.Email(to);
                    var html = ' ';
                    var timeNow = moment().format('LLLL');
                    var subject = 'EB Process Monitor -  Daily Summary ' + timeNow;
                    var content = new helper.Content('text/html', html);
                    
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    
                    console.log(JSON.stringify(stats));
                    
                    /*var usersaddedprevDay = stats.users.prevDay;
                    var totalusers = stats.users.all;
                    var viewsprevDay = stats.views.prevDay;
                    var totalviews = stats.views.all;
                    var providerssprevDay = stats.providers.prevDay;
                    var totalproviders = stats.providers.all;
                    var questionsprevDay = stats.questions.prevDay;
                    var totalquestions = stats.questions.all;
                    
                    console.log(totalusers);
                    console.log(totalviews);
                    console.log(totalproviders);*/
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-runtime-', timeNow));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-totalusers-', stats.users.all));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-usersaddedprevDay-', stats.users.prevDay));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-totalviews-', stats.views.all));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-viewsprevDay-', stats.views.prevDay));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-totalproviders-', stats.providers.all));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-providersprevDay-', stats.providers.prevDay));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-totalreviews-', stats.reviews.all));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-reviewsprevDay-', stats.reviews.prevDay));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-totalquestions-', stats.questions.all));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-questionsprevDay-', stats.questions.prevDay));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-totalblogs-', stats.blogs.all));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-blogsprevDay-', stats.blogs.prevDay));
                    
                    var attachment = new helper.Attachment();
                    //var file = fs.readFileSync('/https://exambazaar.s3.amazonaws.com/bbfa995da1ab3d520daaea76c810c4c7.pdf');
                    request.get('https://exambazaar.s3.amazonaws.com/0bd2a2ac702232fcc83f0a2047b6de19.pdf', function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(response);
                            var file = body;
                            
                            var base64File = new Buffer(file).toString('base64');
                            attachment.setContent(base64File);
                            attachment.setType('application/pdf');
                            attachment.setFilename('JEE Brochure.pdf');
                            attachment.setDisposition('attachment');
                            //mail.addAttachment(attachment);

                            var emailrequest = sg.emptyRequest({
                              method: 'POST',
                              path: '/v3/mail/send',
                              body: mail.toJSON(),
                            });
                            sg.API(emailrequest, function(error, response) {
                                if(error){
                                    console.log('Could not send email! ' + error);
                                }else{
                                    //res.json('Done');
                                    console.log(response);
                                }
                            });
                            
                            
                            
                        }else {
                            console.log(response);
                            throw error;
                        }
                    });
                    
                    
                }
                if(counter == nLength){
                    if(!templateFound){
                        console.log('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    console.log('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            console.log('No Active SendGrid API Key');
        }
    });
};
router.timestamp = function() {
	console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000))
};


router.assessmentshelper = function(){
    console.log('Running Assessment Service: ' + Date.now());
    
    var overdueAssessments = assessment
        .find({"evaluation.score": {$exists: false}, "_end" : {"$lte": new Date()}}, {_id: 1})
        .exec(function (err, overdueAssessments) {    
        if (!err){
            console.log(overdueAssessments.length);
            overdueAssessments.forEach(function(assessmentId, aIndex){
            
            if(assessmentId){
            var existingAssessment = assessment
            .findOne({_id: assessmentId})
            .deepPopulate('test')
            .exec(function (err, existingAssessment) {

            if (!err){
                if(existingAssessment){
                    var testId = existingAssessment.test._id.toString();
                    var testSimulate = existingAssessment.test.simulate;
                    //console.log(testSimulate);

                    var solutionKey = [];
                    var testQuestions = question
                        .find({test: testId}, {questions: 1})
                        .deepPopulate('questions')
                        .exec(function (err, testQuestions) {
                        if(testQuestions){
                        var nQuestions = 0;   
                        var testQuestionsIds = testQuestions.map(function(a) {return a._id.toString();});

                        var counter = 0;

                        testQuestions.forEach(function(thisQuesiton, qIndex){
                            nQuestions += thisQuesiton.questions.length;
                        });
                        //console.log(nQuestions);
                        testQuestions.forEach(function(thisQuesiton, qIndex){
                        var questionId = thisQuesiton._id;
                        thisQuesiton.questions.forEach(function(subQuestion, sIndex){
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


                            var userresponses = questionresponse.find({user: existingAssessment.user, question : { $in : testQuestionsIds } },function (err, userresponses) {
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


                            if(k1Index == k2Index && k1Index != -1){
                            var subQuestionType = solutionKey[k1Index].type;
                            var subQuestionMarking = solutionKey[k1Index].marking;

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

                                    if(thisOptionId == solutionKey[k1Index].option){

                                        correct.push(thisPair);
                                    }else{
                                        incorrect.push(thisPair);
                                    }
                                }
                            }else if (subQuestionType == 'numerical'){
                                var thisNumericalAnswer = null;
                                if(thisResponse.numericalAnswer){
                                    thisNumericalAnswer = Number(thisResponse.numericalAnswer);
                                    var numericalType = solutionKey[k1Index].numericalAnswerType;

                                    if(numericalType == 'Exact'){
                                        var correctResponse = false;
                                        var numericalAnswers = solutionKey[k1Index].numericalAnswers;
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
                                        var numericalAnswerRange = solutionKey[k1Index].numericalAnswerRange;
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
                            console.log('Score is: ' + score);

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
                            existingAssessment.save(function(err, existingAssessment){
                                if (err) return console.error(err);
                                //console.log('Assessment saved: ' + existingAssessment._id);
                                //res.json(existingAssessment);
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
            });
        }
    });
              
    
    
    
};

module.exports = router;