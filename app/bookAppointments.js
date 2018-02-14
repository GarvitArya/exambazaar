var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
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


module.exports = router;