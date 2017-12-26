var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
var email = require('../app/models/email');
var user = require('../app/models/user');
var college = require('../app/models/college');
var targetStudyProvider = require('../app/models/targetStudyProvider');
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
/*var coachingIds = [
    "58715c9cf9988f0011d9432d",
"5871dada54dcbf2e48a7933d",
"5871daed54dcbf2e48a7933f",
"5871e924d2962f15b03e84b1",
"587200b8a4e2f82b04510126",
"587281a67714e50bfc305909",
"5872fca38def9a37eccf52a9",
"5873161c57f9f6322cc028e5",
"587c6cc5d150930011f64d54",
"587c7a95b635b90011b1e91c",
"587cae3961bd2f1abca3833f",
"587caf8e61bd2f1abca3834f",
"587e1447b3e94f2bd8625b05",
"587e20d66c163c0011c2467f",
"587efbf137f77112e4ee501a",
"587f01d06c163c0011c24772",
"587f26aa68834500113e3f9a",
"587f26b368834500113e3f9b",
"587f82886b33dd19bcd63488",
"587f82926b33dd19bcd63489",
"5880f4ca3861c0001118a0a6",
"5884654754226e23046e9477",
"58846b7254226e23046e94c7",
"5885a375c3ed5d0011199f91",
"5886d2f9b154802d00bc7b70",
"5886d552b154802d00bc7b8e",
"5886d55cb154802d00bc7b8f",
"5886d567b154802d00bc7b90",
"5886d5abb154802d00bc7b91",
"5886d5b5b154802d00bc7b92",
"5886d5d4b154802d00bc7b95",
"58885132226dd10011180be0",
"588adf84b622727714a72713",
"5888c118c019b96a88de4872",
"587f06ff6c163c0011c24b0f",
"5871d79254dcbf2e48a79313",
"5871d79b54dcbf2e48a79314",
"5871d7a554dcbf2e48a79315",
"5871d7b054dcbf2e48a79316",
"5871d80a54dcbf2e48a79319",
"5870f159b2a1c11da874022d",
"5871015fb2a1c11da87402fa",
"5872fe8d8def9a37eccf52c2",
"5872fe978def9a37eccf52c3",
"5872fe838def9a37eccf52c1",
"587cb01061bd2f1abca38356",
"5871544ff9988f0011d9427b",
"58715586f9988f0011d94298",
"588ad35ae5d5206b6c04c8ed",
"5871fdcaa4e2f82b045100ff",
"5871e92ed2962f15b03e84b2",
"5871fdd3a4e2f82b04510100",
"5871fe40a4e2f82b04510105",
"58787d593293df001181e20f",
"587c6da5d150930011f64d69",
"587e07ff70fbf52dc8d74e37",
"587e257d6c163c0011c246f6",
"587c6d86d150930011f64d66",
"587c6dc5d150930011f64d6c",
"587c6db0d150930011f64d6a",
"58802b60b0ee163ba085b4bc",
"587e145cb3e94f2bd8625b07",
"587c6d91d150930011f64d67",
"587c6dd0d150930011f64d6d",
"58802b56b0ee163ba085b4bb",
"58720125a4e2f82b0451012b",
"58726c2a89517d2a6c260d0a",
"5871fddfa4e2f82b04510101",
"587c6dbad150930011f64d6b",
"58805d2868834500113e4111",
"5880f5813861c0001118a0b7",
"588228f672f54a065cfb1d7a",
"588214b5fe400914343a5091",
"5884674454226e23046e9492",
"5885a3ffc3ed5d0011199f9e",
"58852dc9d50e9f001181043f",
"5886d6c4b154802d00bc7ba1",
"5871d91754dcbf2e48a79328",
"58726c1f89517d2a6c260d07",
"587c6d9bd150930011f64d68",
"58805d1d68834500113e4110",
"5886c9aeb154802d00bc7afa",
"5885a3f4c3ed5d0011199f9d",
"5886d642b154802d00bc7b9a",
"588adfd5b622727714a72715",
"58720110a4e2f82b04510129",
"587e143eb3e94f2bd8625b04",
"5884673b54226e23046e9491",
"5871fde9a4e2f82b04510102",
"587e20ea6c163c0011c24681",
"58726c2389517d2a6c260d09",
"5872017da4e2f82b0451012e",
"58720105a4e2f82b04510128",
"58720131a4e2f82b0451012c",
"58726bf889517d2a6c260d05",
"5880f5003861c0001118a0ab",
"58857c5f76ee7f23a8036274",
"5886d6ceb154802d00bc7ba2",
"5885a3aac3ed5d0011199f96",
"5870e87d6ebf5925a013c165",
"587f20af68834500113e3f06",
"5872011ba4e2f82b0451012a",
"58726c2089517d2a6c260d08",
"5872fcad8def9a37eccf52aa",
"5872fcfd8def9a37eccf52ac",
"587b5b70d150930011f6485a",
"58805be568834500113e40f3",
"5885c62a8406b42b38a2dc1b",
"5885243c0dc2b40a2857b14f",
"58877346fd23ba0011dd522b",
"588773e5fd23ba0011dd523b",
"58885183226dd10011180be8",
"5870d4140f70f1181c8edbf4",
"58ec9f23c92fad00112d1cee",
"58ec9f8cc92fad00112d1cf2",
"5870f05180ea0e0698890928",
"5872fe798def9a37eccf52c0",
"5872fc998def9a37eccf52a8",
"5871d7bb54dcbf2e48a79317",
"597897b1119b830c8956e35c",
"597897b1119b830c8956e35a",
"597897b1119b830c8956e364",
"597897b1119b830c8956e362",
"597897b1119b830c8956e36c",
"597897b1119b830c8956e36e",
"597897b1119b830c8956e376",
"597897b1119b830c8956e35e",
"597897b1119b830c8956e380",
"597897b1119b830c8956e358",
"597897b1119b830c8956e368",
"597897b1119b830c8956e366",
"597897b1119b830c8956e372",
"597897b1119b830c8956e370",
"597897b1119b830c8956e356",
"597897b1119b830c8956e37a",
"597897b1119b830c8956e360",
"597897b1119b830c8956e36a",
"597897b1119b830c8956e374",
"597897b1119b830c8956e38a",
"597897b1119b830c8956e37c",
"597897b1119b830c8956e394",
"597897b1119b830c8956e386",
"597897b1119b830c8956e39e",
"597897b1119b830c8956e390",
"597897b1119b830c8956e3a8",
"597897b1119b830c8956e39a",
"597897b1119b830c8956e3b2",
"597897b1119b830c8956e3a4",
"597897b1119b830c8956e3bc",
"597897b1119b830c8956e3ae",
"597897b1119b830c8956e3c6",
"597897b1119b830c8956e3b8",
"597897b1119b830c8956e3d0",
"597897b1119b830c8956e3c2",
"597897b1119b830c8956e3da",
"597897b1119b830c8956e3e4",
"597897b1119b830c8956e37e",
"597897b1119b830c8956e3ee",
"597897b1119b830c8956e388",
"597897b2119b830c8956e3f8",
"597897b2119b830c8956e402",
"597897b1119b830c8956e392",
"597897b1119b830c8956e384",
"597897b1119b830c8956e39c",
"597897b1119b830c8956e3a6",
"597897b1119b830c8956e38e",
"597897b1119b830c8956e3b0",
"597897b1119b830c8956e398",
"597897b1119b830c8956e3ba",
"597897b1119b830c8956e3a2",
"597897b1119b830c8956e3c4",
"597897b1119b830c8956e3ac",
"597897b1119b830c8956e3ce",
"597897b1119b830c8956e3b6",
"597897b1119b830c8956e3d8",
"597897b1119b830c8956e3c0",
"597897b1119b830c8956e3ca",
"597897b1119b830c8956e3e2",
"597897b1119b830c8956e3d4",
"597897b1119b830c8956e378",
"597897b1119b830c8956e3de",
"597897b1119b830c8956e382",
"597897b1119b830c8956e3e8",
"597897b1119b830c8956e38c",
"597897b1119b830c8956e396",
"597897b1119b830c8956e3a0",
"597897b1119b830c8956e3aa",
"597897b1119b830c8956e3b4",
"597897b1119b830c8956e3be",
"597897b1119b830c8956e3c8",
"597897b1119b830c8956e3d2",
"597897b1119b830c8956e3dc",
"597897b1119b830c8956e3cc",
"597897b1119b830c8956e3d6",
"597897b1119b830c8956e3e0",
"597897b1119b830c8956e3ea",
"597897b2119b830c8956e3f4",
"597897b2119b830c8956e3fe",
"597897b2119b830c8956e408",
"597897b1119b830c8956e3ec",
"597897b1119b830c8956e3f2",
"597897b2119b830c8956e3fc",
"597897b2119b830c8956e3f6",
"597897b2119b830c8956e400",
"597897b2119b830c8956e406",
"597897b1119b830c8956e3e6",
"597897b1119b830c8956e3f0",
"597897b2119b830c8956e3fa",
"597897b2119b830c8956e404",
"599aea2991027a2064294730",
"599aea2a91027a2064294732",
"599aea2a91027a2064294734",
"599aea2991027a206429472e",
"599aea2a91027a2064294736",
"599aea2a91027a2064294738",
"599aea2a91027a206429473a",
"599aea2a91027a206429473e",
"599aea2a91027a206429473c",
"599aea2a91027a2064294740",
"599aea2a91027a2064294744",
"599aea2a91027a2064294742",
"599edda10c052c568f3fa5cc",
"599edda10c052c568f3fa5ce",
"59a6d9fda953ba5cd5fa275b",
"59ad4b8e0faf9d5ebc5a8614",
"59b159673d5e963fc12ea487",
"59b1a62d27114f55e73e8426",
"59b3e0b04c731b7ceff4d5c3",
"59b6a5823995b654f42c435f",
"59baa20338d2bf10f2bd1cf9",
"59bbcdbf7899cf6d69a47825",
"59bbdb36d7dde1755d710ffd",
"59c12364bf64ab1062c34fb0",
"59c392058a41515171bb9315",
"59cd09ff8225fc7343d899a9",
"59ce59c0f5912b613a5df58d",
"59d258258d08101bc8904daa",
"59d7c023bc724f0918fc775e",
"59e4d36a5dbddd0c51e61fe1",
"59f1b1989acf5e210074ad20",
"5a0dcf9bd3c3d649a60f5375",
"5a10576887ca5478a88de208",
"5a10576887ca5478a88de206",
"5a10576887ca5478a88de210",
"5a10576887ca5478a88de20c",
"5a10576887ca5478a88de20e",
"5a10576887ca5478a88de20a",
"5a10576887ca5478a88de212",
"5a10576887ca5478a88de214",
"5a10576887ca5478a88de216",
"5a10576887ca5478a88de218",
"5a10576887ca5478a88de21a",
"5a10576887ca5478a88de21c",
"5a33be87a4995f5cc1120c51",

];*/
    var coachingIds = [];
var allProviders = targetStudyProvider
    .find({ '_id': { $in : coachingIds}, email: {$exists: true}, disabled: false }, { name: 1, email:1 })
    //.limit(1)
    .exec(function (err, allProviders) {

    if (!err){
    if(allProviders){
        res.json(true);
        allProviders.forEach(function(thisProvider, pindex){
        var thisEmails = thisProvider.email;
        var instituteName = thisProvider.name;
        var instituteId = thisProvider._id;
        thisEmails.forEach(function(thisEmail, eindex){

            var to = thisEmail;
            //to = 'saloni@exambazaar.com';
            var subject = "Attract New Students with a Simple Blog - " + instituteName + "!";


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

                    this_email.save(function(err, this_email) {
                        if (err) return console.error(err);
                        eCounter += 1;
                        console.log(eCounter + '. Email sent to ' + instituteName + ' at ' + this_email.to);
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
            
            
            var allProviders = targetStudyProvider.find({ disabled: false, email: {$exists: true}, $where:'this.email.length>0'}, {email:1, name: 1},function (err, allProviders){
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
                    var subject = instituteName + " - Get started with Exambazaar!";
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