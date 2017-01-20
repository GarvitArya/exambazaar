var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var teacher = require('../app/models/teacher');
var student = require('../app/models/student');
var master = require('../app/models/master');
var admin = require('../app/models/admin');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');


//to add a student
router.post('/add', function(req, res) {
    var userType = req.body.userType;
    var imageUrl = req.body.imageUrl;
    
    if(userType =='Teacher'){
        var _teacher = req.body._teacher;
        console.log(_teacher + " " + imageUrl);
        thisTeacher = teacher.findOne({ '_id': _teacher },function (err, thisTeacher) {
            if (err) return handleError(err);
            thisTeacher.imageUrl = imageUrl;
            thisTeacher.save(function(err, thisTeacher) {
                if (err) return console.error(err);
                res.send("Done");
            });
        });
    }
    if(userType =='Student'){
        var _student = req.body._student;
        console.log(_student + " " + imageUrl);
        thisStudent = student.findOne({ '_id': _student },function (err, thisStudent) {
            if (err) return handleError(err);
            thisStudent.imageUrl = imageUrl;
            thisStudent.save(function(err, thisStudent) {
                if (err) return console.error(err);
                res.send("Done");
            });
        });
    }
    //
});

module.exports = router;