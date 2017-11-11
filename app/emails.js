var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
var email = require('../app/models/email');
var user = require('../app/models/user');
var college = require('../app/models/college');
var subscriber = require('../app/models/subscriber');
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

            /*var allSubscribers = subscriber.find({email: {$exists: true}}, {name: 1, email: 1, _id: 1}, function(err, allSubscribers) {
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
            */

            /*email: {$exists: true}*/
            /*_id: '5a00345da13aa00d18c989a4'*/
            /*"Institute.Correspondence Details.State" : "Gujarat"*/
            var allColleges = college.find({_id: '5a003985df1bcc1b4412f74d'}, {}, function(err, allColleges){
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
                    
                    if(thisCollege['Institute'] && thisCollege['Institute']['Correspondence Details'] && thisCollege['Institute']['Correspondence Details']['Email']){
                        contactEmails.push(thisCollege['Institute']['Correspondence Details']['Email']);
                    }
                    if(thisCollege['Institute'] && thisCollege['Institute']['Contact Person'] && thisCollege['Institute']['Contact Person']['Email']){
                        contactEmails.push(thisCollege['Institute']['Contact Person']['Email']);
                    }

                    /*if(thisCollege['Faculty'] && thisCollege['Faculty']['Faculty Details']){
                        var allFaculties = thisCollege['Faculty']['Faculty Details'];
                        allFaculties.forEach(function(thisFaculty, index){
                            if(thisFaculty.Email){
                                facultyEmails.push(thisFaculty.Email);
                            }
                        });
                    }*/
                    
                    
                    if(thisCollege['Institute'] && thisCollege['Institute']['Correspondence Details'] && thisCollege['Institute']['Correspondence Details']['District']){
                        console.log(collegename + " | " + thisCollege['Institute']['Correspondence Details']['District'] + " | " + contactEmails.length + " emails!");
                    }
                    
                    //console.log(contactEmails);
                    contactEmails = ['saloni@exambazaar.com'];
                    var username = "Student";
                    var subject = "Ready for CAT 2017? We've got some goodies for them!";
                    
                    contactEmails.forEach(function(thisEmail, index){
                        
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
                            console.log('Sending email to ' + username + ' at ' + to);
                            sg.API(request, function(error, response) {
                                if(error){
                                    console.log('Could not send email! ' + error);
                                }else{
                                    //console.log(response);
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