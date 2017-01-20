var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var Moment = require('moment');
var student = require('../app/models/student');
var notification = require('../app/models/notification');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.post('/markRead', function(req, res) {
    var thisStudent = req.body.studentId;
    var thisTeacher = req.body.teacherId;
    var thisNotificationId = req.body.notificationId;
    console.log("Student " + thisStudent);
    console.log("Teacher " + thisTeacher);
    console.log("Notification " + thisNotificationId);
    var thisNotification = notification.findOne({'_id': thisNotificationId },{studentRead:1,teacherRead:1},function (err, thisNotification) {
        if (err) return handleError(err);
        
        if(thisNotification){
            if(thisStudent){
            
             thisNotification.studentRead.addToSet(thisStudent);
            thisNotification.save(function(err, thisNotification) {
                if (err) return console.error(err);
            });
            }
            if(thisTeacher){
            thisNotification.teacherRead.addToSet(thisTeacher);
            thisNotification.save(function(err, thisNotification) {
                if (err) return console.error(err);
            });
            }
        }else{
            
        }
        
        res.send("Done");
    });
    
});

module.exports = router;