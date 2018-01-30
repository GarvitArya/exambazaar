var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
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



module.exports = router;