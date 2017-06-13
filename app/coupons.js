var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var coupon = require('../app/models/coupon');

var user = require('../app/models/user');
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
    coupon
        .findOne({ '_id': couponId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
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
    coupon.count({active: true}, function(err, docs) {
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

module.exports = router;