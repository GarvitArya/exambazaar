var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var tofillci = require('../app/models/tofillci');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

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

router.get('/filledCount', function(req, res) {
    tofillci.distinct( "institute",{active: false},function(err, docs) {
    if (!err){
        res.json(docs.length);
    } else {throw err;}
    });
});

router.get('/institutesFilled', function(req, res) {
    tofillci.distinct( "institute",{},function(err, docs) {
    if (!err){
        res.json(docs);
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

//to get all tofillcis
router.get('/', function(req, res) {
    var tofillcis = tofillci
        .find({})
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
});
//to get all tofillcis for a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var tofillcis = tofillci
        .find({user: userId})
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
    
});


router.post('/save', function(req, res) {
    var tofillciForm = req.body;
    var institute = tofillciForm.institute;
    var user = tofillciForm.user;
    var _deadline = tofillciForm._deadline;
    
    var newtofillci = new tofillci({
        institute: institute,
        user: user,
        _deadline: _deadline
    });
    newtofillci.save(function(err, newtofillci) {
        if (err) return console.error(err);
        //console.log("MediaTag saved with id: " + this_mediaTag._id);
        res.json(newtofillci._id);
    });
    
    
});

module.exports = router;