var express = require('express');
var router = express.Router();
var request = require("request");

var config = require('../config/mydatabase.js');
var user = require('../app/models/user');
var coupon = require('../app/models/coupon');
var userrefer = require('../app/models/userrefer');
var email = require('../app/models/email');
var cisaved = require('../app/models/cisaved');
var mongoose = require('mongoose');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var helper = require('sendgrid').mail;
var sendGridCredential = require('../app/models/sendGridCredential');
var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');


function userCount(){
    user.count({}, function(err, docs) {
    if (!err){
        return doc;
    } else {throw err;}
    });
};

router.procmon = function(){
    var templateName = 'EB Internal - Procmon - 1';
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    
    var to = 'gaurav@exambazaar.com';
    
    sendGridCredential.findOne({'active': true},function (err, existingSendGridCredential) {
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
                    var html = ' ';
                    var timeNow = moment().format('LLLL');
                    var subject = 'EB Process Monitor -  Daily Summary ' + timeNow;
                    var content = new helper.Content('text/html', html);
                    
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-runtime-', timeNow));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-usersaddedtoday-', 10));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-totalusers-', 1000));
                    var emailrequest = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(emailrequest, function(error, response) {
                        if(error){
                            console.log('Could not send email! ' + error);
                        }else{
                            //res.json('Done');
                            console.log(response);
                        }
                    });
                }
                if(counter == nLength){
                    if(!templateFound){
                        console.log('Could not send email as there is no template with name: ' + templateName);
                    }
                }
            });
            if(nLength == 0){
                if(!templateFound){
                    console.log('Could not send email as there is no template with name: ' + templateName);
                }
            }
        }else{
            console.log('No Active SendGrid API Key');
        }
    });
};
router.timestamp = function() {
	console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000))
};

module.exports = router;