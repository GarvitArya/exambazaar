var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var tofillci = require('../app/models/tofillci');
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

var ObjectId = require('mongodb').ObjectID;
//to get a particular tofillci with _id tofillciId
router.get('/edit/:tofillciId', function(req, res) {
    var tofillciId = req.params.tofillciId;
    //console.log(tofillciId);
    tofillci
        .findOne({ '_id': tofillciId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/remove/:tofillciId', function(req, res) {
    var tofillciId = req.params.tofillciId;
    console.log(tofillciId);
    
    
    tofillci.remove({_id: new mongodb.ObjectID(tofillciId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(tofillciId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/filledCount', function(req, res) {
    tofillci.distinct( "institute",{active: false},function(err, docs) {
    if (!err){
        res.json(docs.length);
    } else {throw err;}
    });
});

router.get('/institutesFilled', function(req, res) {
    /*tofillci.distinct( "institute",{},function(err, docs) {
    if (!err){
        console.log(docs);
        res.json(docs);
    } else {throw err;}
    });*/
    
    
    var allfills = tofillci
        .find({},{institute:1})
        //.deepPopulate('institute')
        .exec(function (err, allfills) {
        if (!err){
            //console.log('Number of fills ' + allfills.length);
            var filledGroupNames = [];
            var counter = 0;
            var nLength = allfills.length;
            //console.log(allfills);
            allfills.forEach(function(thisFillTask, index){
                var institute = thisFillTask.institute;
                var instituteId = institute;
                //console.log(instituteId);
                var thisInstitute = coaching
                    .findOne({_id: instituteId},{groupName:1})
                    .exec(function (err, thisInstitute) {
                    if (!err){
                        //console.log(sentemails);
                        if(thisInstitute){
                            if(filledGroupNames.indexOf(thisInstitute.groupName) == -1){
                                filledGroupNames.push(thisInstitute.groupName);
                            }
                            
                            counter = counter + 1;
                            if(counter == nLength){
                                res.json(filledGroupNames);
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

router.get('/prevFilled/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    var thisProvider = coaching
        .findOne({'_id': instituteId},{groupName:1})
        //.deepPopulate('')
        .exec(function (err, thisProvider) {
        if (!err){
            var groupName = thisProvider.groupName;
            console.log(groupName);
            var allfills = tofillci
                .find({},{institute:1})
                //.deepPopulate('institute')
                .exec(function (err, allfills) {
                if (!err){
                    var filledGroupNames = [];
                    var counter = 0;
                    var nLength = allfills.length;
                    //console.log(allfills);
                    allfills.forEach(function(thisFillTask, index){
                        var institute = thisFillTask.institute;
                        var instituteId = institute;
                        //console.log(instituteId);
                        var thisInstitute = coaching
                            .findOne({_id: instituteId},{groupName:1})
                            .exec(function (err, thisInstitute) {
                            if (!err){
                                //console.log(sentemails);
                                if(thisInstitute){
                                    if(filledGroupNames.indexOf(thisInstitute.groupName) == -1){
                                        filledGroupNames.push(thisInstitute.groupName);
                                    }

                                    counter = counter + 1;
                                    if(counter == nLength){
                                       
                                        if(filledGroupNames.indexOf(groupName) == -1){
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
    var tofillciForm = req.body;
    var institute = tofillciForm.institute;
    var user = tofillciForm.user;
    tofillci
        .findOne({ 'institute': institute, 'user':user })
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
            }
            
        } else {throw err;}
    });
    
});

router.post('/findAssigned', function(req, res) {
    var instituteIds = req.body;
    var allTasks = tofillci
        .find({ 'institute': instituteIds}, {institute: 1})
        .exec(function (err, allTasks) {
        if (!err){
            if(allTasks){
                
                var instituteIds = allTasks.map(function(a) {return a.institute;});
                //console.log(instituteIds);
                res.json(instituteIds);
            }
            
        } else {throw err;}
    });
    
});

//to get all tofillcis
router.get('/sendEmails', function(req, res) {
    //console.log('I am here!');
    var allfills = tofillci
        .find({},{institute:1})
        //.deepPopulate('institute')
        .exec(function (err, allfills) {
        if (!err){
            //console.log('Number of fills ' + allfills.length);
            var unsentEmails = [];
            var counter = 0;
            var nLength = allfills.length;
            //console.log(allfills);
            allfills.forEach(function(thisFillTask, index){
                var institute = thisFillTask.institute;
                var instituteId = institute;
                //console.log(instituteId);
                var sentemails = email
                    .findOne({institute: instituteId})
                    .exec(function (err, sentemails) {
                    if (!err){
                        console.log(sentemails);
                        if(!sentemails){
                            unsentEmails.push(instituteId);
                           //console.log(institute.name + sentemails[0].to); 
                        }
                        counter = counter + 1;
                        if(counter == nLength){
                            console.log("Unsent emails are: " + unsentEmails);
                            res.json(unsentEmails);
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


//to get all tofillcis
router.get('/', function(req, res) {
    var limit = 100;
    
    var tofillcis = tofillci
        .find({})
        .limit(limit)
        .exec(function (err, tofillcis) {
        if (!err){
            //console.log(tofillcis.length);
            var basicFillTasks = [];
            var counter = 0;
            var nLength = tofillcis.length;
            
            tofillcis.forEach(function(thisFillTask, index){
                var instituteId = thisFillTask.institute;
                var userId = thisFillTask.user;
                var thisProvider = coaching
                    .findOne({'_id': instituteId}, {name:1, city:1, email:1, groupName:1})
                    .exec(function (err, thisProvider) {
                    if (!err){
                        
                    var thisUser = user
                        .findOne({ '_id': userId },{basic:1})
                        //.deepPopulate('partner partner.location')
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
                            //console.log(basicFillTasks);
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
//to get all tofillcis for a user
router.get('/user/:userId', function(req, res) {
    var limit = 100;
    var userId = req.params.userId;
    var fullAccessUsers = ["5a1831f0bd2adb260055e352"];
    var thisUser = user.findOne({_id: userId}, {basic: 1, userType: 1}, function(err, thisUser) {
    if (!err){
        if(thisUser){
            if(thisUser.userType == "Master" || fullAccessUsers.indexOf(thisUser._id.toString()) != -1){
                var tofillcis = tofillci
                .find({})
                .limit(limit)
                .sort( { _created: -1 } )
                //.deepPopulate('institute user')
                .exec(function (err, tofillcis) {
                if (!err){
                    var basicFillTasks = [];
                    var counter = 0;
                    var nLength = tofillcis.length;
                    tofillcis.forEach(function(thisFillTask, index){
                    var thisUserId = thisFillTask.user;
                    var thisCoaching = thisFillTask.institute;

                    var thisInstitute = coaching
                    .findOne({_id: thisCoaching},{name:1, address: 1, city: 1, pincode: 1 })
                    .exec(function (err, thisInstitute) {
                    if (!err && thisInstitute){

                        var thisUser = user
                        .findOne({_id: thisUserId},{basic: 1})
                        .exec(function (err, thisUser) {
                            if (!err && thisUser){
                                var newTask = {
                                    user: {
                                        _id: thisUser._id,
                                        name: thisUser.basic.name,
                                    },
                                    institute:{
                                        _id: thisInstitute._id,
                                        name: thisInstitute.name,
                                        address: thisInstitute.address,
                                        city: thisInstitute.city,
                                        pincode: thisInstitute.pincode
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
                            }
                        });

                        if(nLength == 0){
                            res.json([]);
                        }


                    }
                    });

                        
                    });
                        
                        
                    
                } else {throw err;}
            });
            }else{
                var tofillcis = tofillci
                .find({user: userId})
                .limit(limit)
                .sort( { _created: -1 } )
                .deepPopulate('institute user')
                .exec(function (err, tofillcis) {
                if (!err){
                    var basicFillTasks = [];
                    var counter = 0;
                    var nLength = tofillcis.length;
                    tofillcis.forEach(function(thisFillTask, index){
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
                
                
            }
        }else{
            res.json([]);
        }



    } else {throw err;}
    });
    
    
    
    
    
    
});


router.post('/save', function(req, res) {
    var tofillciForm = req.body;
    var institute = tofillciForm.institute;
    var user = tofillciForm.user;
    var _deadline = tofillciForm._deadline;
    console.log("To fill CI form is: " + JSON.stringify(tofillciForm));
    var newtofillci = new tofillci({
        institute: institute,
        user: user,
        _deadline: _deadline
    });
    console.log("New to fill CI form is: " + JSON.stringify(tofillciForm));
    newtofillci.save(function(err, newtofillci) {
        if (err) return console.error(err);
        //console.log("MediaTag saved with id: " + this_mediaTag._id);
        res.json(newtofillci._id);
    });
    
    
});

module.exports = router;