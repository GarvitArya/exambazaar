var express = require('express');
var router = express.Router();
var request = require("request");

var config = require('../config/mydatabase.js');
var user = require('../app/models/user');
var otp = require('../app/models/otp');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

var moment = require('moment');
moment().format();
//to add a user
router.post('/generate', function(req, res) {
    var thisOTP = req.body.otp;
    var thisMobile = req.body.mobile;
    var thisUser = req.body._user;
    var thisFirstName = req.body.firstName;
    var thisReason = req.body.reason;
    var generated_time = moment();
    var expiry_time = moment().add(30, 'm');
    //console.log(generated_time.format() + " " + expiry_time.format());
    
    otp.remove({'_user': thisUser}, function(err) {
        if (!err) {}
        else {}
    });
    
    var this_OTP = new otp({
        _user: thisUser,
        mobile: thisMobile,
        otp : thisOTP,
        reason : thisReason,
        generated_time: generated_time,
        expiry_time: expiry_time
    });
    this_OTP.save(function(err, this_OTP) {
        if (err) return console.error(err);
        console.log("OTP " + this_OTP.otp + " created for user " + this_OTP._user);
        //now send sms
        var message = this_OTP.otp + " is the OTP for your user verification. It expires in 30 mins.\nExamBazaar.com";
        
        //console.log(message.length + " " + message);
        var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=Amplifier@9&mobile=";
        url += this_OTP.mobile;
        url += "&message=";
        url += message;
        url += "&sender=EXMBZR&type=3";
        res.json(this_OTP);
        //console.log(url);
        request({
                url: url,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body) // Print the json response
                }
        });
    });
  
});


module.exports = router;