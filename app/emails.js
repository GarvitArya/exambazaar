var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
var email = require('../app/models/email');
var user = require('../app/models/user');
var college = require('../app/models/college');
var coaching = require('../app/models/coaching');
var school = require('../app/models/school');
var subscriber = require('../app/models/subscriber');
var sendGridCredential = require('../app/models/sendGridCredential');
var moment = require('moment');
var fs = require('fs');

var transporter = nodemailer.createTransport('smtps://gaurav%40educhronicle.com:Amplifier@9@smtp.gmail.com');

router.post('/send', function(req, res) {
    var thisEmail = req.body;
    var to = thisEmail.to;
    var subject = thisEmail.subject;
    var html = thisEmail.html;
    // setup e-mail data with unicode symbols
    /*"<b>Hello world, whats up?</b><br/><img src='https://s-media-cache-ak0.pinimg.com/736x/63/9a/5d/639a5d6ff67552c63e690431218b83b8.jpg'>'"*/
    
    
    console.log("To: " + to + " Subject: " + subject);
    var mailOptions = {
        from: '"Edu Chronicle" <hi@educhronicle.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: 'Hello world', // plaintext body
        html: html, // html body
        attachments: [
            {   // use URL as an attachment
                filename: 'license.txt',
                path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            }
            ]
    };
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
            res.send(info);
        }
        console.log('Message sent: ' + info.response);
        res.send(info);
    });

    /*
    // create template based sender function
    var sendPwdReminder = transporter.templateSender({
        subject: 'Password reminder for {{username}}!',
        text: 'Hello, {{username}}, Your password is: {{ password }}',
        html: '<b>Hello, <strong>{{username}}</strong>, Your password is:\n<b>{{ password }}</b></p>'
    }, {
        from: 'sender@example.com',
    });

    // use template based sender to send a message
    sendPwdReminder({
        to: 'gauravparashar294@gmail.com'
    }, {
        username: 'Node Mailer',
        password: '!"\'<>&some-thing'
    }, function(err, info){
        if(err){
           console.log('Error');
        }else{
            console.log('Password reminder sent');
        }
    });*/
});


router.post('/publications', function(req, res) {
    var thisEmail = req.body;
    var templateName = thisEmail.templateName;
    var from = thisEmail.from;
    var sender = thisEmail.sender;
    var senderId = thisEmail.senderId;
    //sender = 'Always Exambazaar';
    var fromEmail = {
        email: from,
        name: sender
    };
    var to = thisEmail.to;
    var subject = thisEmail.subject;
    
    if(!subject || subject == ''){
        subject = 'Press release & story coverage of Exambazaar (IIT-IIM alumni Jaipur based startup)';
    }
    var html = thisEmail.html;
    if(!html){
        html = ' ';
    }
    console.log("To: " + to + " Subject: " + subject + " from: " + from);
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            
            
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    console.log(templateId);
                    var from_email = new helper.Email(fromEmail);
                    var to_email = new helper.Email(to);
                    //var subject = subject;
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });

                    sg.API(request, function(error, response) {
                        if(error){
                            res.json('Could not send email! ' + error);
                        }else{
                                                        
                            var this_email = new email({
                                institute: instituteId,
                                user: senderId,
                                templateId: templateId,
                                fromEmail: {
                                    email: from,
                                    name: sender
                                },
                                to: to,
                                response: {
                                    status: response.statusCode,
                                    _date: response.headers.date,
                                    xMessageId: response.headers["x-message-id"]
                                }
                                
                            });
                            console.log('This email is: ' + JSON.stringify(this_email));
                            
                            this_email.save(function(err, this_email) {
                                if (err) return console.error(err);
                                console.log('Email sent with id: ' + this_email._id);
                            });
                            res.json(response);
                        }

                    });
                    
                }
                if(counter == nLength){
                    if(!templateFound){
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            
            
            
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    
});

router.post('/sendGrid', function(req, res) {
    var thisEmail = req.body;
    var templateName = thisEmail.templateName;
    console.log(templateName);
    var from = thisEmail.from;
    var sender = thisEmail.sender;
    var senderId = thisEmail.senderId;
    //sender = 'Always Exambazaar';
    var fromEmail = {
        email: from,
        name: sender
    };
    var to = thisEmail.to;
    var subject = thisEmail.subject;
    var name = thisEmail.name;
    var instituteName = thisEmail.instituteName;
    var instituteNameCaps = instituteName.toUpperCase();
    var instituteAddress = thisEmail.instituteAddress;
    var institutePhoneMobile = thisEmail.institutePhoneMobile;
    var instituteId = thisEmail.instituteId;
    var logo = thisEmail.logo;
    if(!logo){
        logo='https://s3.ap-south-1.amazonaws.com/exambazaar/logo/bg.png';
    }
    var prefix = "https://s3.ap-south-1.amazonaws.com/exambazaar/listingSnapshot/";
    var fileName = thisEmail.instituteId+'.png';
    var listingSnapshot = prefix + fileName;
    console.log(listingSnapshot);
    
    var html = thisEmail.html;
    if(!html){
        html = ' ';
    }
    console.log("To: " + to + " Subject: " + subject + " from: " + from);
    
    
    //var apiKey = sendGridCredential.getOneSendGridCredential
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            
            
            var emailTemplate = existingSendGridCredential.emailTemplate;
            console.log(emailTemplate);
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    console.log(templateId);
                    var from_email = new helper.Email(fromEmail);
                    var to_email = new helper.Email(to);
                    //var subject = subject;
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    console.log('Template id is: ' + JSON.stringify(templateId));
                    
                    /*console.log('API Key: ' + apiKey);
                    console.log('From Email: ' + JSON.stringify(from_email));
                    console.log('To Email: ' + JSON.stringify(to_email));
                    console.log('Subject: ' + JSON.stringify(subject));
                    console.log('Content: ' + JSON.stringify(content));*/

                    //mail.Substitution('-name-', name);
                    //mail.personalizations = [];
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteName-', instituteName));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteNameCaps-', instituteNameCaps));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteAddress-', instituteAddress));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-institutePhoneMobile-', institutePhoneMobile));
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteId-', instituteId));
                    console.log('Setting image as: ' + listingSnapshot);
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-listingSnapshot-', listingSnapshot));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-logo-', logo));
                    //console.log('Logo is: ' + logo);
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });

                    sg.API(request, function(error, response) {
                        if(error){
                            res.json('Could not send email! ' + error);
                        }else{
                            console.log("Code is: " + response.statusCode);
                            console.log("Body is: " + response.body);
                            console.log("Headers are: " + JSON.stringify(response.headers));
                            console.log(JSON.stringify(response));
                            
                            var this_email = new email({
                                institute: instituteId,
                                user: senderId,
                                templateId: templateId,
                                fromEmail: {
                                    email: from,
                                    name: sender
                                },
                                to: to,
                                response: {
                                    status: response.statusCode,
                                    _date: response.headers.date,
                                    xMessageId: response.headers["x-message-id"]
                                }
                                
                            });
                            console.log('This email is: ' + JSON.stringify(this_email));
                            
                            this_email.save(function(err, this_email) {
                                if (err) return console.error(err);
                                console.log('Email sent with id: ' + this_email._id);
                            });
                            res.json(response);
                        }

                    });
                    
                }
                if(counter == nLength){
                    if(!templateFound){
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            
            
            
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    
});


router.post('/descriptionInvite', function(req, res) {

var templateName = 'CI Email - Write a Blog - 2018';

var from = 'always@exambazaar.com';
var sender = 'Always Exambazaar';
var senderId = '59a7eb973d71f10170dbb468';
var eCounter = 0;
//sender = 'Always Exambazaar';
var fromEmail = {
    email: from,
    name: sender
};

    //var coachingIds = ['58821266fe400914343a5074'];
    //'_id': { $in : coachingIds}, 
    var allProviders = coaching
    .find({ email: {$exists: true}, disabled: false, $where: "this.email.length > 0" }, { name: 1, email:1 })
    .limit(1)
    .exec(function (err, allProviders) {

    if (!err){
    if(allProviders){
        res.json(true);
        console.log('There are: ' + allProviders.length + ' providers!');
        allProviders.forEach(function(thisProvider, pindex){
        var thisEmails = thisProvider.email;
        var instituteName = thisProvider.name;
        var instituteId = thisProvider._id;
        //console.log(instituteName + " | " + thisEmails);    
            
        thisEmails.forEach(function(thisEmail, eindex){
            var emailSent = false;
            //console.log(thisEmail);
            var to = thisEmail;
            //to = 'ayush@exambazaar.com';
            var subject = instituteName + ", students are asking us about you.";
            var html = ' ';
            if(!html){
                html = ' ';
            }
            var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
            if (err) return handleError(err);

            if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);


            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
            if(thisEmailTemplate.name == templateName){
                templateFound = true;
                templateId = thisEmailTemplate.templateKey;
                //console.log("Template has been found!");
                var from_email = new helper.Email(fromEmail);
                var to_email = new helper.Email(to);
                //var subject = subject;
                var content = new helper.Content('text/html', html);
                var mail = new helper.Mail(fromEmail, subject, to_email, content);
                mail.setTemplateId(templateId);
                mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteName-', instituteName));

                mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteId-', instituteId));

                var request = sg.emptyRequest({
                  method: 'POST',
                  path: '/v3/mail/send',
                  body: mail.toJSON(),
                });
                
                var existingEmail = email.findOne({ to: to, _date: {$gte: new Date('2018-03-28T00:00:00.000Z')}}, {templateId: 1, _date: 1, to: 1},function (err, existingEmail) {
                    if (err) return handleError(err);
                    if(existingEmail){
                        console.log("Email to " + to + " already sent at: " + existingEmail._date);
                    }else{
                        //console.log("Will send to " + to);
                        sg.API(request, function(error, response) {
                            if(error){
                                console.log('Could not send email! ' + error);
                            }else{

                            var this_email = new email({
                                institute: instituteId,
                                user: senderId,
                                templateId: templateId,
                                fromEmail: {
                                    email: from,
                                    name: sender
                                },
                                to: to,
                                response: {
                                    status: response.statusCode,
                                    _date: response.headers.date,
                                    xMessageId: response.headers["x-message-id"]
                                }

                            });

                            this_email.save(function(err, this_email) {
                                if (err) return console.error(err);
                                eCounter += 1;
                                console.log(eCounter + '. Email sent to ' + instituteName + ' at ' + this_email.to);
                            });
                            //res.json(response);
                            }

                        });
                    }
                });
                
                /**/

            }
            if(counter == nLength){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }



            }else{
                res.json('No Active SendGrid API Key');
            }
        });




        });


        });
    }
    } else {throw err;}
});
    
    
    
    
    
});

router.post('/blogInvite', function(req, res) {

var templateName = 'Claim CI Email - 28thNov2017';

var from = 'always@exambazaar.com';
var sender = 'Always Exambazaar';
var senderId = '59a7eb973d71f10170dbb468';
var eCounter = 0;
//sender = 'Always Exambazaar';
var fromEmail = {
    email: from,
    name: sender
};

    //var coachingIds = ['58821266fe400914343a5074'];
    //'_id': { $in : coachingIds}, 
    var allProviders = coaching
    .find({ email: {$exists: true}, disabled: false }, { name: 1, email:1 })
    //.limit(1)
    .exec(function (err, allProviders) {

    if (!err){
    if(allProviders){
        res.json(true);
        console.log('There are: ' + allProviders.length + ' providers!');
        allProviders.forEach(function(thisProvider, pindex){
        var thisEmails = thisProvider.email;
        var instituteName = thisProvider.name;
        var instituteId = thisProvider._id;
        thisEmails.forEach(function(thisEmail, eindex){
            var emailSent = false;
            
            var to = thisEmail;
            //to = 'ayush@exambazaar.com';
            var subject = instituteName + " - You are the expert! Would you write with us?";
            var html = ' ';
            if(!html){
                html = ' ';
            }
            var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
            if (err) return handleError(err);

            if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);


            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
            if(thisEmailTemplate.name == templateName){
                templateFound = true;
                templateId = thisEmailTemplate.templateKey;
                
                var from_email = new helper.Email(fromEmail);
                var to_email = new helper.Email(to);
                //var subject = subject;
                var content = new helper.Content('text/html', html);
                var mail = new helper.Mail(fromEmail, subject, to_email, content);
                mail.setTemplateId(templateId);
                mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteName-', instituteName));

                mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteId-', instituteId));

                var request = sg.emptyRequest({
                  method: 'POST',
                  path: '/v3/mail/send',
                  body: mail.toJSON(),
                });
                
                var existingEmail = email.findOne({ to: to, _date: {$gte: new Date('2018-01-05T00:00:00.000Z')}}, {templateId: 1, _date: 1, to: 1},function (err, existingEmail) {
                    if (err) return handleError(err);
                    if(existingEmail){
                        console.log("Email to " + to + " already sent at: " + existingEmail._date);
                    }else{
                        //console.log("Will send to " + to);
                        sg.API(request, function(error, response) {
                            if(error){
                                console.log('Could not send email! ' + error);
                            }else{

                            var this_email = new email({
                                institute: instituteId,
                                user: senderId,
                                templateId: templateId,
                                fromEmail: {
                                    email: from,
                                    name: sender
                                },
                                to: to,
                                response: {
                                    status: response.statusCode,
                                    _date: response.headers.date,
                                    xMessageId: response.headers["x-message-id"]
                                }

                            });

                            this_email.save(function(err, this_email) {
                                if (err) return console.error(err);
                                eCounter += 1;
                                console.log(eCounter + '. Email sent to ' + instituteName + ' at ' + this_email.to);
                            });
                            //res.json(response);
                            }

                        });
                    }
                });
                
                /**/

            }
            if(counter == nLength){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }



            }else{
                res.json('No Active SendGrid API Key');
            }
        });




        });


        });
    }
    } else {throw err;}
});
    
    
    
    
    
});

router.post('/officialPapersInvite', function(req, res) {

var templateName = 'Official Question Papers';

var from = 'always@exambazaar.com';
var sender = 'Always Exambazaar';
var senderId = '59a7eb973d71f10170dbb468';
var eCounter = 0;
//sender = 'Always Exambazaar';
var fromEmail = {
    email: from,
    name: sender
};
    
    var coachingIds = ['58821266fe400914343a5074'];
    
    var allProviders = coaching
    .find({ '_id': { $in : coachingIds},  email: {$exists: true}, disabled: false }, { name: 1, email:1 })
    //.limit(1)
    .exec(function (err, allProviders) {

    if (!err){
    if(allProviders){
        res.json(true);
        console.log('There are: ' + allProviders.length + ' providers!');
        allProviders.forEach(function(thisProvider, pindex){
        var thisEmails = thisProvider.email;
        var instituteName = thisProvider.name;
        var instituteId = thisProvider._id;
        thisEmails.forEach(function(thisEmail, eindex){
            var emailSent = false;
            
            var to = thisEmail;
            //to = 'ayush@exambazaar.com';
            var subject = instituteName + " - Increase Revenue with FREE Previous Papers for Students";
            var html = ' ';
            if(!html){
                html = ' ';
            }
            var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
            if (err) return handleError(err);

            if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);


            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
            if(thisEmailTemplate.name == templateName){
                templateFound = true;
                templateId = thisEmailTemplate.templateKey;
                
                var from_email = new helper.Email(fromEmail);
                //var to = 'saloni@exambazaar.com';
                var to_email = new helper.Email(to);
                //var subject = subject;
                var content = new helper.Content('text/html', html);
                var mail = new helper.Mail(fromEmail, subject, to_email, content);
                mail.setTemplateId(templateId);
                mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteName-', instituteName));

                mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteId-', instituteId));

                var request = sg.emptyRequest({
                  method: 'POST',
                  path: '/v3/mail/send',
                  body: mail.toJSON(),
                });
                
                var existingEmail = email.findOne({ to: to, _date: {$gte: new Date('2018-02-28T00:00:00.000Z')}}, {templateId: 1, _date: 1, to: 1},function (err, existingEmail) {
                    if (err) return handleError(err);
                    if(existingEmail){
                        console.log("Email to " + to + " already sent at: " + existingEmail._date);
                    }else{
                        //console.log("Will send to " + to);
                        sg.API(request, function(error, response) {
                            if(error){
                                console.log('Could not send email! ' + error);
                            }else{

                            var this_email = new email({
                                institute: instituteId,
                                user: senderId,
                                templateId: templateId,
                                fromEmail: {
                                    email: from,
                                    name: sender
                                },
                                to: to,
                                response: {
                                    status: response.statusCode,
                                    _date: response.headers.date,
                                    xMessageId: response.headers["x-message-id"]
                                }

                            });

                            this_email.save(function(err, this_email) {
                                if (err) return console.error(err);
                                eCounter += 1;
                                console.log(eCounter + '. Email sent to ' + instituteName + ' at ' + this_email.to);
                            });
                            //res.json(response);
                            }

                        });
                    }
                });
                
                /**/

            }
            if(counter == nLength){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }



            }else{
                res.json('No Active SendGrid API Key');
            }
        });




        });


        });
    }
    } else {throw err;}
});
    
    
    
    
    
});

/*fs.readFile('public_html/img/Report.pdf', function(err, data) {*/

function titleCase(str) {
  str = str.toLowerCase();
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
};
router.post('/officialPapersInvitetoSchool', function(req, res) {

var templateName = 'Official Question Papers';

var from = 'always@exambazaar.com';
var sender = 'Always Exambazaar';
var senderId = '5a9f7b184b1ece1f48a88d5e';
var eCounter = 0;
//sender = 'Always Exambazaar';
var fromEmail = {
    email: from,
    name: sender
};
    
    //var schoolIds = ["5a9f7b1d4b1ece1f48a88d6a","5a9f7c43ff178410c0ccd53f","5a9f7c3cff178410c0ccd53e","5a9f7b184b1ece1f48a88d5e","5a9f7c27ff178410c0ccd4ed","5a9f7b164b1ece1f48a88d5b","5a9f7b194b1ece1f48a88d61","5a9f7b244b1ece1f48a88d85","5a9f7b264b1ece1f48a88d91","5a9f7b3d4b1ece1f48a88dba","5a9f7b2a4b1ece1f48a88db3","5a9f7c33ff178410c0ccd522","5a9f7c25ff178410c0ccd4ea","5a9f7c30ff178410c0ccd510","5a9f7c33ff178410c0ccd520","5a9f7b1e4b1ece1f48a88d6d","5a9f7c36ff178410c0ccd53b","5a9f7b174b1ece1f48a88d5c","5a9f7c2eff178410c0ccd502","5a9f7c2eff178410c0ccd505"];
    //, '_id': { $in : schoolIds} 
     
    
    var limit = 500;
    var skip = 12500;
    var allSchools = school
    .find({ "data.email": {$exists: true}, "data.email": {$ne: ""}}, { data: 1 })
    //.limit(1)
    .limit(limit).skip(skip)
    .exec(function (err, allSchools) {

    if (!err){
    if(allSchools){
        res.json(true);
        
        var nSchools = allSchools.length;
        var scounter = 0;
        var eCounter = 0;
        var asCounter = 0;
        console.log('There are: ' + allSchools.length + ' schools!');
        
        
        allSchools.forEach(function(thisSchool, sindex){
        var thisEmail = thisSchool.data.email;
        var schoolName = thisSchool.data["name-of-institution"];
        var schoolId = thisSchool._id;
        if(!schoolName){
            schoolName = "School";
        }
        schoolName = schoolName.replace(".", ". ");
        schoolName = titleCase(schoolName);
        var principalName = thisSchool.data["name-of-principal-head-of-institution"];
        var attnName = "";
        if(principalName && principalName.length > 1){
            principalName = principalName.replace(".", ". ");
            principalName = titleCase(principalName);
            
            attnName = principalName + ", " + schoolName;
        }else{
            attnName =  "Principal, " + schoolName;
        }
        //console.log("Attn: " + attnName + " | Email: " + thisEmail);
            
        var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
            if (err) return handleError(err);
            if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
            if(thisEmailTemplate.name == templateName){
                templateFound = true;
                templateId = thisEmailTemplate.templateKey;
                
                var from_email = new helper.Email(fromEmail);
                var to = thisEmail;
                //to = "gaurav@exambazaar.com";
                var to_email = new helper.Email(to);
                //var subject = subject;
                var html = ' ';
                var subject = ' ';
                var content = new helper.Content('text/html', html);
                var mail = new helper.Mail(fromEmail, subject, to_email, content);
                mail.setTemplateId(templateId);
                mail.personalizations[0].addSubstitution(new helper.Substitution('-schoolName-', schoolName));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-attnName-', attnName));
                
                
                var existingEmail = email.findOne({ to: to, _date: {$gte: new Date('2018-03-15T00:00:00.000Z')}}, {templateId: 1, _date: 1, to: 1},function (err, existingEmail) {
                    if (err) return handleError(err);
                    if(existingEmail){
                        console.log("Email to " + to + " already sent at: " + existingEmail._date);
                        scounter += 1;
                        asCounter += 1;
                        if(scounter == nSchools){
                            console.log('Total Emails sent: ' + eCounter + " out of " + nSchools + " schools! | " + asCounter + " already sent");
                        }
                        
                    }else{
                        fs.readFile('Previous.pdf', function(err, data) {
                        fs.readFile('Previous.png', function(err, imgdata) {
                        //console.log(data);
                        //console.log(imgdata);

                        var dataBuffer = new Buffer(data).toString('base64');
                        var dataBuffer2 = new Buffer(imgdata).toString('base64');

                        var attachment = new helper.Attachment();    
                        attachment.setType("application/pdf");
                        attachment.setFilename("Previous-year-question-papers-for-competitive-exams.pdf");
                        attachment.setDisposition("attachment");;
                        attachment.setContent(dataBuffer);
                        mail.addAttachment(attachment);

                        var attachment2 = new helper.Attachment();    
                        attachment2.setType("image/png");
                        attachment2.setFilename("Previous-year-question-papers-for-competitive-exams.png");
                        attachment2.setDisposition("attachment");
                        attachment2.setContent(dataBuffer2);
                        mail.addAttachment(attachment2);    

                        //console.log(data);
                        var request = sg.emptyRequest({
                            method: 'POST',
                            path: '/v3/mail/send',
                            body: mail.toJSON(),
                        });
                        sg.API(request, function(error, response) {
                            if(error){
                                console.log(' ---- Could not send email! ' + error + " " + response.statusCode);
                                console.log(sindex + "." + " Email to " + attnName + " | " + thisEmail + " NOT SENT | Id: " + thisSchool._id + " ---- ");
                                scounter += 1;

                                if(scounter == nSchools){
                                    console.log('Total Emails sent: ' + eCounter + " out of " + nSchools + " schools! | " + asCounter + " already sent");
                                }
                            }else{


                                var this_email = new email({
                                    school: schoolId,
                                    templateId: templateId,
                                    fromEmail: fromEmail,
                                    to: thisEmail,
                                    response: {
                                        status: response.statusCode,
                                        _date: response.headers.date,
                                        xMessageId: response.headers["x-message-id"]
                                    }
                                });

                                this_email.save(function(err, this_email) {
                                    console.log(sindex + "." +" Email to " + attnName + " | " + thisEmail  + " sent | Id: " + thisSchool._id);
                                    scounter += 1;
                                    eCounter += 1;

                                    if(scounter == nSchools){
                                        console.log('Total Emails sent: ' + eCounter + " out of " + nSchools + " schools! | " + asCounter + " already sent");
                                    }


                                });


                            }

                        });

                        });
                    });
                    }
                });
                
                

            }
            if(counter == nLength){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }



            }else{
                res.json('No Active SendGrid API Key');
            }
        });


        });
    }
    } else {throw err;}
});
    
    
    
    
    
});



router.post('/introductionofEB', function(req, res) {
    console.log('Starting introduction Email');
    
    var thisEmail = req.body;
    var templateName = 'Claim CI Email - 28thNov2017';
    var from = thisEmail.from;
    //var sender = thisEmail.sender;
    var senderId = '59a7eb973d71f10170dbb468';
    //sender = 'Always Exambazaar';
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    
    var html = ' ';
    
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
    if (err) return handleError(err);
        
    if(existingSendGridCredential){
        var apiKey = existingSendGridCredential.apiKey;
        var sg = require("sendgrid")(apiKey);
        var emailTemplate = existingSendGridCredential.emailTemplate;
        var templateFound = false;
        var nLength = emailTemplate.length;
        var counter = 0;
        var templateId;
        emailTemplate.forEach(function(thisEmailTemplate, index){
        if(thisEmailTemplate.name == templateName){
            templateFound = true;
            templateId = thisEmailTemplate.templateKey;
            var from_email = new helper.Email(fromEmail);
            
            
            var allProviders = coaching.find({ disabled: false, email: {$exists: true}, $where:'this.email.length>0'}, {email:1, name: 1},function (err, allProviders){
                if (err) return handleError(err);
                var nProviders = allProviders.length;
                console.log('There are ' + nProviders + ' coachings!');
                var pCounter = 0;
                var sentCounter = 0;
                var totalCounter = 0;
                
                
                
                allProviders.forEach(function(thisProvider, pindex){
                    
                    
                    var eCounter = 0;
                    var emailArray = thisProvider.email;
                    var instituteName = thisProvider.name;
                    //var subject = instituteName + " - Get started with Exambazaar!";
                    var subject = instituteName + " - You are the expert! Would you write for us?";
                    var instituteId = thisProvider._id;
                    var content = new helper.Content('text/html', html);
                    
                    //console.log('Coaching id is: ' + instituteId);
                    
                    emailArray.forEach(function(thisEmail, eindex){
                        //console.log(thisEmail);
                        //thisEmail = "gaurav@exambazaar.com";
                        
                        
                        var to_email = new helper.Email(thisEmail);
                        var mail = new helper.Mail(fromEmail, subject, to_email, content);
                        mail.setTemplateId(templateId);
                        mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteName-', instituteName));
                        mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteId-', instituteId));
                        var request = sg.emptyRequest({
                          method: 'POST',
                          path: '/v3/mail/send',
                          body: mail.toJSON(),
                        });
                        
                        
                        sg.API(request, function(error, response) {
                        if(error){
                            eCounter += 1;
                            totalCounter += 1;
                            console.log('Could not send email to: ' + thisEmail);
                            
                            if(eCounter == emailArray.length){
                                pCounter += 1;

                                if(pCounter == allProviders.length){
                                console.log('---------All Done---------');
                                console.log('Emails sent: ' + sentCounter + ' out of ' + eCounter);
                                res.json(true);    
                                }
                            }
                        }else{

                            var this_email = new email({
                                institute: instituteId,
                                user: senderId,
                                templateId: templateId,
                                fromEmail: fromEmail,
                                to: thisEmail,
                                response: {
                                    status: response.statusCode,
                                    _date: response.headers.date,
                                    xMessageId: response.headers["x-message-id"]
                                }
                            });

                            this_email.save(function(err, this_email) {
                                if (err) return console.error(err);
                                //console.log('Email sent with id: ' + this_email._id);
                                eCounter += 1;
                                sentCounter += 1;
                                totalCounter += 1;
                                console.log('Email sent to: ' + instituteName + ' at ' + this_email.to);
                                
                                if(eCounter == emailArray.length){
                                    pCounter += 1;
                                    
                                    if(pCounter == allProviders.length){
                                    console.log('---------All Done---------');
                                    console.log('Emails sent: ' + sentCounter + ' out of ' + totalCounter);
                                    res.json(true);    
                                    }
                                }
                            });
                            //res.json(response);
                        }

                    });
                        
                        
                        
                        
                        
                    });
                    
                });
                
                
                
            }).limit(500).skip(3000); //.skip(5)
            
            
            
        }
        if(counter == nLength){
            if(!templateFound){
                res.json('Could not send email as there is no template with name: ' + templateName);
            }
        }
        });
        if(nLength == 0){
            if(!templateFound){
                res.json('Could not send email as there is no template with name: ' + templateName);
            }
        }



    }else{
        res.json('No Active SendGrid API Key');
    }
    });
    
    
});

router.post('/welcomeEmail', function(req, res) {
    var thisEmail = req.body;
    var templateName = thisEmail.templateName;
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    var to = thisEmail.to;
    var username = thisEmail.username;
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    console.log(templateId);
                    var from_email = new helper.Email(fromEmail);
                    var to_email = new helper.Email(to);
                    var html = ' ';
                    var subject = ' ';
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(request, function(error, response) {
                        if(error){
                            res.json('Could not send email! ' + error);
                        }else{
                            res.json(response);
                        }
                    });
                }
                if(counter == nLength){
                    if(!templateFound){
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    
});


router.post('/verifyEmail', function(req, res) {
    var thisEmail = req.body;
    var templateName = thisEmail.templateName;
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    var to = thisEmail.to;
    var username = thisEmail.username;
    var userid = thisEmail.userid.toString();
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    console.log(templateId);
                    var from_email = new helper.Email(fromEmail);
                    var to_email = new helper.Email(to);
                    var html = ' ';
                    var subject = ' ';
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-userid-', userid));
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(request, function(error, response) {
                        if(error){
                            res.json('Could not send email! ' + error);
                        }else{
                            res.json(response);
                        }
                    });
                }
                if(counter == nLength){
                    if(!templateFound){
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    
});
router.post('/contactEmail', function(req, res) {
    var thisEmail = req.body;
    var templateName = thisEmail.templateName;
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    var to = thisEmail.to;
    var contactName = thisEmail.contactName;
    var contactMobile = thisEmail.contactMobile;
    var contactAbout = thisEmail.contactAbout;
    var contactMessage = thisEmail.contactMessage;
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    var from_email = new helper.Email(fromEmail);
                    var to_email = new helper.Email(to);
                    var to_email2 = new helper.Email('team@exambazaar.com');
                    var html = ' ';
                    var subject = ' ';
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    var mail2 = new helper.Mail(fromEmail, subject, to_email2, content);
                    
                    mail.setTemplateId(templateId);
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-contactName-', contactName));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-contactEmail-', to));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-contactMobile-', contactMobile));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-contactAbout-', contactAbout));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-contactMessage-', contactMessage));
                    
                    mail2.setTemplateId(templateId);
                    mail2.personalizations[0].addSubstitution(new helper.Substitution('-contactName-', contactName));
                    mail2.personalizations[0].addSubstitution(new helper.Substitution('-contactEmail-', to));
                    mail2.personalizations[0].addSubstitution(new helper.Substitution('-contactMobile-', contactMobile));
                    mail2.personalizations[0].addSubstitution(new helper.Substitution('-contactAbout-', contactAbout));
                    mail2.personalizations[0].addSubstitution(new helper.Substitution('-contactMessage-', contactMessage));
                    
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(request, function(error, response) {
                        if(error){
                            res.json('Could not send email! ' + error);
                        }else{
                            
                            var request = sg.emptyRequest({
                              method: 'POST',
                              path: '/v3/mail/send',
                              body: mail2.toJSON(),
                            });
                            sg.API(request, function(error, response) {
                                if(error){
                                    res.json('Could not send email! ' + error);
                                }else{
                                    res.json(response);
                                }
                            });
                            
                            
                            //res.json(response);
                        }
                    });
                }
                if(counter == nLength){
                    if(!templateFound){
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    
});

router.post('/bookAppointmentEmail', function(req, res) {
    var thisEmail = req.body;
    var templateName = thisEmail.templateName;
    var fromEmail = {
        email: 'team@exambazaar.com',
        name: 'Team Exambazaar'
    };
    
    var student = thisEmail.student;
    var thisCoaching = thisEmail.coaching;
    var thisAppointment = thisEmail.appointment;
    var coachingId = thisCoaching.institute;
    var course = thisEmail.course;
    var to = student.email;
    var mobile = student.mobile;
    console.log(coachingId);
    
    var existingCoaching = coaching.findOne({_id: coachingId}, {address: 1, city:1, state: 1, pincode: 1, mobile:1, phone: 1},function (err, existingCoaching) {
    var coachingAddress = existingCoaching.address;
    var coachingPhone = '';
    var coachingMobile = '';
    if(existingCoaching.city){
        coachingAddress += ", " + existingCoaching.city;
    }
    if(existingCoaching.state){
        coachingAddress += ", " + existingCoaching.state;
    }
    if(existingCoaching.pincode){
        coachingAddress += ", " + existingCoaching.pincode;
    }
    if(existingCoaching.phone){
        existingCoaching.phone.forEach(function(thisPhone, index){
            coachingPhone += thisPhone;
            if(index != existingCoaching.phone.length - 1){
                coachingPhone += ", ";
            }
        });
    }   
    if(existingCoaching.mobile){
        existingCoaching.mobile.forEach(function(thisMobile, index){
            coachingMobile += thisMobile;
            if(index != existingCoaching.mobile.length - 1){
                coachingMobile += ", ";
            }
        });
    }
        
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
            if(thisEmailTemplate.name == templateName){
                templateFound = true;
                templateId = thisEmailTemplate.templateKey;
                var from_email = new helper.Email(fromEmail);
                var to_email = new helper.Email(to);
                var to_email2 = new helper.Email('team@exambazaar.com');
                var html = ' ';
                var subject = student.name + ', you are booking an appointment at ' + thisCoaching.name;
                var subject2 = student.name + ' (' + student.mobile + ') '+' is booking an appoitment at ' + thisCoaching.name;
                var requestDateTime = moment(thisAppointment._requestDate);
                var requestDateTimeFormat = requestDateTime.format('DD-MMM-YYYY HH:mm');
                
                var content = new helper.Content('text/html', html);
                var mail = new helper.Mail(fromEmail, subject, to_email, content);
                var mail2 = new helper.Mail(fromEmail, subject2, to_email2, content);

                mail.setTemplateId(templateId);
                mail.personalizations[0].addSubstitution(new helper.Substitution('-student.name-', student.name));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-student.email-', to));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-student.mobile-', mobile));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.name-', thisCoaching.name));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.address-', coachingAddress));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.phone-', coachingPhone));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.mobile-', coachingMobile));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.exam-', thisCoaching.exam));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-course.name-', course.name));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-course.duration-', course.duration));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-appointment.dateTime-', requestDateTimeFormat));
                
                mail2.setTemplateId(templateId);
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-student.name-', student.name));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-student.email-', to));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-student.mobile-', mobile));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.name-', thisCoaching.name));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.address-', coachingAddress));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.phone-', coachingPhone));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.mobile-', coachingMobile));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.exam-', thisCoaching.exam));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-course.name-', course.name));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-course.duration-', course.duration));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-appointment.dateTime-', requestDateTimeFormat));

                var request = sg.emptyRequest({
                  method: 'POST',
                  path: '/v3/mail/send',
                  body: mail.toJSON(),
                });
                sg.API(request, function(error, response) {
                    if(error){
                        res.json('Could not send email! ' + error);
                    }else{

                        var request = sg.emptyRequest({
                          method: 'POST',
                          path: '/v3/mail/send',
                          body: mail2.toJSON(),
                        });
                        sg.API(request, function(error, response) {
                            if(error){
                                res.json('Could not send email! ' + error);
                            }else{
                                res.json(response);
                            }
                        });


                        //res.json(response);
                    }
                });
            }
            if(counter == nLength){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    });
    
});


router.post('/availDiscountEmail', function(req, res) {
    var thisEmail = req.body;
    var templateName = thisEmail.templateName;
    var fromEmail = {
        email: 'team@exambazaar.com',
        name: 'Team Exambazaar'
    };
    
    var student = thisEmail.student;
    var coaching = thisEmail.coaching;
    var course = thisEmail.course;
    var to = student.email;
    var mobile = student.mobile;
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
            if(thisEmailTemplate.name == templateName){
                templateFound = true;
                templateId = thisEmailTemplate.templateKey;
                var from_email = new helper.Email(fromEmail);
                var to_email = new helper.Email(to);
                var to_email2 = new helper.Email('team@exambazaar.com');
                var html = ' ';
                var subject = student.name + ', you have applied for discount at ' + coaching.name;
                var subject2 = student.name + ' (' + student.mobile + ') '+'has applied for discount at ' + coaching.name;
                var content = new helper.Content('text/html', html);
                var mail = new helper.Mail(fromEmail, subject, to_email, content);
                var mail2 = new helper.Mail(fromEmail, subject2, to_email2, content);

                mail.setTemplateId(templateId);
                mail.personalizations[0].addSubstitution(new helper.Substitution('-student.name-', student.name));
                console.log(to);
                console.log(mobile);
                mail.personalizations[0].addSubstitution(new helper.Substitution('-student.email-', to));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-student.mobile-', mobile));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.name-', coaching.name));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.city-', coaching.city));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-coaching.exam-', coaching.exam));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-course.name-', course.name));
                mail.personalizations[0].addSubstitution(new helper.Substitution('-course.duration-', course.duration));
                
                mail2.setTemplateId(templateId);
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-student.name-', student.name));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-student.email-', to));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-student.mobile-', mobile));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.name-', coaching.name));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.city-', coaching.city));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-coaching.exam-', coaching.exam));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-course.name-', course.name));
                mail2.personalizations[0].addSubstitution(new helper.Substitution('-course.duration-', course.duration));

                var request = sg.emptyRequest({
                  method: 'POST',
                  path: '/v3/mail/send',
                  body: mail.toJSON(),
                });
                sg.API(request, function(error, response) {
                    if(error){
                        res.json('Could not send email! ' + error);
                    }else{

                        var request = sg.emptyRequest({
                          method: 'POST',
                          path: '/v3/mail/send',
                          body: mail2.toJSON(),
                        });
                        sg.API(request, function(error, response) {
                            if(error){
                                res.json('Could not send email! ' + error);
                            }else{
                                res.json(response);
                            }
                        });


                        //res.json(response);
                    }
                });
            }
            if(counter == nLength){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    
});

router.post('/recruitmentEmail', function(req, res) {
    var thisEmail = req.body;
    
    var fromEmail = {
        email: 'team@exambazaar.com',
        name: 'Team Exambazaar'
    };
    
    var templateName = thisEmail.templateName;
    var to = thisEmail.to;
    var collegename = thisEmail.collegename;
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    var from_email = new helper.Email(fromEmail);
                    var to_email = new helper.Email(to);
                    var to_email2 = new helper.Email('team@exambazaar.com');
                    var html = ' ';
                    var subject = ' ';
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    var mail2 = new helper.Mail(fromEmail, subject, to_email2, content);
                    
                    mail.setTemplateId(templateId);
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-collegename-', collegename));
                    
                    mail2.setTemplateId(templateId);
                    mail2.personalizations[0].addSubstitution(new helper.Substitution('-collegename-', collegename));
                    
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(request, function(error, response) {
                        if(error){
                            res.json('Could not send email! ' + error);
                        }else{
                            
                            var request = sg.emptyRequest({
                              method: 'POST',
                              path: '/v3/mail/send',
                              body: mail2.toJSON(),
                            });
                            sg.API(request, function(error, response) {
                                if(error){
                                    res.json('Could not send email! ' + error);
                                }else{
                                    res.json(response);
                                }
                            });
                        }
                    });
                }
                if(counter == nLength){
                    if(!templateFound){
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
});


router.post('/hundredblogEmail', function(req, res) {
    //var thisEmail = req.body;
    console.log('Starting 100 blogs Email');
    var fromEmail = {
        email: 'team@exambazaar.com',
        name: 'Team Exambazaar'
    };
    
    var templateName = '100 Blogs';
    //var to = thisEmail.to;
    //var username = thisEmail.username;
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            var counter = 0;
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    var from_email = new helper.Email(fromEmail);
                    
                    var allUsers = user.find({email: {$exists: true}}, {basic: 1, email: 1, _id: 1}, function(err, allUsers) {
                    if (!err){
                        var emailcounter = 0;
                        var counter = 0;
                        var nUsers = allUsers.length;
                        console.log("Total " + nUsers + " users!");
                        allUsers.forEach(function(thisUser, index){
                            var to = thisUser.email;
                            var username = "User";
                            if(thisUser.basic && thisUser.basic.name){
                                username = thisUser.basic.name;
                            }
                            
                            var to_email = new helper.Email(to);
                            var html = ' ';
                            var subject = ' ';
                            var content = new helper.Content('text/html', html);
                            var mail = new helper.Mail(fromEmail, subject, to_email, content);
                            mail.setTemplateId(templateId);
                            mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                            var request = sg.emptyRequest({
                              method: 'POST',
                              path: '/v3/mail/send',
                              body: mail.toJSON(),
                            });
                            //console.log("Sending Email to: " + username + " at " + to);
                            
                            
                            if(thisUser.email && thisUser.email != ''){
                                /*sg.API(request, function(error, response) {
                                    if(error){
                                        counter += 1;
                                        console.log('Could not send email! to: ' + thisUser.email);
                                    }else{
                                        counter += 1;
                                        emailcounter += 1;
                                        console.log(counter + " Email sent to: " + username + " at " + to);
                                        if(counter == nUsers){
                                            console.log("Total emails sent are: " + emailcounter);
                                            res.json(true);
                                        }
                                        //res.json(response);
                                    }
                                });*/
                            }else{
                                counter += 1;
                                if(counter == nUsers){
                                    res.json(true);
                                }
                            }
                            /**/
                        });
                        
                        
    
                    } else {throw err;}
                    });
                    
                    
                }
                if(counter == nLength){
                    if(!templateFound){
                        res.json('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
});


router.post('/internshipEmail', function(req, res) {
    var thisEmail = req.body;
    var html = ' ';
    if(thisEmail.body){
        html = thisEmail.body;
    }
    var emailList = thisEmail.emailList;
    var templateName = thisEmail.templateName;
    var nEmails = emailList.length;
    var counter = 0;
    var emailcounter = 0;
    console.log('Starting Internship Email');
    var fromEmail = {
        email: 'team@exambazaar.com',
        name: 'Team Exambazaar'
    };
    
    //var templateName = 'Internship at Exambazaar';
    
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
            var apiKey = existingSendGridCredential.apiKey;
            var sg = require("sendgrid")(apiKey);
            var emailTemplate = existingSendGridCredential.emailTemplate;
            var templateFound = false;
            var nLength = emailTemplate.length;
            
            var templateId;
            emailTemplate.forEach(function(thisEmailTemplate, index){
                if(thisEmailTemplate.name == templateName){
                    templateFound = true;
                    templateId = thisEmailTemplate.templateKey;
                    var from_email = new helper.Email(fromEmail);
                    
                    emailList.forEach(function(thisEmail, index){
                        
                        
                        var to = thisEmail;
                        
                        var to_email = new helper.Email(to);
                        
                        var subject = ' ';
                        var content = new helper.Content('text/html', html);
                        var mail = new helper.Mail(fromEmail, subject, to_email, content);
                        mail.setTemplateId(templateId);
                       
                        var request = sg.emptyRequest({
                          method: 'POST',
                          path: '/v3/mail/send',
                          body: mail.toJSON(),
                        });
                        
                        sg.API(request, function(error, response) {
                            if(error){
                                counter += 1;
                                console.log('Could not send email! to: ' + to);
                                if(counter == nEmails){
                                    console.log("Total emails sent are: " + emailcounter);
                                    res.json(true);
                                }
                            }else{
                                counter += 1;
                                emailcounter += 1;
                                console.log(counter + " Email sent to: " + to);
                                if(counter == nEmails){
                                    console.log("Total emails sent are: " + emailcounter);
                                    res.json(true);
                                }
                            }
                        });
                        
                    });
                    
                }
            });
            if(nLength == 0){
                res.json(false);
            }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
});

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

router.post('/CATEmail', function(req, res) {
    console.log('Starting CAT 2017 Email');
    //var thisUser = req.body._id.toString();
    //console.log(thisUser);
    
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    
    var templateName = 'CAT 2017';
    res.json(true);
    
    
    /*var groupNames = college.aggregate(
    [
        {$match: {} },
        {"$group": { "_id": { state: "$Institute.Correspondence Details.State", district: "$Institute.Correspondence Details.District" }, count:{$sum:1} } },
        {$sort:{"count":-1}}

    ],function(err, groupNames) {
    if (!err){
        //groupNames = groupNames.slice(0, 20);
        //console.log(groupNames);
        var queryGroups = [];
        groupNames.forEach(function(thisGroup, index){
            var qGroup = {
                state: thisGroup._id.state,
                district: thisGroup._id.district,
                centers: thisGroup.count,
            };
            console.log(thisGroup._id.state + "|" + thisGroup._id.district + "|" + thisGroup.count);
            //queryGroups.push(qGroup);
        });
        //console.log(queryGroups);
        //res.json(queryGroups);
    } else {throw err;}
    });*/
    
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
        var apiKey = existingSendGridCredential.apiKey;
        var sg = require("sendgrid")(apiKey);
        var emailTemplate = existingSendGridCredential.emailTemplate;
        var templateFound = false;
        var nLength = emailTemplate.length;
        var counter = 0;
        var templateId;
        emailTemplate.forEach(function(thisEmailTemplate, index){
        if(thisEmailTemplate.name == templateName){
            templateFound = true;
            templateId = thisEmailTemplate.templateKey;
            var from_email = new helper.Email(fromEmail);

            /*var allUsers = user.find({email: {$exists: true}}, {basic: 1, email: 1, _id: 1}, function(err, allUsers) {
            if (!err){
                var emailcounter = 0;
                var counter = 0;
                var nUsers = allUsers.length;
                console.log("Total " + nUsers + " users!");
                allUsers.forEach(function(thisUser, index){

                    var to = thisUser.email;
                    var username = "Student";
                    var subject = "Hola! Ready for CAT 2017? We've got some goodies for you!";
                    if(thisUser.basic && thisUser.basic.name){
                        username = thisUser.basic.name;
                        subject = username + ", ready for CAT 2017? We've got some goodies for you!";
                    }


                    var to_email = new helper.Email(to);
                    var html = ' ';

                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                     mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });


                    if(thisUser.email && thisUser.email != ''){
                        console.log('Sending email to ' + username + ' at ' + to);
                        sg.API(request, function(error, response) {
                        if(error){
                            console.log('Could not send email! ' + error);
                        }else{
                            counter += 1;
                            console.log(counter + "/" + nUsers + " done!");
                            if(counter == nUsers){
                                console.log('All Done');
                            }
                        }
                    });


                    }else{
                        counter += 1;
                        if(counter == nUsers){
                            console.log('All Done');
                        }
                    }
                });



            } else {throw err;}
            });*/
            
            
            //email: {$exists: true}
            var allSubscribers = subscriber.find({_created: {$gte: new Date('2017-11-15T00:00:00.000Z')}}, {name: 1, email: 1, _id: 1, mobile:1}, function(err, allSubscribers) {
            if (!err){
                var emailcounter = 0;
                var counter = 0;
                var nUsers = allSubscribers.length;
                console.log("Total " + allSubscribers + " users!");
                allSubscribers.forEach(function(thisUser, index){

                    var to = thisUser.email;
                    var username = "Student";
                    var subject = "Hola! Ready for CAT 2017? We've got some goodies for you!";
                    if(thisUser.name){
                        username = thisUser.name;
                        subject = username + ", ready for CAT 2017? We've got some goodies for you!";
                    }


                    var to_email = new helper.Email(to);
                    var html = ' ';

                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                     mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });


                    if(thisUser.email && thisUser.email != ''){
                        console.log('Sending email to ' + username + ' at ' + to);
                        sg.API(request, function(error, response) {
                        if(error){
                            console.log('Could not send email! ' + error);
                        }else{
                            counter += 1;
                            console.log(counter + "/" + nUsers + " done!");
                            if(counter == nUsers){
                                console.log('All Done');
                            }
                        }
                    });


                    }else{
                        counter += 1;
                        if(counter == nUsers){
                            console.log('All Done');
                        }
                    }
                });



            } else {throw err;}
            });
            

            
            /*var allColleges = college.find({}, {Institute: 1, inst_name: 1}, function(err, allColleges){
            if (!err){
                var emailcounter = 0;
                var counter = 0;
                var nUsers = allColleges.length;
                console.log("Total " + allColleges.length + " colleges!");
                //console.log(collegename);
                allColleges.forEach(function(thisCollege, index){
                    var contactEmails = [];
                    var facultyEmails = [];
                    var collegename = thisCollege.inst_name;//.toProperCase();
                    
                    
                    if(thisCollege['Institute'] && thisCollege['Institute']['Contact Person'] && thisCollege['Institute']['Contact Person']['Email']){
                        contactEmails.push(thisCollege['Institute']['Contact Person']['Email']);
                    }

                    
                    
                    
                    if(thisCollege['Institute'] && thisCollege['Institute']['Correspondence Details'] && thisCollege['Institute']['Correspondence Details']['District']){
                        console.log(collegename + " | " + thisCollege['Institute']['Correspondence Details']['District'] + " | " + contactEmails.length + " emails!");
                    }
                    //console.log("http://www.knowyourcollege-gov.in/InstituteDetails.php?insti_id=" + thisCollege.insti_id );
                    
                    //console.log(contactEmails);
                    //contactEmails = ['gaurav@exambazaar.com'];
                    var username = "Student";
                    var subject = "Ready for CAT 2017? We've got some goodies!";
                    
                    contactEmails.forEach(function(thisEmail, index){
                        
                        if(thisEmail && thisEmail != ''){
                            var to = thisEmail;
                        var to_email = new helper.Email(to);
                        var html = ' ';
                        var content = new helper.Content('text/html', html);
                        var mail = new helper.Mail(fromEmail, subject, to_email, content);
                        mail.setTemplateId(templateId);
                        mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                        
                        mail.personalizations[0].addSubstitution(new helper.Substitution('-collegename-', collegename));
                        var request = sg.emptyRequest({
                          method: 'POST',
                          path: '/v3/mail/send',
                          body: mail.toJSON(),
                        });
                        if(to && to != ''){
                            //console.log();
                            sg.API(request, function(error, response) {
                                if(error){
                                    console.log('Could not send email! ' + error);
                                }else{
                                    //console.log(response);
                                    counter += 1;
                                    console.log('Sending email to ' + username + ' at ' + to + " | " + counter + "/" + nUsers + " done!");
                                    if(counter == nUsers){
                                        console.log('All Done');
                                    }
                                }
                            });
                        }else{
                            counter += 1;
                            if(counter == nUsers){
                                console.log('All Done');
                            }
                        }
                    }else{
                            counter += 1;
                            if(counter == nUsers){
                                console.log('All Done');
                            }
                        }
                        
                        
                        
                        
                        
                        
                    });


                    
                });



            } else {throw err;}
            }).skip(10000).limit(1000);*/

        }
        if(counter == nLength){
            if(!templateFound){
                res.json('Could not send email as there is no template with name: ' + templateName);
            }
        }
        });
        if(nLength == 0){
            if(!templateFound){
                res.json('Could not send email as there is no template with name: ' + templateName);
            }
        }
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
});


router.post('/EventsEmail', function(req, res) {
    console.log('Starting Events Email');
    var fromEmail = {
        email: 'team@exambazaar.com',
        name: 'Team Exambazaar'
    };
    
    var templateName = 'Events';
    res.json(true);
    
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
        var apiKey = existingSendGridCredential.apiKey;
        var sg = require("sendgrid")(apiKey);
        var emailTemplate = existingSendGridCredential.emailTemplate;
        var templateFound = false;
        var nLength = emailTemplate.length;
        var counter = 0;
        var templateId;
        emailTemplate.forEach(function(thisEmailTemplate, index){
        if(thisEmailTemplate.name == templateName){
            templateFound = true;
            templateId = thisEmailTemplate.templateKey;
            var from_email = new helper.Email(fromEmail);
            //email: {$exists: true}, mobile: "9829685919"
            
            var limit = 200;
            var skip = 3200;
            
            var allUsers = user.find({email: {$exists: true}}, {basic: 1, email: 1, _id: 1}, function(err, allUsers) {
            if (!err){
                var emailcounter = 0;
                var counter = 0;
                var nUsers = allUsers.length;
                console.log("Total " + nUsers + " users!");
                allUsers.forEach(function(thisUser, index){

                    var to = thisUser.email;
                    var username = "Student";
                    var subject = " ";
                    if(thisUser.basic && thisUser.basic.name){
                        username = thisUser.basic.name;
                    }


                    var to_email = new helper.Email(to);
                    var html = ' ';

                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                     mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });


                    if(thisUser.email && thisUser.email != ''){
                        
                        sg.API(request, function(error, response) {
                        if(error){
                            counter += 1;
                            console.log(index + '. Could not send email! ' + error);
                        }else{
                            
                            counter += 1;
                            emailcounter += 1;
                            console.log(index  + '. Email sent to ' + username + ' at ' + to);
                            //console.log(counter + "/" + nUsers + " done!");
                            if(counter == nUsers){
                                console.log("Total " + emailcounter + " emails delivered " + " out of " + counter + " attempts!" );
                                //console.log('All Done');
                            }
                        }
                    });


                    }else{
                        counter += 1;
                        if(counter == nUsers){
                            console.log('All Done');
                        }
                    }
                });



            } else {throw err;}
            }).limit(limit).skip(skip);
            
            

        }
        if(counter == nLength){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        });
        if(nLength == 0){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        }else{
            console.log('No Active SendGrid API Key');
            res.json(false);
        }
    });
});


router.post('/coachingDiscountEmail', function(req, res) {
    console.log('Starting Coaching Discount Email');
    var fromEmail = {
        email: 'team@exambazaar.com',
        name: 'Team Exambazaar'
    };
    
    var templateName = 'Coaching Discount';
    res.json(true);
    
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
        var apiKey = existingSendGridCredential.apiKey;
        var sg = require("sendgrid")(apiKey);
        var emailTemplate = existingSendGridCredential.emailTemplate;
        var templateFound = false;
        var nLength = emailTemplate.length;
        var counter = 0;
        var templateId;
        emailTemplate.forEach(function(thisEmailTemplate, index){
        if(thisEmailTemplate.name == templateName){
            templateFound = true;
            templateId = thisEmailTemplate.templateKey;
            var from_email = new helper.Email(fromEmail);
            //email: {$exists: true}, mobile: "9829685919"
            
            var limit = 500;
            var skip = 3000;
            
            var allUsers = user.find({email: {$exists: true}}, {basic: 1, email: 1, _id: 1}, function(err, allUsers) {
            if (!err){
                var emailcounter = 0;
                var counter = 0;
                var nUsers = allUsers.length;
                console.log("Total " + nUsers + " users!");
                allUsers.forEach(function(thisUser, index){

                    var to = thisUser.email;
                    var username = "Student";
                    var subject = " ";
                    if(thisUser.basic && thisUser.basic.name){
                        username = thisUser.basic.name;
                    }


                    var to_email = new helper.Email(to);
                    var html = ' ';

                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                     mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });


                    if(thisUser.email && thisUser.email != ''){
                        
                        sg.API(request, function(error, response) {
                        if(error){
                            counter += 1;
                            console.log(index + '. Could not send email! ' + error);
                        }else{
                            
                            counter += 1;
                            emailcounter += 1;
                            console.log(index  + '. Email sent to ' + username + ' at ' + to);
                            //console.log(counter + "/" + nUsers + " done!");
                            if(counter == nUsers){
                                console.log("Total " + emailcounter + " emails delivered " + " out of " + counter + " attempts!" );
                                //console.log('All Done');
                            }
                        }
                    });


                    }else{
                        counter += 1;
                        if(counter == nUsers){
                            console.log('All Done');
                        }
                    }
                });



            } else {throw err;}
            }).limit(limit).skip(skip);
            
            

        }
        if(counter == nLength){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        });
        if(nLength == 0){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        }else{
            console.log('No Active SendGrid API Key');
            res.json(false);
        }
    });
});


router.post('/OfficialPapersEmail', function(req, res) {
    console.log('Starting Official Papers Email');
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    
    var templateName = 'Official Question Papers';
    res.json(true);
    
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
        var apiKey = existingSendGridCredential.apiKey;
        var sg = require("sendgrid")(apiKey);
        var emailTemplate = existingSendGridCredential.emailTemplate;
        var templateFound = false;
        var nLength = emailTemplate.length;
        var counter = 0;
        var templateId;
        emailTemplate.forEach(function(thisEmailTemplate, index){
        if(thisEmailTemplate.name == templateName){
            templateFound = true;
            templateId = thisEmailTemplate.templateKey;
            var from_email = new helper.Email(fromEmail);
            
            var limit = 200;
            var skip = 0;
            //email: {$exists: true}, mobile: "9829685919"
            var allUsers = user.find({email: {$exists: true}, mobile: "9829685919"}, {basic: 1, email: 1, _id: 1}, function(err, allUsers) {
            if (!err){
                var emailcounter = 0;
                var counter = 0;
                var nUsers = allUsers.length;
                console.log("Total " + nUsers + " users!");
                allUsers.forEach(function(thisUser, index){

                    var to = thisUser.email;
                    var username = "Student";
                    var subject = " ";
                    if(thisUser.basic && thisUser.basic.name){
                        username = thisUser.basic.name;
                    }


                    var to_email = new helper.Email(to);
                    var html = ' ';

                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                     mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });


                    if(thisUser.email && thisUser.email != ''){
                        
                        sg.API(request, function(error, response) {
                        if(error){
                            counter += 1;
                            console.log(index + '. Could not send email! ' + error);
                            console.log(response);
                            if(counter == nUsers){
                                console.log("Total " + emailcounter + " emails delivered " + " out of " + counter + " attempts!" );
                                //console.log('All Done');
                            }
                        }else{
                            
                            counter += 1;
                            emailcounter += 1;
                            console.log(index  + '. Email sent to ' + username + ' at ' + to);
                            //console.log(counter + "/" + nUsers + " done!");
                            if(counter == nUsers){
                                console.log("Total " + emailcounter + " emails delivered " + " out of " + counter + " attempts!" );
                                //console.log('All Done');
                            }
                        }
                    });


                    }else{
                        counter += 1;
                        if(counter == nUsers){
                            console.log('All Done');
                        }
                    }
                });



            } else {throw err;}
            }).limit(limit).skip(skip);
            
            

        }
        if(counter == nLength){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        });
        if(nLength == 0){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        }else{
            console.log('No Active SendGrid API Key');
            res.json(false);
        }
    });
});


router.post('/OfficialPapersEmailUnsolicited', function(req, res) {
    console.log('Starting Official Papers Email Unsolicited');
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    
    var templateName = 'Official Question Papers';
    res.json(true);
    
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        if(existingSendGridCredential){
        var apiKey = existingSendGridCredential.apiKey;
        var sg = require("sendgrid")(apiKey);
        var emailTemplate = existingSendGridCredential.emailTemplate;
        var templateFound = false;
        var nLength = emailTemplate.length;
        var counter = 0;
        var templateId;
        emailTemplate.forEach(function(thisEmailTemplate, index){
        if(thisEmailTemplate.name == templateName){
            templateFound = true;
            templateId = thisEmailTemplate.templateKey;
            var from_email = new helper.Email(fromEmail);
            
            var allUsers = [];
            var emailcounter = 0;
            var counter = 0;
            
            var skip = 0;
            var limit = 200;
            var nUsers = allUsers.length;
            if(limit < nUsers){
                nUsers = limit;
            }
            
            console.log("Total " + nUsers + " users!");
            allUsers.forEach(function(thisUser, index){
                if(index >= skip && index < skip + limit){
                
                var to = thisUser;
                var username = "Student";
                var subject = " ";
                var to_email = new helper.Email(to);
                var html = ' ';

                var content = new helper.Content('text/html', html);
                var mail = new helper.Mail(fromEmail, subject, to_email, content);
                mail.setTemplateId(templateId);
                
                var request = sg.emptyRequest({
                  method: 'POST',
                  path: '/v3/mail/send',
                  body: mail.toJSON(),
                });


                if(thisUser && thisUser != ''){

                    sg.API(request, function(error, response) {
                    if(error){
                        counter += 1;
                        console.log(index + '. Could not send email! ' + error);
                        if(counter == nUsers){
                            console.log("Total " + emailcounter + " emails delivered " + " out of " + counter + " attempts!" );
                        }
                    }else{

                        counter += 1;
                        emailcounter += 1;
                        console.log(index  + '. Email sent at ' + to);
                        if(counter == nUsers){
                            console.log("Total " + emailcounter + " emails delivered " + " out of " + counter + " attempts!" );
                            //console.log('All Done');
                        }
                    }
                });


                }else{
                    counter += 1;
                    if(counter == nUsers){
                        console.log('All Done');
                    }
                }
                
                
                }
            });

        }
        if(counter == nLength){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        });
        if(nLength == 0){
            if(!templateFound){
                console.log('Could not send email as there is no template with name: ' + templateName);
                res.json(false);
            }
        }
        }else{
            console.log('No Active SendGrid API Key');
            res.json(false);
        }
    });
});

router.get('/', function(req, res) {
    email
        .find({ })
        //.deepPopulate('stream')
        .exec(function (err, docs) {
        if (!err){
            //var examNames = docs.map(function(a) {return a.name;});
            //console.log(examNames);
            res.json(docs);
        } else {throw err;}
    });
    
});


module.exports = router;