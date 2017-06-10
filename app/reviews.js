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

//to get a particular review with _id reviewId
router.get('/edit/:reviewId', function(req, res) {
    var reviewId = req.params.reviewId;
    //console.log(reviewId);
    review
        .findOne({ '_id': reviewId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

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
            res.json(reviews);
        } else {throw err;}
    });
});

//to get all reviews for a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var reviews = review
        .find({user: userId})
        .deepPopulate('institute user')
        .exec(function (err, reviews) {
        if (!err){
            var basicReviews = [];
            var counter = 0;
            var nLength = reviews.length;
            reviews.forEach(function(thisReview, index){
                var newTask = {
                    user: {
                        _id: thisReview.user._id,
                        name: thisReview.user.basic.name,
                    },
                    institute: {
                        _id: thisReview.institute._id,
                        name: thisReview.institute.name,
                        address: thisReview.institute.address,
                        city: thisReview.institute.city,
                        pincode: thisReview.institute.pincode
                    },
                    _created: thisReview._created,
                    _deadline: thisReview._deadline,
                    _finished: thisReview._finished,
                    active: thisReview.active,

                };
                counter = counter + 1;
                basicReviews.push(newTask);
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


//to get all reviews for an institute
router.post('/groupReviews', function(req, res) {
    var instituteIdArray = req.body;
    //console.log(instituteIdArray);
    var basicReviews = [];
    
    var reviews = review
        .find({institute: { $in : instituteIdArray }})
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
    var user = reviewForm.user;
    var institute = reviewForm.institute;
    var faculty = reviewForm.faculty;
    var competitive_environment = reviewForm.competitive_environment;
    var quality_of_material = reviewForm.quality_of_material;
    var infrastructure = reviewForm.infrastructure;
    var year_of_start = reviewForm.year_of_start;
    var exam = reviewForm.exam;
    var stream = reviewForm.stream;
    var text = reviewForm.text;
    
    if(reviewId){
        var existingReview = review
        .findOne({user: user, institute: institute})
        .exec(function (err, existingReview) {
            if (!err){
                if(existingReview){
                    for (var property in reviewForm) {
                        if(property != '_id'){
                            existingReview[property] = reviewForm[property];
                        }
                    }
                    existingReview.save(function(err, existingReview) {
                        if (err) return console.error(err);
                        res.json(existingReview._id);
                    });
                }else{
                    var newreview = new review({
                        institute: institute,
                        user: user,
                        faculty: faculty,
                        competitive_environment: competitive_environment,
                        quality_of_material: quality_of_material,
                        infrastructure: infrastructure,
                        year_of_start: year_of_start,
                        exam: exam,
                        stream: stream,
                        text: text,

                    });
                    newreview.save(function(err, newreview) {
                        if (err) return console.error(err);
                        res.json(newreview._id);
                    });
                }

            } else {throw err;}
        });
        
        
    }else{
        var newreview = new review({
            institute: institute,
            user: user,
            faculty: faculty,
            competitive_environment: competitive_environment,
            quality_of_material: quality_of_material,
            infrastructure: infrastructure,
            year_of_start: year_of_start,
            exam: exam,
            stream: stream,
            text: text,

        });
        newreview.save(function(err, newreview) {
            if (err) return console.error(err);
            res.json(newreview._id);
        });
    }
    
    
    
});

module.exports = router;