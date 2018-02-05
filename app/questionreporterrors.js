var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var question = require('../app/models/question');
var questionreporterror = require('../app/models/questionreporterror');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/remove/:questionreporterrorId', function(req, res) {
    var questionreporterrorId = req.params.questionreporterrorId;
    console.log(questionreporterrorId);
    questionreporterror.remove({_id: questionreporterrorId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Question Response removed!');
            res.json(true);
        }                              
    });
    
    
});

router.get('/markReviewed/:questionreporterrorId', function(req, res) {
    var questionreporterrorId = req.params.questionreporterrorId;
    console.log(questionreporterrorId);
    var thisReport = questionreporterror
        .findOne({_id: questionreporterrorId})
        .exec(function (err, thisReport) {
        if (!err){
            if(thisReport){
                thisReport.reviewed = true;
                thisReport.save(function(err, thisReport) {
                    if (err) return console.error(err);
                    console.log('QuestionReportError saved: ' + thisReport._id);
                    res.json(true);
                }); 
            }else{
                res.json(false);
            }
            
            
            
        } else {throw err;}
    });
    
    
});
//to add an questionreporterror
router.post('/save', function(req, res) {
    console.log('Starting questionreporterror save!');
    var thisQuestionReportError = req.body;
    var questionreporterrorId = '';
    for (var property in thisQuestionReportError) {
        thisQuestionReportError[property] = thisQuestionReportError[property].toString();
    }
    var existingQuestionReportError = questionreporterror.findOne({user: thisQuestionReportError.user, question: thisQuestionReportError.question, subquestion: thisQuestionReportError.subquestion},function (err, existingQuestionReportError) {
        if(existingQuestionReportError){
            for (var property in thisQuestionReportError) {
                existingQuestionReportError[property] = thisQuestionReportError[property];
            }
            existingQuestionReportError.save(function(err, existingQuestionReportError) {
                if (err) return console.error(err);
                console.log('QuestionReportError saved: ' + existingQuestionReportError._id);
                res.json(existingQuestionReportError);
            });
        }else{
            existingQuestionReportError = new questionreporterror({});
            for (var property in thisQuestionReportError) {
                existingQuestionReportError[property] = thisQuestionReportError[property];
            }
            existingQuestionReportError.save(function(err, existingQuestionReportError) {
                if (err) return console.error(err);
                console.log('QuestionReportError saved: ' + existingQuestionReportError._id);
                res.json(existingQuestionReportError);
            }); 
        }
    });
});

router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var allQuestionReportErrors = questionreporterror
        .find({user: userId})
        .exec(function (err, allQuestionReportErrors) {
        if (!err){
            res.json(allQuestionReportErrors);
        } else {throw err;}
    });
    
});

router.get('/', function(req, res) {
    var allQuestionReportErrors = questionreporterror
        .find({})
        .exec(function (err, allQuestionReportErrors) {
        if (!err){
            var finalReports = [];
            if(allQuestionReportErrors && allQuestionReportErrors.length > 0){
                
            allQuestionReportErrors.forEach(function(thisQuestionReport, qIndex){
                var newQuestionReport = {
                    _id: thisQuestionReport._id,
                    test: thisQuestionReport.test,
                    user: thisQuestionReport.user,
                    reasons: thisQuestionReport.reasons,
                    comment: thisQuestionReport.comment,
                    reviewed: thisQuestionReport.reviewed,
                    _created: thisQuestionReport._created,
                };
                finalReports.push(newQuestionReport);
            });
            var questionIds = allQuestionReportErrors.map(function(a) {return a.question.toString();});
            var userIds = allQuestionReportErrors.map(function(a) {return a.user.toString();});
            var subquestionIds = allQuestionReportErrors.map(function(a) {return a.subquestion.toString();});

            var existingUsers = user.find({ '_id': {$in: userIds} }, {basic: 1},function (err, existingUsers) {
                
            var existingQuestions = question.find({ '_id': {$in: questionIds} }, {questions: 1, _startnumber:1, _endnumber: 1},function (err, existingQuestions) {
                var existingUserIds = existingUsers.map(function(a) {return a._id.toString();});
                var existingQuestionIds = existingQuestions.map(function(a) {return a._id.toString();});
                allQuestionReportErrors.forEach(function(thisQuestionReport, aqrIndex){
                    var thisUserId = thisQuestionReport.user.toString();
                    var thisQuestionId = thisQuestionReport.question.toString();
                    var thisSubQuestionId = thisQuestionReport.subquestion.toString();
                    var uIndex = existingUserIds.indexOf(thisUserId);
                    if(uIndex != -1){
                        finalReports[aqrIndex].username = existingUsers[uIndex].basic.name;
                    }
                    
                    var qIndex = existingQuestionIds.indexOf(thisQuestionId);
                    if(qIndex != -1){
                        var thisQuestion = existingQuestions[qIndex];
                        var thisSubQuestionIds =  thisQuestion.questions.map(function(a) {return a._id.toString();});
                        var sqIndex = thisSubQuestionIds.indexOf(thisSubQuestionId);
                        
                        if(sqIndex != -1){
                            var qno = Number(thisQuestion._startnumber) + sqIndex;
                            finalReports[aqrIndex].qno = qno;
                            
                        }
                    }
                    if(aqrIndex == allQuestionReportErrors.length - 1){
                        res.json(finalReports);   
                    }
                    
                });
                
                });
                });
            }else{
                 res.json([]);
            }
            
            
        } else {throw err;}
    });
    
});

module.exports = router;