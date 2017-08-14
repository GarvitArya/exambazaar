var express = require('express');
var router = express.Router();
var Moment = require('moment');

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var student = require('../app/models/student');
var address = require('../app/models/address');
var batch = require('../app/models/batch');
var day = require('../app/models/day');
var calendar = require('../app/models/calendar');
var installment = require('../app/models/installment');
var feeStructure = require('../app/models/feeStructure');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an Institute
router.post('/save', function(req, res) {
    var thisInstitute = req.body;
    //console.log("Hello: " + JSON.stringify(thisInstitute));
    var thisAddress = new address({
        street:thisInstitute.address.street,
        city:thisInstitute.address.city,
        pincode:thisInstitute.address.pincode,
        tel:thisInstitute.address.tel
    });
    
    var this_institute = new institute({
        basic: {
            type: thisInstitute.type,
            affiliation: thisInstitute.affiliation,
            name: thisInstitute.name,
            website: thisInstitute.website,
            email: thisInstitute.email,
            about: thisInstitute.about
        },
        address: thisAddress
    });
    this_institute.save(function(err, this_institute) {
        if (err) return console.error(err);
        console.log("Institue id: " + this_institute._id);   
        /*var this_batch = new batch({
            _institute: this_institute._id,
            name: '1A',
            grade: '1',
            section: 'A',
            batchTeacher: 'Sangeeta Srivastava'
        });
        this_batch.save(function(err,this_batch){
            if (err) return console.error(err);
            console.log(this_batch._id);
            this_institute.batches.push(this_batch);
            this_institute.save(function(err, this_institute) {
                if (err) return console.error(err);
            });
        });
        console.log("Saved batch!");*/
        res.json(this_institute.id);
    }); 
});

//to get all institutes
router.get('/', function(req, res) {
    institute.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
        //process.exit();
    } else {throw err;}
    });
});
//to get a particular institute with _id instituteId
router.get('/edit/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    console.log("Institute id is: " + instituteId);
    institute
        .findOne({ '_id': instituteId })
        .deepPopulate('batches batches.batchTeacher batches.subjects._teacher.basic batches.subjects._secondTeacher.basic teachers teachers.subjects teachers.subjects._globalSubject teachers.subjects._batch.name students students.batch students.parents batches.subjects transportVehicles admins calendar calendar.days batches.subjects._globalSubject') 
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The institute name is: ' + JSON.stringify(institute.batches));
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

//to get a particular institute with _id instituteId
router.get('/editBatch/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    console.log("Institute id is: " + instituteId);
    institute
        .findOne({ '_id': instituteId }, {batches:1, basic: 1})
        .deepPopulate('batches batches.batchTeacher.basic batches.subjects._globalSubject batches.subjects._teacher.basic batches.subjects._secondTeacher.basic')
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

//to get a particular institute with _id instituteId
router.get('/batchNames/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    //console.log("Institute id is: " + instituteId);
    var batches = institute
        .findOne({ '_id': instituteId }, {batches:1})
        .deepPopulate('batches.name')
        .exec(function (err, batches) {
        if (!err){
            batches = batches.batches;
            var batchNames =[];
            var batchList = {};
            batches.forEach(function(thisBatch, batchIndex){
                //console.log(batchList[thisBatch.grade]);
                if(batchList[thisBatch.grade] != undefined){
                    //console.log("If");
                    batchList[thisBatch.grade].push(thisBatch.name);
                }else{
                    //console.log("Else");
                    batchList[thisBatch.grade] = [];
                     batchList[thisBatch.grade].push(thisBatch.name);
                }
                
                    
                var gradeBatch = {
                    name: thisBatch.name,
                    grade: thisBatch.grade
                }
                batchNames.push(gradeBatch);
            });
            console.log(JSON.stringify(batchList));
            
            res.json(batchNames);
        } else {throw err;}
    });
    
});

router.get('/editTeacher/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    console.log("Institute id is: " + instituteId);
    institute
        .findOne({ '_id': instituteId }, {teachers:1, basic: 1})
        .deepPopulate('teachers teachers.subjects teachers.subjects._globalSubject teachers.subjects._batch.name teachers.subjects._batch.grade')
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/editStudent/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    console.log("Institute id is: " + instituteId);
    institute
        .findOne({ '_id': instituteId }, {students:1, basic: 1})
        .deepPopulate('students students.batch students.parents')
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});
/*router.post('/edit/feeStructure/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    console.log("Institute id is: " + instituteId);
    
});*/

//to get all institutes
router.post('/save/feeStructure', function(req, res) {
    var feeStructureReq = req.body;
    var instituteId = req.body.instituteId;
    var instituteFeeItems = [];
    
    if(typeof(Object.keys(feeStructureReq.instituteFeeItems) != 'undefined')){
        for(var key in feeStructureReq.instituteFeeItems){
            
           console.log("------------"+feeStructureReq.instituteFeeItems[key]); if(feeStructureReq.instituteFeeItems[key]==true){
                instituteFeeItems.push(key);
               
            }
        }
        
    };
    console.log(JSON.stringify(instituteFeeItems));
    var installments = req.body.installments;
    
    console.log("Institue id: " + instituteId);
    console.log("Institute Fee items are:" + JSON.stringify(instituteFeeItems));
    console.log("Institute installments are:" + JSON.stringify(installments));
    
    var this_feeStructure = new feeStructure({
        _institute: instituteId,
        feeItems: instituteFeeItems
    });
    
    /*this_batch.save(function(err,this_batch){
            if (err) return console.error(err);
            console.log(this_batch._id);*/
    for (var key in installments) {
        console.log(key, installments[key]);
        var newInstallment = installments[key];
        var this_installment = {
            sNo: newInstallment.sNo,
            type: newInstallment.type,
            name: newInstallment.name,
            dueDate: newInstallment.dueDate
        };
        if(typeof(newInstallment.startDate != 'undefined')){
            this_installment.startDate = newInstallment.startDate;
        };
        this_feeStructure.installments.push(this_installment);
        /*this_feeStructure.save(function(err, this_feeStructure) {
            if (err) return console.error(err);
        });*/
        
    }
    
    institute.update({'_id': instituteId},{
        feeStructure: this_feeStructure
    } ,function(err, docs) {
    if (!err){ 
        console.log("Fee Structure Updated");
        res.send("Done");
    } else {throw err;}
    });
});

router.post('/save/calendar', function(req, res) {
    var thiscalendar = req.body;
    var instituteId = thiscalendar.instituteId;
    var calendarDays = thiscalendar.calendarDays;
    
    
    var instituteCalendar = new calendar({
        _institute: instituteId,
        days: [],
        name: thiscalendar.calendarName
    });
    
    instituteCalendar.save(function(err, instituteCalendar) {
        if (err) return console.error(err);
        institute.update({'_id': instituteId},{
            calendar: instituteCalendar
        } ,function(err, docs) {
        if (!err){
            
            for(var key in calendarDays){
                thisday = calendarDays[key];
                thisday.date = Moment(thisday.date);
                console.log("this day  " + JSON.stringify(thisday.academicHolidayDesc));
                
                var newday = new day({
                    _calendar: instituteCalendar._id,
                    date: thisday.date,
                    academicHoliday: thisday.academicHoliday,
                    academicHolidayDesc: thisday.academicHolidayDesc,
                    eventDay: thisday.eventDay,
                    eventDayDesc: thisday.eventDayDesc
                });
                newday.save(function(err, newday) {
                    if (err) return console.error(err);
                    instituteCalendar.days.addToSet(newday);
                    console.log(instituteCalendar.days.length);
                    instituteCalendar.save(function(err, instituteCalendar) {
                        if (err) return console.error(err);
                    });
                });
                
            };
            
            
            console.log("Instiute Calendar Updated");
            //res.send(instituteCalendar._id);
        } else {throw err;}
        });
        console.log("Institute Calendar saved!");
        res.json(instituteCalendar.id);
    }); 
    
    
});


router.get('/manageInstituteStudents', function(req, res) {
    var institutes = institute.find({},function (err, institutes) {
        if (err) return handleError(err);
        institutes.forEach(function(thisInstitute, index){
            console.log("Institue is " + JSON.stringify(thisInstitute));
            console.log(thisInstitute.basic.name + " " + thisInstitute.students.length + " " + thisInstitute._id);
            
            var students = student.find({_institute: thisInstitute._id},{_id:1},function (err, students) {
                if (err) return handleError(err);
                if(students){
                    console.log(thisInstitute.basic.name + " " + thisInstitute.students.length + " ");
                    thisInstitute.students = students;
                    thisInstitute.save(function(err, thisInstitute) {
                    if (err) return console.error(err);
                    });
                    
                }
                    
                
            });
            
            
        });
    });
});


module.exports = router;