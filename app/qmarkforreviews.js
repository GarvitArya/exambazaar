var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var user = require('../app/models/user');
var qmarkforreview = require('../app/models/qmarkforreview');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/remove/:qmarkforreviewId', function(req, res) {
    var qmarkforreviewId = req.params.qmarkforreviewId;
    console.log(qmarkforreviewId);
    qmarkforreview.remove({_id: qmarkforreviewId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Question Response removed!');
            res.json(true);
        }                              
    });
    
    
});
//to add an qmarkforreview
router.post('/save', function(req, res) {
    console.log('Starting qmarkforreview save!');
    var thisQMarkforReview = req.body;
    var qmarkforreviewId = '';
    for (var property in thisQMarkforReview) {
        thisQMarkforReview[property] = thisQMarkforReview[property].toString();
    }
    var existingQMarkforReview = qmarkforreview.findOne({user: thisQMarkforReview.user, question: thisQMarkforReview.question, subquestion: thisQMarkforReview.subquestion},function (err, existingQMarkforReview) {
        if(existingQMarkforReview){
            for (var property in thisQMarkforReview) {
                existingQMarkforReview[property] = thisQMarkforReview[property];
            }
            existingQMarkforReview.save(function(err, existingQMarkforReview) {
                if (err) return console.error(err);
                console.log('QMarkforReview saved: ' + existingQMarkforReview._id);
                res.json(existingQMarkforReview);
            });
        }else{
            existingQMarkforReview = new qmarkforreview({});
            for (var property in thisQMarkforReview) {
                existingQMarkforReview[property] = thisQMarkforReview[property];
            }
            existingQMarkforReview.save(function(err, existingQMarkforReview) {
                if (err) return console.error(err);
                console.log('QMarkforReview saved: ' + existingQMarkforReview._id);
                res.json(existingQMarkforReview);
            }); 
        }
    });
});

router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var allQMarkforReviews = qmarkforreview
        .find({user: userId})
        .exec(function (err, allQMarkforReviews) {
        if (!err){
            res.json(allQMarkforReviews);
        } else {throw err;}
    });
    
});



module.exports = router;