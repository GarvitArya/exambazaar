var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
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