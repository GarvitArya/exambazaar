var express = require('express');
var router = express.Router();
var request= require('request');
var config = require('../config/mydatabase.js');
var admission = require('../app/models/admission');
var user = require('../app/models/user');
var instamojoCredential = require('../app/models/instamojoCredential');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a admission
router.post('/save', function(req, res) {
    var thisAdmission = req.body;
    var admissionCoaching = thisAdmission.coaching;
    var admissionUser = thisAdmission.user;
    var existingAdmission = admission.findOne({ coaching: admissionCoaching, user: admissionUser},function (err, existingAdmission) {
        if(existingAdmission){
            for (var property in thisAdmission) {
                existingAdmission[property] = thisAdmission[property];
            }
            existingAdmission.save(function(err, existingAdmission) {
                if (err) return console.error(err);
                res.json(existingAdmission);
            });
        }else{
           var this_admission = new admission({
                coaching : admissionCoaching,
                user: admissionUser
            });
            for (var property in thisAdmission) {
                this_admission[property] = thisAdmission[property];
            }
            this_admission.save(function(err, this_admission) {
                if (err) return console.error(err);
                res.json(this_admission);
            }); 
        }
        
    });
});

router.post('/pbcAdmission', function(req, res) {
    var thisAdmission = req.body;
    var admissionCoaching = thisAdmission.coaching;
    var admissionUser = thisAdmission.user;
    var payment = thisAdmission.payment;
    
    var instamojo = instamojoCredential.findOne({}, {},function (err, instamojo) {
        
    var existingUser = user.findOne({ _id: admissionUser}, {mobile:1, email:1, basic: 1},function (err, existingUser) {
        if(existingUser){
            var headers = { 'X-Api-Key': instamojo.xapikey, 'X-Auth-Token': instamojo.xauthtoken}
            var payload = {
              purpose: 'PBC 2018 Bulls Eye Admission',
              amount: '300',
              phone: existingUser.mobile,
              buyer_name: existingUser.basic.name,
              //redirect_url: 'http://www.exambazaar.com/pbcAdmission',
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

router.post('/pbsAdmission', function(req, res) {
    var thisAdmission = req.body;
    var admissionCoaching = thisAdmission.coaching;
    var admissionUser = thisAdmission.user;
    var payment = thisAdmission.payment;
    
    var instamojo = instamojoCredential.findOne({}, {},function (err, instamojo) {
        
    var existingUser = user.findOne({ _id: admissionUser}, {mobile:1, email:1, basic: 1},function (err, existingUser) {
        if(existingUser){
            var headers = { 'X-Api-Key': instamojo.xapikey, 'X-Auth-Token': instamojo.xauthtoken}
            var payload = {
              purpose: 'Bansal Classes Srinagar 2018',
              amount: '500',
              phone: existingUser.mobile,
              buyer_name: existingUser.basic.name,
              //redirect_url: 'http://www.exambazaar.com/pbcAdmission',
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
router.post('/userAdmission', function(req, res) {
    var thisAdmission = req.body;
    var admissionCoaching = thisAdmission.coaching;
    var admissionUser = thisAdmission.user;
    
    var existingAdmission = admission.findOne({ coaching: admissionCoaching, user: admissionUser},function (err, existingAdmission) {
        if(existingAdmission){
            res.json(existingAdmission);
        }else{
           res.json(null);
        }
        
    });
    
});


router.get('/', function(req, res) {
    //console.log('Here');
    admission.find({active: {$ne: false}}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/all', function(req, res) {
    admission.find({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/count', function(req, res) {
    admission.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/edit/:admissionId', function(req, res) {
    var admissionId = req.params.admissionId;
    //console.log("Admission is " + admissionId);
    admission
        .findOne({ '_id': admissionId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/admission/:admissionName', function(req, res) {
    var admissionName = req.params.admissionName;
    //console.log("Admission is " + admissionName);
    admission
        .findOne({ 'name': admissionName },{})
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
    var admissionId = newLogoForm.admissionId;
    var color = newLogoForm.color;
    //console.log('Express received: ' + JSON.stringify(newLogoForm));
    
    var thisAdmission = admission
        .findOne({ _id: admissionId }, {logo:1})
        .exec(function (err, thisAdmission) {
        if (!err){
            
            if(thisAdmission && color){
                if(color == 'black'){
                    if(!thisAdmission.logo){
                        thisAdmission.logo = {};
                    }
                    thisAdmission.logo.black = logo;
                    thisAdmission.save(function(err, thisAdmission) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisAdmission._id);
                        res.json(thisAdmission.logo);
                    });
                }else if(color == 'white'){
                    if(!thisAdmission.logo){
                        thisAdmission.logo = {};
                    }
                    thisAdmission.logo.white = logo;
                    thisAdmission.save(function(err, thisAdmission) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisAdmission._id);
                        res.json(thisAdmission.logo);
                    });
                }else{
                    res.json(false);
                }
                
                
            }else{
                console.log('No such admission');
                res.json(false);
            }
        } else {throw err;}
    });
    
});

module.exports = router;