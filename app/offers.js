var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var offer = require('../app/models/offer');

var user = require('../app/models/user');
var email = require('../app/models/email');


var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular offer with _id offerId
router.get('/edit/:offerId', function(req, res) {
    var offerId = req.params.offerId;
    //console.log(offerId);
    offer
        .findOne({ '_id': offerId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/remove/:offerId', function(req, res) {
    var offerId = req.params.offerId;
    console.log(offerId);
    offer.remove({_id: new mongodb.ObjectID(offerId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(offerId + ' removed!');
            res.json("Done");
        }                              
    });
});

router.get('/offersCount', function(req, res) {
    offer.count({active: true}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/', function(req, res) {
    var offers = offer
        .find({})
        .exec(function (err, offers) {
        if (!err){
            res.json(offers);
        } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var offerForm = req.body;
    
    
    var offerId = offerForm._id;
    var user = offerForm.user;
    var institute = offerForm.institute;
    var faculty = offerForm.faculty;
    var competitive_environment = offerForm.competitive_environment;
    var quality_of_material = offerForm.quality_of_material;
    var infrastructure = offerForm.infrastructure;
    var year_of_start = offerForm.year_of_start;
    var exam = offerForm.exam;
    var stream = offerForm.stream;
    var text = offerForm.text;
    
    if(offerId){
        var existingReview = offer
        .findOne({user: user, institute: institute})
        .exec(function (err, existingReview) {
            if (!err){
                if(existingReview){
                    for (var property in offerForm) {
                        if(property != '_id'){
                            existingReview[property] = offerForm[property];
                        }
                    }
                    existingReview.save(function(err, existingReview) {
                        if (err) return console.error(err);
                        res.json(existingReview._id);
                    });
                }else{
                    var newoffer = new offer({
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
                    newoffer.save(function(err, newoffer) {
                        if (err) return console.error(err);
                        res.json(newoffer._id);
                    });
                }

            } else {throw err;}
        });
        
        
    }else{
        var newoffer = new offer({
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
        newoffer.save(function(err, newoffer) {
            if (err) return console.error(err);
            res.json(newoffer._id);
        });
    }
    
    
    
});

module.exports = router;