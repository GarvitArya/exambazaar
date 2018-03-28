var express = require('express');
var router = express.Router();
var request= require('request');
var config = require('../config/mydatabase.js');
var admissionInterest = require('../app/models/admissionInterest');
var user = require('../app/models/user');
var instamojoCredential = require('../app/models/instamojoCredential');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a admissionInterest
router.post('/save', function(req, res) {
    var thisAdmissionInterest = req.body;
    
    var admissionInterestUser = thisAdmissionInterest.user;
    var admissionInterestExam = thisAdmissionInterest.coachingExam;
    var admissionInterestYear = thisAdmissionInterest.year;
    
    var this_admissionInterest = new admissionInterest({
        user: admissionInterestUser,
        coachingExam: admissionInterestExam,
        year: admissionInterestYear,
    });
    for (var property in thisAdmissionInterest) {
        this_admissionInterest[property] = thisAdmissionInterest[property];
    }
    this_admissionInterest.save(function(err, this_admissionInterest) {
        if (err) return console.error(err);
        res.json(this_admissionInterest);
    });
});

router.post('/pbcAdmissionInterest', function(req, res) {
    var thisAdmissionInterest = req.body;
    var admissionInterestCoaching = thisAdmissionInterest.coaching;
    var admissionInterestUser = thisAdmissionInterest.user;
    var payment = thisAdmissionInterest.payment;
    
    var instamojo = instamojoCredential.findOne({}, {},function (err, instamojo) {
        
    var existingUser = user.findOne({ _id: admissionInterestUser}, {mobile:1, email:1, basic: 1},function (err, existingUser) {
        if(existingUser){
            var headers = { 'X-Api-Key': instamojo.xapikey, 'X-Auth-Token': instamojo.xauthtoken}
            var payload = {
              purpose: 'PBC 2018 Bulls Eye AdmissionInterest',
              amount: '300',
              phone: existingUser.mobile,
              buyer_name: existingUser.basic.name,
              //redirect_url: 'http://www.exambazaar.com/pbcAdmissionInterest',
              send_email: false,
              //webhook: 'http://www.exambazaar.com/webhook/instamojo/',
              send_sms: false,
              email: existingUser.email,
              allow_repeated_payments: false
            };
            
            /*https://www.instamojo.com/api/1.1/payment-requests/*/
            request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
              if(!error && response.statusCode == 201){
                console.log(body);
                  
                res.json(JSON.parse(body));  
              }
            });




        }else{
           res.json(null);
        }

    });
    });
});

router.post('/userAdmissionInterest', function(req, res) {
    var thisAdmissionInterest = req.body;
    var admissionInterestCoaching = thisAdmissionInterest.coaching;
    var admissionInterestUser = thisAdmissionInterest.user;
    
    var existingAdmissionInterest = admissionInterest.findOne({ coaching: admissionInterestCoaching, user: admissionInterestUser},function (err, existingAdmissionInterest) {
        if(existingAdmissionInterest){
            res.json(existingAdmissionInterest);
        }else{
           res.json(null);
        }
        
    });
    
});


router.get('/', function(req, res) {
    //console.log('Here');
    admissionInterest.find({active: {$ne: false}}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/all', function(req, res) {
    admissionInterest.find({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/count', function(req, res) {
    admissionInterest.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/edit/:admissionInterestId', function(req, res) {
    var admissionInterestId = req.params.admissionInterestId;
    //console.log("AdmissionInterest is " + admissionInterestId);
    admissionInterest
        .findOne({ '_id': admissionInterestId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/admissionInterest/:admissionInterestName', function(req, res) {
    var admissionInterestName = req.params.admissionInterestName;
    //console.log("AdmissionInterest is " + admissionInterestName);
    admissionInterest
        .findOne({ 'name': admissionInterestName },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.post('/addLogo', function(req, res) {
    var newLogoForm = req.body;
    console.log(newLogoForm);
    var logo = newLogoForm.logo;
    var admissionInterestId = newLogoForm.admissionInterestId;
    var color = newLogoForm.color;
    //console.log('Express received: ' + JSON.stringify(newLogoForm));
    
    var thisAdmissionInterest = admissionInterest
        .findOne({ _id: admissionInterestId }, {logo:1})
        .exec(function (err, thisAdmissionInterest) {
        if (!err){
            
            if(thisAdmissionInterest && color){
                if(color == 'black'){
                    if(!thisAdmissionInterest.logo){
                        thisAdmissionInterest.logo = {};
                    }
                    thisAdmissionInterest.logo.black = logo;
                    thisAdmissionInterest.save(function(err, thisAdmissionInterest) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisAdmissionInterest._id);
                        res.json(thisAdmissionInterest.logo);
                    });
                }else if(color == 'white'){
                    if(!thisAdmissionInterest.logo){
                        thisAdmissionInterest.logo = {};
                    }
                    thisAdmissionInterest.logo.white = logo;
                    thisAdmissionInterest.save(function(err, thisAdmissionInterest) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisAdmissionInterest._id);
                        res.json(thisAdmissionInterest.logo);
                    });
                }else{
                    res.json(false);
                }
                
                
            }else{
                console.log('No such admissionInterest');
                res.json(false);
            }
        } else {throw err;}
    });
    
});

module.exports = router;