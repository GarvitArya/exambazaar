var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var result = require('../app/models/result');
var coaching = require('../app/models/coaching');
var user = require('../app/models/user');
var email = require('../app/models/email');
var exam = require('../app/models/exam');


var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');



router.get('/remove/:resultId', function(req, res) {
    var resultId = req.params.resultId;
    console.log(resultId);
    result.remove({_id: new mongodb.ObjectID(resultId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(resultId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/resultsCount', function(req, res) {
    result.count({active: true}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/', function(req, res) {
    var results = result
        .find({})
        .exec(function (err, results) {
        if (!err){
            var allResults = [];
            var nResults = results.length;
            var counter = 0;
            
            results.forEach(function(thisResult, rindex){
                var userId = thisResult.user;
                var instituteId = thisResult.institute;
                
                var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1, image:1},function (err, thisUser) {
                    if (!err){
                        thisResult.user = thisUser;
                        
                        var thisProvider = coaching.findOne({ '_id': instituteId },{name:1, logo:1},function (err, thisProvider) {
                            if (!err){
                                thisResult.institute = thisProvider;
                                allResults.push(thisResult);
                                counter += 1;
                                if(counter == nResults){
                                    //console.log(allResults);   
                                    res.json(allResults);   
                                }
                                
                            }else {throw err;}
                        });
                        
                        
                        
                    }else {throw err;}
                });
                
            });
            
            //res.json(results);
        } else {throw err;}
    });
});
//to get a particular result with _id resultId
router.get('/edit/:resultId', function(req, res) {
    var resultId = req.params.resultId;
    var thisResult = result
        .findOne({ '_id': resultId, active: true })
        //.deepPopulate('coupon')
        .exec(function (err, thisResult) {
            
        if (!err){
            var instituteId = thisResult.institute;
            var thisProvider = coaching
            .findOne({_id : instituteId, disabled: {$ne: true}},{name:1 , groupName:1, disabled: 1, city:1, logo:1, address:1, pincode:1})
            //.deepPopulate('exams exams.stream')
            .exec(function (err, thisProvider) {
            if (!err){
                thisResult.institute = thisProvider;
                res.json(thisResult);
                } else {throw err;}
            });
        } else {throw err;}
    });
});

//to get all results for a user
router.get('/user/:userId', function(req, res) {
    
    var userId = req.params.userId;
    
    var results = result
    .find({user: userId})
    .sort( { _created: -1 } )
    //.deepPopulate('institute institute.exams institute.exams.stream')
    .exec(function (err, results) {
    if (!err){
        var basicResults = [];
        var groupNames = [];
        var counter = 0;
        var nLength = results.length;
        
        var resultInstituteIds =  results.map(function(a) {return a.institute;});
        
        var allProviderResults = coaching
            .find({_id : { $in : resultInstituteIds }, disabled: {$ne: true}},{name:1 , groupName:1, exams:1, disabled: 1, city:1, logo:1, address:1, pincode:1})
            .deepPopulate('exams exams.stream')
            .exec(function (err, allProviderResults) {
            if (!err){
                
            var instituteIds = allProviderResults.map(function(a) {return a._id.toString();});

            results.forEach(function(thisResult, rindex){
                var iIndex = instituteIds.indexOf(thisResult.institute.toString());
                thisResult.institute = allProviderResults[iIndex];

                if(thisResult.institute && !thisResult.institute.disabled){
                    
                    basicResults.push(thisResult);
                 
                }
                counter = counter + 1;
                if(counter == nLength){

                    res.json(basicResults);
                }
                });
                
                
            } else {throw err;}
        });

        if(nLength == 0){
            res.json([]);
        }
    } else {throw err;}
    });
});


//to get all results for an institute
router.post('/groupResults', function(req, res) {
    console.log("Group results starting");
    
    var groupCity = req.body;
    var groupName = groupCity.groupName;
    var cityName = groupCity.cityName;
    var examName = groupCity.examName;
    
    
    var thisExam = exam
        .findOne({'name': examName}, {_id:1})
        .exec(function (err, thisExam){
        if (!err){
            var examId = thisExam._id.toString();
            
            var allGroupInstitutes = coaching.find({ 'groupName': groupName, disabled: false },{_id:1},function (err, allGroupInstitutes) {
            if (!err){
                allGroupInstitutes = allGroupInstitutes.map(function(a) {return a._id;});
                var basicResults = [];

                var groupResults = result
                    .find({provider: { $in : allGroupInstitutes }, active: true, exam: examId, image: {$exists: true}})
                    .sort({rank: 1})
                    .exec(function(err, groupResults) {
                    if (!err){

                        var counter = 0;
                        var nLength = groupResults.length;
                        //console.log(groupResults);
                        //console.log("No of results are: " + nLength);
                        groupResults.forEach(function(thisResult, index){
                            counter = counter + 1;
                            basicResults.push(thisResult);
                            if(counter == nLength){
                                res.json(basicResults);
                            }
                        });

                        if(nLength == 0){
                            res.json([]);
                        }
                    } else {throw err;}
                });


                }else {throw err;}
            });
            
        } else {throw err;}
    });
    
});

router.post('/existingResult', function(req, res) {
    var userInstituteForm = req.body;
    
    var userId = userInstituteForm.user;
    var instituteIdArray = userInstituteForm.instituteIdArray;
    
    
    var existingResults = result
        .find({user: userId, institute: { $in : instituteIdArray }})
        //.deepPopulate('institute user')
        .exec(function (err, existingResults) {
        if (!err){
            if(existingResults){
                res.json(existingResults);
            }else{
                res.json(null);
            }
              
        } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var resultForm = req.body;
    var resultId = resultForm._id;
    var institute = resultForm.institute;
    var user = resultForm.user;
    
    
    if(resultId){
        var existingResult = result
        .findOne({user: user, institute: institute})
        .exec(function (err, existingResult) {
            if (!err){
                for (var property in resultForm) {
                    existingResult[property] = resultForm[property];
                }
                existingResult.save(function(err, existingResult) {
                    if (err) return console.error(err);
                    res.json(existingResult._id);
                });

            } else {throw err;}
        });
        
        
    }else{
        var newresult = new result({});
        for (var property in resultForm) {
            newresult[property] = resultForm[property];
        }
        newresult.save(function(err, newresult) {
            if (err) return console.error(err);
            res.json(newresult._id);
        });
    }
    
    
    
});


router.post('/syncResults', function(req, res) {
    var rCounter = 0;
    var includedProperties = [
        "exam",
        "year",
        "name",
        "category",
        "rank",
        "subgroup",
        "percentile",
        "percentage",
        "marks",
        "passFail",
        "active",
        "course",
        "image",
        "_added",

    ];
    
    console.log('Starting Synching of Results');
    var allCoachings = coaching.find({results: {$exists: true}, $where:'this.results.length>0'}, {groupName:1, results:1},function(err, allCoachings) {
        if (!err && allCoachings){
            res.json(true);
            console.log("There are: " + allCoachings.length + " coachings!");
            var nCoachings = allCoachings.length;
            allCoachings.forEach(function(thisCoaching, cindex){
                
                var thisResults = thisCoaching.results;
                if(!thisResults){
                    thisResults = [];
                }
                //console.log(thisCoaching.groupName + " | " + thisResults.length + " results!");
                thisResults.forEach(function(thisResult, rindex){
                    //console.log(thisResult);
                    var resultName = null;
                    if(thisResult.name){
                        resultName = thisResult.name;
                    }
                    var resultRank = null;
                    if(thisResult.rank){
                        resultRank = thisResult.rank;
                    }
                    var resultYear = null;
                    if(thisResult.year){
                        resultYear = thisResult.year;
                    }
                    var resultExam = null;
                    if(thisResult.exam){
                        resultExam = thisResult.exam;
                    }
                    var resultImage = null;
                    if(thisResult.image){
                        resultImage = thisResult.image;
                    }
                    var existingResult = result.findOne({name: resultName, exam: resultExam, image: resultImage, rank: resultRank, year: resultYear}, {name:1, rank:1, year: 1, exam: 1, image: 1},function(err, existingResult) {
                    if (!err){
                        if(existingResult){
                            //console.log('Result Already Exists');
                        }else{
                            rCounter += 1;
                            //console.log(rCounter + '. Adding result: ' + resultName + " | "  + resultExam + " | "  + resultYear+ " | "  + resultRank + " | "  + resultImage);
                            //console.log(thisResult);
                            var newresult = new result({
                                provider: thisCoaching._id,

                            });
                            includedProperties.forEach(function(thisProperty, pindex){
                                if(thisResult[thisProperty]){
                                    newresult[thisProperty] = thisResult[thisProperty];
                                }

                            });

                            newresult.save(function(err, newresult) {
                                if (err) return console.error(err);
                                console.log(newresult._id + " Result saved!");
                            });
                            
                        }
                        
                        
                    }else{
                        console.log('Something went very wrong');
                    }
                    });
                    
                    
                    
                });
                
            });
            
        }else{
            res.json(false);
        }
    }).limit(40000);
    
    
    
    
});


router.post('/sanitizeResults', function(req, res) {
    var rCounter = 0;
    
    var allResults = result.find({}, {rank: 1},function(err, allResults) {
        if (!err){
            if(allResults){
                allResults.forEach(function(thisResult, rindex){
                    thisResult.rank = Number(thisResult.rank);
                    thisResult.save(function(err, thisResult) {
                        if (err) return console.error(err);
                        console.log(thisResult._id + " Result saved!");
                    });
                    
                });
            }else{
                

            }


        }else{
            console.log('Something went very wrong');
        }
        });
    
    
    
    
});


module.exports = router;