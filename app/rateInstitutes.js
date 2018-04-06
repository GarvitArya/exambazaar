var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var rateInstitute = require('../app/models/rateInstitute');
var coaching = require('../app/models/coaching');
var user = require('../app/models/user');
var email = require('../app/models/email');


var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular rateInstitute with _id rateInstituteId
router.get('/edit/:rateInstituteId', function(req, res) {
    var rateInstituteId = req.params.rateInstituteId;
    //console.log(rateInstituteId);
    rateInstitute
        .findOne({ '_id': rateInstituteId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/remove/:rateInstituteId', function(req, res) {
    var rateInstituteId = req.params.rateInstituteId;
    console.log(rateInstituteId);
    
    
    rateInstitute.remove({_id: new mongodb.ObjectID(rateInstituteId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(rateInstituteId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/ratedCount', function(req, res) {
    rateInstitute.distinct( "institute",{active: false},function(err, docs) {
    if (!err){
        res.json(docs.length);
    } else {throw err;}
    });
});

router.get('/institutesRated', function(req, res) {
    /*rateInstitute.distinct( "institute",{},function(err, docs) {
    if (!err){
        console.log(docs);
        res.json(docs);
    } else {throw err;}
    });*/
    
    
    var allfills = rateInstitute
        .find({},{institute:1})
        //.deepPopulate('institute')
        .exec(function (err, allfills) {
        if (!err){
            //console.log('Number of fills ' + allfills.length);
            var ratedGroupNames = [];
            var counter = 0;
            var nLength = allfills.length;
            //console.log(allfills);
            allfills.forEach(function(thisRateInstituteTask, index){
                var institute = thisRateInstituteTask.institute;
                var instituteId = institute;
                //console.log(instituteId);
                var thisInstitute = coaching
                    .findOne({_id: instituteId},{groupName:1})
                    .exec(function (err, thisInstitute) {
                    if (!err){
                        //console.log(sentemails);
                        if(thisInstitute){
                            if(ratedGroupNames.indexOf(thisInstitute.groupName) == -1){
                                ratedGroupNames.push(thisInstitute.groupName);
                            }
                            
                            counter = counter + 1;
                            if(counter == nLength){
                                res.json(ratedGroupNames);
                            }
                            
                        }
                        
                         
                    } else {throw err;}
                });
            });
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
    
});

router.get('/prevRated/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    var thisProvider = coaching
        .findOne({'_id': instituteId},{groupName:1})
        //.deepPopulate('')
        .exec(function (err, thisProvider) {
        if (!err){
            var groupName = thisProvider.groupName;
            console.log(groupName);
            var allfills = rateInstitute
                .find({},{institute:1})
                //.deepPopulate('institute')
                .exec(function (err, allfills) {
                if (!err){
                    var ratedGroupNames = [];
                    var counter = 0;
                    var nLength = allfills.length;
                    //console.log(allfills);
                    allfills.forEach(function(thisRateInstituteTask, index){
                        var institute = thisRateInstituteTask.institute;
                        var instituteId = institute;
                        //console.log(instituteId);
                        var thisInstitute = coaching
                            .findOne({_id: instituteId},{groupName:1})
                            .exec(function (err, thisInstitute) {
                            if (!err){
                                //console.log(sentemails);
                                if(thisInstitute){
                                    if(ratedGroupNames.indexOf(thisInstitute.groupName) == -1){
                                        ratedGroupNames.push(thisInstitute.groupName);
                                    }

                                    counter = counter + 1;
                                    if(counter == nLength){
                                       
                                        if(ratedGroupNames.indexOf(groupName) == -1){
                                            res.json(0);
                                        }else{
                                            res.json(1);
                                        }
                                        
                                    }

                                }


                            } else {throw err;}
                        });
                    });
                    if(nLength == 0){
                        res.json(0);
                    }
                    
                } else {throw err;}
            });
            
        } else {throw err;}
    });
    
    
    
    
    
});

router.post('/markDone', function(req, res) {
    console.log('Marking Done for Rating Task');
    
    var rateInstituteForm = req.body;
    var institute = rateInstituteForm.institute;
    //var user = rateInstituteForm.user;
    rateInstitute
        .findOne({ 'institute': institute})
        .exec(function (err, thisTask) {
        if (!err){
            //console.log(docs);
            if(thisTask){
                thisTask.active = false;
                thisTask._finished = Date.now();
                thisTask.save(function(err, thisTask) {
                    if (err) return console.error(err);
                    res.json(thisTask._id);
                });
            }else{
                res.json([]);
            }
            
        } else {throw err;}
    });
    
});




//to get all rateInstitutes
router.get('/', function(req, res) {
    var rateInstitutes = rateInstitute
        .find({})
        .exec(function (err, rateInstitutes) {
        if (!err){
            var basicRateInstituteTasks = [];
            var counter = 0;
            var nLength = rateInstitutes.length;
            
            rateInstitutes.forEach(function(thisRateInstituteTask, index){
                var instituteId = thisRateInstituteTask.institute;
                var userId = thisRateInstituteTask.user;
                var thisProvider = coaching
                    .findOne({'_id': instituteId}, {name:1, city:1, email:1, groupName:1})
                    .exec(function (err, thisProvider) {
                    if (!err){
                        
                    var thisUser = user
                        .findOne({ '_id': userId },{basic:1})
                        .deepPopulate('partner partner.location')
                        .exec(function (err, thisUser) {
                        if (!err){
                            var newTask = {
                            _id: thisRateInstituteTask._id,
                            user: thisUser,
                            institute: thisProvider,
                            _created: thisRateInstituteTask._created,
                            _deadline: thisRateInstituteTask._deadline,
                            _finished: thisRateInstituteTask._finished,
                            active: thisRateInstituteTask.active,

                        };
                        counter = counter + 1;
                        basicRateInstituteTasks.push(newTask);
                        if(counter == nLength){
                            res.json(basicRateInstituteTasks);
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
//to get all rateInstitutes for a user
router.get('/user/:userId', function(req, res) {
    var limit = 50;
    var userId = req.params.userId;
    var fullAccessUsers = ["5a1831f0bd2adb260055e352"];
    var thisUser = user.findOne({_id: userId}, {basic: 1, userType: 1}, function(err, thisUser) {
    if (!err){
        if(thisUser){
            if(thisUser.userType == "Master" || fullAccessUsers.indexOf(thisUser._id.toString()) != -1){
                var rateInstitutes = rateInstitute
                .find({})
                .limit(limit)
                .sort( { _created: -1 } )
                .deepPopulate('institute user')
                .exec(function (err, rateInstitutes) {
                if (!err){
                    var basicRateInstituteTasks = [];
                    var counter = 0;
                    var nLength = rateInstitutes.length;
                    rateInstitutes.forEach(function(thisRateInstituteTask, index){
                        var newTask = {
                            user: {
                                _id: thisRateInstituteTask.user._id,
                                name: thisRateInstituteTask.user.basic.name,
                            },
                            institute: {
                                _id: thisRateInstituteTask.institute._id,
                                name: thisRateInstituteTask.institute.name,
                                address: thisRateInstituteTask.institute.address,
                                city: thisRateInstituteTask.institute.city,
                                pincode: thisRateInstituteTask.institute.pincode
                            },
                            _created: thisRateInstituteTask._created,
                            _deadline: thisRateInstituteTask._deadline,
                            _finished: thisRateInstituteTask._finished,
                            active: thisRateInstituteTask.active,

                        };
                        counter = counter + 1;
                        basicRateInstituteTasks.push(newTask);
                        if(counter == nLength){
                            res.json(basicRateInstituteTasks);
                        }
                    });

                    if(nLength == 0){
                        res.json([]);
                    }
                } else {throw err;}
            });
            }else{
                var rateInstitutes = rateInstitute
                .find({user: userId})
                .limit(limit)
                .sort( { _created: -1 } )
                .deepPopulate('institute user')
                .exec(function (err, rateInstitutes) {
                if (!err){
                    var basicRateInstituteTasks = [];
                    var counter = 0;
                    var nLength = rateInstitutes.length;
                    rateInstitutes.forEach(function(thisRateInstituteTask, index){
                        var newTask = {
                            user: {
                                _id: thisRateInstituteTask.user._id,
                                name: thisRateInstituteTask.user.basic.name,
                            },
                            institute: {
                                _id: thisRateInstituteTask.institute._id,
                                name: thisRateInstituteTask.institute.name,
                                address: thisRateInstituteTask.institute.address,
                                city: thisRateInstituteTask.institute.city,
                                pincode: thisRateInstituteTask.institute.pincode
                            },
                            _created: thisRateInstituteTask._created,
                            _deadline: thisRateInstituteTask._deadline,
                            _finished: thisRateInstituteTask._finished,
                            active: thisRateInstituteTask.active,

                        };
                        counter = counter + 1;
                        basicRateInstituteTasks.push(newTask);
                        if(counter == nLength){
                            res.json(basicRateInstituteTasks);
                        }
                    });

                    if(nLength == 0){
                        res.json([]);
                    }
                } else {throw err;}
            });
                
                
            }
        }else{
            res.json([]);
        }



    } else {throw err;}
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});


router.post('/save', function(req, res) {
    var rateInstituteForm = req.body;
    var institute = rateInstituteForm.institute;
    var user = rateInstituteForm.user;
    var _deadline = rateInstituteForm._deadline;
    console.log("To fill CI form is: " + JSON.stringify(rateInstituteForm));
    var newrateInstitute = new rateInstitute({
        institute: institute,
        user: user,
        _deadline: _deadline
    });
    console.log("New to fill CI form is: " + JSON.stringify(rateInstituteForm));
    newrateInstitute.save(function(err, newrateInstitute) {
        if (err) return console.error(err);
        //console.log("MediaTag saved with id: " + this_mediaTag._id);
        res.json(newrateInstitute._id);
    });
    
    
});

router.get('/checkAssigned/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    
    var thisProvider = coaching
    .findOne({'_id': instituteId}, {groupName:1})
    .exec(function (err, thisProvider) {
        if (!err && thisProvider){
            var thisGroupName = thisProvider.groupName;
            console.log(thisGroupName);
            var allCoachings = coaching
            .find({'groupName': thisGroupName}, {_id:1})
            .exec(function (err, allCoachings) {
                if (!err && allCoachings){
                    
                    var allCoachingIds = allCoachings.map(function(a) {return a._id.toString();});
                    console.log(allCoachingIds);
                    var existingRCI = rateInstitute
                    .findOne({institute: allCoachingIds}, {_id: 1})
                    //.limit(limit)
                    .exec(function (err, existingRCI) {
                    if (!err){
                        //console.log(existingFillCI);
                        if(existingRCI){
                            //res.json('Already Exists');
                            var returnObject = {
                                error: false,
                                exists: true,
                                groupName: thisGroupName
                            };
                            res.json(returnObject);
                        }else{
                            var returnObject = {
                                error: false,
                                exists: false,
                                groupName: thisGroupName
                            };
                            res.json(returnObject);
                        }
                        
                    }
                    });
                    
                    
                    
                }else{
                    var returnObject = {
                        error: true,
                    };
                    res.json(returnObject);
                }
            });

        }else{
            var returnObject = {
                error: true,
            };
            res.json(returnObject);
        }
    });
});

module.exports = router;