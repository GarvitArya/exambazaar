var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
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
    var templateId = thisEmail.templateId;
    var from = thisEmail.from;
    var sender = thisEmail.sender;
    sender = 'Always Exambazaar';
    var fromEmail = {
        email: from,
        name: sender
    };
    var to = thisEmail.to;
    var subject = thisEmail.subject;
    var name = thisEmail.name;
    var instituteName = thisEmail.instituteName;
    var instituteId = thisEmail.instituteId;
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
            
            var from_email = new helper.Email(fromEmail);
            var to_email = new helper.Email(to);
            //var subject = subject;
            var content = new helper.Content('text/html', html);
            var mail = new helper.Mail(fromEmail, subject, to_email, content);
            mail.setTemplateId('4600a054-1d6c-4c2b-9cf4-5e45f91b5f11');
            //mail.setTemplateId('f2c433ee-29cb-4429-8b28-774582fba276');
            console.log('API Key: ' + apiKey);
            console.log('From Email: ' + JSON.stringify(from_email));
            console.log('To Email: ' + JSON.stringify(to_email));
            console.log('Subject: ' + JSON.stringify(subject));
            console.log('Content: ' + JSON.stringify(content));
            
            //mail.Substitution('-name-', name);
            //mail.personalizations = [];
            mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteName-', instituteName));
            mail.personalizations[0].addSubstitution(new helper.Substitution('-instituteId-', instituteId));
            
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON(),
            });

            sg.API(request, function(error, response) {
                if(error){
                    res.json('Could not send email! ' + error);
                }else{
                    console.log(response.statusCode);
                    console.log(response.body);
                    console.log(response.headers);
                    res.json(response);
                }
                
            });
            
        }else{
            res.json('No Active SendGrid API Key');
        }
    });
    
    
});
module.exports = router;