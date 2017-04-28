var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var toverifyci = require('../app/models/toverifyci');
var targetStudyProvider = require('../app/models/targetStudyProvider');


var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular toverifyci with _id toverifyciId
router.get('/edit/:toverifyciId', function(req, res) {
    var toverifyciId = req.params.toverifyciId;
    //console.log(toverifyciId);
    toverifyci
        .findOne({ '_id': toverifyciId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/remove/:toverifyciId', function(req, res) {
    var toverifyciId = req.params.toverifyciId;
    console.log(toverifyciId);
    
    
    toverifyci.remove({_id: new mongodb.ObjectID(toverifyciId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(toverifyciId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/verifiedCount', function(req, res) {
    toverifyci.distinct( "institute",{active: false},function(err, docs) {
    if (!err){
        res.json(docs.length);
    } else {throw err;}
    });
});

router.get('/institutesFilled', function(req, res) {
    toverifyci.distinct( "institute",{},function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

router.post('/markDone', function(req, res) {
    var toverifyciForm = req.body;
    var institute = toverifyciForm.institute;
    
    toverifyci
        .findOne({ 'institute': institute})
        .exec(function (err, thisVerification) {
        if (!err){
            //console.log(docs);
            if(thisVerification){
                thisVerification.active = false;
                thisVerification._finished = Date.now();
                thisVerification.save(function(err, thisVerification) {
                    if (err) return console.error(err);
                    res.json(thisVerification._id);
                });
            }else{
                res.json('Done');
            }
            
        } else {throw err;}
    });
    
});

//to get all toverifycis
router.get('/', function(req, res) {
    var toverifycis = toverifyci
        .find({})
        .deepPopulate('institute user')
        .exec(function (err, toverifycis) {
        if (!err){
            var basicFillTasks = [];
            var counter = 0;
            var nLength = toverifycis.length;
            //console.log(nLength);
            toverifycis.forEach(function(thisFillTask, index){
                var newTask = {
                    _id: thisFillTask._id,
                    user: {
                        _id: thisFillTask.user._id,
                        name: thisFillTask.user.basic.name,
                    },
                    institute: {
                        _id: thisFillTask.institute._id,
                        name: thisFillTask.institute.name,
                        address: thisFillTask.institute.address,
                        city: thisFillTask.institute.city,
                        pincode: thisFillTask.institute.pincode,
                        email: thisFillTask.institute.email
                    },
                    _created: thisFillTask._created,
                    _deadline: thisFillTask._deadline,
                    _finished: thisFillTask._finished,
                    active: thisFillTask.active,

                };
                counter = counter + 1;
                basicFillTasks.push(newTask);
                if(counter == nLength){
                    res.json(basicFillTasks);
                }
            });
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
});
//to get all toverifycis for a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var toverifycis = toverifyci
        .find({user: userId})
        .deepPopulate('institute user')
        .exec(function (err, toverifycis) {
        if (!err){
            var basicFillTasks = [];
            var counter = 0;
            var nLength = toverifycis.length;
            toverifycis.forEach(function(thisFillTask, index){
                var newTask = {
                    user: {
                        _id: thisFillTask.user._id,
                        name: thisFillTask.user.basic.name,
                    },
                    institute: {
                        _id: thisFillTask.institute._id,
                        name: thisFillTask.institute.name,
                        address: thisFillTask.institute.address,
                        city: thisFillTask.institute.city,
                        pincode: thisFillTask.institute.pincode
                    },
                    _created: thisFillTask._created,
                    _deadline: thisFillTask._deadline,
                    _finished: thisFillTask._finished,
                    active: thisFillTask.active,

                };
                counter = counter + 1;
                basicFillTasks.push(newTask);
                if(counter == nLength){
                    res.json(basicFillTasks);
                }
            });
            
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
    
});


router.post('/save', function(req, res) {
    var toverifyciForm = req.body;
    var instituteVerifyCount = toverifyciForm.instituteVerifyCount;
    instituteVerifyCount = parseInt(instituteVerifyCount);
    var verifyCity = toverifyciForm.verifyCity;
    var user = toverifyciForm.user;
    var _deadline = toverifyciForm._deadline;
    console.info(JSON.stringify(toverifyciForm));
    
    var cityProviders = targetStudyProvider
        .find({'city': verifyCity, disabled: {$ne: true}, ebVerify: {$exists: false}, verfiyAssigned: {$ne: true} },{name:1, address:1})
        .limit(instituteVerifyCount)
        .exec(function (err, cityProviders) {
        if (!err){
            var nLength = cityProviders.length;
            var counter = 0;
            console.log(nLength);
            cityProviders.forEach(function(thisProvider, index){
                counter += 1;
                var newtoverifyci = new toverifyci({
                    institute: thisProvider,
                    user: user,
                    _deadline: _deadline
                });
                newtoverifyci.save(function(err, newtoverifyci) {
                    if (err) return console.error(err);
                    console.log(newtoverifyci._id + ' created');
                    thisProvider.verfiyAssigned = true;
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log('Provider updated!');
                    });
                });
                if(counter == nLength){
                    res.json('Done');
                }
            });
            //console.log(cityProviders);
            if(nLength == 0){
                res.json('None Left');
            }
            
        } else {throw err;}
    });
    
    
    
    
    
    
});

module.exports = router;