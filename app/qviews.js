var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var qview = require('../app/models/qview');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/remove/:qviewId', function(req, res) {
    var qviewId = req.params.qviewId;
    //console.log(qviewId);
    qview.remove({_id: qviewId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            //console.log('Question Response removed!');
            res.json(true);
        }                              
    });
    
    
});
//to add an qview
router.post('/save', function(req, res) {
    //console.log('Starting qview save!');
    var thisQView = req.body;
    //console.log(thisQView);
    var qviewId = '';
    for (var property in thisQView) {
        thisQView[property] = thisQView[property].toString();
    }
    var existingQView = qview.findOne({user: thisQView.user, question: thisQView.question, subquestion: thisQView.subquestion},function (err, existingQView) {
        if(existingQView){
            for (var property in thisQView) {
                existingQView[property] = thisQView[property];
            }
            existingQView.save(function(err, existingQView) {
                if (err) return console.error(err);
                //console.log('QView saved: ' + existingQView._id);
                res.json(existingQView);
            });
        }else{
            existingQView = new qview({});
            for (var property in thisQView) {
                existingQView[property] = thisQView[property];
            }
            existingQView.save(function(err, existingQView) {
                if (err) return console.error(err);
                //console.log('QView saved: ' + existingQView._id);
                res.json(existingQView);
            }); 
        }
    });
});

router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var allQViews = qview
        .find({user: userId})
        .exec(function (err, allQViews) {
        if (!err){
            //console.log(allQViews);
            res.json(allQViews);
        } else {throw err;}
    });
    
});



module.exports = router;