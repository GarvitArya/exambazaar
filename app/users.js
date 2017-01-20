var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var teacher = require('../app/models/teacher');
var student = require('../app/models/student');
var address = require('../app/models/address');
var batch = require('../app/models/batch');
var user = require('../app/models/user');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');

//to add a user
router.post('/save', function(req, res) {
    var thisUser = req.body;
    var thisInstitute = req.body.institute.data;
    var mobileNumber = thisUser.contact.mobile;
    
    //console.log("Mobile number is: " + mobileNumber);
    var existingUser = user.findOne({ 'mobile': mobileNumber },function (err, existingUser) {
        if (err) {
            //mobile does not exist, create a new user
            thisInstitute = institute.findOne({ '_id': thisInstitute._id },function (err, thisInstitute) {
            if (err) return handleError(err);
            var thisAddress = new address({
                street:thisUser.address.street,
                city:thisUser.address.city,
                pincode:thisUser.address.pincode,
                tel:thisUser.address.tel
            });

            var this_user = new user({
                _institute: thisInstitute,
                basic: {
                    salutation: thisUser.basic.salutation,
                    firstName: thisUser.basic.firstName,
                    lastName: thisUser.basic.lastName,
                    middleName: thisUser.basic.middleName,
                    gender: thisUser.basic.gender,
                    dob: thisUser.basic.dob,
                },
                contact: {
                mobile: thisUser.contact.mobile,
                email: thisUser.contact.email
                }
                //address: thisAddress
            });
            this_user.save(function(err, this_user) {
                if (err) return console.error(err);
                //console.log("Saved user with id: " + this_user._id);
                var hash = bcrypt.hashSync(thisUser.basic.lastName, bcrypt.genSaltSync(10));
                var this_user = new user({
                    userType : 'User',
                    firstName : thisUser.basic.firstName,
                    mobile : thisUser.contact.mobile,
                    password : hash,
                    _user : this_user._id,
                    _institute: thisInstitute
                });
                this_user.save(function(err, this_user) {
                    if (err) return console.error(err);
                    //console.log("User user with id: " + this_user._id);
                });
                //save user in the institute data
                thisInstitute.users.push(this_user);
                thisInstitute.save(function(err, thisInstitute) {
                    if (err) return console.error(err);
                });
                //save reference to institute
                res.json(this_user._id);
            });
            });
            //return handleError(err);
        }else{
            console.log("This mobile already exists");
        }
        
    });
});

//to get all users
router.get('/', function(req, res) {
    user.find({}, function(err, docs) {
    if (!err){ 
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/count', function(req, res) {
    user.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/verfiedCount', function(req, res) {
    user.count({verified: true}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get all invalid users
router.get('/invalidusers', function(req, res) {
    var invalidusers = [];
    var allUsers = user.find({},function (err, allUsers) {
        if (err) return handleError(err);
        //console.log(JSON.stringify(allUsers));
        var invalidUserCount = 0;
        allUsers.forEach(function(thisuser, userIndex){
            if(thisuser.userType =='Teacher'){
                var teacherId = thisuser._teacher[0];
                var teacherExists = teacher.findOne({_id: teacherId}, function(err, result) {
                if (err) return console.error(err);

                if (result) {
                    // we have a result
                } else {
                    console.log(thisuser._id + " User teacher does not exist " + thisuser.mobile + " " + thisuser.firstName + " " + thisuser._teacher);
                    invalidUserCount++;
                    console.log("Invalid User count is " + invalidUserCount);
                    thisuser.remove(function(err) {
                        if (err) {
                            res.statusCode = 403;
                            res.send(err);
                        } else {
                            console.log("User deleted");
                            //res.send({});
                        }
                    });
                }
                });
            }
            if(thisuser.userType =='Student'){
                var studentId = thisuser._student[0];
                //console.log(thisuser._id + " " + studentId);
                
                
                var thisstudent = student.findOne({'_id': studentId},{_id:1}, function(err, thisstudent) {
                if (err) return console.error(err);

                    if (thisstudent) {
                        // we have a result
                    } else {
                        //console.log(thisuser._id);
                        
                        
                        invalidUserCount++;
                        console.log("Invalid User count is " + invalidUserCount);
                        thisuser.remove(function(err) {
                            if (err) {
                                res.statusCode = 403;
                                res.send(err);
                            } else {
                                console.log("User deleted");
                                //res.send({});
                            }
                        });
                    }
                });
            }
        });
        res.json(allUsers);
    
});
});

//to get all invalid users
router.get('/mergeUsers', function(req, res) {
    
    var uniqueMobiles = [];
    
    uniqueMobiles = user.distinct("mobile",function (err, uniqueMobiles) {
        if (err) return handleError(err);
        console.log(JSON.stringify(uniqueMobiles));
        uniqueMobiles.forEach(function(thismobile, userIndex){
            var allusers = user.find({ 'mobile': thismobile },function (err, allusers) {
                if (err) return handleError(err);
                if(allusers.length > 1){
                    //if(allusers[0].userType=='Teacher')
                    console.log(thismobile + " " +allusers.length);
                    //set all users to 0th member
                    firstUser = allusers[0];
                    console.log("First User id is: " + firstUser._id);
                    allusers.forEach(function(thisuser, userIndex){
                    if(userIndex!=0){

                    if(allusers[userIndex]._teacher.length > 0)
                    {
                        //console.log(userIndex + " This user is a teacher");
                        allusers[userIndex]._teacher.forEach(function(thisTeacher, teacherIndex){
                            firstUser._teacher.addToSet(thisTeacher);
                            firstUser.save(function(err, firstUser) {
                            if (err) return console.error(err);
                            });
                           
                           var mergedUser = user.findOne({'_id': allusers[userIndex]._id}, function(err, mergedUser) {
                           
                            mergedUser._merged = true;
                            mergedUser.save(function(err, mergedUser) {
                            if (err) return console.error(err);
                            console.log("Merged user is: " +mergedUser._id );
                            });
                               
                           });
                            
                        });
                    }
                    if(allusers[userIndex]._student.length > 0){
                        //console.log(userIndex + " This user is a student");
                        allusers[userIndex]._student.forEach(function(thisStudent, studentIndex){
                        firstUser._student.addToSet(thisStudent);
                        firstUser.save(function(err, firstUser) {
                        if (err) return console.error(err);
                        });
                        
                        var mergedUser = user.findOne({'_id': allusers[userIndex]._id}, function(err, mergedUser) {
                           
                            mergedUser._merged = true;
                            mergedUser.save(function(err, mergedUser) {
                            if (err) return console.error(err);
                            console.log("Merged user is: " +mergedUser._id );
                            });
                               
                           });
                            
                        });
                        }
                    }
                        //console.log(userIndex);
                    });
                }
                
            });
         });
        res.send("Done");
    });
});

router.get('/markLogin/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{logins:1})
        .exec(function (err, thisUser) {
        if (!err){
            var loginTime = moment();
            if(!thisUser.logins){
                thisUser.logins =[loginTime];
            }else{
                if(thisUser.logins.length == 0){
                    thisUser.logins =[loginTime];
                }else{
                    thisUser.logins.push(loginTime);
                }
            }
            
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                console.log('User login at: ' + loginTime);
            });
            res.json("User login added");
            
        } else {throw err;}
    });
    
});

//to get a particular user with _id userId
router.get('/edit/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    console.log("User is " + userId);
    user
        .findOne({ '_id': userId },{_student:1, _teacher:1, _admin:1, _master:1, mobile:1,logins:1})
        .deepPopulate('_student.basic _teacher.basic _master.basic _admin.basic _student.contact _teacher.contact _master.contact _admin.contact')
    //'_student _teacher _master _admin '
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.post('/updatePassword', function(req, res) {
    var userId = req.body.userId;
    var newPassword = req.body.newPassword;
    var hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    console.log(userId + " " +newPassword + " " + hash);
    user.update({_id: userId}, {
        verified: true, 
        password: hash
    }, function(err, docs) {
        if (!err){
        res.json(docs);
        } else {throw err;}
    });
});

module.exports = router;