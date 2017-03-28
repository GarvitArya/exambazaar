var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var user = require('../app/models/user');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');
var targetStudyProvider = require('../app/models/targetStudyProvider');
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
    var mobileNumber = thisUser.contact.mobile;
    console.log("User is: " + JSON.stringify(thisUser));
    var existingUser = user.findOne({ 'mobile': mobileNumber },function (err, existingUser) {
        var hash = bcrypt.hashSync(thisUser.password, bcrypt.genSaltSync(10));
        var this_user = new user({
            userType : thisUser.userType,
            password : hash,
            basic: {
                name: thisUser.basic.name,
                gender: thisUser.basic.gender,
                dob: thisUser.basic.dob,
            },
            mobile: thisUser.contact.mobile,
            email: thisUser.contact.email,
            verified: thisUser.verified
        });
        this_user.save(function(err, this_user) {
            if (err) return console.error(err);
            res.json(this_user);
        });
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

router.post('/addPic', function(req, res) {
    var newPicForm = req.body;
    var userId = newPicForm.userId;
    var image = newPicForm.image;
    
    console.log("New Pic Form is: " + JSON.stringify(newPicForm));
    
    var existingUser = user.findOne({ '_id': userId },{image:1},function (err, existingUser) {
        if(image){
            existingUser.image = image;
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser._id);
            });
        }
    });
});


router.post('/shortlistInstitute', function(req, res) {
    var shortListForm = req.body;
    var userId = shortListForm.userId;
    var instituteId = shortListForm.instituteId;
    
    console.log("Shortlist Form is: " + JSON.stringify(shortListForm));
    
    var existingUser = user.findOne({ '_id': userId },{shortlisted:1},function (err, existingUser) {
        
        var shortListedInstitutes = existingUser.shortlisted.map(function(a) {return a._id;});
        //ABC
        var thisInstitute = targetStudyProvider
            .findOne({'_id': instituteId},{interested: 1})
            /*.deepPopulate('exams exams.stream location faculty.exams ebNote.user')*/
            .exec(function (err, thisInstitute) {
            if (!err){
                console.log(thisInstitute);
                var interested = thisInstitute.interested;
                if(interested.length > 0){
                    var interestedIds = interested.map(function(a) {return a.user;});
                }else{
                    var interestedIds = [];
                }
                
                
                var interestIndex = interestedIds.indexOf(userId.toString());
                if(interestIndex == -1){
                    var newInterest ={
                        user: userId
                    };
                    interested.push(newInterest);
                    thisInstitute.interested = interested;
                    thisInstitute.save(function(err, thisInstitute) {
                        if (err) return console.error(err);
                        console.log("Interest added to this institute " + thisInstitute._id);
                    });
                }else{
                    //if interest was inactive. make it active
                }
            }
                
            }); 
        
        
        if(shortListedInstitutes.indexOf(instituteId) == -1){
            existingUser.shortlisted.push(instituteId);
            console.log('Shortlisting institute ' + instituteId + ' for ' + userId);
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser._id);
            });
        }
        
    });
});

router.get('/userexists/:mobile', function(req, res) {
    var mobile = req.params.mobile;
    var thisUser = user
        .findOne({ 'mobile': mobile },{name:1})
        .exec(function (err, thisUser) {
        if (!err){
            if(!thisUser){
                console.log('User with mobile ' + mobile + ' does not exist');
                res.send(false);
            }else{
                console.log('User with mobile ' + mobile + ' already exists!');
                res.send(true);
            }
            
            
        } else {throw err;}
    });
    
});

router.get('/markLogin/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{logins:1})
        .exec(function (err, thisUser) {
        if (!err){
            var loginTime = moment().toDate();
            if(!thisUser.logins){
                thisUser.logins =[loginTime];
            }else{
                console.log(thisUser.logins);
                if(thisUser.logins.length == 0){
                    thisUser.logins =[loginTime];
                    //thisUser.logins.push(loginTime);
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
        .findOne({ '_id': userId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
//to get a particular user with _id userId
router.get('/editBasic/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    console.log("User is " + userId);
    user
        .findOne({ '_id': userId },{basic:1})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
router.get('/editFilled/:userId', function(req, res) {
    var userId = req.params.userId;
    console.log('Finding Filled Institutes for: ' + userId);
    if(userId == 'all'){
        var usersavedCIs = cisaved
            .find({},{institute:1,user:1, _date: 1})
            .deepPopulate('institute user')
            .exec(function (err, usersavedCIs) {
            if (!err){
                console.log(usersavedCIs);
                var usersavedCIsBasic = [];
                var counter = 0;
                var nLength = usersavedCIs.length;
                usersavedCIs.forEach(function(thissave, saveindex){
                    var newusersavedCI = {
                        user: userId,
                        userName: thissave.user.basic.name,
                        institute: thissave.institute._id,
                        name: thissave.institute.name,
                        address: thissave.institute.address,
                        city: thissave.institute.city,
                        pincode: thissave.institute.pincode,
                        _date: thissave._date
                    }
                    //console.log(newcisavedUser);
                    counter = counter + 1;
                    usersavedCIsBasic.push(newusersavedCI);
                    if(counter == nLength){
                        res.json(usersavedCIsBasic);
                    }

                });
                if(nLength==0){
                    res.json([]);
                }


            } else {throw err;}
        });
    }else{
        var usersavedCIs = cisaved
            .find({'user': userId},{institute:1,user:1, _date: 1})
            .deepPopulate('institute user')
            .exec(function (err, usersavedCIs) {
            if (!err){
                console.log(usersavedCIs);
                var usersavedCIsBasic = [];
                var counter = 0;
                var nLength = usersavedCIs.length;
                usersavedCIs.forEach(function(thissave, saveindex){
                    var newusersavedCI = {
                        user: userId,
                        userName: thissave.user.basic.name,
                        institute: thissave.institute._id,
                        name: thissave.institute.name,
                        address: thissave.institute.address,
                        city: thissave.institute.city,
                        pincode: thissave.institute.pincode,
                        _date: thissave._date
                    }
                    //console.log(newcisavedUser);
                    counter = counter + 1;
                    usersavedCIsBasic.push(newusersavedCI);
                    if(counter == nLength){
                        res.json(usersavedCIsBasic);
                    }

                });
                if(nLength==0){
                    res.json([]);
                }


            } else {throw err;}
        });
        
    }
    
    
    
});

router.get('/editShortlist/:userId', function(req, res) {
    var userId = req.params.userId;
    user
        .findOne({ '_id': userId },{shortlisted:1})
        .deepPopulate('shortlisted._id')
        .exec(function (err, docs) {
        if (!err){ 
            var shortlisted = docs.shortlisted;
            var shortlistedIds = shortlisted.map(function(a) {return a._id;});
            //console.log('Shortlisted are: ' + JSON.stringify(shortlistedIds));
            var basicShortlisted = [];
            var counter = 0;
            var nShortlisted = shortlistedIds.length;
            //console.log('No of shortlists: ' + nShortlisted);
            shortlistedIds.forEach(function(instituteId, index){
                
                var thisInstitute = targetStudyProvider
                .findOne({'_id': instituteId},{name:1, website: 1, address:1, city:1, state:1, logo:1})
                /*.deepPopulate('exams exams.stream location faculty.exams ebNote.user')*/
                .exec(function (err, thisInstitute) {
                if (!err){
                    //console.log('on ' + shortlisted[index]._date);
                    var basicInstitute = {
                        _id: thisInstitute._id,
                        name:thisInstitute.name, 
                        website: thisInstitute.website, 
                        location:thisInstitute.location, 
                        pincode:thisInstitute.pincode, 
                        address:thisInstitute.address, 
                        city:thisInstitute.city, 
                        state:thisInstitute.state, 
                        _date:shortlisted[index]._date, 
                        logo:thisInstitute.logo
                    };
                    
                    basicShortlisted.push(basicInstitute);
                    counter = counter + 1;
                    if(counter == nShortlisted){
                        
                        res.json(basicShortlisted);
                    }
                    } else {throw err;}
                });
            });
            
            //res.json(basicShortlisted);
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