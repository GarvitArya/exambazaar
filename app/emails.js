var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
var email = require('../app/models/email');
var sendGridCredential = require('../app/models/sendGridCredential');


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


router.post('/sendGrid', function(req, res) {
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