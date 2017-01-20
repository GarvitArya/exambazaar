var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

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
module.exports = router;