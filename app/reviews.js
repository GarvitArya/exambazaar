var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var review = require('../app/models/review');
var targetStudyProvider = require('../app/models/targetStudyProvider');
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
                        
                        var thisProvider = targetStudyProvider.findOne({ '_id': instituteId },{name:1, logo:1},function (err, thisProvider) {
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
            var thisProvider = targetStudyProvider
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
        
        var allProviderReviews = targetStudyProvider
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