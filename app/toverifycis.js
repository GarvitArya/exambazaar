var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var toverifyci = require('../app/models/toverifyci');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var user = require('../app/models/user');

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

router.get('/changeUser', function(req, res) {
    var userId = '58e5fdd86c9be422e4820d7e';
    
    var toverifycis = toverifyci
        .find({user: userId, active: true})
        .exec(function (err, toverifycis) {
        if (!err){
            nLength = toverifycis.length;
            console.log(nLength);
            toverifycis.forEach(function(thisFillTask, index){
                thisFillTask.user = '59085f0fc7289d0011d6ea8c';
                thisFillTask._deadline = Date.parse('2017-06-06T18:29:59.000Z');
                thisFillTask.save(function(err, thisFillTask) {
                    if (err) return console.error(err);
                    console.log(thisFillTask._id + ' updated');
                });
            });
            
            res.json([]);
            if(nLength == 0){
                res.json([]);
            }
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
    console.log("--------------");
    console.log(JSON.stringify(toverifyciForm));
    console.log("--------------");
    toverifyci
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
    var toverifycis = toverifyci
        .find({})
        .exec(function (err, toverifycis) {
        if (!err){
            var basicFillTasks = [];
            var counter = 0;
            var nLength = toverifycis.length;
            
            toverifycis.forEach(function(thisFillTask, index){
                var instituteId = thisFillTask.institute;
                var userId = thisFillTask.user;
                var thisProvider = targetStudyProvider
                    .findOne({'_id': instituteId}, {name:1, city:1, email:1, ebVerifyState:1})
                    .exec(function (err, thisProvider) {
                    if (!err){
                        
                    var thisUser = user
                        .findOne({ '_id': userId },{basic:1})
                        .deepPopulate('partner partner.location')
                        .exec(function (err, thisUser) {
                        if (!err){
                            var newTask = {
                            _id: thisFillTask._id,
                            user: thisUser,
                            institute: thisProvider,
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
                            
                        } else {throw err;}
                    });
                        
                    } else {throw err;}
                });
 
            });
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
});

//to get all toverifycis
/*router.get('/', function(req, res) {
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
                        email: thisFillTask.institute.email,
                        ebVerifyState: thisFillTask.institute.ebVerifyState
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
});*/
//to get all toverifycis for a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var toverifycis = toverifyci
        .find({user: userId})
        .deepPopulate('institute user institute.ebNote.user')
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
                        pincode: thisFillTask.institute.pincode,
                        ebNote: thisFillTask.institute.ebNote,
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
    //console.info(JSON.stringify(toverifyciForm));
    //, ebVerify: {$exists: false}
    var cityProviders = targetStudyProvider
        .find({'city': verifyCity, disabled: {$ne: true}, verfiyAssigned: {$ne: true}, website: {$exists: true}, $where:"this.website.length>0 && this.website[0]!=''" },{name:1, address:1, website: 1})
        .limit(instituteVerifyCount)
        .exec(function (err, cityProviders) {
        if (!err){
            var nLength = cityProviders.length;
            var counter = 0;
            console.log(nLength);
            cityProviders.forEach(function(thisProvider, index){
                //console.log(thisProvider._id + " " + JSON.stringify(thisProvider.website));
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