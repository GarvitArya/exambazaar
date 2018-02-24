var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var question = require('../app/models/question');
var questionresponse = require('../app/models/questionresponse');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/remove/:questionresponseId', function(req, res) {
    var questionresponseId = req.params.questionresponseId;
    console.log(questionresponseId);
    questionresponse.remove({_id: questionresponseId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Question Response removed!');
            res.json(true);
        }                              
    });
    
    
});
//to add an questionresponse
router.post('/save', function(req, res) {
    console.log('Starting questionresponse save!');
    var thisQuestionResponse = req.body;
    var questionresponseId = '';
    for (var property in thisQuestionResponse) {
        thisQuestionResponse[property] = thisQuestionResponse[property].toString();
    }
    
    var thisQuestion = question.findOne({_id: thisQuestionResponse.question},function (err, thisQuestion){
        var thisSubquestionIds = thisQuestion.questions.map(function(a) {return a._id.toString();});
        var tsIndex = thisSubquestionIds.indexOf(thisQuestionResponse.subquestion.toString());
        if(tsIndex != -1){
            var thisSubQuestion = thisQuestion.questions[tsIndex];
            if(thisSubQuestion.type == 'mcq' && thisSubQuestion.mcqma){
            
            var thisOption = thisQuestionResponse.option.toString();    
            var existingQuestionResponses = questionresponse.find({user: thisQuestionResponse.user, question: thisQuestionResponse.question, subquestion: thisQuestionResponse.subquestion},function (err, existingQuestionResponses) {
                if(existingQuestionResponses){
                    var exists = false;
                    var existsQRID = false;
                    existingQuestionResponses.forEach(function(existingQuestionResponse, eIndex){
                        var qrOption = existingQuestionResponse.option.toString();
                        
                        if(qrOption == thisOption){
                            exists = true;
                            existsQRID = existingQuestionResponse._id;
                        }
                        
                        
                        
                    });
                    if(exists){
                        //console.log('Have to remove: ' + existsQRID);
                        questionresponse.remove({_id: existsQRID}, function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Question Response removed!');
                                res.json(true);
                            }                              
                        });
                        
                        
                    }else{
                       var existingQuestionResponse = new questionresponse({});
                        for (var property in thisQuestionResponse) {
                            existingQuestionResponse[property] = thisQuestionResponse[property];
                        }
                        existingQuestionResponse.save(function(err, existingQuestionResponse) {
                            if (err) return console.error(err);
                            console.log('QuestionResponse saved: ' + existingQuestionResponse._id);
                            res.json(existingQuestionResponse);
                        }); 
                    }
                    
                    
                }else{
                    var existingQuestionResponse = new questionresponse({});
                    for (var property in thisQuestionResponse) {
                        existingQuestionResponse[property] = thisQuestionResponse[property];
                    }
                    existingQuestionResponse.save(function(err, existingQuestionResponse) {
                        if (err) return console.error(err);
                        console.log('QuestionResponse saved: ' + existingQuestionResponse._id);
                        res.json(existingQuestionResponse);
                    }); 
                }
            });    
                
                
                
            }else{
                
            var existingQuestionResponse = questionresponse.findOne({user: thisQuestionResponse.user, question: thisQuestionResponse.question, subquestion: thisQuestionResponse.subquestion},function (err, existingQuestionResponse) {
                if(existingQuestionResponse){
                    for (var property in thisQuestionResponse) {
                        existingQuestionResponse[property] = thisQuestionResponse[property];
                    }
                    existingQuestionResponse.save(function(err, existingQuestionResponse) {
                        if (err) return console.error(err);
                        console.log('QuestionResponse saved: ' + existingQuestionResponse._id);
                        res.json(existingQuestionResponse);
                    });
                }else{
                    existingQuestionResponse = new questionresponse({});
                    for (var property in thisQuestionResponse) {
                        existingQuestionResponse[property] = thisQuestionResponse[property];
                    }
                    existingQuestionResponse.save(function(err, existingQuestionResponse) {
                        if (err) return console.error(err);
                        console.log('QuestionResponse saved: ' + existingQuestionResponse._id);
                        res.json(existingQuestionResponse);
                    }); 
                }
            });
                
                
                
                
                
            }
            
            
        }else{
            
            console.log('SOMETHING WENT VERY WRONG!!!');
        }
        
    });
    
});

router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var allQuestionResponses = questionresponse
        .find({user: userId})
        .exec(function (err, allQuestionResponses) {
        if (!err){
            res.json(allQuestionResponses);
        } else {throw err;}
    });
    
});



module.exports = router;