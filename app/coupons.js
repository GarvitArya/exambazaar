var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var coupon = require('../app/models/coupon');
var review = require('../app/models/review');

var user = require('../app/models/user');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var email = require('../app/models/email');


var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular coupon with _id couponId
router.get('/edit/:couponId', function(req, res) {
    var couponId = req.params.couponId;
    //console.log(couponId);
    var thisCoupon = coupon
        .findOne({ '_id': couponId })
        .exec(function (err, thisCoupon) {
        if (!err){
            //console.log(docs);
            var instituteId = thisCoupon.provider;
            var thisProvider = targetStudyProvider
            .findOne({_id : instituteId, disabled: {$ne: true}},{name:1 , groupName:1, disabled: 1, city:1, logo:1, address:1, pincode:1})
            //.deepPopulate('exams exams.stream')
            .exec(function (err, thisProvider) {
            if (!err){
                thisCoupon.provider = thisProvider;
                res.json(thisCoupon);
                } else {throw err;}
            });
            
            
            
        } else {throw err;}
    });
});

router.get('/remove/:couponId', function(req, res) {
    var couponId = req.params.couponId;
    console.log(couponId);
    coupon.remove({_id: new mongodb.ObjectID(couponId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(couponId + ' removed!');
            res.json("Done");
        }                              
    });
});

router.get('/couponsCount', function(req, res) {
    coupon.count({}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/databaseServices', function(req, res) {
    var coupons = coupon
        .find({provider:'588b2321be75182698430a58', fixedExpiryDate:'2017-09-19T12:09:27.748Z'})
        .exec(function (err, coupons) {
        if (!err){
            console.log("Number of coupons: " + coupons.length);
            coupons.forEach(function(thisCoupon, cindex){
                thisCoupon.fixedExpiryDate = '2017-08-31T12:09:27.748Z';
                
                thisCoupon.save(function(err, thisCoupon) {
                    if (err) return console.error(err);
                    //res.json(thisCoupon._id);
                    console.log(cindex + " " + thisCoupon._id);
                });
                
            });
            
            
            res.json(coupons);
        } else {throw err;}
    });
});


router.get('/issuedcouponsCount', function(req, res) {
    coupon.count({user: {$exists: true} }, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/', function(req, res) {
    var coupons = coupon
        .find({})
        .exec(function (err, coupons) {
        if (!err){
            res.json(coupons);
        } else {throw err;}
    });
});

router.get('/allCodes', function(req, res) {
    var coupons = coupon
        .find({}, {code: 1, socialShareCode: 1})
        .exec(function (err, coupons) {
        if (!err){
            var codesArray = coupons.map(function(a) {return a.code;});
            var socialCodesArray = coupons.map(function(a) {return a.socialShareCode;});
            codesArray = codesArray.concat(socialCodesArray);
            res.json(codesArray);
        } else {throw err;}
    });
});


router.get('/oneOfEachActiveCoupon', function(req, res) {
    var uniqueCoupons = [];
    var uniqueCouponNames = coupon.distinct( "name",function(err, uniqueCouponNames) {
        if (!err){
        var nCouponNames = uniqueCouponNames.length;
        var couponcounter = 0;

        uniqueCouponNames.forEach(function(thisCouponName, cindex){
            //console.log(thisCouponName);
            var uniqueCoupon = coupon.findOne({user: { $exists: false }, name: thisCouponName})
            //.deepPopulate('provider')
            .exec(function (err, uniqueCoupon) {
                if (!err){
                    couponcounter += 1;
                    if(uniqueCoupon){
                        //console.log(uniqueCoupon);
                        uniqueCoupons.push(uniqueCoupon);
                    }
                    if(couponcounter == nCouponNames){
                        res.json(uniqueCoupons);
                    } 
                    
                }
            });

        });

        } else {throw err;}
    });
    
    
});


router.post('/nameExists', function(req, res) {
    var nameForm = req.body;
    var name = nameForm.name;
    //console.log("Name is: " + name);
    var coupons = coupon
        .find({name: name})
        .exec(function (err, coupons) {
        if (!err){
            //console.log(name + coupons.length);
            if(coupons && coupons.length > 0){
                res.json(true);
            }else{
                res.json(false);    
            }
        } else {throw err;}
    });
});

router.post('/getOneActiveCouponCode', function(req, res) {
    var couponForm = req.body;
    var name = couponForm.name;
    var offerId = couponForm.offer;
    var thisCoupon = coupon
        .findOne({name: name, offer: offerId, user: { $exists: false }})
        .exec(function (err, thisCoupon) {
        if (!err){
            res.json(thisCoupon);
        } else {throw err;}
    });
});

router.post('/save', function(req, res) {
    var couponForm = req.body;
    
    
    var couponId = couponForm._id;
    var user = couponForm.user;
    var institute = couponForm.institute;
    var faculty = couponForm.faculty;
    var competitive_environment = couponForm.competitive_environment;
    var quality_of_material = couponForm.quality_of_material;
    var infrastructure = couponForm.infrastructure;
    var year_of_start = couponForm.year_of_start;
    var exam = couponForm.exam;
    var stream = couponForm.stream;
    var text = couponForm.text;
    
    if(couponId){
        var existingReview = coupon
        .findOne({user: user, institute: institute})
        .exec(function (err, existingReview) {
            if (!err){
                if(existingReview){
                    for (var property in couponForm) {
                        if(property != '_id'){
                            existingReview[property] = couponForm[property];
                        }
                    }
                    existingReview.save(function(err, existingReview) {
                        if (err) return console.error(err);
                        res.json(existingReview._id);
                    });
                }else{
                    var newcoupon = new coupon({
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
                    newcoupon.save(function(err, newcoupon) {
                        if (err) return console.error(err);
                        res.json(newcoupon._id);
                    });
                }

            } else {throw err;}
        });
        
        
    }else{
        var newcoupon = new coupon({
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
        newcoupon.save(function(err, newcoupon) {
            if (err) return console.error(err);
            res.json(newcoupon._id);
        });
    }
    
    
    
});


router.post('/deliver', function(req, res) {
    var deliverForm = req.body;
    var reviewId = deliverForm.review;
    var selectedCoupon = deliverForm.selectedCoupon;
    var couponId = selectedCoupon._id;
    console.log('Delivering coupon');
    console.log(JSON.stringify(deliverForm));
    if(couponId){
        var thisSelectedCoupon = coupon
        .findOne({_id: couponId, user: { $exists: false }})
        .exec(function (err, thisSelectedCoupon) {
            if (!err){
                if(thisSelectedCoupon){
                for (var property in selectedCoupon) {
                    if(property != '_id'){
                        thisSelectedCoupon[property] = selectedCoupon[property];
                    }
                }
                thisSelectedCoupon.review = reviewId;
                    //console.log(JSON.stringify(thisSelectedCoupon));    
                thisSelectedCoupon.save(function(err, thisSelectedCoupon) {
                if (err) return console.error(err);


                var thisReview = review
                .findOne({_id: reviewId}, {coupon: 1})
                .exec(function (err, thisReview) {
                if (!err){
                    if(thisReview){
                        thisReview.coupon = thisSelectedCoupon._id;
                        thisReview.save(function(err, thisReview) {
                            if (err) return console.error(err);
                            console.log('Review saved: ' + thisReview._id);
                            //res.json(thisReview._id);
                        });

                    }else{
                        console.log('This review doesnt exist anymore');
                    }
                }else {throw err;}
                });





                res.json(thisSelectedCoupon);
                });
                    
                }else{
                    console.log('Error: Coupon already issued!');
                    res.json(null);
                }
                

            } else {throw err;}
        });
        
        
    }else{
        console.log('Error: No coupon id set!');
        res.json(null);
        
    }
    
    
    
});


module.exports = router;