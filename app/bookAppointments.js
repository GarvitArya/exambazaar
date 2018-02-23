var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var coaching = require('../app/models/coaching');
var test = require('../app/models/test');
var bookAppointment = require('../app/models/bookAppointment');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an bookAppointment
router.post('/save', function(req, res) {
    var thisBookAppointment = req.body;
    var bookAppointmentId = null;
    if(thisBookAppointment._id){
       bookAppointmentId = thisBookAppointment._id;
    }
    
    var existingBookAppointment = bookAppointment.findOne({ '_id': bookAppointmentId },function (err, existingBookAppointment) {
        //console.log(existingBookAppointment);
        if(existingBookAppointment){
            for (var property in thisBookAppointment) {
                existingBookAppointment[property] = thisBookAppointment[property];
            }
            existingBookAppointment.save(function(err, existingBookAppointment) {
                if (err) return console.error(err);
                console.log('BookAppointment saved: ' + existingBookAppointment._id);
                res.json(existingBookAppointment);
            });
        }else{
            //console.log('I am here');
            existingBookAppointment = new bookAppointment({});
            for (var property in thisBookAppointment) {
                existingBookAppointment[property] = thisBookAppointment[property];
            }
            existingBookAppointment.save(function(err, existingBookAppointment) {
                if (err) return console.error(err);
                console.log('BookAppointment saved: ' + existingBookAppointment._id);
                res.json(existingBookAppointment);
            }); 
        }
    });
});

router.post('/find', function(req, res) {
    var thisBookAppointment = req.body;
    var thisUser = thisBookAppointment.user.toString();
    var thisExam = thisBookAppointment.exam.toString();
    var thisCourse = {
        city: thisBookAppointment.course.city,
        groupname: thisBookAppointment.course.groupname,
    }
    
    var existingBookAppointment = bookAppointment.findOne({ user: thisUser, exam: thisExam, "course.city": thisCourse.city, "course.groupname": thisCourse.groupname }, {},function (err, existingBookAppointment) {
        if(existingBookAppointment){
            res.json(existingBookAppointment);
        }else{
            res.json(false);
        }
    });
});

//to get all bookAppointments
router.get('/', function(req, res) {
    //console.log('Here');
    bookAppointment
        .find({ })
        //.deepPopulate('exam')
        .exec(function (err, docs) {
        if (!err){
            //var bookAppointmentIds = docs.map(function(a) {return a.name;});
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
    
});


router.get('/count', function(req, res) {
    bookAppointment.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


//to get a particular user with _id userId
router.get('/edit/:bookAppointmentId', function(req, res) {
    var bookAppointmentId = req.params.bookAppointmentId.toString();
    var thisBookAppointment = bookAppointment
        .findOne({'_id': bookAppointmentId})
        .exec(function (err, thisBookAppointment) {
        if (!err){
            res.json(thisBookAppointment);

        } else {throw err;}
    });
});

router.get('/user/:userId', function(req, res) {
    
    var userId = req.params.userId;
    
    var bookAppointments = bookAppointment
    .find({user: userId})
    .sort( { _created: -1 } )
    .deepPopulate('exam')
    //.deepPopulate('institute institute.exams institute.exams.stream')
    .exec(function (err, bookAppointments) {
    if (!err){
        var basicBookAppointments = [];
        var groupNames = [];
        var counter = 0;
        var nLength = bookAppointments.length;
        
        var bookAppointmentInstituteIds =  bookAppointments.map(function(a) {return a.institute;});
        
        var allProviderBookAppointments = coaching
            .find({_id : { $in : bookAppointmentInstituteIds }, disabled: {$ne: true}},{name:1 , groupName:1, exams:1, disabled: 1, city:1, logo:1, address:1, pincode:1})
            .exec(function (err, allProviderBookAppointments) {
            if (!err){
                
            var instituteIds = allProviderBookAppointments.map(function(a) {return a._id.toString();});

            bookAppointments.forEach(function(thisBookAppointment, rindex){
                var iIndex = instituteIds.indexOf(thisBookAppointment.institute.toString());
                thisBookAppointment.institute = allProviderBookAppointments[iIndex];

                if(thisBookAppointment.institute && !thisBookAppointment.institute.disabled){
                    
                    basicBookAppointments.push(thisBookAppointment);
                 
                }
                counter = counter + 1;
                if(counter == nLength){

                    res.json(basicBookAppointments);
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


module.exports = router;