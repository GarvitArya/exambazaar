var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var cirffactor = require('../app/models/cirffactor');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/remove/:cirffactorId', function(req, res) {
    var cirffactorId = req.params.cirffactorId;
    console.log(cirffactorId);
    cirffactor.remove({_id: cirffactorId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('CIRF Factor removed!');
            res.json(true);
        }                              
    });
    
    
});
//to add an cirffactor
router.post('/save', function(req, res) {
    console.log('Starting cirffactor save!');
    var thisCirfFactor = req.body;
    var cirffactorId = '';
    if(thisCirfFactor._id){
        cirffactorId = thisCirfFactor._id;
    }
    /*for (var property in thisCirfFactor) {
        thisCirfFactor[property] = thisCirfFactor[property].toString();
    }*/
    var existingCirfFactor = cirffactor.findOne({_id: cirffactorId},function (err, existingCirfFactor) {
        if(existingCirfFactor){
            for (var property in thisCirfFactor) {
                existingCirfFactor[property] = thisCirfFactor[property];
            }
            existingCirfFactor.save(function(err, existingCirfFactor) {
                if (err) return console.error(err);
                console.log('CirfFactor saved: ' + existingCirfFactor._id);
                res.json(existingCirfFactor);
            });
        }else{
            existingCirfFactor = new cirffactor({});
            for (var property in thisCirfFactor) {
                existingCirfFactor[property] = thisCirfFactor[property];
            }
            existingCirfFactor.save(function(err, existingCirfFactor) {
                if (err) return console.error(err);
                console.log('CirfFactor saved: ' + existingCirfFactor._id);
                res.json(existingCirfFactor);
            }); 
        }
    });
});

router.get('/exam/:examId', function(req, res) {
    var examId = req.params.examId;
    var allCirfFactors = cirffactor
        .find({exam: examId})
        .exec(function (err, allCirfFactors) {
        if (!err){
            res.json(allCirfFactors);
        } else {throw err;}
    });
    
});



module.exports = router;