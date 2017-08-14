var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var test = require('../app/models/test');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an test
router.post('/save', function(req, res) {
    var thisTest = req.body;
    var testId = '';
    if(thisTest._id){
       testId = thisTest._id;
    }
    console.log(JSON.stringify(thisTest));
    
    var existingTest = test.findOne({ '_id': testId },function (err, existingTest) {
        console.log(existingTest);
        if(existingTest){
            for (var property in thisTest) {
                existingTest[property] = thisTest[property];
            }
            existingTest.save(function(err, existingTest) {
                if (err) return console.error(err);
                res.json(existingTest);
            });
        }else{
            existingTest = new test({});
            for (var property in thisTest) {
                existingTest[property] = thisTest[property];
            }
            existingTest.save(function(err, existingTest) {
                if (err) return console.error(err);
                res.json(existingTest);
            }); 
        }
    });
});



//to get all tests
router.get('/', function(req, res) {
    //console.log('Here');
    test
        .find({ })
        .deepPopulate('exam')
        .exec(function (err, docs) {
        if (!err){
            //var testIds = docs.map(function(a) {return a.name;});
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
    
});

router.get('/exam/:examId', function(req, res) {
    var examId = req.params.examId;
    var allTests = test
        .find({exam: examId})
        .exec(function (err, allTests) {
        if (!err){
            res.json(allTests);
        } else {throw err;}
    });
    
});

router.get('/test/:testId', function(req, res) {
    var testId = req.params.testId;
    var thisTest = test
        .findOne({'_id': testId})
        .deepPopulate('exam')
        .exec(function (err, thisTest) {
        if (!err){
            //console.log(thisTest);
            res.json(thisTest);
        } else {throw err;}
    });
    
});

router.get('/remove/:testId', function(req, res) {
    var testId = req.params.testId;
    
    test.remove({_id: testId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Test removed!');
            res.json(true);
        }                              
    });
    
    
});

router.get('/count', function(req, res) {
    test.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


//to get a particular user with _id userId
router.get('/edit/:testId', function(req, res) {
    var testId = req.params.testId;
    //console.log("Test is " + testId);
    test
        .findOne({ '_id': testId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.post('/addLogo', function(req, res) {
    var newLogoForm = req.body;
    var logo = newLogoForm.logo;
    var testId = newLogoForm.testId;
    //console.log('Express received: ' + JSON.stringify(newLogoForm));
    
    var thisTest = test
        .findOne({ _id: testId }, {logo:1})
        .exec(function (err, thisTest) {
        if (!err){
            
            if(thisTest){
                thisTest.logo = logo;
                thisTest.save(function(err, thisTest) {
                    if (err) return console.error(err);
                    //console.log("Logo data saved for " + thisTest._id);
                    res.json('Done');
                });
            }else{
                console.log('No such test');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

module.exports = router;