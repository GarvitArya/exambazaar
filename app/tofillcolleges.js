var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var tofillcollege = require('../app/models/tofillcollege');
var coaching = require('../app/models/coaching');
var user = require('../app/models/user');
var email = require('../app/models/email');
var moment = require('moment');
moment().format();

var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

var ObjectId = require('mongodb').ObjectID;
//to get a particular tofillcollege with _id tofillcollegeId
router.get('/edit/:tofillcollegeId', function(req, res) {
    var tofillcollegeId = req.params.tofillcollegeId;
    //console.log(tofillcollegeId);
    tofillcollege
        .findOne({ '_id': tofillcollegeId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/remove/:tofillcollegeId', function(req, res) {
    var tofillcollegeId = req.params.tofillcollegeId;
    
    tofillcollege.remove({_id: new mongodb.ObjectID(tofillcollegeId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(tofillcollegeId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/filledCount', function(req, res) {
    tofillcollege.distinct( "college",{active: false},function(err, docs) {
    if (!err){
        res.json(docs.length);
    } else {throw err;}
    });
});

router.get('/collegesFilled', function(req, res) {
    
    
    var allfills = tofillcollege
        .find({},{college:1})
        //.deepPopulate('college')
        .exec(function (err, allfills) {
        if (!err){
            //console.log('Number of fills ' + allfills.length);
            var filledGroupNames = [];
            var counter = 0;
            var nLength = allfills.length;
            //console.log(allfills);
            allfills.forEach(function(thisFillTask, index){
                var college = thisFillTask.college;
                var collegeId = college;
                //console.log(collegeId);
                var thisCollege = coaching
                    .findOne({_id: collegeId},{groupName:1})
                    .exec(function (err, thisCollege) {
                    if (!err){
                        //console.log(sentemails);
                        if(thisCollege){
                            if(filledGroupNames.indexOf(thisCollege.groupName) == -1){
                                filledGroupNames.push(thisCollege.groupName);
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

router.get('/prevFilled/:collegeId', function(req, res) {
    var collegeId = req.params.collegeId;
    var thisProvider = coaching
        .findOne({'_id': collegeId},{groupName:1})
        //.deepPopulate('')
        .exec(function (err, thisProvider) {
        if (!err){
            var groupName = thisProvider.groupName;
            console.log(groupName);
            var allfills = tofillcollege
                .find({},{college:1})
                //.deepPopulate('college')
                .exec(function (err, allfills) {
                if (!err){
                    var filledGroupNames = [];
                    var counter = 0;
                    var nLength = allfills.length;
                    //console.log(allfills);
                    allfills.forEach(function(thisFillTask, index){
                        var college = thisFillTask.college;
                        var collegeId = college;
                        //console.log(collegeId);
                        var thisCollege = coaching
                            .findOne({_id: collegeId},{groupName:1})
                            .exec(function (err, thisCollege) {
                            if (!err){
                                //console.log(sentemails);
                                if(thisCollege){
                                    if(filledGroupNames.indexOf(thisCollege.groupName) == -1){
                                        filledGroupNames.push(thisCollege.groupName);
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
    var tofillcollegeForm = req.body;
    var college = tofillcollegeForm.college;
    var user = tofillcollegeForm.user;
    tofillcollege
        .findOne({ 'college': college })
        .exec(function (err, thisTask) {
        if (!err){
            //console.log(docs);
            if(thisTask){
                thisTask.active = false;
                thisTask._finished = Date.now();
                thisTask.save(function(err, thisTask) {
                    if (err) return console.error(err);
                    res.json(thisTask);
                });
            }else{
                res.json(null);
            }
            
        } else {throw err;}
    });
    
});

router.post('/markNotDone', function(req, res) {
    var tofillcollegeForm = req.body;
    var college = tofillcollegeForm.college;
    var user = tofillcollegeForm.user;
    tofillcollege
        .findOne({ 'college': college })
        .exec(function (err, thisTask) {
        if (!err){
            //console.log(docs);
            if(thisTask){
                thisTask.active = true;
                thisTask._finished = Date.now();
                thisTask.save(function(err, thisTask) {
                    if (err) return console.error(err);
                    res.json(thisTask);
                });
            }else{
                res.json(null);
            }
            
        } else {throw err;}
    });
    
});

router.post('/findAssigned', function(req, res) {
    var collegeIds = req.body;
    var allTasks = tofillcollege
        .find({ 'college': collegeIds}, {college: 1})
        .exec(function (err, allTasks) {
        if (!err){
            if(allTasks){
                
                var collegeIds = allTasks.map(function(a) {return a.college;});
                //console.log(collegeIds);
                res.json(collegeIds);
            }
            
        } else {throw err;}
    });
    
});

//to get all tofillcolleges
router.get('/sendEmails', function(req, res) {
    //console.log('I am here!');
    var allfills = tofillcollege
        .find({},{college:1})
        //.deepPopulate('college')
        .exec(function (err, allfills) {
        if (!err){
            //console.log('Number of fills ' + allfills.length);
            var unsentEmails = [];
            var counter = 0;
            var nLength = allfills.length;
            //console.log(allfills);
            allfills.forEach(function(thisFillTask, index){
                var college = thisFillTask.college;
                var collegeId = college;
                //console.log(collegeId);
                var sentemails = email
                    .findOne({college: collegeId})
                    .exec(function (err, sentemails) {
                    if (!err){
                        console.log(sentemails);
                        if(!sentemails){
                            unsentEmails.push(collegeId);
                           //console.log(college.name + sentemails[0].to); 
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

router.get('/AllIds', function(req, res) {
    var tofillcolleges = tofillcollege
        .find({},{college: 1, _id: 0})
        .exec(function (err, tofillcolleges) {
        if (!err){
            var collegeIds = tofillcolleges.map(function(a) {return a.college;});
            res.json(collegeIds);
        } else {throw err;}
    });
});

//to get all tofillcolleges
router.get('/', function(req, res) {
    var pastInternId = '599c2bab54161317886da9f6';
    var tofillcolleges = tofillcollege
        .find({user: { $ne: "599c2bab54161317886da9f6" }})
        .exec(function (err, tofillcolleges) {
        if (!err){
            //console.log(tofillcolleges.length);
            var basicFillTasks = [];
            var counter = 0;
            var nLength = tofillcolleges.length;
            
            tofillcolleges.forEach(function(thisFillTask, index){
                var collegeId = thisFillTask.college;
                var userId = thisFillTask.user;
                var thisProvider = coaching
                    .findOne({'_id': collegeId}, {name:1, city:1, email:1, groupName:1})
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
                            college: thisProvider,
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
//to get all tofillcolleges for a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var tofillcolleges = tofillcollege
        .find({user: userId})
        .deepPopulate('college user')
        .exec(function (err, tofillcolleges) {
        if (!err){
            var basicFillTasks = [];
            var counter = 0;
            var nLength = tofillcolleges.length;
            tofillcolleges.forEach(function(thisFillTask, index){
                var newTask = {
                    user: {
                        _id: thisFillTask.user._id,
                        name: thisFillTask.user.basic.name,
                    },
                    college: {
                        _id: thisFillTask.college._id,
                        name: thisFillTask.college.name,
                        address: thisFillTask.college.address,
                        city: thisFillTask.college.city,
                        pincode: thisFillTask.college.pincode
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
    var toFillCollegesForm = req.body;
    var collegeIds = toFillCollegesForm.collegeIds;
    var user = toFillCollegesForm.user;
    var _deadline = toFillCollegesForm._deadline;
    _deadline = moment(_deadline).endOf('day');
    var counter = 0;
    var nColleges = collegeIds.length;
    
    if(nColleges == 0){
        res.json(0);
    }
    collegeIds.forEach(function(thisCollege, index){
        var newtofillcollege = new tofillcollege({
            college: thisCollege,
            user: user,
            _deadline: _deadline
        });

        newtofillcollege.save(function(err, newtofillcollege) {
            if (err) return console.error(err);
            counter += 1;
            if(counter == nColleges){
                res.json(nColleges);
            }
        });
        
    });
    
    
    
    
});

router.post('/tofilluser', function(req, res) {
    var toFillCollegesForm = req.body;
    var collegeId = null;
    if(toFillCollegesForm.collegeId.toString()){
        collegeId = toFillCollegesForm.collegeId.toString();
    }
    var user = toFillCollegesForm.user.toString();
    if(toFillCollegesForm.user.toString()){
        user = toFillCollegesForm.user.toString();
    }
    
    var thisTask = tofillcollege.findOne({ 'college': collegeId, 'user': user },function (err, thisTask) {
        res.json(thisTask);
    });
});

module.exports = router;