var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
var publicationemail = require('../app/models/publicationemail');
var user = require('../app/models/user');
var coaching = require('../app/models/coaching');
var subscriber = require('../app/models/subscriber');
var sendGridCredential = require('../app/models/sendGridCredential');

router.get('/', function(req, res) {
    publicationemail
        .find({ })
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
    
});

router.post('/publications', function(req, res) {
    var thisEmail = req.body;
    //console.log(thisEmail);
    var templateName = thisEmail.templateName;
    var from = thisEmail.from;
    var sender = thisEmail.sender;
    if(sender){
        //console.log(sender);
        var result = sender.split(" ");
        //console.log(result);
        sender = result[0] + " from Exambazaar";
    }else{
        sender = "Ayush from Exambazaar";
    }
    var senderId = thisEmail.senderId;
    //sender = 'Always Exambazaar';
    var fromEmail = {
        email: from,
        name: sender
    };
    var to = thisEmail.to;
    var subject = thisEmail.subject;
    var publication = thisEmail.publication;
    var contactName = thisEmail.contact.name;
    var contactMobile = thisEmail.contact.mobile;
    
    if(!subject || subject == ''){
        subject = '[Press Release] Story coverage of Exambazaar (IIT-IIM alumni Jaipur based startup)';
    }
    var html = thisEmail.html;
    if(!html){
        html = ' ';
    }
    //console.log("To: " + to + " Subject: " + subject + " from: " + from);
    
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
                    var to_email2 = new helper.Email('gaurav@exambazaar.com');
                    //var subject = subject;
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    var subject2 = "Copy: " + subject;
                    var mail2 = new helper.Mail(fromEmail, subject2, to_email2, content);
                    mail.setTemplateId(templateId);
                    mail2.setTemplateId(templateId);
                    
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    var request2 = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail2.toJSON(),
                    });
                    sg.API(request, function(error, response) {
                        if(error){
                            console.log('Could not send email! ' + error);
                        }else{
                            sg.API(request2, function(error, response) {
                                if(!error){
                                    var this_email = new publicationemail({
                                    user: senderId,
                                    templateId: templateId,
                                    fromEmail: {
                                        email: from,
                                        name: sender
                                    },
                                    publication: publication,
                                    contact : {
                                        name: contactName,
                                        mobile: contactMobile,
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
                                    console.log('Email sent with id: ' + this_email._id);
                                    res.json(response);
                                });
                                    
                                    
                                    
                                }else{
                                    console.log('Could not send email! ' + error);
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



String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


module.exports = router;