var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
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
    var mobileNumber = thisUser.contact.mobile;
    console.log("User is: " + JSON.stringify(thisUser));
    var existingUser = user.findOne({ 'mobile': mobileNumber },function (err, existingUser) {
        var hash = bcrypt.hashSync(thisUser.password, bcrypt.genSaltSync(10));
        var this_user = new user({
            userType : 'Master',
            password : hash,
            basic: {
                name: thisUser.basic.name,
                gender: thisUser.basic.gender,
                dob: thisUser.basic.dob,
            },
            mobile: thisUser.contact.mobile,
            email: thisUser.contact.email,
        });
        this_user.save(function(err, this_user) {
            if (err) return console.error(err);
            res.json(this_user._id);
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