var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://gauravparashar294%40gmail.com:abhi@12345@smtp.gmail.com');



// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Gaurav Parashar " <gauravparashar294@gmail.com>', // sender address
    to: 'gauravparashar294@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: "<b>Hello world, whats up?</b><br/><img src='https://s-media-cache-ak0.pinimg.com/736x/63/9a/5d/639a5d6ff67552c63e690431218b83b8.jpg'>'", // html body
    attachments: [
        {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        }
        ]
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
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