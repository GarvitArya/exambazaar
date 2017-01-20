var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var teacher = require('../app/models/teacher');
var address = require('../app/models/address');
var batch = require('../app/models/batch');
var subject = require('../app/models/subject');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a subject
router.post('/add', function(req, res) {
    var thisSubject = req.body;
    var thisInstitute = req.body.institute.data;
    //console.log("Subject is: " + JSON.stringify(thisSubject));
    //console.log("Institute is: " + JSON.stringify(thisInstitute));
    console.log(thisSubject._id);
    
    if(thisSubject._id){
        console.log("Yes subject exists")
    }
    thisInstitute = institute.findOne({ '_id': thisInstitute._id },function (err, thisInstitute) {
        if (err) return handleError(err);
        var thisAddress = new address({
            street:thisSubject.address.street,
            city:thisSubject.address.city,
            pincode:thisSubject.address.pincode,
            tel:thisSubject.address.tel
        });
        
        var this_subject = new subject({
            _institute: thisInstitute,
            basic: {
                salutation: thisSubject.basic.salutation,
                firstName: thisSubject.basic.firstName,
                lastName: thisSubject.basic.lastName,
                middleName: thisSubject.basic.middleName,
                gender: thisSubject.basic.gender,
                dob: thisSubject.basic.dob,
            },
            contact: {
            mobile: thisSubject.contact.mobile,
            email: thisSubject.contact.email
            },
            address: thisAddress
        });
        this_subject.save(function(err, this_subject) {
            if (err) return console.error(err);
            console.log("Saved subject with id: " + this_subject._id);
            
            //save subject in the institute data
            thisInstitute.subjects.push(this_subject);
            thisInstitute.save(function(err, thisInstitute) {
                if (err) return console.error(err);
            });
            //save reference to institute
            res.json(this_subject._id);
        });
    });
});

//to get all subjects
router.get('/', function(req, res) {
    subject.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular subject with _id subjectId
router.get('/edit/:subjectId', function(req, res) {
    var subjectId = req.params.subjectId;
    console.log("Subject id is: " + subjectId);
    subject
        .findOne({ '_id': subjectId })
        .deepPopulate('_batch _teacher _secondTeacher _batch.students _batch.subjects _exams _globalSubject')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The subject name is: ' + JSON.stringify(subject.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
module.exports = router;