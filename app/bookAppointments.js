var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var coaching = require('../app/models/coaching');
var test = require('../app/models/test');
var user = require('../app/models/user');
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
    var allAppointments = bookAppointment
        .find({})
        //.deepPopulate('user')
        .exec(function (err, allAppointments) {
        if (!err){
            var bookAppointmentUsers = allAppointments.map(function(a) {return a.user.toString();});
            
            
            
            var appointmentUsers = user.find({ _id: {$in: bookAppointmentUsers } }, {basic: 1},function (err, appointmentUsers) {
                if(appointmentUsers){
                    var appointmentUserIds = appointmentUsers.map(function(a) {return a._id.toString();});
                    var sendAppointments = [];
                    allAppointments.forEach(function(thisAppointment, aindex){
                        var thisUser = thisAppointment.user.toString();
                        var uIndex = appointmentUserIds.indexOf(thisUser);
                        if(uIndex != -1){
                            thisAppointment.user = appointmentUsers[uIndex];
                            var newAppointment = {
                                _id: thisAppointment._id,
                                user: appointmentUsers[uIndex],
                                institute: thisAppointment.institute,
                                exam: thisAppointment.exam,
                                _requestDate: thisAppointment._requestDate,
                                _confirmation: thisAppointment._confirmation,
                                course: thisAppointment.course,
                                _created: thisAppointment._created,
                                _status: thisAppointment._status,
                            };
                            sendAppointments.push(newAppointment);
                        }
                        
                        if(aindex == allAppointments.length - 1){
                            res.json(sendAppointments);
                        }
                        
                    });
                    
                    
                    
                }else{
                    res.json([]);
                }
            });
            
            
            
            
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
    var thisAppointment = bookAppointment
        .findOne({'_id': bookAppointmentId})
        .deepPopulate('exam user')
        .exec(function (err, thisAppointment) {
        if (!err){
            var thisInstitute = coaching.findOne({ _id: thisAppointment.institute }, {address: 1, city: 1, pincode: 1, state: 1, mobile:1, phone:1, website: 1, logo: 1, name: 1, email: 1},function (err, thisInstitute) {
                var newAppointment = {
                    _id: thisAppointment._id,
                    user: thisAppointment.user,
                    institute: thisAppointment.institute,
                    exam: thisAppointment.exam,
                    _requestDate: thisAppointment._requestDate,
                    _confirmation: thisAppointment._confirmation,
                    course: thisAppointment.course,
                    _created: thisAppointment._created,
                    _status: thisAppointment._status,
                };
                
                if(thisInstitute){
                    newAppointment.institute = thisInstitute;
                }
                res.json(newAppointment);
            });
            

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