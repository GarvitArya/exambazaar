var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var Moment = require('moment');
var institute = require('../app/models/institute');
var teacher = require('../app/models/teacher');
var calendar = require('../app/models/calendar');
var day = require('../app/models/day');
var student = require('../app/models/student');
var batch = require('../app/models/batch');
var subject = require('../app/models/subject');
var globalSubject = require('../app/models/globalSubject');
var notification = require('../app/models/notification');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.post('/save', function(req, res) {
    var thisBatch = req.body;
    var thisInstituteId = req.body.instituteId;
    
    var thisSubjects = req.body.subjects;
    console.log("Subjects are: " + JSON.stringify(thisSubjects));
    
    var students = [];
    var this_batch = new batch({
            _institute: thisBatch.instituteId,
            name: thisBatch.name,
            grade: thisBatch.grade,
            section: thisBatch.section,
            students: students,
            batchTeacher: thisBatch.batchTeacher
    });
    //var chain = $q.when();
    thisInstitute = institute.findOne({ '_id': thisInstituteId },function (err, thisInstitute) {
        if (err) return handleError(err);
        this_batch.save(function(err, this_batch) {
            if (err) return console.error(err);
            //add subjects
            var this_subject;
            var counter = 0;
            var promises = [];
            var this_subjects = [];
            for (var key in thisSubjects) {
                console.log(key, thisSubjects[key].subject);
                this_subject = new subject({
                    _batch:this_batch,
                    _teacher: thisSubjects[key].teacher,
                    _globalSubject: thisSubjects[key].subject
                });
                
                
                this_subject.save(function(err, this_subject) {
                    if (err) return console.error(err);
                    //console.log("Subject is: " + this_subject._id);
                    this_batch.subjects.addToSet(this_subject);
                    this_batch.save(function(err, this_batch) {
                        if (err) return console.error(err);
                        //find the teacher
                        thisTeacher = teacher.findOne({ '_id': this_subject._teacher },function (err, thisTeacher) {
                        if (err) return handleError(err);
                            thisTeacher.batches.addToSet(this_batch);
                            thisTeacher.subjects.addToSet(this_subject);
                            thisTeacher.save(function(err, thisTeacher) {
                            if (err) return console.error(err)
                            });
                        });
                    });
                });
                this_subjects.push(this_subject);
            }
            //console.log("Subject is: " + JSON.stringify(this_subjects));
            res.json(this_batch._id);
        });
        thisInstitute.batches.push(this_batch);
        thisInstitute.save(function(err, thisInstitute) {
            if (err) return console.error(err);
        });
    });
});

router.post('/saveBatchClassTeachers', function(req, res) {
    //console.log(JSON.stringify(req.body));
    var batchClassTeacherMapping = req.body.batchClassTeacherMapping;
    var _institute = req.body._institute;
    //console.log(JSON.stringify(batchClassTeacherMapping));
    
    thisInstitute = institute.findOne({ '_id': _institute },{teachers:1},function (err, thisInstitute) {
        if (err) return handleError(err);
        console.log(JSON.stringify(thisInstitute));
        var teachers = thisInstitute.teachers;
        teachers.forEach(function(thisteacher, index){
            this_teacher = teacher.findOne({ '_id': thisteacher },function (err, this_teacher) {
                if (err) return handleError(err);
                console.log(this_teacher);
                this_teacher.batches = [];
                this_teacher.save(function(err, this_teacher) {
                    if (err) return console.error(err);
                });
            });
        });
        
        batchClassTeacherMapping.forEach(function(thisBatch, index){
        if (thisBatch.teacherId === undefined) {
            //dont do anything
        }else{
            this_Batch = batch.findOne({ '_id': thisBatch.batchId },function (err, this_Batch) {
                if (err) return handleError(err);
                
                
                //console.log(JSON.stringify(this_Batch));
                this_Batch.batchTeacher = thisBatch.teacherId;
                this_Batch.save(function(err, this_Batch) {
                    if (err) return console.error(err);
                    console.log("Batch " + this_Batch.name + " updated!");
                    
                    this_teacher = teacher.findOne({ '_id': thisBatch.teacherId },function (err, this_teacher) {
                        if (err) return handleError(err);
                        this_teacher.batches.addToSet(this_Batch);
                        this_teacher.save(function(err, this_teacher) {
                        if (err) return console.error(err);
                        });
                    });
                    
                    //res.send("Done");
                });
                
            });
        }
        });
    });
    
    
    res.send("Done");
});


router.get('/manageBatchStudents', function(req, res) {
    var batches = batch.find({},function (err, batches) {
        if (err) return handleError(err);
        batches.forEach(function(thisBatch, index){
            //console.log(JSON.stringify(thisBatch));
            console.log(thisBatch.name + " " + thisBatch.students.length + " " + thisBatch._id);
            
            var students = student.find({batch: thisBatch._id},{_id:1},function (err, students) {
                if (err) return handleError(err);
                    console.log(thisBatch.name + " " + thisBatch.students.length + " " + students);
                    thisBatch.students = students;
                    thisBatch.save(function(err, thisBatch) {
                    if (err) return console.error(err);
                    });
                
            });
            
            
        });
    });
});

router.post('/saveBatchSubjectTeachers', function(req, res) {
    var batchSubjectTeacherMapping = req.body;
    //console.log("I have reached here");
    //console.log(JSON.stringify(batchSubjectTeacherMapping));
    batchSubjectTeacherMapping.forEach(function(thisBatch, index){
        
        this_Batch = batch.findOne({ '_id': thisBatch.batchId })
            .deepPopulate('subjects')
            .exec(function (err, this_Batch) {
            if (!err){ 
                //console.log("Batch info is: " + this_Batch);
               
                //console.log("Number of subjects in " + this_Batch.name + " are: " + thisBatch.subjectTeachers.length);
               if(thisBatch.subjectTeachers.length==0 && this_Batch.subjects.length>0){
                   console.log("Removing all subjects from " + this_Batch.name);
                   
                   this_Batch.subjects.forEach(function(iSubject, subjectIdx){
                       //remove teacher & remove second teacher if it exists
                       var firstTeacherId = iSubject._teacher;
                       var secondTeacherId = iSubject._secondTeacher || '';
                       
                       this_OldFirstTeacher = teacher.findOne({ '_id': firstTeacherId })
                        .deepPopulate('subjects')
                        .exec(function (err, this_OldFirstTeacher) {
                        if (!err){      
                            console.log(JSON.stringify(this_OldFirstTeacher)); this_OldFirstTeacher.subjects.pull(iSubject);
                            this_OldFirstTeacher.save(function(err, this_OldFirstTeacher) {
                            if (err) return console.error(err);
                            console.log("Subject removed from old first teacher");
                            //res.send("Done");
                            });
                            //process.exit();
                            } else {throw err;}
                        });
                       
                       if(secondTeacherId !=''){
                           //remove old second teacher too
                           this_OldSecondTeacher = teacher.findOne({ '_id': secondTeacherId })
                            .deepPopulate('subjects')
                            .exec(function (err, this_OldSecondTeacher) {
                            if (!err){      
                                console.log(JSON.stringify(this_OldSecondTeacher)); this_OldSecondTeacher.subjects.pull(iSubject);
                                this_OldSecondTeacher.save(function(err, this_OldSecondTeacher) {
                                if (err) return console.error(err);
                                console.log("Subject removed from old second teacher");
                                //res.send("Done");
                                });
                                //process.exit();
                                } else {throw err;}
                            });
                       }
                       
                   });
                   
                   
                   this_Batch.subjects=[];
                   this_Batch.save(function(err, this_Batch) {
                            if (err) return console.error(err);
                    });
               } this_Batch.subjects.forEach(function(oldSubject, oldsubjectIndex){
                    var subjectExists = 0;
                    thisBatch.subjectTeachers.forEach(function(thisSubject, subjectIndex){
                        var globalSubjectId = thisSubject.subject._id;
                        //console.log(JSON.stringify(oldSubject));
                        //console.log(globalSubjectId + " " + oldSubject._globalSubject);
                        if(oldSubject._globalSubject == globalSubjectId && oldSubject._globalSubject != undefined){
                            subjectExists = 1;
                        }
                    });
                    if(subjectExists ==0){
                        //remove this subject
                        console.log("Remove this subject from batch" + JSON.stringify(oldSubject));
                        this_Batch.subjects.pull(oldSubject);
                        this_Batch.save(function(err, this_Batch) {
                            if (err) return console.error(err);
                        });
                        var firstTeacherId = oldSubject._teacher;
                        var secondTeacherId = oldSubject._secondTeacher;
                        
                        //remove both teachers
                        
                        
                        this_OldFirstTeacher = teacher.findOne({ '_id': firstTeacherId })
                        .deepPopulate('subjects')
                        .exec(function (err, this_OldFirstTeacher) {
                        if (!err){      
                            console.log(JSON.stringify(this_OldFirstTeacher)); this_OldFirstTeacher.subjects.pull(oldSubject);
                            this_OldFirstTeacher.save(function(err, this_OldFirstTeacher) {
                            if (err) return console.error(err);
                            console.log("Subject removed from old first teacher");
                            //res.send("Done");
                            });
                            //process.exit();
                            } else {throw err;}
                            });

                           if(secondTeacherId !='' && secondTeacherId != null){
                               //remove old second teacher too
                               this_OldSecondTeacher = teacher.findOne({ '_id': secondTeacherId })
                                .deepPopulate('subjects')
                                .exec(function (err, this_OldSecondTeacher) {
                                if (!err){      
                                    console.log(JSON.stringify(this_OldSecondTeacher)); this_OldSecondTeacher.subjects.pull(oldSubject);
                                    this_OldSecondTeacher.save(function(err, this_OldSecondTeacher) {
                                    if (err) return console.error(err);
                                    console.log("Subject removed from old second teacher");
                                    //res.send("Done");
                                    });
                                    //process.exit();
                                    } else {throw err;}
                                });
                           }
                        
                    }
                }); 
            //process.exit();
            } else {throw err;}
            });
        
       if(thisBatch.subjectTeachers.length > 0){
           
           this_Batch = batch.findOne({ '_id': thisBatch.batchId },function (err, this_Batch) {
            if (err) return handleError(err);
            //find subject with same globalSubjectId
            thisBatch.subjectTeachers.forEach(function(thisSubject, subjectIndex){
                
            var globalSubjectId = thisSubject.subject._id;
            var teacherId = thisSubject.teacher;
            var secondTeacherId = thisSubject.secondTeacher || '';
                
             
            this_Subject = subject.findOne({ '_globalSubject': globalSubjectId, '_batch': this_Batch._id },function (err, this_Subject) {
            if (err) return handleError(err);
                
            if(this_Subject != null){
                var existingTeacherId = this_Subject._teacher;
                var existingSecondTeacherId = this_Subject._secondTeacher;
               //subject exists
               if(existingTeacherId == teacherId){
                   //first teacher is the same   
                   this_Batch.subjects.addToSet(this_Subject);
                   this_Batch.save(function(err, this_Batch) {
                        if (err) return console.error(err);
                    });
               }else{
                   //first teacher has changed
                   
                   //remove the subject from old teacher
                   this_Teacher = teacher.findOne({ '_id': existingTeacherId })
                    .deepPopulate('subjects')
                    .exec(function (err, this_Teacher) {
                    if (!err){ 
                        console.log(JSON.stringify(this_Teacher)); this_Teacher.subjects.pull(this_Subject);
                        this_Teacher.save(function(err, this_Teacher) {
                        if (err) return console.error(err);
                        console.log("Subject removed from old teacher");
                        //res.send("Done");
                    });
                    //process.exit();
                    } else {throw err;}
                    });
                   
                   console.log("Teacher needs to be updated" + teacherId + " " + existingTeacherId);
                   this_Subject._teacher = teacherId;
                   
                   this_Subject.save(function(err, this_Subject) {
                        if (err) return console.error(err);
                        console.log("Teacher updated ");
                        //res.send("Done");
                        
                       //save subject to new teacher
                        this_Teacher = teacher.findOne({ '_id': teacherId},function (err, this_Teacher) {
                            if (err) return handleError(err);
                            this_Teacher.subjects.addToSet(this_Subject);
                            this_Teacher.save(function(err, this_Teacher) {
                            if (err) return console.error(err);
                                console.log("Subject saved for teacher " + this_Teacher.basic.firstName);
                            });
                        });
                    });
                    this_Batch.subjects.addToSet(this_Subject);
                    this_Batch.save(function(err, this_Batch) {
                        if (err) return console.error(err);
                    });
                    
                       
                   
               } 
            
                
                //check for second teacher
                if(existingSecondTeacherId != secondTeacherId){
                    //second teacher is not the same       
                   if(secondTeacherId != ''){
                       
                       //if old teacher exists, remove
                       if(existingSecondTeacherId != '' && existingSecondTeacherId != null){
                           //remove subject from old subject teacher
                           console.log("Old second teacher is " + existingSecondTeacherId);
                           this_OldSecondTeacher = teacher.findOne({ '_id': existingSecondTeacherId })
                            .deepPopulate('subjects')
                            .exec(function (err, this_OldSecondTeacher) {
                            if (!err){      
                                console.log(JSON.stringify(this_OldSecondTeacher));
                                this_OldSecondTeacher.subjects.pull(this_Subject);
                                this_OldSecondTeacher.save(function(err, this_OldSecondTeacher) {
                                if (err) return console.error(err);
                                console.log("Subject removed from old second teacher");
                                //res.send("Done");
                            });
                            //process.exit();
                            } else {throw err;}
                            });
                       }
                       
                       console.log("Need to save, Second Teacher Id is: " + secondTeacherId);
                       this_Subject._secondTeacher = secondTeacherId;

                       this_Subject.save(function(err, this_Subject) {
                        if (err) return console.error(err);
                        console.log("Second Teacher updated ");
                        //res.send("Done");
                        });
                        
                       //save new second teacher
                       this_NewSecondTeacher = teacher.findOne({ '_id': secondTeacherId},function (err, this_NewSecondTeacher) {
                            if (err) return handleError(err);
                            this_NewSecondTeacher.subjects.addToSet(this_Subject);
                            this_NewSecondTeacher.save(function(err, this_NewSecondTeacher) {
                            if (err) return console.error(err);
                                console.log("Subject saved for new second teacher " + this_NewSecondTeacher.basic.firstName);
                            });

                        });

                       


                   }else{
                       //no new second teacher set
                       //remove subject from old second teacher if they exist
                       this_Subject._secondTeacher = null;

                       this_Subject.save(function(err, this_Subject) {
                        if (err) return console.error(err);
                        

                        if(existingSecondTeacherId != '' && existingSecondTeacherId != null){
                           //remove subject from old subject teacher
                           this_OldSecondTeacher = teacher.findOne({ '_id': existingSecondTeacherId })
                            .deepPopulate('subjects')
                            .exec(function (err, this_OldSecondTeacher) {
                            if (!err){      
                                console.log(JSON.stringify(this_OldSecondTeacher)); this_OldSecondTeacher.subjects.pull(this_Subject);
                                this_OldSecondTeacher.save(function(err, this_OldSecondTeacher) {
                                if (err) return console.error(err);
                                console.log("Subject" + this_Subject.name + " removed from old second teacher");
                                //res.send("Done");
                            });
                            //process.exit();
                            } else {throw err;}
                            });
                        }
                        //res.send("Done");
                    });
                   }
                       
               }
                
                  
            }else{
                
                this_subject = new subject({
                    _batch:this_Batch,
                    _teacher: teacherId,
                    _globalSubject: globalSubjectId,
                    _exams: []
                });
                if(secondTeacherId != ''){
                    this_subject._secondTeacher = secondTeacherId;
                }
                
                this_subject.save(function(err, this_subject) {
                    if (err) return console.error(err);
                    console.log("New Subject has been saved");
                   
                    this_Teacher = teacher.findOne({ '_id': teacherId},function (err, this_Teacher) {
                        if (err) return handleError(err);
                        this_Teacher.subjects.addToSet(this_subject);
                        this_Teacher.save(function(err, this_Teacher) {
                        if (err) return console.error(err);
                            console.log("Subject saved for teacher " + this_Teacher.basic.firstName);
                        });
                        
                    });
                    
                    if(secondTeacherId != ''){
                        this_SecondTeacher = teacher.findOne({ '_id': secondTeacherId},function (err, this_SecondTeacher) {
                            if (err) return handleError(err);
                            this_SecondTeacher.subjects.addToSet(this_subject);
                            this_SecondTeacher.save(function(err, this_SecondTeacher) {
                            if (err) return console.error(err);
                                console.log("Subject saved for teacher " + this_SecondTeacher.basic.firstName);
                            });
                        });
                    }
                    this_Batch.subjects.addToSet(this_subject);
                    this_Batch.save(function(err, this_Batch) {
                        if (err) return console.error(err);
                    });
                });
                
                
            }
               

            });

            });
                
                
                
            });
        } 
        
       
    });
    res.send("Done");
});

router.post('/bulksave', function(req, res) {
    //console.log(JSON.stringify(req.body));
    var batches = req.body.batches;
    var addinstitute = req.body.institute;
    //console.log(JSON.stringify(batches));
    //console.log(JSON.stringify(thisInstitute));
    
    batches.forEach(function(thisBatch, index){
        console.log(" Current Batch is "+ index + JSON.stringify(thisBatch));
        
        thisInstitute = institute.findOne({ '_id': addinstitute },function (err, thisInstitute) {
            if (err) return handleError(err);
            console.log(Object.keys(thisBatch).length + JSON.stringify(thisBatch));

            var this_batch = new batch({
                _institute: addinstitute,
                name: thisBatch.name,
                grade: thisBatch.grade,
                section: thisBatch.section
            });
            
            this_batch.save(function(err, this_batch) {
                if (err) return console.error(err);
                console.log("Saved batch with id: " + this_batch._id);
                //save teacher in the institute data
                thisInstitute.batches.addToSet(this_batch);
                thisInstitute.save(function(err, thisInstitute) {
                    if (err) return console.error(err);
                });
            });
        });
    });
    res.send("Done");
});



//to get all teachers
router.get('/', function(req, res) {
    batch.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular teacher with _id teacherId
router.get('/edit/:batchId', function(req, res) {
    var batchId = req.params.batchId;
    console.log("Batch id is: " + batchId);
    batch
        .findOne({ '_id': batchId })
        .deepPopulate('batchTeacher subjects subjects._globalSubject students subjects._teacher')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The teacher name is: ' + JSON.stringify(teacher.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.post('/getAttendance', function(req, res) {
    var batchId = req.body.batchId;
    var thisDate = req.body.day;
    var instituteId = req.body.instituteId;
    
    var thisInstitute = institute.findOne({ '_id': instituteId },{calendar:1},function (err, thisInstitute) {
        if (err) return handleError(err);
        var thisDay = day.findOne({ _calendar: thisInstitute.calendar, date: thisDate },function (err, thisDay) {
        if (err) return handleError(err);
            
            var dayAttendance = thisDay._attendance;
            present.forEach(function(thisStudent, index){
                dayAttendance.present.addToSet(thisStudent);
                dayAttendance.absent.pull(thisStudent);
            });
            absent.forEach(function(thisStudent, index){
                dayAttendance.absent.addToSet(thisStudent);
                dayAttendance.present.pull(thisStudent);
            });
            //res.json(thisDay);
            thisDay.date = Moment(thisDay.date);
            
            thisDay.save(function(err, thisDay) {
                if (err) return console.error(err);
            });
            console.log(thisDay);
        });
        
        
    });
    
});

router.post('/markAttendance', function(req, res) {
    var batchId = req.body.batchId;
    var thisDate = req.body.day;
    var instituteId = req.body.instituteId;
    var present = req.body.present;
    var absent = req.body.absent;
    
    var thisInstitute = institute.findOne({ '_id': instituteId },{calendar:1},function (err, thisInstitute) {
        if (err) return handleError(err);
        //console.log("Calendar is: " + thisInstitute.calendar);
        
        var thisDay = day.findOne({ _calendar: thisInstitute.calendar, date: thisDate },function (err, thisDay) {
        if (err) return handleError(err);
            
            var dayAttendance = thisDay._attendance;
            present.forEach(function(thisStudent, index){
                dayAttendance.present.addToSet(thisStudent);
                dayAttendance.absent.pull(thisStudent);
            });
            absent.forEach(function(thisStudent, index){
                dayAttendance.absent.addToSet(thisStudent);
                dayAttendance.present.pull(thisStudent);
            });
            //res.json(thisDay);
            thisDay.date = Moment(thisDay.date);
            
            thisDay.save(function(err, thisDay) {
                if (err) return console.error(err);
                //push notification with scope of batch
                console.log("Date is: " + thisDate);
                var notificationType = "Attendance";
                var notificationtText = "Attendance marked";
                
                var thisNotification = notification.findOne({ '_batch': batchId, 'forDate': thisDate, type: notificationType },function (err, thisNotification) {
                    if (err) return handleError(err);
                    if(thisNotification){
                        console.log("Notification exists!");
                        thisNotification.notificationtText = notificationtText;
                        thisNotification.save(function(err, thisNotification) {
                            if (err) return console.error(err);
                            console.log("Notification saved!");
                        });
                    }else{
                        var thisNotification = new notification({
                            _batch: batchId,
                            forDate: thisDate,
                            type : notificationType,
                            text : notificationtText
                        });
                        thisNotification.save(function(err, thisNotification) {
                            if (err) return console.error(err);
                            console.log("Notification saved!");
                        });
                    }
                });
                
                
            });
            console.log(thisDay);
        });
        
        
    });
    res.send("Done");
});

router.get('/calendar/:batchId', function(req, res) {
    var batchId = req.params.batchId;
    console.log("Batch id is: " + batchId);
    var thisBatch = batch
        .findOne({ '_id': batchId },{_institute:1, students:1})
        .deepPopulate('_institute.calendar.days')
        .exec(function (err, thisBatch) {
        if (!err){ 
            var thiscalendarDays = thisBatch._institute.calendar.days;
            //console.log(JSON.stringify(thiscalendar));

            //thisBatch.calendar = thiscalendar;
            //console.log(JSON.stringify(thisBatch));
            res.json(thiscalendarDays);
            //process.exit();
        } else {throw err;}
    });
});


router.get('/attendance/:batchId', function(req, res) {
    var batchId = req.params.batchId;
    console.log("Batch Attendance is " + batchId);
    var batchAttendance = {
                marked: [],
                unmarked:[],
                holiday:[]
    };
    var thisBatch = batch
        .findOne({ '_id': batchId }, {_institute:1,students:1})
        .deepPopulate('_institute _institute.calendar.days')
        .exec(function (err, thisBatch) {
        if (!err){
            //var thisBatch = thisBatch._id;
            var days = thisBatch._institute.calendar.days;
            
            
            days.forEach(function(thisDay, dayIndex){
                var dayMarked = 0;
                var attendance = thisDay._attendance;
                var present = attendance.present;
                var absent = attendance.absent;
                if(thisDay.academicHoliday == true){
                    batchAttendance.holiday.push(thisDay.date);
                }else{
                   thisBatch.students.forEach(function(studentId, studentIndex){
                        if(present.indexOf(studentId)>=0){

                           dayMarked = 1; 
                        }
                        if(absent.indexOf(studentId)>=0){
                           dayMarked = 1; 
                        }
                    });
                    if(dayMarked == 1){
                        batchAttendance.marked.push(thisDay.date);
                        
                    }else{
                        batchAttendance.unmarked.push(thisDay.date);
                    }
                }
            });
            res.json(batchAttendance);
            //console.log(JSON.stringify(batchAttendance));
        }
    });
    
    
    
});

module.exports = router;