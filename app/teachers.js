var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var teacher = require('../app/models/teacher');
var address = require('../app/models/address');
var batch = require('../app/models/batch');
var user = require('../app/models/user');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');
//to add a teacher
router.post('/save', function(req, res) {
    var thisTeacher = req.body;
    var thisInstitute = req.body.institute.data;
    console.log(thisTeacher._id);
    
    if(thisTeacher._id){
        console.log("Yes teacher exists")
    }
    thisInstitute = institute.findOne({ '_id': thisInstitute._id },function (err, thisInstitute) {
        if (err) return handleError(err);
        var thisAddress = new address({
            street:thisTeacher.address.street,
            city:thisTeacher.address.city,
            pincode:thisTeacher.address.pincode,
            tel:thisTeacher.address.tel
        });
        //console.log(thisTeacher.basic.salutation);
        var this_teacher = new teacher({
            _institute: thisInstitute,
            basic: {
                salutation: thisTeacher.basic.salutation,
                firstName: thisTeacher.basic.firstName,
                lastName: thisTeacher.basic.lastName,
                middleName: thisTeacher.basic.middleName,
                gender: thisTeacher.basic.gender,
                dob: thisTeacher.basic.dob,
            },
            /*teaching: { 
                primarySubject:thisTeacher.teaching.primarySubject
            },*/
            contact: {
            mobile: thisTeacher.contact.mobile,
            email: thisTeacher.contact.email
            },
            address: thisAddress
        });
        /*if(typeof(thisTeacher.account.imageUrl!='undefined')){
            thisTeacher.account = {
                imageUrl:thisTeacher.account.imageUrl
            }
        }*/
        this_teacher.save(function(err, this_teacher) {
            if (err) return console.error(err);
            console.log("Saved teacher with id: " + this_teacher._id);
            //save teacher in the institute data
            thisInstitute.teachers.push(this_teacher);
            thisInstitute.save(function(err, thisInstitute) {
                if (err) return console.error(err);
            });
            
            var hash = bcrypt.hashSync(thisTeacher.basic.lastName, bcrypt.genSaltSync(10));
            /*var existingUser = user.findOne({ 'mobile': mobileNumber },function (err, existingUser) {
                if (err) {
                    //mobile does not exist
                    
                }else{
                    //mobile does exist
                    
                }
            });*/
            
            var this_user = new user({
                userType : 'Teacher',
                firstName : thisTeacher.basic.firstName,
                //userName : thisTeacher.contact.mobile+"_"+thisTeacher.basic.firstName,
                mobile : thisTeacher.contact.mobile,
                password : hash,
                _teacher : this_teacher._id,
                _institute: thisInstitute
            });
            this_user.save(function(err, this_user) {
                if (err) return console.error(err);
                console.log("User teacher with id: " + this_user._id);
            });
            
            //save reference to institute
            res.json(this_teacher._id);
        });
    });
});


router.post('/bulksave', function(req, res) {
    //console.log(JSON.stringify(req.body));
    var teachers = req.body.teachers;
    var addinstitute = req.body.institute;
    console.log(JSON.stringify(teachers));
    //console.log(JSON.stringify(thisInstitute));
    var i = 0;
    //for (var key in teachers){
    teachers.forEach(function(thisTeacher, index){
        
        //var thisTeacher = teachers[key];
        console.log(" Current Teacher is "+ index + JSON.stringify(thisTeacher));
        console.log(thisTeacher.contact.mobile);
        
        thisInstitute = institute.findOne({ '_id': addinstitute },function (err, thisInstitute) {
            if (err) return handleError(err);
            console.log(Object.keys(thisTeacher).length + JSON.stringify(thisTeacher));
            var names = [];
            names = thisTeacher.basic.name.split(" ");
            if(names[0] == "Mr." || names[0] == "Mr" || names[0] == "Ms." || names[0] == "Ms" || names[0] == "Miss" || names[0] == "Mrs." || names[0] == "Mrs"){
                thisTeacher.basic.salutation = names[0]; 
                thisTeacher.basic.firstName = names[1];
                thisTeacher.basic.lastName = names[names.length-1];
                if(names.length > 3){
                    thisTeacher.basic.middleName = "";
                    for (var i = 2; i < names.length-1; i++){
                        thisTeacher.basic.middleName += names[i] + " ";
                    }
                }
            }else{
                thisTeacher.basic.firstName = names[0];
                thisTeacher.basic.lastName = names[names.length-1];
                if(names.length > 2){
                    thisTeacher.basic.middleName = "";
                    for (var i = 1; i < names.length-1; i++){
                        thisTeacher.basic.middleName += names[i] + " ";
                    }
                }
            }
            
            
            
            var thisAddress = new address({
                street:thisTeacher.address
            });
            var this_teacher = new teacher({
                _institute: addinstitute,
                basic: {
                    salutation: thisTeacher.basic.salutation,
                    firstName: thisTeacher.basic.firstName,
                    lastName: thisTeacher.basic.lastName,
                    middleName: thisTeacher.basic.middleName,
                    gender: thisTeacher.basic.gender,
                    dob: thisTeacher.basic.dob,
                },
                /*teaching: { 
                    primarySubject:thisTeacher.teaching.primarySubject
                },*/
                contact: {
                    mobile: thisTeacher.contact.mobile,
                    email: thisTeacher.contact.email
                },
                address: thisAddress
            });
            
            this_teacher.save(function(err, this_teacher) {
                if (err) return console.error(err);
                console.log("Saved teacher with id: " + this_teacher._id);
                //save teacher in the institute data
               
               
                var hash = bcrypt.hashSync(thisTeacher.basic.lastName, bcrypt.genSaltSync(10));
                    var this_user = new user({
                        userType : 'Teacher',
                        firstName : thisTeacher.basic.firstName,
                        //userName : thisTeacher.contact.mobile+"_"+thisTeacher.basic.firstName,
                        mobile : thisTeacher.contact.mobile,
                        password : hash,
                        _teacher : this_teacher._id,
                        _institute: addinstitute
                    });
                    this_user.save(function(err, this_user) {
                        if (err) return console.error(err);
                        console.log("User teacher with id: " + this_user._id);
                    }); 
                thisInstitute.teachers.addToSet(this_teacher);
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
    teacher.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/count', function(req, res) {
    teacher.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular teacher with _id teacherId
router.get('/edit/:teacherId', function(req, res) {
    var teacherId = req.params.teacherId;
    console.log("Teacher id is: " + teacherId);
    teacher
        .findOne({ '_id': teacherId })
        .deepPopulate('batches batches.students _institute subjects subjects._batch subjects._globalSubject subjects._batch.students')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The teacher name is: ' + JSON.stringify(teacher.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/editBasic/:teacherId', function(req, res) {
    var teacherId = req.params.teacherId;
    console.log("Teacher id is: " + teacherId);
    teacher
        .findOne({ '_id': teacherId },{basic:1, imageUrl:1, batches:1, subjects:1})
        .deepPopulate('batches subjects subjects._globalSubject subjects._batch.basic')
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/invalidTeachers', function(req, res) {
    var invalidTeachers = [];
    var invalidTeacherCount = 0;
    var teachers = teacher.find({},function (err, teachers) {
        if (err) return handleError(err);
        console.log("Teacher is: " + JSON.stringify(teachers));
        teachers.forEach(function(thisTeacher, teacherIndex){
            var instituteExists = institute.findOne({_id: thisTeacher._institute}, function(err, result) {
                if (err) return console.error(err);

                if (result) {
                    // we have a result
                } else {
                    // no student exists 
                    invalidTeacherCount++;
                    console.log("Invalid Teacher Count is: " + invalidTeacherCount);
                    console.log(thisTeacher._id + " "+ thisTeacher._institute);
                    
                    thisTeacher.remove(function(err) {
                        if (err) {
                            res.statusCode = 403;
                            res.send(err);
                        } else {
                            console.log("Teacher deleted");
                            //res.send({});
                        }
                    }); 
                }
        });
        });
    });
    res.send("Done");
});



module.exports = router;