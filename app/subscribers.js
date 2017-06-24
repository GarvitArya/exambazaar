var express = require('express');
var router = express.Router();
var request = require("request");

var config = require('../config/mydatabase.js');
var subscriber = require('../app/models/subscriber');

var email = require('../app/models/email');
var helper = require('sendgrid').mail;
var sendGridCredential = require('../app/models/sendGridCredential');
var moment = require('moment');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});

mongoose.createConnection(config.url);

mongoose.Promise = require('bluebird');


router.post('/sendReviewInvites', function(req, res) {
    var reviewInviteForm = req.body;
    var userList = reviewInviteForm.userList;
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
        var nLength = userList.length;
        var counter = 0;
        var emailsSent = 0;
        var smssSent = 0;
            
        userList.forEach(function(thisUser, index){
            var subscriberId = thisUser._id;
            var existingSubscriber = subscriber.findOne({ '_id': subscriberId},function (err, existingSubscriber) {
            
            if(existingSubscriber){
                
                    if(thisUser.email){
                    var templateName = 'Review Promotional Email';
                    var fromEmail = {
                        email: 'always@exambazaar.com',
                        name: 'Always Exambazaar'
                    };
                    var to = thisUser.email;
                    var username = '';
                    if(thisUser.name){
                        username = thisUser.name;
                    }

                    var apiKey = existingSendGridCredential.apiKey;
                    var sg = require("sendgrid")(apiKey);
                    var emailTemplate = existingSendGridCredential.emailTemplate;
                    var templateNames = emailTemplate.map(function(a) {return a.name;});
                    var tIndex = templateNames.indexOf(templateName);
                    //console.log(tIndex);
                    if(tIndex != -1){
                        var templateId = emailTemplate[tIndex].templateKey;
                        console.log(templateId);
                        var from_email = new helper.Email(fromEmail);

                        var to_email = new helper.Email(to);
                        var html = ' ';
                        var subject = ' ';
                        var content = new helper.Content('text/html', html);
                        var mail = new helper.Mail(fromEmail, subject, to_email, content);
                        mail.setTemplateId(templateId);
                        mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                        var emailrequest = sg.emptyRequest({
                          method: 'POST',
                          path: '/v3/mail/send',
                          body: mail.toJSON(),
                        });
                        sg.API(emailrequest, function(error, response) {
                            if(error){
                                console.log('Could not send email! ' + error);
                            }else{
                                emailsSent += 1;
                                var currTime = moment().toDate();
                                existingSubscriber.emailSent.push(currTime);
                                existingSubscriber.save(function(err, existingSubscriber) {
                                    if (err) return console.error(err);
                                    console.log(existingSubscriber._id + " updated!");
                                });
                                
                                console.log("Email sent to: " + username + " at "+ to);
                            }
                        });
                    }else{
                        console.log('Could not send email as there is no template with name: ' + templateName);
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }else{
                    console.log('No user email');
                }

                if(thisUser.mobile){
                    console.log("Sending Welcome SMS");
                    var message = "Hi " + thisUser.name + "\nGet 50% off! Review your coaching institute and lock-in discounts on the best-selling exam prep material now. Limited coupons only.\nwww.exambazaar.com";

                    //console.log(message.length + " " + message);
                    var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=Amplifier@9&mobile=";
                    url += thisUser.mobile;
                    url += "&message=";
                    url += message;
                    url += "&sender=EXMBZR&type=3";
                    request({
                            url: url,
                            json: true
                        }, function (error, response, body) {
                            if (!error && response.statusCode === 200) {
                                
                                smssSent += 1;
                                console.log("SMS sent to: " + username + " at "+ thisUser.mobile);
                                var currTime = moment().toDate();
                                existingSubscriber.smsSent.push(currTime);
                                existingSubscriber.save(function(err, existingSubscriber) {
                                    if (err) return console.error(err);
                                    console.log(existingSubscriber._id + " updated!");
                                });
                                
                                
                            }else{
                                console.log(error + " " + response);
                            }
                    });



                }else{
                    console.log("No user mobile set");
                }

                counter += 1;
                if(counter == nLength){
                    console.log("Total Emails sent: " + emailsSent);
                    console.log("Total SMSs sent: " + smssSent);
                    res.json(true);
                }
                
                
            }else{
                counter += 1;
                if(counter == nLength){
                    console.log("Total Emails sent: " + emailsSent);
                    console.log("Total SMSs sent: " + smssSent);
                    res.json(true);
                }
            } 
            
            
            });
                                                        
                
        });
        
        
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
});

router.post('/bulksave', function(req, res) {
    var thisSubscriberList = req.body;
    var nSubscribers = thisSubscriberList.length;
    var counter = 0;
    
    thisSubscriberList.forEach(function(thisSubscriber, sIndex){
        var thisEmail = '';
        if(thisSubscriber.email){
            thisEmail = thisSubscriber.email;
        }

        console.log("Subcriber is: " + JSON.stringify(thisSubscriber));

        var existingSubscriber = subscriber.findOne({ 'email': thisEmail},function (err, existingSubscriber) {
            if (err) return handleError(err);

            if(existingSubscriber){
                for (var property in thisSubscriber) {
                    existingSubscriber[property] = thisSubscriber[property];
                }
                
                existingSubscriber.save(function(err, existingSubscriber) {
                    if (err) return console.error(err);
                    console.log(existingSubscriber._id + " updated!");
                    counter += 1;
                    if(counter == nSubscribers){
                        res.json('Done');
                    }
                    //res.json('Done');
                });
            }else{
                var this_subscriber = new subscriber({});
                for (var property in thisSubscriber) {
                    this_subscriber[property] = thisSubscriber[property];
                }
                this_subscriber.save(function(err, this_subscriber) {
                if (err) return console.error(err);
                    console.log("Subscriber added with id: " + this_subscriber._id);
                    counter += 1;
                    if(counter == nSubscribers){
                        res.json('Done');
                    }
                });
            }
            
            
        });
        
        
    });
    
    
    
});

//to get all subscribers
router.get('/', function(req, res) {
    subscriber.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular subscriber with _id subscriberId
router.get('/edit/:subscriberId', function(req, res) {
    var subscriberId = req.params.subscriberId;
    console.log(subscriberId);
    subscriber
        .findOne({ '_id': subscriberId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});


module.exports = router;