var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var review = require('../app/models/review');
var exam = require('../app/models/exam');
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



router.get('/remove/:reviewId', function(req, res) {
    var reviewId = req.params.reviewId;
    console.log(reviewId);
    review.remove({_id: new mongodb.ObjectID(reviewId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(reviewId + ' removed!');
            res.json("Done");
        }                              
    });
});
router.get('/reviewsCount', function(req, res) {
    review.count({active: true}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/', function(req, res) {
    var reviews = review
        .find({})
        .exec(function (err, reviews) {
        if (!err){
            var allReviews = [];
            var nReviews = reviews.length;
            var counter = 0;
            
            reviews.forEach(function(thisReview, rindex){
                var userId = thisReview.user;
                var instituteId = thisReview.institute;
                
                var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1, image:1},function (err, thisUser) {
                    if (!err){
                        thisReview.user = thisUser;
                        
                        var thisProvider = coaching.findOne({ '_id': instituteId },{name:1, logo:1, city:1},function (err, thisProvider) {
                            if (!err){
                                thisReview.institute = thisProvider;
                                allReviews.push(thisReview);
                                counter += 1;
                                if(counter == nReviews){
                                    //console.log(allReviews);   
                                    res.json(allReviews);   
                                }
                                
                            }else {throw err;}
                        });
                        
                        
                        
                    }else {throw err;}
                });
                
            });
            
            //res.json(reviews);
        } else {throw err;}
    });
});
//to get a particular review with _id reviewId
router.get('/edit/:reviewId', function(req, res) {
    var reviewId = req.params.reviewId;
    var thisReview = review
        .findOne({ '_id': reviewId, active: true })
        //.deepPopulate('coupon')
        .exec(function (err, thisReview) {
            
        if (!err){
            var instituteId = thisReview.institute;
            var thisProvider = coaching
            .findOne({_id : instituteId, disabled: {$ne: true}},{name:1 , groupName:1, disabled: 1, city:1, logo:1, address:1, pincode:1})
            //.deepPopulate('exams exams.stream')
            .exec(function (err, thisProvider) {
            if (!err){
                thisReview.institute = thisProvider;
                res.json(thisReview);
                } else {throw err;}
            });
        } else {throw err;}
    });
});

router.get('/dailySummary', function(req, res) {
    var reviewSummary = review.aggregate(
    [
        {$match: {}},
        {$group: { _id : {
            year:{$year:"$_created"},
            month:{$month:"$_created"},
            day:{$dayOfMonth:"$_created"}
        },count:{$sum: 1 }},
        }
    ],function(err, reviewSummary) {
    if (!err){
        //console.log(reviewSummary);
        res.json(reviewSummary);
    } else {throw err;}
    });
});

router.get('/disable/:reviewId', function(req, res) {
    var reviewId = req.params.reviewId;
    var thisReview = review
        .findOne({ '_id': reviewId })
        //.deepPopulate('coupon')
        .exec(function (err, thisReview) {
            
        if (!err){
            thisReview.active = false;
            thisReview.save(function(err, thisReview) {
                if (err) return console.error(err);
                res.json(thisReview._id);
            });

        } else {throw err;}
    });
});

router.get('/enable/:reviewId', function(req, res) {
    var reviewId = req.params.reviewId;
    var thisReview = review
        .findOne({ '_id': reviewId })
        //.deepPopulate('coupon')
        .exec(function (err, thisReview) {
            
        if (!err){
            thisReview.active = true;
            thisReview.save(function(err, thisReview) {
                if (err) return console.error(err);
                res.json(thisReview._id);
            });

        } else {throw err;}
    });
});

//to get all reviews for a user
router.get('/user/:userId', function(req, res) {
    
    var userId = req.params.userId;
    
    var reviews = review
    .find({user: userId})
    .sort( { _created: -1 } )
    //.deepPopulate('institute institute.exams institute.exams.stream')
    .exec(function (err, reviews) {
    if (!err){
        var basicReviews = [];
        var groupNames = [];
        var counter = 0;
        var nLength = reviews.length;
        
        var reviewInstituteIds =  reviews.map(function(a) {return a.institute;});
        
        var allProviderReviews = coaching
            .find({_id : { $in : reviewInstituteIds }, disabled: {$ne: true}},{name:1 , groupName:1, exams:1, disabled: 1, city:1, logo:1, address:1, pincode:1})
            .deepPopulate('exams exams.stream')
            .exec(function (err, allProviderReviews) {
            if (!err){
                
            var instituteIds = allProviderReviews.map(function(a) {return a._id.toString();});

            reviews.forEach(function(thisReview, rindex){
                var iIndex = instituteIds.indexOf(thisReview.institute.toString());
                thisReview.institute = allProviderReviews[iIndex];

                if(thisReview.institute && !thisReview.institute.disabled){
                    
                    basicReviews.push(thisReview);
                 
                }
                counter = counter + 1;
                if(counter == nLength){

                    res.json(basicReviews);
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


//to get all reviews for an institute
router.post('/groupReviews', function(req, res) {
    var instituteIdArray = req.body;
    //console.log(instituteIdArray);
    var basicReviews = [];
    
    var reviews = review
        .find({institute: { $in : instituteIdArray }, active: true})
        .deepPopulate('user')
        .exec(function(err, reviews) {
        if (!err){
            
            var counter = 0;
            var nLength = reviews.length;
            reviews.forEach(function(thisReview, index){
                thisReview.user.logins = [];
                counter = counter + 1;
                basicReviews.push(thisReview);
                if(counter == nLength){
                    res.json(basicReviews);
                }
            });
            
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
});

router.post('/groupReviews2', function(req, res) {
    console.log("Group Reviews Starting");
    //res.json(true);
    
    var groupCity = req.body;
    var nameslug = groupCity.nameslug;
    var areaslug = groupCity.areaslug;
    
    
    var thisGroup = coaching.findOne({ 'nameslug': nameslug, areaslug: areaslug, disabled: false },{_id:1, groupName: 1, exams: 1},function (err, thisGroup) {
    if (!err){

    if(thisGroup){
    var thisGroupName = thisGroup.groupName;
    var thisGroupExams = thisGroup.exams;

    var allExams = exam
    .find({_id: thisGroupExams, active: true}, {stream:1, exam_page_name:1, logo: 1, resultFormat: 1, rank: 1})
    .deepPopulate('stream')
    .exec(function (err, allExams) {
        if (!err){
        var allExamIds = allExams.map(function(a) {return a._id.toString();});

        var allCentres = coaching.find({ 'groupName': thisGroupName, disabled: false },{_id:1},function (err, allCentres) {
        if (!err){
            if(allCentres && allCentres.length > 0){

            var allGroupInstitutes = allCentres.map(function(a) {return a._id;});
                
            var groupReviews = review
            .find({provider: { $in : allGroupInstitutes }, exam: {$in: allExamIds}, active: true})
            .exec(function(err, groupReviews) {
            if (!err){
            if(groupReviews){
            console.log(groupReviews);
            groupReviews.forEach(function(thisReview, rindex){
            var thisRExam = thisReview.exam.toString();
            var thisRExamIndex = allExamIds.indexOf(thisRExam); 

            if(thisRExamIndex != -1){
                thisReview.exam = allExams[thisRExamIndex];
            }else{
                console.log('Something went very wrong!!');
            }


            });

            var streamexams = [];
            var streamexamIds = [];
            groupReviews.forEach(function(thisReview, rindex){
                var thisRExamId = thisReview.exam._id;
                var thisRExamStream = thisReview.exam.stream._id;
                if(streamexams && streamexams.length > 0){
                    streamexamIds = streamexams.map(function(a) {return a._id;});
                }
                var thisStreamIndex = streamexamIds.indexOf(thisRExamStream);

                if(thisStreamIndex == -1){
                    var newStream = {
                        _id: thisReview.exam.stream._id,
                        rank: thisReview.exam.stream.rank,
                        logo: thisReview.exam.stream.logo,
                        displayname: thisReview.exam.stream.displayname,
                        exams: [],
                    };
                    thisStreamIndex = streamexams.length;
                    streamexams.push(newStream);
                }

                var thisStreamExams = streamexams[thisStreamIndex].exams;
                var thisStreamExamIds = [];
                if(thisStreamExams && thisStreamExams.length > 0){
                    thisStreamExamIds = thisStreamExams.map(function(a) {return a._id;});
                }
                var thisStreamExamIndex = thisStreamExamIds.indexOf(thisRExamId);
                if(thisStreamExamIndex == -1){
                    var newExam = {
                        _id: thisReview.exam._id,
                        rank: thisReview.exam.rank,
                        logo: thisReview.exam.logo,
                        exam_page_name: thisReview.exam.exam_page_name,
                        resultFormat: thisReview.exam.resultFormat,
                        reviews: [],
                    };
                    thisStreamExamIndex = streamexams[thisStreamIndex].exams.length;
                    streamexams[thisStreamIndex].exams.push(newExam);
                }

                if(thisStreamExamIndex != -1){
                    var newReview = {
                        name: thisReview.name,
                        rank: thisReview.rank,
                        category: thisReview.category,
                        year: thisReview.year,
                        image: thisReview.image,
                        provider: thisReview.provider,
                        active: thisReview.active,
                    };
                    streamexams[thisStreamIndex].exams[thisStreamExamIndex].reviews.push(newReview);
                }
            });
            //console.log(streamexams);
            res.json(streamexams);
            }else{
                res.json([]);
            }
            } else {throw err;}
            });

            }else{
                res.json([]);
            }

        }else {throw err;}

    });


        }else {throw err;}
    });




    }else{
        res.json([]);
    } 





    }else {throw err;}
    });
    
    
});

router.post('/existingReview', function(req, res) {
    var userInstituteForm = req.body;
    
    var userId = userInstituteForm.user;
    var instituteIdArray = userInstituteForm.instituteIdArray;
    
    
    var existingReviews = review
        .find({user: userId, institute: { $in : instituteIdArray }})
        //.deepPopulate('institute user')
        .exec(function (err, existingReviews) {
        if (!err){
            if(existingReviews){
                res.json(existingReviews);
            }else{
                res.json(null);
            }
              
        } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var reviewForm = req.body;
    var reviewId = reviewForm._id;
    var institute = reviewForm.institute;
    var user = reviewForm.user;
    
    
    if(reviewId){
        var existingReview = review
        .findOne({user: user, institute: institute})
        .exec(function (err, existingReview) {
            if (!err){
                for (var property in reviewForm) {
                    existingReview[property] = reviewForm[property];
                }
                existingReview.save(function(err, existingReview) {
                    if (err) return console.error(err);
                    res.json(existingReview._id);
                });

            } else {throw err;}
        });
        
        
    }else{
        var newreview = new review({});
        for (var property in reviewForm) {
            newreview[property] = reviewForm[property];
        }
        newreview.save(function(err, newreview) {
            if (err) return console.error(err);
            res.json(newreview._id);
        });
    }
    
    
    
});

module.exports = router;