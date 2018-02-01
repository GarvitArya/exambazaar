var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var suggestCoaching = require('../app/models/suggestCoaching');
var coaching = require('../app/models/coaching');
var user = require('../app/models/user');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');


router.post('/markDone', function(req, res) {
    var suggestCoachingForm = req.body;
    var institute = suggestCoachingForm.institute;
    console.log("--------------");
    console.log(JSON.stringify(suggestCoachingForm));
    console.log("--------------");
    suggestCoaching
        .findOne({ 'institute': institute})
        .exec(function (err, thisVerification) {
        if (!err){
            console.log(thisVerification);
            if(thisVerification){
                thisVerification.active = false;
                thisVerification._finished = Date.now();
                thisVerification.save(function(err, thisVerification) {
                    if (err) return console.error(err);
                    console.log(thisVerification._id + " marked");
                    res.json(thisVerification._id);
                });
            }else{
                res.json('Done');
            }
            
        } else {throw err;}
    });
    
});

router.get('/', function(req, res) {
    var suggestCoachings = suggestCoaching
        .find({})
        .deepPopulate('user')
        .exec(function (err, suggestCoachings) {
        if (!err){
            suggestCoachings.forEach(function(thisSuggestion, index){
                var fulluser = thisSuggestion.user;
                var basicuser = fulluser.basic;
                thisSuggestion.user = basicuser;
            });
            
            
            
            res.json(suggestCoachings);
        } else {throw err;}
    });
});


router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var suggestCoachings = suggestCoaching
        .find({user: userId})
        .deepPopulate('user')
        .exec(function (err, suggestCoachings) {
        if (!err){
            res.json(suggestCoachings);
        } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var suggestCoachingForm = req.body;
    var user = suggestCoachingForm.user;
    var coachingName = suggestCoachingForm.coachingName;
    var website = suggestCoachingForm.website;
    var newCoachingGroup = suggestCoachingForm.newCoachingGroup;
    var nCenters = suggestCoachingForm.nCenters;
    
    var newsuggestCoaching = new suggestCoaching({
        user: user,
        coachingName: coachingName,
        website: website,
        nCenters: nCenters,
        newCoachingGroup: newCoachingGroup,
    });
    newsuggestCoaching.save(function(err, newsuggestCoaching) {
        if (err) return console.error(err);
        console.log('Suggestion added with id ' + newsuggestCoaching._id);
        res.json(newsuggestCoaching._id);
    });
    
});

module.exports = router;