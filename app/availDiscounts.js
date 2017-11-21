var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var availDiscount = require('../app/models/availDiscount');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an availDiscount
router.post('/save', function(req, res) {
    var thisAvailDiscount = req.body;
    var availDiscountId = null;
    if(thisAvailDiscount._id){
       availDiscountId = thisAvailDiscount._id;
    }
    
    var existingAvailDiscount = availDiscount.findOne({ '_id': availDiscountId },function (err, existingAvailDiscount) {
        //console.log(existingAvailDiscount);
        if(existingAvailDiscount){
            for (var property in thisAvailDiscount) {
                existingAvailDiscount[property] = thisAvailDiscount[property];
            }
            existingAvailDiscount.save(function(err, existingAvailDiscount) {
                if (err) return console.error(err);
                console.log('AvailDiscount saved: ' + existingAvailDiscount._id);
                res.json(existingAvailDiscount);
            });
        }else{
            //console.log('I am here');
            existingAvailDiscount = new availDiscount({});
            for (var property in thisAvailDiscount) {
                existingAvailDiscount[property] = thisAvailDiscount[property];
            }
            existingAvailDiscount.save(function(err, existingAvailDiscount) {
                if (err) return console.error(err);
                console.log('AvailDiscount saved: ' + existingAvailDiscount._id);
                res.json(existingAvailDiscount);
            }); 
        }
    });
});

router.post('/find', function(req, res) {
    var thisAvailDiscount = req.body;
    var thisUser = thisAvailDiscount.user.toString();
    var thisExam = thisAvailDiscount.exam.toString();
    var thisCourse = {
        city: thisAvailDiscount.course.city,
        groupname: thisAvailDiscount.course.groupname,
    }
    
    var existingAvailDiscount = availDiscount.findOne({ user: thisUser, exam: thisExam, "course.city": thisCourse.city, "course.groupname": thisCourse.groupname }, {},function (err, existingAvailDiscount) {
        if(existingAvailDiscount){
            res.json(existingAvailDiscount);
        }else{
            res.json(false);
        }
    });
});

//to get all availDiscounts
router.get('/', function(req, res) {
    //console.log('Here');
    availDiscount
        .find({ })
        //.deepPopulate('exam')
        .exec(function (err, docs) {
        if (!err){
            //var availDiscountIds = docs.map(function(a) {return a.name;});
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
    
});


router.get('/count', function(req, res) {
    availDiscount.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


//to get a particular user with _id userId
router.get('/edit/:availDiscountId', function(req, res) {
    var availDiscountId = req.params.availDiscountId.toString();
    var thisAvailDiscount = availDiscount
        .findOne({'_id': availDiscountId})
        .exec(function (err, thisAvailDiscount) {
        if (!err){
            res.json(thisAvailDiscount);

        } else {throw err;}
    });
});


module.exports = router;