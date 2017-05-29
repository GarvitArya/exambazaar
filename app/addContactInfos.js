var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var addContactInfo = require('../app/models/addContactInfo');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var user = require('../app/models/user');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular addContactInfo with _id addContactInfoId
router.get('/edit/:addContactInfoId', function(req, res) {
    var addContactInfoId = req.params.addContactInfoId;
    //console.log(addContactInfoId);
    addContactInfo
        .findOne({ '_id': addContactInfoId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/remove/:addContactInfoId', function(req, res) {
    var addContactInfoId = req.params.addContactInfoId;
    console.log(addContactInfoId);
    
    
    addContactInfo.remove({_id: new mongodb.ObjectID(addContactInfoId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(addContactInfoId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/verifiedCount', function(req, res) {
    addContactInfo.distinct( "institute",{active: false},function(err, docs) {
    if (!err){
        res.json(docs.length);
    } else {throw err;}
    });
});

router.get('/changeUser', function(req, res) {
    var userId = '58f65c7bb84f2a00119eae7a';
    
    var addContactInfos = addContactInfo
        .find({user: userId})
        .exec(function (err, addContactInfos) {
        if (!err){
            nLength = addContactInfos.length;
            addContactInfos.forEach(function(thisFillTask, index){
                thisFillTask.user = '58900bd8fc519c0a04be52e8';
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
    addContactInfo.distinct( "institute",{},function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

router.post('/markDone', function(req, res) {
    var addContactInfoForm = req.body;
    var institute = addContactInfoForm.institute;
    
    addContactInfo
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

router.get('/', function(req, res) {
    var addContactInfos = addContactInfo
        .find({})
        .exec(function (err, addContactInfos) {
        if (!err){
            var basicFillTasks = [];
            var counter = 0;
            var nLength = addContactInfos.length;
            
            addContactInfos.forEach(function(thisFillTask, index){
                var instituteId = thisFillTask.institute;
                var userId = thisFillTask.user;
                var thisProvider = targetStudyProvider
                    .findOne({'_id': instituteId}, {name:1, city:1, email:1, website:1, facebookPage:1, youtubeChannel:1})
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

//to get all addContactInfos
/*router.get('/', function(req, res) {
    var addContactInfos = addContactInfo
        .find({})
        .deepPopulate('institute user')
        .exec(function (err, addContactInfos) {
        if (!err){
            var basicFillTasks = [];
            var counter = 0;
            var nLength = addContactInfos.length;
            //console.log(nLength);
            addContactInfos.forEach(function(thisFillTask, index){
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
//to get all addContactInfos for a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var addContactInfos = addContactInfo
        .find({user: userId})
        .deepPopulate('institute user institute.ebNote.user')
        .exec(function (err, addContactInfos) {
        if (!err){
            var basicFillTasks = [];
            var counter = 0;
            var nLength = addContactInfos.length;
            addContactInfos.forEach(function(thisFillTask, index){
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
    var addContactInfoForm = req.body;
    var addContactInfoCount = addContactInfoForm.addContactInfoCount;
    addContactInfoCount = parseInt(addContactInfoCount);
    var addContactInfoCity = addContactInfoForm.addContactInfoCity;
    var user = addContactInfoForm.user;
    var _deadline = addContactInfoForm._deadline;
    console.info(JSON.stringify(addContactInfoForm));
    //, ebVerify: {$exists: false}
    var cityProviders = targetStudyProvider
        .find({'city': addContactInfoCity, disabled: {$ne: true}, website: {$ne: true}, addContactInfoAssigned: {$ne: true}, addContactInfoRequired: {$ne: false},addContactInfoDone: {$ne: true}},{name:1, groupName:1})
        .limit(addContactInfoCount)
        .exec(function (err, cityProviders) {
        if (!err){
            var nLength = Math.min(addContactInfoCount,cityProviders.length);   
            
            var assignedInstitutes = 0;
            var counter = 0;
            console.log(nLength);
            cityProviders.forEach(function(thisProvider, index){
                
                if(assignedInstitutes < addContactInfoCount)
                {
                var groupName = thisProvider.groupName;
                var websiteExists = false;
                var groupInstitutes = targetStudyProvider
                    .find({'groupName': groupName, disabled:false},{website:1})
                    .exec(function (err, groupInstitutes) {
                    if (!err){
                        groupInstitutes.forEach(function(thisInstitute, iIndex){
                            var website = thisInstitute.website;
                            
                            if(website && !websiteExists){
                               website.forEach(function(thisW, wIndex){
                                   if(thisW && thisW !=''){
                                       websiteExists = true;
                                   }
                               });
                            }
                        });
                        
                        counter += 1;
                        if(!websiteExists){
                            var newaddContactInfo = new addContactInfo({
                                institute: thisProvider,
                                user: user,
                                _deadline: _deadline
                            });
                            newaddContactInfo.save(function(err, newaddContactInfo) {
                                if (err) return console.error(err);
                                console.log(newaddContactInfo._id + ' created');
                                assignedInstitutes += 1;
                                thisProvider.addContactInfoAssigned = true;
                                thisProvider.save(function(err, thisProvider) {
                                    if (err) return console.error(err);
                                    console.log('Provider updated!');
                                });
                            });
                            
                        }else{
                            thisProvider.addContactInfoRequired = false;
                                thisProvider.save(function(err, thisProvider) {
                                    if (err) return console.error(err);
                                    console.log('Provider updated!');
                                });
                        }
                        
                        
                    } else {throw err;}
                });
                if(counter == nLength || assignedInstitutes == addContactInfoCount){
                    console.log(counter);
                    console.log(nLength);
                    console.log(assignedInstitutes);
                    console.log(addContactInfoCount);
                    res.json('Done');
                }
                
                
                }else{
                    console.log('Already assigned');
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