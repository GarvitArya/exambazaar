var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var eligibility = require('../app/models/eligibility');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an eligibility
router.post('/bulksave', function(req, res) {
    var thisEligibilitys = req.body;
    
    var nLength = thisEligibilitys.length;
    console.log(nLength);
    var counter = 0;
    
    thisEligibilitys.forEach(function(thisEligibility, eIndex){
        
        var eligibilityId = thisEligibility._id;
        var existingEligibility = eligibility.findOne({ '_id': eligibilityId },function (err, existingEligibility) {
            if(existingEligibility){
                for (var property in thisEligibility) {
                    existingEligibility[property] = thisEligibility[property];
                }
                console.log("Eligibility is: " + JSON.stringify(existingEligibility));
                existingEligibility.save(function(err, existingEligibility) {
                    if (err) return console.error(err);
                    console.log(existingEligibility._id + " saved!");
                    counter = counter + 1;
                    if(counter == nLength){
                        res.json('Done');
                    }
                    //res.json('Done');
                });
            }else{
                
                var this_eligibility = new eligibility({});
                for (var property in thisEligibility) {
                    this_eligibility[property] = thisEligibility[property];
                }
                console.log(this_eligibility);
                this_eligibility.save(function(err, this_eligibility) {
                    if (err) return console.error(err);
                    counter = counter + 1;
                    if(counter == nLength){
                        res.json('Done');
                    }
                    //res.json(this_eligibility._id);
                }); 
            }
            
        });
        if(nLength == 0){
            res.json('Done');
        }
        
    });
    
    
});

//to get all eligibilitys
router.get('/', function(req, res) {
    //console.log('Here');
    eligibility
        .find({ })
        .deepPopulate('exam')
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
    
});

router.get('/count', function(req, res) {
    eligibility.count({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular user with _id userId
router.get('/edit/:eligibilityId', function(req, res) {
    var eligibilityId = req.params.eligibilityId;
    //console.log("Eligibility is " + eligibilityId);
    eligibility
        .findOne({ '_id': eligibilityId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

module.exports = router;