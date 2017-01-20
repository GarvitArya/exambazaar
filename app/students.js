
var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var teacher = require('../app/models/teacher');
var student = require('../app/models/student');
var eval = require('../app/models/eval');
var parent = require('../app/models/parent');
var address = require('../app/models/address');
var batch = require('../app/models/batch');
var user = require('../app/models/user');
var notification = require('../app/models/notification');
var mongoose = require('mongoose');
var http = require('http');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');


//to add a student
router.post('/save', function(req, res) {
    var thisStudent = req.body;
    var rmn = thisStudent.contact.mobile;
    var thisBatchId = req.body.batch;
    var thisParent = req.body.parent;
    var thisInstitute = req.body.institute.data;
    
    var existingUser = user.findOne({ 'mobile': rmn },function (err, thisInstitute) {
        if (err) return handleError(err);
        console.log("User exists!!");
    });
    thisInstitute = institute.findOne({ '_id': thisInstitute._id },function (err, thisInstitute) {
    if (err) return handleError(err);
    thisBatch = batch.findOne({ '_id': thisBatchId },function (err, thisBatch) {
    if (err) return handleError(err);
        var thisAddress = new address({
            street:thisStudent.address.street,
            city:thisStudent.address.city,
            pincode:thisStudent.address.pincode,
            tel:thisStudent.address.tel
        });
        
        var this_student = new student({
            _institute: thisInstitute,
            basic: {
                salutation: thisStudent.basic.salutation,
                firstName: thisStudent.basic.firstName,
                lastName: thisStudent.basic.lastName,
                middleName: thisStudent.basic.middleName,
                gender: thisStudent.basic.gender,
                dob: thisStudent.basic.dob
            },
            batch: thisBatch,
            contact: {
                mobile: thisStudent.contact.mobile,
                email: thisStudent.contact.email
            },
            address: thisAddress
        });
        //set image url
        /*if(typeof(thisStudent.account.imageUrl != 'undefined')){
            this_student.account = {
                imageUrl:thisStudent.account.imageUrl
           }
        }
        if(typeof(thisStudent.transportVehicle !='undefined')){
            this_student.transportVehicle = thisStudent.transportVehicle;
        }*/
        
        var hash = bcrypt.hashSync(thisStudent.basic.lastName, bcrypt.genSaltSync(10));
        var thisUserName = thisStudent.contact.mobile + "_"+thisStudent.basic.firstName;
        this_student.save(function(err, this_student) {
            if (err) return console.error(err);
            //console.log("Saved student with id: " + this_student._id);
            var this_user = new user({
                userType : 'Student',
                firstName : thisStudent.basic.firstName,
                mobile : thisStudent.contact.mobile,
                //userName : thisStudent.contact.mobile+"_"+thisStudent.basic.firstName,
                password : hash,
                _student : this_student._id,
                _institute: thisInstitute
            });
            
            this_user.save(function(err, this_user) {
                if (err) return console.error(err);
                //console.log("User student with id: " + this_user._id);
            });
            //save student in the institute data
            thisInstitute.students.push(this_student);
            thisInstitute.save(function(err, thisInstitute) {
                if (err) return console.error(err);
                thisBatch.students.push(this_student);
                thisBatch.save(function(err, thisBatch) {
                if (err) return console.error(err);
                });
            });
            //save reference to institute
            res.json(this_student._id);
        });
        
        
      });  
    });
});


router.post('/bulksave', function(req, res) {
    //console.log(JSON.stringify(req.body));
    var students = req.body.students;
    var addinstitute = req.body.institute;
    var batchid = req.body.batch;
    //console.log(JSON.stringify(students));
    //console.log(JSON.stringify(thisInstitute));
    
    students.forEach(function(thisStudent, index){
        console.log(" Current Student is "+ index + JSON.stringify(thisStudent));
        console.log(thisStudent.contact.mobile);
        var batchName = thisStudent.batchName;
        thisInstitute = institute.findOne({ '_id': addinstitute },function (err, thisInstitute) {
            if (err) return handleError(err);
            
            thisBatch = batch.findOne({ 'name': batchName },function (err, thisBatch) {
            if (err) return handleError(err);
            
            console.log("Batch is: " + thisBatch.name );    
                
            //console.log(Object.keys(thisStudent).length + JSON.stringify(thisStudent));
            
            var names = [];
            names = thisStudent.basic.name.split(" ");
            
            if(names.length > 1){
                if(names[0] == "Mr." || names[0] == "Mr" || names[0] == "Ms." || names[0] == "Ms" || names[0] == "Miss" || names[0] == "Mrs." || names[0] == "Mrs"){
                thisStudent.basic.salutation = names[0]; 
                thisStudent.basic.firstName = names[1];
                thisStudent.basic.lastName = names[names.length-1];
                if(names.length > 3){
                    thisStudent.basic.middleName = "";
                    for (var i = 2; i < names.length-1; i++){
                        thisStudent.basic.middleName += names[i] + " ";
                    }
                }
                }else{
                    thisStudent.basic.firstName = names[0];
                    thisStudent.basic.lastName = names[names.length-1];
                    if(names.length > 2){
                        thisStudent.basic.middleName = "";
                        for (var i = 1; i < names.length-1; i++){
                            thisStudent.basic.middleName += names[i] + " ";
                        }
                    }
                }
            }else{
                thisStudent.basic.firstName = names[0];
            }
            
            var parentNames = [];
                parentNames = thisStudent.parent.basic.name.split(" ");
            if(parentNames.length > 1){
                if(parentNames[0] == "Mr." || parentNames[0] == "Mr" || parentNames[0] == "Ms." || parentNames[0] == "Ms" || parentNames[0] == "Miss" || parentNames[0] == "Mrs." || parentNames[0] == "Mrs" || parentNames[0] == "Late"){
                    thisStudent.parent.basic.salutation = parentNames[0]; 
                    thisStudent.parent.basic.firstName = parentNames[1];
                    thisStudent.parent.basic.lastName = parentNames[parentNames.length-1];
                    if(parentNames.length > 3){
                        thisStudent.parent.basic.middleName = "";
                        for (var i = 2; i < parentNames.length-1; i++){
                            thisStudent.parent.basic.middleName += parentNames[i] + " ";
                        }
                    }
                }else{
                    thisStudent.parent.basic.firstName = parentNames[0];
                    thisStudent.parent.basic.lastName = parentNames[parentNames.length-1];
                    if(parentNames.length > 2){
                        thisStudent.parent.basic.middleName = "";
                        for (var i = 1; i < parentNames.length-1; i++){
                            thisStudent.parent.basic.middleName += parentNames[i] + " ";
                        }
                    }
                }
            }else{
                
            }
            
            
            var thisAddress = new address({
                street:thisStudent.address
            });
            var this_student = new student({
                _institute: addinstitute,
                batch: thisBatch,
                enrollmentNo: thisStudent.enrollmentNo,
                basic: {
                    salutation: thisStudent.basic.salutation,
                    firstName: thisStudent.basic.firstName,
                    lastName: thisStudent.basic.lastName,
                    middleName: thisStudent.basic.middleName,
                    gender: thisStudent.basic.gender,
                    dob: thisStudent.basic.dob,
                },
                contact: {
                    mobile: thisStudent.contact.mobile,
                    email: thisStudent.contact.email
                }
            });
            if(thisStudent.address!='null'){
                console.log();
                this_student.address = thisAddress;
            }
            this_student.save(function(err, this_student) {
                if (err) return console.error(err);
                console.log("Student saved: " + this_student.basic.firstName);
                //save teacher in the institute data
               
                var this_parent = new parent({
                    _student: this_student,
                    basic: {
                        salutation: thisStudent.parent.basic.salutation,
                        firstName: thisStudent.parent.basic.firstName,
                        middleName: thisStudent.parent.basic.middleName,
                        lastName: thisStudent.parent.basic.lastName,
                    },
                    contact: {
                        mobile: thisStudent.contact.mobile
                    }
                });
                
                this_parent.save(function(err, this_parent) {
                    if (err) return console.error(err);
                    console.log("Parent saved for " + this_student.basic.firstName);
                    this_student.parents.push(this_parent);
                    this_student.save(function(err, this_student) {
                    if (err) return console.error(err);
                    
                    var hash;
                    if(typeof(this_student.basic.lastName)!='undefined'){
                        //console.log("Password is: " + this_student.basic.lastName);
                        hash = bcrypt.hashSync(thisStudent.basic.lastName, bcrypt.genSaltSync(10));
                    }else{
                        //console.log("Password is: " + this_student.basic.firstName);
                        hash = bcrypt.hashSync(thisStudent.basic.firstName, bcrypt.genSaltSync(10));
                    }
                    var this_user = new user({
                        userType : 'Student',
                        firstName : thisStudent.basic.firstName,
                        
                        mobile : thisStudent.contact.mobile,
                        password : hash,
                        _student : this_student,
                        _institute: addinstitute
                    });
                    
                    this_user.save(function(err, this_user) {
                        if (err) return console.error(err);
                        console.log("User student with id: " + this_user._id);
                    }); 
                    
                    thisBatch.students.addToSet(this_student);
                    thisBatch.save(function(err, thisBatch) {
                    if (err) return console.error(err);
                        this_student.batch = thisBatch;

                        this_student.save(function(err, this_student) {
                            if (err) return console.error(err);
                        });


                    });    
                        
                    /*if(typeof(batchid)!='undefined'){
                        thisBatch = batch.findOne({ '_id': batchid },function (err, thisBatch) {
                            if (err) return handleError(err);
                            thisBatch.students.addToSet(this_student);
                            thisBatch.save(function(err, thisBatch) {
                            if (err) return console.error(err);
                                this_student.batch = thisBatch;

                                this_student.save(function(err, this_student) {
                                    if (err) return console.error(err);
                                });


                            });
                        });
                    }*/
                    thisInstitute.students.addToSet(this_student);
                    thisInstitute.save(function(err, thisInstitute) {
                        if (err) return console.error(err);

                    });    
                        
                        
                    });
                });
                
                    
            });
            
            
            }); //batch ends here
            
        });
        
        
        
    });
    
    
    res.send("Done");
    
});



//to get all students
router.get('/', function(req, res) {
    student.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get all students
router.get('/count', function(req, res) {
    student.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular student with _id studentId
router.get('/edit/:studentId', function(req, res) {
    var studentId = req.params.studentId;
    
    student
        .findOne({ '_id': studentId })
        .deepPopulate('_institute batch batch.batchTeacher parents batch.subjects batch.subjects._globalSubject batch.subjects._exams batch.students batch.subjects._teacher.basic batch.subjects._secondTeacher.basic transportVehicle')
        .exec(function (err, thisStudent) {
        if (!err){ 
            if(thisStudent){
                //find all the evals of this student
                var studentEval = eval
                .find({ '_student': studentId })
                .deepPopulate('_exam')
                .exec(function (err, studentEval) {
                if (!err){
                    console.log(studentId+ " " + studentEval);
                    
                    thisStudent._institute = thisStudent._institute.basic;
                    console.log(thisStudent._institute);
                    var studentinfo = {
                        student:  thisStudent,
                        eval: studentEval
                    };
                    //thisStudent.eval = studentEval;
                    res.json(studentinfo);
                }
                });
                
            }
            
            
            //process.exit();
        } else {throw err;}
    });
});

router.get('/attendance/:studentId', function(req, res) {
    var studentId = req.params.studentId;
    console.log("Student Attendance is " + studentId);
    var thisStudent = student
        .findOne({ '_id': studentId }, {_institute:1})
        .deepPopulate('_institute _institute.calendar.days')
        .exec(function (err, thisStudent) {
        if (!err){
            var studentId = thisStudent._id;
            var studentAttendance = {
                present: [],
                absent:[],
                holiday:[]
            };
            var days = thisStudent._institute.calendar.days;
            //console.log(days);
            days.forEach(function(thisDay, dayIndex){
                var attendance = thisDay._attendance;
                var present = attendance.present;
                var absent = attendance.absent;
                if(thisDay.academicHoliday == true){
                    studentAttendance.holiday.push(thisDay.date);
                }
                if(present.indexOf(studentId)>=0){
                    studentAttendance.present.push(thisDay.date);
                }
                if(absent.indexOf(studentId)>=0){
                    studentAttendance.absent.push(thisDay.date);
                }
                //console.log(present.length + " " + absent.length);
            });
            console.log(studentAttendance);
            res.json(studentAttendance);
            //process.exit();
        } else {throw err;}
    });
    
   
});

router.get('/notification/:studentId', function(req, res) {
    var studentId = req.params.studentId;
    //console.log("Student Attendance is " + studentId);
    var thisStudent = student
        .findOne({ '_id': studentId }, {_institute:1, batch:1})
        //.deepPopulate('_institute _institute.calendar.days')
        .exec(function (err, thisStudent) {
        if (!err){
            var instituteId = thisStudent._institute;
            var batchId = thisStudent.batch;
            
            console.log(instituteId + " " +batchId);
            var instituteNotifications =  notification.find({'_institute': instituteId },{forDate:1, actionDate:1, creationDate:1, type: 1, text:1, redirectState: 1, studentRead: 1},function (err, instituteNotifications) {
                if (err) return handleError(err);
                console.log(instituteNotifications);
                
                
                var batchNotifications =  notification.find({'_batch': batchId },{forDate:1, actionDate:1, creationDate:1, type: 1, text:1, redirectState: 1, studentRead: 1},function (err, batchNotifications) {
                if (err) return handleError(err);
                var notifications = {
                    read: [],
                    unread: []
                };
                console.log(batchNotifications);
                if(instituteNotifications){
                    instituteNotifications.forEach(function(thisNotification, iIndex){
                    var read = thisNotification.studentRead;
                    if(read.indexOf(studentId)>=0){
                        //notification has been read
                        thisNotification.studentRead = [];
                        thisNotification.read = 1;
                        notifications.read.push(thisNotification);
                    }else{
                        thisNotification.studentRead = [];
                        thisNotification.read = 0;
                        notifications.unread.push(thisNotification);
                    }
                    
                    //console.log(thisNotification.text);
                    });
                }    
                
               if(batchNotifications){          
                   batchNotifications.forEach(function(thisNotification, iIndex){
                       
                    var read = thisNotification.studentRead;
                    //console.log(read.indexOf(studentId));
                    if(read.indexOf(studentId)>=0){
                        //notification has been read
                        thisNotification.studentRead = [];
                        thisNotification.read = 1;
                        notifications.read.push(thisNotification);
                    }else{
                        thisNotification.studentRead = [];
                        thisNotification.read = 0;
                        notifications.unread.push(thisNotification);
                        //console.log("Here");
                    } 
                    
                    });    
                  
                }
                res.send(notifications);
                });
            });
            
            
        } else {throw err;}
    });
    
   
});

module.exports = router;