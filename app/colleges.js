var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var college = require('../app/models/college');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an college
router.post('/save', function(req, res) {
    var thisCollege = req.body;
    var collegeId = req.body._id;
    var existingCollege = college.findOne({ '_id': collegeId },function (err, existingCollege) {
        if(existingCollege){
            for (var property in thisCollege) {
                existingCollege[property] = thisCollege[property];
            }
            existingCollege.save(function(err, existingCollege) {
                if (err) return console.error(err);
                res.json('Done');
            });
        }else{
            var this_college = new college({});
            for (var property in thisCollege) {
                this_college[property] = thisCollege[property];
            }
            this_college.save(function(err, this_college) {
                if (err) return console.error(err);
                res.json(this_college._id);
            }); 
        }
        
    });
});

//to get all colleges
router.post('/', function(req, res) {
    var collegesForm = req.body;
    var limit = 100;
    var skip = 0;
    if(collegesForm.limit){
        limit = collegesForm.limit;
    }
    if(collegesForm.skip){
        skip = collegesForm.skip;
    }
    college
        .find({}, {inst_name: 1, Institute: 1})
        .limit(limit).skip(skip)
        //.sort("Faculty"."Faculty Details.length")
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
    
});
router.get('/count', function(req, res) {
    college.count({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular user with _id userId
router.get('/edit/:collegeId', function(req, res) {
    var collegeId = req.params.collegeId;
    college
        .findOne({ '_id': collegeId },{})
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});


router.get('/getEmails/:collegeId', function(req, res) {
    var collegeId = req.params.collegeId;
    var thisCollege = college
        .findOne({ 'insti_id': collegeId },{})
        .exec(function (err, thisCollege) {
        if (!err){
            var contactEmails = [];
            var facultyEmails = [];
            if(thisCollege['Institute'] && thisCollege['Institute']['Correspondence Details'] && thisCollege['Institute']['Correspondence Details']['Email']){
                contactEmails.push(thisCollege['Institute']['Correspondence Details']['Email']);
            }
            if(thisCollege['Institute'] && thisCollege['Institute']['Contact Person'] && thisCollege['Institute']['Contact Person']['Email']){
                contactEmails.push(thisCollege['Institute']['Contact Person']['Email']);
            }
            
            if(thisCollege['Faculty'] && thisCollege['Faculty']['Faculty Details']){
                var allFaculties = thisCollege['Faculty']['Faculty Details'];
                allFaculties.forEach(function(thisFaculty, index){
                    if(thisFaculty.Email){
                        facultyEmails.push(thisFaculty.Email);
                    }
                });
            }
            console.log(contactEmails);           
            console.log(facultyEmails);           
            
            res.json(true);
        } else {throw err;}
    });
});

router.get('/edit/:collegeId', function(req, res) {
    var collegeId = req.params.collegeId;
    var thisCollege = college
        .findOne({ 'insti_id': collegeId },{})
        .exec(function (err, thisCollege) {
        if (!err){
            res.json(thisCollege);
        } else {throw err;}
    });
});
router.get('/getAllEmails', function(req, res) {
    res.json(true);
    var allColleges = college
        .find({},{Institute: 1, Faculty: 1})
        //.limit(500)
        .exec(function (err, allColleges) {
        if (!err){
            var contactEmails = [];
            var facultyEmails = [];
            var nColleges = allColleges.length;
            var nCounter = 0;
            
            allColleges.forEach(function(thisCollege, index){
                //console.log(thisCollege);
                if(thisCollege['Institute'] && thisCollege['Institute']['Correspondence Details'] && thisCollege['Institute']['Correspondence Details']['Email']){
                    contactEmails.push(thisCollege['Institute']['Correspondence Details']['Email']);
                }
                if(thisCollege['Institute'] && thisCollege['Institute']['Contact Person'] && thisCollege['Institute']['Contact Person']['Email']){
                    contactEmails.push(thisCollege['Institute']['Contact Person']['Email']);
                }

                if(thisCollege['Faculty'] && thisCollege['Faculty']['Faculty Details']){
                    var allFaculties = thisCollege['Faculty']['Faculty Details'];
                    allFaculties.forEach(function(thisFaculty, index){
                        if(thisFaculty.Email && thisFaculty.Email != ''){
                            facultyEmails.push(thisFaculty.Email);
                        }
                    });
                }
                
                nCounter += 1;
                if(nCounter == nColleges){
                    console.log(contactEmails.length);           
                    console.log(facultyEmails.length);
                }
            });
            
            
            
                      
            
            
        } else {throw err;}
    });
});
module.exports = router;