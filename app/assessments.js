var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var assessment = require('../app/models/assessment');
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
    var assessmentId = '';
    for(var property in thisAssessment){
        if(property != 'info'){
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
            existingAssessment._end = moment().add(30, 'minutes');
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
        thisAssessment[property] = thisAssessment[property].toString();
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



module.exports = router;