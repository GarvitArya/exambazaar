var express = require('express');
var router = express.Router();
var request = require("request");

var config = require('../config/mydatabase.js');
var user = require('../app/models/user');
var view = require('../app/models/view');
var college = require('../app/models/college');
var tofillci = require('../app/models/tofillci');
var toverifyci = require('../app/models/toverifyci');
var tofillcollege = require('../app/models/tofillcollege');
var addContactInfo = require('../app/models/addContactInfo');
var coupon = require('../app/models/coupon');
var userrefer = require('../app/models/userrefer');
var email = require('../app/models/email');
var cisaved = require('../app/models/cisaved');
var question = require('../app/models/question');
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

function titleCase(str) {
  str = str.toLowerCase();
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

router.get('/properNames', function(req, res) {
    //_created: {  $gte : start, $lte : end}
    console.log('Proper Names Process starting:');
    var allUsers = user.find({}, {basic:1}, function(err, allUsers) {
    if (!err){
        allUsers.forEach(function(thisUser, index){
            var thisName = thisUser.basic.name;
            if(!thisName){
                thisName = "EB User"
            }
            var properName = titleCase(thisName);
            if(properName != thisName){
                console.log(thisName + " -> " + properName + " " + thisUser._id);
                thisUser.basic.name = properName;
                thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                    console.log('User saved: ' + thisUser._id);
                });
            }
            
        });
        
        res.json(true);
    } else {throw err;}
    });
});

function sendVerification(user){
    //console.log("User is: " + user);
    if(user.email){
    var templateName = 'Verification Email';
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    var to = user.email;
    var username = user.basic.name;
    var userid = user._id;
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
                    var html = ' ';
                    var subject = ' ';
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-userid-', userid));
                    var emailrequest = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(emailrequest, function(error, response) {
                        if(error){
                            console.log('Could not send email! ' + error);
                        }else{
                            console.log(response);
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
    }else{
        console.log('User not set');
    }
    
    if(user.mobile){
        console.log("Sending Welcome SMS");
        var message = "Hi " + user.basic.name + "\nWe are so happy you are here!\n\nThank you for signing up and check our exclusive discounts at Exambazaar.com\n https://www.exambazaar.com/review";
        
        //console.log(message.length + " " + message);
        var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=Amplifier@9&mobile=";
        url += user.mobile;
        url += "&message=";
        url += message;
        url += "&sender=EXMBZR&type=3";
        request({
                url: url,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body); // Print the json response
                }else{
                    console.log(error + " " + response);
                }
        });
        
        
        
    }else{
        console.log("No user mobile set");
    }
};

//to run procmon service
router.post('/procmon', function(req, res) {
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
                    var subject = ' ';
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
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
                            res.json('Done');
                            console.log(response);
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


function sendReferralSMS(smsForm){
    var user = smsForm.user;
    var mobiles = smsForm.mobiles;
    var message = smsForm.message;
    console.log("Sending SMSs");
    console.log(smsForm);
    
    /*var sendmobiles = smsForm.mobiles.map(function(a) {return a.mobile;});
    var mobilesString = "";
    sendmobiles.forEach(function(thisMobile, index){
        mobilesString += thisMobile + ",";
    });
    */
    
    mobiles.forEach(function(thisMobile, index){
        var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=Amplifier@9&mobile=";
        url += thisMobile.mobile;
        url += "&message=";
        url += message;
        url += "&sender=EXMBZR&type=3";
        console.log(url);
        request({
                url: url,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("Message sent to: " + thisMobile.mobile); // Print the json response
                    var thisUserRefer = userrefer
                    .findOne({ 'mobile': thisMobile.mobile },{mobile:1})
                    .exec(function (err, thisUserRefer) {
                    if (!err){
                        if(thisUserRefer){
                            console.log('Already Referred');
                        }else{
                            var newUserRefer = new userrefer({
                                user: user,
                                mobile: thisMobile.mobile
                            });
                            
                            newUserRefer.save(function(err, newUserRefer) {
                                if (err) return console.error(err);
                                console.log(newUserRefer._id);
                                
                            });
                            //res.send(true);
                        }
                    }
                    });
                    
                    
                }else{
                    console.log(error + " " + response);
                }
        });
    });
};

router.post('/sendReferrals', function(req, res) {
    var referralForm = req.body;
    var message = referralForm.message;
    var mobiles = referralForm.mobiles;
    var userId = referralForm.user;
    console.log("Sending Referrals");
    console.log(referralForm);
    var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1},function (err, thisUser) {
        if (!err){
        
            if(!thisUser._id){
                console.log('User does not exist');
                res.json(null);
            }else{
                var smsForm = {
                    message: message,
                    mobiles: mobiles,
                    user: userId,
                }
                console.log("Sending SMS with form");
                console.log(smsForm);
                sendReferralSMS(smsForm);
                res.json(true);
            }
        } else {throw err;}
    });
    
    
});



function sendVoucher(voucherForm){
    var user = voucherForm.user;
    var provider = voucherForm.provider;
    var coupon = voucherForm.coupon;
    
    //console.log("Voucher Form is: " + JSON.stringify(voucherForm));
    
    if(user.email){
    var templateName = 'Voucher Email';
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    var to = user.email;
    var username = user.basic.name;
    var couponprovider = provider.name;
    var usercode = coupon.delivered.usercode;
    if(!usercode){
        usercode = "";
    }
    var steps = ['','','',''];
    coupon.steps.forEach(function(thisStep, index){
        var stepNo = index + 1;
        steps[index] = stepNo + ". " + thisStep;
    });
    //console.log(steps);
    var discount = '';
    discount = discount + " " + coupon.discountType;
        
    if(coupon.discountType == 'Percentage Discount'){
        var nonsocial = coupon.percentageDiscount - coupon.percentageSocialShareBenefit;
        if(coupon.delivered.social){
            discount = discount + " of " + coupon.percentageDiscount +"%";
        }else{
            discount = discount + " of " + nonsocial +"%";
        }
    }    
    if(coupon.discountType == 'Flat Discount'){
        var nonsocial = coupon.flatDiscount - coupon.flatSocialShareBenefit;
        if(coupon.delivered.social){
            discount = discount + " of " + coupon.flatDiscount +"Rs";
        }else{
            discount = discount + " of " + nonsocial +"%";
        }
    }        
    discount = discount + " on " + coupon.validfor;
    var expiry = moment(coupon.delivered._expiryDate).format("dddd, MMMM Do YYYY");
    var couponname =coupon.name; moment(coupon.delivered._expiryDate).format("dddd, MMMM Do YYYY");
    expiry = "Offer expires on " + expiry;  
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
                    var html = ' ';
                    var subject = ' ';
                    var content = new helper.Content('text/html', html);
                    var mail = new helper.Mail(fromEmail, subject, to_email, content);
                    mail.setTemplateId(templateId);
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-username-', username));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-couponprovider-', couponprovider));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-usercode-', usercode));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-couponname-', couponname));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-discount-', discount));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-expiry-', expiry));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-step1-', steps[0]));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-step2-', steps[1]));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-step3-', steps[2]));
                    mail.personalizations[0].addSubstitution(new helper.Substitution('-step4-', steps[3]));
                   
                    
                    
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(request, function(error, response) {
                        if(error){
                            console.log('Could not send email! ' + error);
                        }else{
                            console.log('Email sent');
                            console.log(response);
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
    }else{
        console.log('User email not set');
    }
    
    if(user.mobile){
        console.log("Sending Voucher SMS");
        
        var message = user.basic.name + ", congratulations your promo code for " + provider.name + " is " + coupon.delivered.usercode + "\n Spread the joy to your friends and family. https://www.exambazaar.com";
        
        
        var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=Amplifier@9&mobile=";
        url += user.mobile;
        url += "&message=";
        url += message;
        url += "&sender=EXMBZR&type=3";
        request({
                url: url,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body); // Print the json response
                }else{
                    console.log(error + " " + response);
                }
        });
        
        
        
    }else{
        console.log("No user mobile set");
    }
};

router.post('/deliverVoucher', function(req, res) {
    var voucherForm = req.body;
    var userId = voucherForm.user;
    var couponId = voucherForm.coupon;
    
    var thisUser = user.findOne({ '_id': userId },{mobile:1, email:1, basic:1},function (err, thisUser) {
        if (!err){
        
            if(!thisUser._id){
                console.log('User does not exist');
                res.json(null);
            }else{
            var thisCoupon = coupon.findOne({_id: couponId },function (err, thisCoupon) {
            if (!err){
                if(!thisCoupon._id){
                    console.log('Coupon does not exist');
                    res.json(null);
                }else{
                    var providerId = thisCoupon.provider;
                    var thisProvider = targetStudyProvider.findOne({ '_id': providerId }, {name:1, logo:1},function (err, thisProvider) {
                    if (!err){
                        if(!thisProvider._id){
                            console.log('Coupon does not exist');
                            res.json(null);
                        }else{
                            var voucherForm = {
                                user: thisUser,
                                coupon: thisCoupon,
                                provider: thisProvider,
                            };
                            sendVoucher(voucherForm);
                            /*console.log(JSON.stringify(thisUser));
                            console.log(JSON.stringify(thisCoupon));
                            console.log(JSON.stringify(thisProvider));*/
                            res.json(true);
                        }
                    } else {throw err;}
                    });

                }
            } else {throw err;}
            });    



            }
        } else {throw err;}
    });
    
    
});


//to add a user
router.post('/save', function(req, res) {
    var thisUser = req.body;
    //console.log("User is: " + JSON.stringify(thisUser));
    var mobileNumber;
    var userEmail;
    
    if(thisUser.contact && thisUser.contact.mobile){
        mobileNumber = thisUser.contact.mobile;
    }
    if(thisUser && thisUser.mobile){
        //console.log('Here');
        mobileNumber = thisUser.mobile;
    }
    if(thisUser.contact && thisUser.contact.email){
        userEmail = thisUser.contact.email;
    }
    if(thisUser && thisUser.email){
        userEmail = thisUser.email;
    }
    if(thisUser && thisUser.basic && thisUser.basic.name){
        thisUser.basic.name = titleCase(thisUser.basic.name);
    }
    //console.log(mobileNumber);
    
    
    if(mobileNumber){
        var existingUser = user.findOne({ 'mobile': mobileNumber },function (err, existingUser) {
            if(existingUser){
                //console.log('I am existing');
                res.json(existingUser);
            }else{
                //console.log('I do not exist');
                var hash = bcrypt.hashSync(thisUser.password, bcrypt.genSaltSync(10));
                var this_user = new user({
                    userType : thisUser.userType,
                    password : hash,
                    
                    mobile: mobileNumber,
                    email: userEmail,
                    verified: thisUser.verified
                });
                if(thisUser && thisUser.name){
                    console.log('Adding Name ' +thisUser.name );
                    this_user.basic ={
                        name: titleCase(thisUser.name)
                    }
                }
                if(thisUser.partner){
                    this_user.partner = [thisUser.partner];
                }
                if(thisUser.basic){
                    this_user.basic = thisUser.basic;
                }
                console.log(JSON.stringify(this_user));
                this_user.save(function(err, this_user) {
                    if (err) return console.error(err);
                    sendVerification(this_user);
                    console.log(this_user._id);
                    res.json(this_user);
                });
            }

        });
    }else{
        res.json([]);
    }
});

router.post('/fbSave', function(req, res) {
    var thisUser = req.body;
    
    var userId = thisUser._id || null;
    
    var thisFbUser = thisUser.fbuser;
    var facebookId = thisFbUser.facebook.id;
    var fbProperties = [];
    
    
    if(userId){
        var existingUser = user.findOne({ '_id': userId },function (err, existingUser) {
            if(!existingUser){
                
                existingUser= new user({});
                existingUser.userType = 'Student';
                existingUser.facebookId = thisFbUser.facebook.id;
                existingUser.facebook = {
                    link: thisFbUser.facebook.link,
                    accessToken: thisFbUser.facebook.accessToken
                };
                
                if(thisFbUser.gender){
                    existingUser.basic.gender = thisFbUser.gender;
                }
                if(thisFbUser.name){
                    existingUser.basic.name = titleCase(thisFbUser.name);
                }
                if(thisFbUser.image){
                    if(existingUser.image){
                        existingUser.fbimage = thisFbUser.image;
                    }else{
                        existingUser.image = thisFbUser.image;
                        existingUser.fbimage = thisFbUser.image;
                    } 
                }
                if(thisFbUser.email){
                    if(existingUser.email){
                        existingUser.fbemail = thisFbUser.email;
                    }else{
                        existingUser.email = thisFbUser.email;
                        existingUser.fbemail = thisFbUser.email;
                    } 
                }
                console.log(JSON.stringify(existingUser));
                existingUser.save(function(err, existingUser) {
                    if (err) return console.error(err);
                    existingUser.logins = [];
                    res.json(existingUser);
                });
                
            }else{
                console.log('User exists - linking FB');
                console.log(JSON.stringify(existingUser));
                existingUser.facebookId = thisFbUser.facebook.id;
                
                
                existingUser.facebook = {
                    link: thisFbUser.facebook.link,
                    accessToken: thisFbUser.facebook.accessToken
                };
                
                if(thisFbUser.gender){
                    existingUser.basic.gender = thisFbUser.gender;
                }
                if(thisFbUser.name){
                    existingUser.basic.name = titleCase(thisFbUser.name);
                }
                if(thisFbUser.image){
                    if(existingUser.image){
                        existingUser.fbimage = thisFbUser.image;
                    }else{
                        existingUser.image = thisFbUser.image;
                        existingUser.fbimage = thisFbUser.image;
                    } 
                }
                if(thisFbUser.email){
                    if(existingUser.email){
                        existingUser.fbemail = thisFbUser.email;
                    }else{
                        existingUser.email = thisFbUser.email;
                        existingUser.fbemail = thisFbUser.email;
                    } 
                }
                
                existingUser.save(function(err, existingUser) {
                    if (err) return console.error(err);
                    console.log('User saved: ' + existingUser._id);
                    
                    existingUser.logins = [];
                    res.json(existingUser);
                });
            }

        });
        
        
    }else{
        var existingUser = user.findOne({ 'facebookId': facebookId },function (err, existingUser) {
        if(!existingUser){
            console.log('FB login user does not exist');
            
            existingUser= new user({});
            existingUser.userType = 'Student';
            existingUser.facebookId = thisFbUser.facebook.id;
            existingUser.facebook = {
                link: thisFbUser.facebook.link,
                accessToken: thisFbUser.facebook.accessToken
            };
            
            
            if(thisFbUser.gender){
                existingUser.basic.gender = thisFbUser.gender;
            }
            if(thisFbUser.name){
                existingUser.basic.name = titleCase(thisFbUser.name);
            }
            if(thisFbUser.image){
                if(existingUser.image){
                    existingUser.fbimage = thisFbUser.image;
                }else{
                    existingUser.image = thisFbUser.image;
                    existingUser.fbimage = thisFbUser.image;
                } 
            }
            if(thisFbUser.email){
                if(existingUser.email){
                    existingUser.fbemail = thisFbUser.email;
                }else{
                    existingUser.email = thisFbUser.email;
                    existingUser.fbemail = thisFbUser.email;
                } 
            }
            console.log(JSON.stringify(existingUser));
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                sendVerification(existingUser);
                res.json(existingUser);
            });

        }else{
            console.log('FB login user exists');
            
            existingUser.facebook = {
                link: thisFbUser.facebook.link,
                accessToken: thisFbUser.facebook.accessToken
            };

            if(thisFbUser.gender){
                existingUser.basic.gender = thisFbUser.gender;
            }
            if(thisFbUser.name){
                existingUser.basic.name = titleCase(thisFbUser.name);
            }
            if(thisFbUser.image){
                if(existingUser.image){
                    existingUser.fbimage = thisFbUser.image;
                }else{
                    existingUser.image = thisFbUser.image;
                    existingUser.fbimage = thisFbUser.image;
                } 
            }
            if(thisFbUser.email){
                if(existingUser.email){
                    existingUser.fbemail = thisFbUser.email;
                }else{
                    existingUser.email = thisFbUser.email;
                    existingUser.fbemail = thisFbUser.email;
                } 
            }

            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser);
            });
        }

    });
    }
    
    
});

router.post('/update', function(req, res) {
    var thisUser = req.body;
    var userId = thisUser._id;
    
    var existingUser = user.findOne({ '_id': userId },function (err, existingUser) {
        if (err) return console.error(err);
        for (var property in thisUser) {
            existingUser[property] = thisUser[property];
        }
        existingUser.save(function(err, existingUser) {
            if (err) return console.error(err);
            res.json(existingUser._id);
        });
        
    });
});

//to get all users
router.get('/', function(req, res) {
    var start = moment().subtract(2, 'year').startOf('day');
    var end = moment().endOf('day');
    
    user.find({_created: {  $gte : start, $lte : end}}, {userType: 1, basic: 1, mobile: 1, facebook: 1, email: 1, image: 1, fbemail: 1, fbimage: 1, _created: 1}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/allBloggers', function(req, res) {
    
    
    user.find({blogger: {$exists: true}, $where:'this.blogger.active==true'}, {basic: 1}, function(err, docs) {
    if (!err){
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/dailySummary', function(req, res) {
    var userSummary = user.aggregate(
    [
        {$match: {}},
        {$group: { _id : {
            year:{$year:"$_created"},
            month:{$month:"$_created"},
            day:{$dayOfMonth:"$_created"}
        },count:{$sum: 1 }},
        }
    ],function(err, userSummary) {
    if (!err){
        res.json(userSummary);
    } else {throw err;}
    });
});

router.get('/hourlyHeatmap', function(req, res) {
    
    var userSummary = user.aggregate(
    [
        {$match: {}},
        {$group: { _id : {
            hour:{$hour:"$_created"},
        },count:{$sum: 1 }},
        }
    ],function(err, userSummary) {
    if (!err){
        res.json(userSummary);
    } else {throw err;}
    });
});

router.get('/query/:query', function(req, res) {
    var query = req.params.query;
    //console.log(query);
    user.find({"basic.name":{'$regex' : query, '$options' : 'i'}}, {basic:1, blogger:1, image:1, userType:1, mobile:1, email:1, facebook:1, partner: 1},function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.get('/count', function(req, res) {
    user.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
router.get('/studentcount', function(req, res) {
    user.count({userType:'Student'}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/verfiedCount', function(req, res) {
    user.count({verified: true}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.post('/addPic', function(req, res) {
    var newPicForm = req.body;
    var userId = newPicForm.userId;
    var image = newPicForm.image;
    
    console.log("New Pic Form is: " + JSON.stringify(newPicForm));
    
    var existingUser = user.findOne({ '_id': userId },{image:1},function (err, existingUser) {
        if(image){
            existingUser.image = image;
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser._id);
            });
        }
    });
});

router.post('/addBlogGalleryPic', function(req, res) {
    var newPicForm = req.body;
    var userId = newPicForm.userId;
    var image = newPicForm.image;
    
    console.log("New Pic Form is: " + JSON.stringify(newPicForm));
    
    var existingUser = user.findOne({ '_id': userId },{blogger:1},function (err, existingUser) {
        if(image){
            
            if(existingUser.blogger){
                var newImage = {
                    image: image,
                }
                existingUser.blogger.gallery.push(newImage);
            }else{
                existingUser.blogger = {
                    gallery: [],
                }
                var newImage = {
                    image: image,
                }
                existingUser.blogger.gallery.push(newImage);
            }
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser._id);
            });
        }else{
            res.json(false);
        }
    });
});

router.post('/removeBlogGalleryPic', function(req, res) {
    var newPicForm = req.body;
    var userId = newPicForm.userId;
    var image = newPicForm.image;
    
    console.log("New Pic Form is: " + JSON.stringify(newPicForm));
    
    var existingUser = user.findOne({ '_id': userId },{blogger:1},function (err, existingUser) {
        if(image && existingUser.blogger.gallery){
            var thisGallery = existingUser.blogger.gallery;
            var galleryImages = thisGallery.map(function(a) {return a.image;});
            
            var iIndex = galleryImages.indexOf(image);
            console.log("Image index is: " + iIndex);
            console.log("Image is: " + image);
            existingUser.blogger.gallery.splice(iIndex, 1);
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser._id);
            });
        }else{
            res.json(false);
        }
    });
});

router.post('/removeAllBlogGallery', function(req, res) {
    var newPicForm = req.body;
    var userId = newPicForm.userId;
    
    var existingUser = user.findOne({ '_id': userId },{blogger:1},function (err, existingUser) {
        if(existingUser.blogger.gallery){
            existingUser.blogger.gallery = [];
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser._id);
            });
        }else{
            res.json(false);
        }
    });
});

router.post('/shortlistInstitute', function(req, res) {
    var shortListForm = req.body;
    var userId = shortListForm.userId;
    var instituteId = shortListForm.instituteId;
    
    console.log("Shortlist Form is: " + JSON.stringify(shortListForm));
    
    var existingUser = user.findOne({ '_id': userId },{shortlisted:1},function (err, existingUser) {
        
        var shortListedInstitutes = existingUser.shortlisted.map(function(a) {return a._id;});
        //ABC
        var thisInstitute = targetStudyProvider
            .findOne({'_id': instituteId},{interested: 1})
            /*.deepPopulate('exams exams.stream location faculty.exams ebNote.user')*/
            .exec(function (err, thisInstitute) {
            if (!err){
                console.log(thisInstitute);
                var interested = thisInstitute.interested;
                if(interested.length > 0){
                    var interestedIds = interested.map(function(a) {return a.user;});
                }else{
                    var interestedIds = [];
                }
                
                
                var interestIndex = interestedIds.indexOf(userId.toString());
                if(interestIndex == -1){
                    var newInterest ={
                        user: userId
                    };
                    interested.push(newInterest);
                    thisInstitute.interested = interested;
                    thisInstitute.save(function(err, thisInstitute) {
                        if (err) return console.error(err);
                        console.log("Interest added to this institute " + thisInstitute._id);
                    });
                }else{
                    //if interest was inactive. make it active
                }
            }
                
            }); 
        
        
        if(shortListedInstitutes.indexOf(instituteId) == -1){
            existingUser.shortlisted.push(instituteId);
            console.log('Shortlisting institute ' + instituteId + ' for ' + userId);
            existingUser.save(function(err, existingUser) {
                if (err) return console.error(err);
                res.json(existingUser._id);
            });
        }
        
    });
});

router.get('/userexists/:mobile', function(req, res) {
    var mobile = req.params.mobile;
    var thisUser = user
        .findOne({ 'mobile': mobile },{name:1})
        .exec(function (err, thisUser) {
        if (!err){
            if(!thisUser){
                console.log('User with mobile ' + mobile + ' does not exist');
                res.send(false);
            }else{
                console.log('User with mobile ' + mobile + ' already exists!');
                res.send(true);
            }
            
            
        } else {throw err;}
    });
    
});

router.get('/verifyEmail/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{emailverified:1})
        .exec(function (err, thisUser) {
        if (!err){
            if(!thisUser){
                res.send(false);
            }else{
                if(thisUser.emailverified){
                    res.send(true);
                }else{
                    res.send(false);
                }
                
            }
        } else {throw err;}
    });
});

router.get('/markVerifiedEmail/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{emailverified:1})
        .exec(function (err, thisUser) {
        if (!err){
            if(!thisUser){
                res.json(null);
            }else{
                if(thisUser.emailverified){
                    res.json(true);
                }else{
                    thisUser.emailverified = true;
                    thisUser.save(function(err, thisUser) {
                        if (err) return console.error(err);
                        console.log('User email verified: ' + thisUser.basic.name);
                        res.json(true);
                    });
                }
                
            }
        } else {throw err;}
    });
});
router.get('/referexists/:mobile', function(req, res) {
    var mobile = req.params.mobile;
    var thisUser = user
        .findOne({ 'mobile': mobile },{mobile:1})
        .exec(function (err, thisUser) {
        if (!err){
            //console.log(thisUser);
            if(!thisUser || thisUser.length==0){
                var thisUserRefer = userrefer
                .findOne({ 'mobile': mobile },{mobile:1})
                .exec(function (err, thisUserRefer) {
                if (!err){
                    if(!thisUserRefer || thisUserRefer.length==0){
                        res.send(false);
                    }else{
                        res.send(true);
                    }
                }
                });
            }else{
                res.send(true);
            }
        } else {throw err;}
    }); 
});

router.post('/saveEligibility', function(req, res) {
    var eligibilityForm = req.body;
    var userId = eligibilityForm.user;
    var eligibility = eligibilityForm.eligibility;
    var thisUser = user
        .findOne({ '_id': userId },{eligibility:1, basic:1})
        .exec(function (err, thisUser) {
        if (!err){
            if(thisUser){
                if(!thisUser.eligibility){
                    thisUser.eligibility = {};
                }
                thisUser.eligibility = eligibility;
                thisUser.save(function(err, thisUser) {
                    if (err) return console.error(err);
                    console.log('User saved: ' + thisUser.basic.name);
                    res.json(true);
                });
            }else{
                res.json(null);    
            }
        } else {throw err;}
    });
    
});
router.get('/getEligibility/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{eligibility:1})
        .exec(function (err, thisUser) {
        if (!err){
            if(thisUser){
                res.json(thisUser);
            }else{
                res.json(null);    
            }
        } else {throw err;}
    });
    
});
router.post('/markLatLng', function(req, res) {
    //console.log('Here');
    var positionForm = req.body;
    var userId = positionForm.userId;
    var latlng = positionForm.latlng;
    //console.log('Here');
    //console.log('Position form is: ' + positionForm);
    var thisUser = user
        .findOne({ '_id': userId },{latlng:1})
        .exec(function (err, thisUser) {
        if (!err){
            
            if(latlng){
                thisUser.latlng = latlng;
                thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                    //console.log('User login at: ' + newLogin.loginTime);
                });
                
            }
            res.json("Done");
        } else {throw err;}
    });
    
});

router.post('/markLogin', function(req, res) {
    //console.log('Here');
    var loginForm = req.body;
    var userId = loginForm.userId;
    var ip = loginForm.ip;
    
    console.log('Login form is: ' + loginForm);
    var thisUser = user
        .findOne({ '_id': userId },{logins:1})
        .exec(function (err, thisUser) {
        if (!err){
            
            var loginDateTime = moment().toDate();
            var newLogin = {
                loginTime: loginDateTime
            };
            if(ip){
                newLogin.ip = ip;
            }
            if(!thisUser.logins){
                thisUser.logins =[newLogin];
            }else{
                //console.log(thisUser.logins);
                if(thisUser.logins.length == 0){
                    thisUser.logins =[newLogin];
                    //thisUser.logins.push(loginTime);
                }else{
                    thisUser.logins.push(newLogin);
                }
            }
            
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                console.log('User login at: ' + newLogin.loginTime);
            });
            res.json("User login added");
            
        } else {throw err;}
    });
    
});


//to get a particular user with _id userId
router.get('/edit/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    
    user
        .findOne({ '_id': userId },{logins:0})
        //.deepPopulate('partner')
        .exec(function (err, thisuser) {
        if (!err){
            if(thisuser){
                if(thisuser.location){
                    if(thisuser.location.length == 0){
                        thisuser.location = null;
                    }else{
                        thisuser.location = [thisuser.location[thisuser.location.length - 1]];
                    }
                }else{
                    thisuser.location = null;
                }
                
                res.json(thisuser);
            }else{
                res.json(null);
            }
            
            
            //process.exit();
        } else {throw err;}
    });
});

router.get('/blogger/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    
    user
        .findOne({ '_id': userId },{blogger:1})
        //.deepPopulate('partner')
        .exec(function (err, thisuser) {
        if (!err){
            res.json(thisuser);
            //process.exit();
        } else {throw err;}
    });
});
router.get('/activateIntern/:userId', function(req, res) {
    
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{basic:1, blogger:1, image:1, userType:1, mobile:1, email:1})
        .exec(function (err, thisUser) {
        if (!err){
            thisUser.userType = 'Intern - Business Development';
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                console.log('Intern Activated: ' + thisUser.basic.name);
                res.json(thisUser);
            });
        } else {throw err;}
    });
});
router.get('/deactivateIntern/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{basic:1, blogger:1, image:1, userType:1, mobile:1, email:1})
        .exec(function (err, thisUser) {
        if (!err){
            thisUser.userType = 'Student';
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                console.log('Intern deactivated: ' + thisUser.basic.name);
                res.json(thisUser);
            });
        } else {throw err;}
    });
});

function closeFillCI(userId, pastInternId, res){
    console.log('Starting close fills process:');
    var allElements = tofillci
    .find({user: userId, active: false},{user:1})
    .exec(function (err, allElements) {
    if (!err){
        var nElements = allElements.length;
        var eCounter = 0;
        allElements.forEach(function(thisElement, index){
            thisElement.user = pastInternId;
            thisElement.save(function(err, thisElement) {
                if (err) return console.error(err);
                console.log('To fill CI closed: ' + thisElement._id);
                eCounter += 1;

                if(eCounter == nElements){
                    res.tofillci = true;
                    res.tofillciCount = nElements;
                    closeVerifyCI(userId, pastInternId, res);
                }
            });
        });
        if(nElements == 0){
            res.tofillci = true;
            res.tofillciCount = 0;
            closeVerifyCI(userId, pastInternId, res);
        }
    } else {throw err;}
    });
};
function closeVerifyCI(userId, pastInternId, res){
    console.log('Starting close verify process:');
    var allElements = toverifyci
    .find({user: userId, active: false},{user:1})
    .exec(function (err, allElements) {
    if (!err){
        var nElements = allElements.length;
        var eCounter = 0;
        allElements.forEach(function(thisElement, index){
            thisElement.user = pastInternId;
            thisElement.save(function(err, thisElement) {
                if (err) return console.error(err);
                console.log('To verify CI closed: ' + thisElement._id);
                eCounter += 1;

                if(eCounter == nElements){
                    res.toverifyci = true;
                    res.toverifyciCount = nElements;
                    closeFillCollege(userId, pastInternId, res);
                }
            });
        });
        if(nElements == 0){
            res.toverifyci = true;
            res.toverifyciCount = 0;
            closeCreatedCI(userId, pastInternId, res);
        }
    } else {throw err;}
    });
};

function closeFillCollege(userId, pastInternId, res){
    console.log('Starting close fill college process:');
    var allElements = tofillcollege
    .find({user: userId, active: false},{user:1})
    .exec(function (err, allElements) {
    if (!err){
        var nElements = allElements.length;
        var eCounter = 0;
        allElements.forEach(function(thisElement, index){
            thisElement.user = pastInternId;
            thisElement.save(function(err, thisElement) {
                if (err) return console.error(err);
                console.log('To verify CI closed: ' + thisElement._id);
                eCounter += 1;

                if(eCounter == nElements){
                    res.toverifyci = true;
                    res.toverifyciCount = nElements;
                    closeContactCI(userId, pastInternId, res);
                }
            });
        });
        if(nElements == 0){
            res.tofillcollege = true;
            res.tofillcollegeCount = 0;
            closeCreatedCI(userId, pastInternId, res);
        }
    } else {throw err;}
    });
};
function closeCreatedCI(userId, pastInternId, res){
    console.log('Starting Coaching created by process:');
    var allElements = targetStudyProvider
    .find({_createdBy: userId},{_createdBy:1})
    .exec(function (err, allElements) {
    if (!err){
        var nElements = allElements.length;
        var eCounter = 0;
        allElements.forEach(function(thisElement, index){
            thisElement._createdBy = pastInternId;
            thisElement.save(function(err, thisElement) {
                if (err) return console.error(err);
                console.log('Creation of CI closed: ' + thisElement._id);
                eCounter += 1;

                if(eCounter == nElements){
                    res.createdCI = true;
                    res.createdciCount = nElements;
                    closeCreatedQuestion(userId, pastInternId, res);
                }
            });
        });
        if(nElements == 0){
            res.createdCI = true;
            res.createdciCount = 0;
            closeCreatedQuestion(userId, pastInternId, res);
        }
    } else {throw err;}
    });
};

function closeCreatedQuestion(userId, pastInternId, res){
    console.log('Starting Question created by process:');
    var allElements = question
    .find({_createdBy: userId},{_createdBy:1})
    .exec(function (err, allElements) {
    if (!err){
        var nElements = allElements.length;
        var eCounter = 0;
        allElements.forEach(function(thisElement, index){
            thisElement._createdBy = pastInternId;
            thisElement.save(function(err, thisElement) {
                if (err) return console.error(err);
                console.log('Creation of Question closed: ' + thisElement._id);
                eCounter += 1;

                if(eCounter == nElements){
                    res.createdQuestion = true;
                    res.createdquestionCount = nElements;
                    closeContactCI(userId, pastInternId, res);
                }
            });
        });
        if(nElements == 0){
            res.createdQuestion = true;
            res.createdquestionCount = 0;
            closeContactCI(userId, pastInternId, res);
        }
    } else {throw err;}
    });
};

function closeContactCI(userId, pastInternId, res){
    console.log('Starting close contacts process:');
    var allElements = addContactInfo
    .find({user: userId, active: false},{user:1})
    .exec(function (err, allElements) {
    if (!err){
        var nElements = allElements.length;
        var eCounter = 0;
        allElements.forEach(function(thisElement, index){
            thisElement.user = pastInternId;
            thisElement.save(function(err, thisElement) {
                if (err) return console.error(err);
                console.log('Contact CI closed: ' + thisElement._id);
                eCounter += 1;

                if(eCounter == nElements){
                    res.addContactInfo = true;
                    res.addContactInfoCount = nElements;
                    
                    var thisUser = user
                        .findOne({ '_id': userId, userType:'Intern - Business Development' },{userType:1, basic: 1})
                        .exec(function (err, thisUser) {
                        if (!err){
                            if(thisUser){
                                thisUser.userType = 'Student';
                                thisUser.save(function(err, thisUser) {
                                    if (err) return console.error(err);
                                    console.log('Internship completely closed: ' + thisUser.basic.name);
                                    console.log(JSON.stringify(res));
                                    //console.log(thisUser);
                                    return(thisUser);
                                });
                            }
                            else{
                                return(false);
                            }

                        } else {throw err;}
                    });
                    
                }
            });
        });
        if(nElements == 0){
            res.addContactInfo = true;
            res.addContactInfoCount = 0;
            
            var thisUser = user
                .findOne({ '_id': userId, userType:'Intern - Business Development' },{userType:1, basic: 1})
                .exec(function (err, thisUser) {
                if (!err){
                    if(thisUser){
                        thisUser.userType = 'Student';
                        thisUser.save(function(err, thisUser) {
                            if (err) return console.error(err);
                            console.log('Internship completely closed: ' + thisUser.basic.name);
                            console.log(JSON.stringify(res));
                            //console.log(thisUser);
                            return(thisUser);
                        });
                    }
                    else{
                        return(false);
                    }

                } else {throw err;}
            });
        }
    } else {throw err;}
    });
};


router.get('/closeInternship/:userId', function(req, res) {
    var pastInternId = '59a7eb973d71f10170dbb468';
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId, userType:'Intern - Business Development' },{userType:1, basic: 1})
        .exec(function (err, thisUser) {
        if (!err){
            if(thisUser){
                console.log('Starting close internship process:');
                closeFillCI(userId, pastInternId, {}, function(err, summary) {
                    console.log('Summary is: ' + JSON.stringify(summary));
                    res.json(summary);
                });
            }
            else{
                res.json(false);
            }
            
        } else {throw err;}
    });
});

router.get('/activateBlogger/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{basic:1, blogger:1, image:1, userType:1, mobile:1, email:1})
        .exec(function (err, thisUser) {
        if (!err){
            thisUser.blogger.active = true;
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                res.json(thisUser);
            });
        } else {throw err;}
    });
});
router.get('/deactivateBlogger/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{basic:1, blogger:1, image:1, userType:1, mobile:1, email:1})
        .exec(function (err, thisUser) {
        if (!err){
            thisUser.blogger.active = false;
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                res.json(thisUser);
            });
        } else {throw err;}
    });
});

router.get('/activeUsers/:nDays', function(req, res) {
    var nDays = req.params.nDays;
    console.log(nDays);
    if(!nDays){
        nDays = 7;
    }
    var start = moment().subtract(nDays, 'day').startOf('day').toDate();
    var end = moment().endOf('day').toDate();
    
    //, _date: {  $gte : start, $lte : end} 
    //state:'claim',_date:{  $gte : start, $lte : end}
    var activeUsers = view.aggregate(
    [
        {$match: { user: {$exists: true}, _date: {  $gte : start, $lte : end}} },
        {"$group": { "_id": { user: "$user" }, count:{$sum:1}, institute: { $addToSet: "$institute" } } },
        {$sort:{"count":-1}}

    ],function(err, activeUsers) {
    if (!err){
        var nUsers = activeUsers.length;
        console.log(start + " " + end + " " + nUsers);
        var counter = 0;
        
        var resArray = [];
        activeUsers.forEach(function(thisUser, index){
            var userId = thisUser._id.user;
            var basicUser = user
                .findOne({ '_id': userId },{basic:1, facebook:1, image:1, userType:1, mobile:1, email:1})
                .exec(function (err, basicUser) {
                if (!err){
                    counter += 1;
                    if(thisUser.count > 5){
                       var newActiveUser = {
                            user: basicUser,   
                            count: thisUser.count,   
                            institutes: thisUser.institute,   
                        };
                        resArray.push(newActiveUser);
                    }
                    
                    if(counter == nUsers){
                        //console.log(resArray.length);
                        res.json(resArray);
                    }
                } else {throw err;}
            });
        });
        if(nUsers == 0){
            //console.log(resArray);
            res.json(resArray);
        }
    } else {throw err;}
    });

});

//to get a particular user with _id userId
router.get('/emails/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    
    email
        .find({ 'user': userId },{logins:0})
        .deepPopulate('institute')
        .exec(function (err, allFullEmails) {
        if (!err){
            var nLength = allFullEmails.length;
            var counter = 0;
            var allEmails = [];
            allFullEmails.forEach(function(thisEmail, index){
                counter = counter + 1;
                var instituteBasic = {
                    _id:  thisEmail.institute._id,
                    name:  thisEmail.institute.name,
                    address:  thisEmail.institute.address,
                    city:  thisEmail.institute.city,
                    state:  thisEmail.institute.state,
                    logo:  thisEmail.institute.logo
                    
                };
                thisEmail.institute = instituteBasic;
                allEmails.push(thisEmail);
                if(counter == nLength){
                    //console.log(JSON.stringify(allEmails));
                    
                    res.json(allEmails);
                }
                
            });
            if(nLength == 0){
                    res.json([]);
            }
            //process.exit();
        } else {throw err;}
    });
});
//to get a particular user with _id userId
router.get('/interns', function(req, res) {
    //console.log('Getting all interns');
    user
        .find({ 'userType': 'Intern - Business Development' },{basic:1, active:1})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/ebteam', function(req, res) {
    //console.log('Getting all interns');
    user
        .find({ $or: [ { userType: 'Intern - Business Development'}, { userType: 'Master' } ] },{basic:1})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/editPartner/:userId', function(req, res) {
    var userId = req.params.userId;
    //console.log("User is " + userId);
    user
        .findOne({ '_id': userId },{})
        .deepPopulate('partner partner.location')
        .exec(function (err, thisUser) {
        if (!err){
            //console.log(thisUser);
            res.json(thisUser);
        } else {throw err;}
    });
});
router.get('/editPartnerBasic/:userId', function(req, res) {
    var userId = req.params.userId;
    console.log("User is " + userId);
    user
        .findOne({ '_id': userId },{userType: 1, partner: 1})
        .deepPopulate('partner')
        .exec(function (err, thisUser) {
        if (!err){ 
            if(thisUser.userType == 'Partner'){
                var partnersFull = thisUser.partner;
                var counter = 0;
                var nLength = partnersFull.length;
                var partnersBasic = [];
                partnersFull.forEach(function(thisPartner, partnerIndex){
                    var newPartnerBasic = {
                        _id: thisPartner._id,
                        name: thisPartner.name,
                        city: thisPartner.city,
                    };
                    counter = counter + 1;
                    partnersBasic.push(newPartnerBasic);
                    if(counter == nLength){
                        console.log(JSON.stringify(partnersBasic));
                        res.json(partnersBasic);
                    }
                });
                //console.log(thisUser);
                
            }else{
                res.json([]);
            }
            
            
            //process.exit();
        } else {throw err;}
    });
});

//to get a particular user with _id userId
router.get('/editBasic/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    //console.log("User is " + userId);
    user
        .findOne({ '_id': userId },{basic:1, mobile:1, email:1})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
router.get('/editFilled/:userId', function(req, res) {
    var userId = req.params.userId;
    console.log('Finding Filled Institutes for: ' + userId);
    if(userId == 'all'){
        var usersavedCIs = cisaved
            .find({},{institute:1,user:1, _date: 1})
            .deepPopulate('institute user')
            .exec(function (err, usersavedCIs) {
            if (!err){
                console.log(usersavedCIs);
                var usersavedCIsBasic = [];
                var counter = 0;
                var nLength = usersavedCIs.length;
                usersavedCIs.forEach(function(thissave, saveindex){
                    var newusersavedCI = {
                        user: userId,
                        userName: thissave.user.basic.name,
                        institute: thissave.institute._id,
                        name: thissave.institute.name,
                        address: thissave.institute.address,
                        city: thissave.institute.city,
                        pincode: thissave.institute.pincode,
                        _date: thissave._date
                    }
                    //console.log(newcisavedUser);
                    counter = counter + 1;
                    usersavedCIsBasic.push(newusersavedCI);
                    if(counter == nLength){
                        res.json(usersavedCIsBasic);
                    }

                });
                if(nLength==0){
                    res.json([]);
                }


            } else {throw err;}
        });
    }else{
        
        var usersavedCIs = cisaved
            .find({'user': userId},{institute:1,user:1, _date: 1})
            .deepPopulate('institute user')
            .exec(function (err, usersavedCIs) {
            if (!err){
                console.log(usersavedCIs);
                var usersavedCIsBasic = [];
                var counter = 0;
                var nLength = usersavedCIs.length;
                usersavedCIs.forEach(function(thissave, saveindex){
                    var newusersavedCI = {
                        user: userId,
                        userName: thissave.user.basic.name,
                        institute: thissave.institute._id,
                        name: thissave.institute.name,
                        address: thissave.institute.address,
                        city: thissave.institute.city,
                        pincode: thissave.institute.pincode,
                        _date: thissave._date
                    }
                    //console.log(newcisavedUser);
                    counter = counter + 1;
                    usersavedCIsBasic.push(newusersavedCI);
                    if(counter == nLength){
                        res.json(usersavedCIsBasic);
                    }

                });
                if(nLength==0){
                    res.json([]);
                }


            } else {throw err;}
        });
        
        
    }
    
    
    
});


router.get('/addedInstitutes/:userId', function(req, res) {
    var userId = req.params.userId.toString();
    console.log('Finding Added Institutes for: ' + userId);
    var limit = 500;
    var thisUser = user
    .findOne({'_id': userId},{basic:1, userType:1})
    .exec(function (err, thisUser) {
    if (!err){
        if(thisUser){
            var fullUserScope = false;
            if(thisUser.userType == 'Master' || thisUser._id == '5a1831f0bd2adb260055e352'){
               fullUserScope = true; 
            }
            
            if(fullUserScope){
                var addedInstitutes = targetStudyProvider
                .find({_createdBy: {$exists: true}},{name:1, website: 1, address:1, city:1, phone:1, mobile:1, email:1, logo:1, exams:1, _createdBy:1, _created:1})
                .sort( { _created: -1 } )
                .limit(limit)
                .exec(function (err, addedInstitutes) {
                if (!err){
                    //console.log(addedInstitutes.map(function(a) {return a._createdBy;}));
                    res.json(addedInstitutes);
                } else {throw err;}
                });
            }else{
                var addedInstitutes = targetStudyProvider
                .find({_createdBy: {$exists: true}, _createdBy: thisUser._id},{name:1, website: 1, address:1, city:1, phone:1, mobile:1, email:1, logo:1, exams:1, _createdBy:1, _created:1})
                .sort( { _created: -1 } )
                .limit(limit)
                .exec(function (err, addedInstitutes) {
                if (!err){
                    res.json(addedInstitutes);
                } else {throw err;}
                });
            }
        }else{
            res.json(null);
        }


    } else {throw err;}
});
    
    
});


router.get('/addedQuestions/:userId', function(req, res) {
    var userId = req.params.userId.toString();
    var limit = 1000;
    console.log('Finding Added Questions for: ' + userId);
    
    var thisUser = user
    .findOne({'_id': userId},{basic:1, userType:1})
    .exec(function (err, thisUser) {
    if (!err){
        if(thisUser){
            var fullUserScope = false;
            if(thisUser.userType == 'Master' || thisUser._id == '5a1831f0bd2adb260055e352'){
               fullUserScope = true; 
            }
            //_createdBy: '59aecd5987b4c258f9b62111', _created: {$gte: new Date("2017-11-07T00:00:00Z")}
            //,{exam:1, test:1, _createdBy:1, _created:1}
            //_createdBy: '59aecd5987b4c258f9b62111', _created: {$gte: new Date("2017-10-08T00:00:00Z"), $lte: new Date("2017-11-08T00:00:00Z")}
            if(fullUserScope){
                var addedQuestions = question
                .find({})
                .sort( { _created: -1 } )
                .limit(limit)
                .deepPopulate('test')
                .exec(function (err, addedQuestions) {
                if (!err){
                    res.json(addedQuestions);
                } else {throw err;}
                });
            }else{
                var addedQuestions = question
                .find({_createdBy: {$exists: true}, _createdBy: thisUser._id})
                .sort( { _created: -1 } )
                .limit(limit)
                .deepPopulate('test')
                .exec(function (err, addedQuestions) {
                if (!err){
                    res.json(addedQuestions);
                } else {throw err;}
                });
            }
        }else{
            res.json(null);
        }


    } else {throw err;}
});
    
    
});

router.get('/filledColleges/:userId', function(req, res) {
    var userId = req.params.userId.toString();
    var limit = 1000;
    console.log('Finding Filled Colleges for: ' + userId);
    
    var thisUser = user
    .findOne({'_id': userId},{basic:1, userType:1})
    .exec(function (err, thisUser) {
    if (!err){
        if(thisUser){
            var fullUserScope = false;
            if(thisUser.userType == 'Master' || thisUser._id == '5a1831f0bd2adb260055e352' || thisUser._id == '58c8e895bbaebf3560545f19'){
               fullUserScope = true; 
            }
            
            if(fullUserScope){
                var filledColleges = tofillcollege
                .find({})
                .limit(limit)
                .exec(function (err, filledColleges) {
                if (!err){
                    if(!filledColleges || filledColleges.length == 0){
                        res.json(null);
                    }
                    var filledCollegeIds = filledColleges.map(function(a) {return a.college.toString();});
                    var filledCollegeNames = college
                    .find({_id: {$in: filledCollegeIds}}, {inst_name:1, _id: 1, studentbody: 1, websitenotworking: 1})
                    .exec(function (err, filledCollegeNames) {
                    if (!err){

                        var filledCollegeNameIds = filledCollegeNames.map(function(a) {return a._id.toString();});
                         filledColleges.forEach(function(thisCollege, thisindex){
                            var fIndex = filledCollegeNameIds.indexOf(thisCollege.college.toString());
                            if(fIndex != -1){
                                filledColleges[thisindex].college = filledCollegeNames[fIndex];
                            }
                            
                            if(thisindex == filledColleges.length - 1){
                                res.json(filledColleges);
                            }
                        });
                    } else {throw err;}
                    });
                    
                } else {throw err;}
                });
            }else{
                
                
                var filledColleges = tofillcollege
                .find({user: thisUser._id})
                .limit(limit)
                .exec(function (err, filledColleges) {
                if (!err){
                    if(!filledColleges || filledColleges.length == 0){
                        res.json(null);
                    }
                    var filledCollegeIds = filledColleges.map(function(a) {return a.college.toString();});
                    var filledCollegeNames = college
                    .find({_id: {$in: filledCollegeIds}}, {inst_name:1, _id: 1, studentbody: 1, websitenotworking: 1})
                    .exec(function (err, filledCollegeNames) {
                    if (!err){

                        var filledCollegeNameIds = filledCollegeNames.map(function(a) {return a._id.toString();});
                        
                        filledColleges.forEach(function(thisCollege, thisindex){
                            var fIndex = filledCollegeNameIds.indexOf(thisCollege.college.toString());
                            if(fIndex != -1){
                                filledColleges[thisindex].college = filledCollegeNames[fIndex];
                            }
                            
                            if(thisindex == filledColleges.length - 1){
                                res.json(filledColleges);
                            }
                        });
                    } else {throw err;}
                    });
                    
                } else {throw err;}
                });
            }
        }else{
            res.json(null);
        }


    } else {throw err;}
});
    
    
});

router.get('/editShortlist/:userId', function(req, res) {
    var userId = req.params.userId;
    //console.log(userId);
    user
        .findOne({ '_id': userId },{shortlisted:1})
        .deepPopulate('shortlisted')
        .exec(function (err, docs) {
        if (!err){ 
            var shortlisted = docs.shortlisted;
            
            var shortlistedIds = shortlisted.map(function(a) {return a._id;});
            //console.log('Shortlisted are: ' + JSON.stringify(shortlistedIds));
            var basicShortlisted = [];
            var counter = 0;
            var nShortlisted = shortlistedIds.length;
            //console.log('No of shortlists: ' + nShortlisted);
            shortlistedIds.forEach(function(instituteId, index){
                
                var thisInstitute = targetStudyProvider
                .findOne({'_id': instituteId},{name:1, website: 1, address:1, city:1, state:1, logo:1})
                /*.deepPopulate('exams exams.stream location faculty.exams ebNote.user')*/
                .exec(function (err, thisInstitute) {
                if (!err){
                    //console.log('on ' + shortlisted[index]._date);
                    var basicInstitute = {
                        _id: thisInstitute._id,
                        name:thisInstitute.name, 
                        website: thisInstitute.website, 
                        location:thisInstitute.location, 
                        pincode:thisInstitute.pincode, 
                        address:thisInstitute.address, 
                        city:thisInstitute.city, 
                        state:thisInstitute.state, 
                        _date:shortlisted[index]._date, 
                        logo:thisInstitute.logo
                    };
                    
                    basicShortlisted.push(basicInstitute);
                    counter = counter + 1;
                    if(counter == nShortlisted){
                        
                        res.json(basicShortlisted);
                    }
                    } else {throw err;}
                });
            });
            if(nShortlisted==0){
                res.json([]);
            }
            //res.json(basicShortlisted);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/userShortlist/:userId', function(req, res) {
    var userId = req.params.userId;
    
    var allShortlists = user
        .findOne({ '_id': userId },{shortlisted:1})
        //.deepPopulate('shortlisted')
        .exec(function (err, allShortlists) {
        if (!err){ 
            var shortlisted = allShortlists.shortlisted;
            var nShortlisted = shortlisted.length;
            if(nShortlisted==0){
                res.json([]);
            }else{
                var basicShortlisted = [];
                var counter = 0;
                shortlisted.forEach(function(thisShortlist, index){
                    var thisInstitute = targetStudyProvider
                    .findOne({'_id': thisShortlist._id},{name:1, website: 1, address:1, city:1, state:1, logo:1})
                    .exec(function (err, thisInstitute) {
                    if (!err){
                        
                        thisShortlist.institute = thisInstitute;
                        basicShortlisted.push(thisShortlist);
                        counter = counter + 1;
                        if(counter == nShortlisted){
                            //console.log(basicShortlisted);
                            res.json(basicShortlisted);
                        }
                        } else {throw err;}
                    });
                });
                
            }
        } else {throw err;}
    });
});

router.post('/saveUserLocation', function(req, res) {
    var locationForm = req.body;
    var userId = null;
    if(locationForm && locationForm._id){
        userId = locationForm._id.toString();
    }
    
    if(userId){
        var thisUser = user
            .findOne({ '_id': userId }, {logins: 0})
            .exec(function (err, thisUser) {
                if (err) return console.error(err);
                if(thisUser){
                    if(!thisUser.location){
                        thisUser.location = [];
                    }
                    var locations = thisUser.location;
                    var newLocation = {};

                    for (var property in locationForm) {
                        if(property != '_id')
                            newLocation[property] = locationForm[property];
                    }
                    thisUser.location.push(newLocation);
                    thisUser.save(function(err, thisUser) {
                        if (err) return console.error(err);
                        if(thisUser.location){
                            if(thisUser.location.length == 0){
                                thisUser.location = null;
                            }else{
                                thisUser.location = [thisUser.location[thisUser.location.length - 1]];
                            }
                        }else{
                            thisUser.location = null;
                        }
                        res.json(thisUser);
                    });
                }else{
                    res.json(null);
                }

        });
    }else{
        res.json(null);
    }
    
    
});

router.post('/makePartner', function(req, res) {
    var partnerUser = req.body;
    var userId = partnerUser.userId;
    var partnerInstituteId = partnerUser.partnerInstituteId;
    
    var thisUser = user
        .findOne({ '_id': userId }, {userType: 1, partner: 1})
        .exec(function (err, thisUser) {
        if (!err){
            
            var thisInstitute = targetStudyProvider
            .findOne({ '_id': partnerInstituteId })
            .exec(function (err, thisInstitute) {
            if (!err){
                if(thisUser && thisInstitute){
                    thisUser.userType = 'Partner';
                    if(!thisUser.partner){
                        thisUser.partner = [];
                    }
                    thisUser.partner.push(partnerInstituteId);
                    thisUser.save(function(err, thisUser) {
                        if (err) return console.error(err);
                        
                        res.json(true);
                    });
                }else{
                    res.json(null);
                }
            }
            });
            
            
            
        }
    });
    
});

router.post('/unmakePartner', function(req, res) {
    var partnerUser = req.body;
    var userId = partnerUser.userId;
    var partnerInstituteId = partnerUser.partnerInstituteId;
    
    var thisUser = user
        .findOne({ '_id': userId }, {userType: 1, partner: 1})
        .exec(function (err, thisUser) {
        if (!err){
            
            var thisInstitute = targetStudyProvider
            .findOne({ '_id': partnerInstituteId })
            .exec(function (err, thisInstitute) {
            if (!err){
                if(thisUser && thisInstitute){
                    thisUser.userType = 'Student';
                    if(!thisUser.partner){
                        thisUser.partner = [];
                    }
                    thisUser.partner = [];
                    thisUser.save(function(err, thisUser) {
                        if (err) return console.error(err);
                        
                        res.json(true);
                    });
                }else{
                    res.json(null);
                }
            }
            });
            
            
            
        }
    });
    
});

router.post('/updatePassword', function(req, res) {
    var userId = null;
    var mobile = null;
    var newPassword = null;
    var hash = null;
    console.log(req.body);
    if(req.body.userId){
        userId = req.body.userId;
    }
    if(req.body.mobile){
        mobile = req.body.mobile;
    }
    if(req.body.newPassword){
        newPassword = req.body.newPassword;
        hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    }
    
    if(userId && newPassword){
        
        var thisUser = user
            .findOne({ '_id': userId })
            .exec(function (err, thisUser) {
            if (!err){
                thisUser.password = hash;
                thisUser.save(function(err, thisUser) {
                    if (err) return console.error(err);
                    //console.log('User password set: ' + newPassword);
                    res.json(thisUser._id);
                });
            }
        });
        
    }else if(mobile && newPassword){
        
        var thisUser = user
            .findOne({ 'mobile': mobile })
            .exec(function (err, thisUser) {
            if (!err){ 
                thisUser.password = hash;
                thisUser.save(function(err, thisUser) {
                    if (err) return console.error(err);
                    //console.log('User password set: ' + newPassword);
                    res.json(thisUser._id);
                });
            }
        });
        
    }else{
        res.json([]);
    }
    
});


router.post('/userMarketing', function(req, res) {
    var allUsers = req.body;
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'active': true},function (err, existingSendGridCredential) {
        if (err)  throw err;
        if(existingSendGridCredential){
            var nLength = allUsers.length;
            var emailsIndex = 0;
            var smsIndex = 0;
            var counter = 0;

        allUsers.forEach(function(thisUser, index){
        var userId = thisUser._id;
        var existingUser = user.findOne({ '_id': userId},function (err, existingUser) {

        if(existingUser){

                if(existingUser.email){
                var templateName = 'Review Promotional Email';
                var fromEmail = {
                    email: 'always@exambazaar.com',
                    name: 'Always Exambazaar'
                };
                var to = existingUser.email;
                var username = '';
                if(existingUser.basic.name){
                    username = existingUser.basic.name;
                }

                var apiKey = existingSendGridCredential.apiKey;
                var sg = require("sendgrid")(apiKey);
                var emailTemplate = existingSendGridCredential.emailTemplate;
                var templateNames = emailTemplate.map(function(a) {return a.name;});
                var tIndex = templateNames.indexOf(templateName);
                //console.log(tIndex);
                if(tIndex != -1){
                    var templateId = emailTemplate[tIndex].templateKey;
                    //console.log(templateId);
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
                            emailsIndex += 1;
                            console.log(emailsIndex + ". Email sent to: " + username + " at "+ to);
                        }
                    });
                }else{
                    console.log('Could not send email as there is no template with name: ' + templateName);
                    res.json('Could not send email as there is no template with name: ' + templateName);
                }
            }else{
                //console.log('No user email');
            }

            if(existingUser.mobile){
                var sentName = existingUser.basic.name;
                //console.log(sentName);
                if(sentName.length > 10){
                    var pIndex = sentName.indexOf(' ');
                    //console.log(pIndex);
                    if(pIndex != -1){
                        sentName = sentName.substring(0, pIndex).trim();
                    }else{
                        sentName = sentName.substring(0, 9).trim();
                    }
                }
                var partnerOffers = ["Toppr, Plancess, HandaKaFunda", "Testbook, Mockbank, Superprofs"];

                var randomNumber = Math.floor(Math.random() * (partnerOffers.length));

                if(randomNumber > partnerOffers.length - 1){
                    randomNumber = 0;
                }


                console.log("Sending Welcome SMS");
                var message = "Hi " + sentName + "\nReview your coaching institute to get discounts on courses of " + partnerOffers[randomNumber] + " and many others. Get upto 80% off!\nwww.exambazaar.com";

                console.log(message.length + " " + message);
                var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=exambazaar@2017&mobile=";
                url += existingUser.mobile;
                url += "&message=";
                url += message;
                url += "&sender=EXMBZR&type=3";
                request({
                        url: url,
                        json: true
                    }, function (error, response, body) {
                        console.log(response);
                        //console.log(body);

                        if (!error && response.statusCode === 200 && body.status == 'success' && body.mobilenumbers != '') {
                            smsIndex += 1;
                            console.log(smsIndex + ". SMS sent to: " + sentName + " at "+ existingUser.mobile);
                        


                        }else{
                            console.log(error + " " + response);
                        }
                });



            }else{
                //console.log("No user mobile set");
            }

            counter += 1;
            if(counter == nLength){
                res.json(true);
            }


        }else{
            counter += 1;
            if(counter == nLength){
                res.json(true);
            }
        } 


        });


    });
    
        }
    });

});


router.post('/userSurvey', function(req, res) {
    var allUsers = req.body;
    var nLength = allUsers.length;
    var counter = 0;
    var smsIndex = 0;
    
    allUsers.forEach(function(thisUser, index){
        var userId = thisUser._id;
        var existingUser = user.findOne({ '_id': userId},function (err, existingUser) {

        if(existingUser){

            if(existingUser.mobile){
                var sentName = existingUser.basic.name;

                //console.log("Sending Welcome SMS");
                var message = "Hi " + sentName + "\nThese are the 5 questions we ask ourselves everyday at Exambazaar to make it a better experience for you. Help us improve\nhttp://tinyurl.com/exambazaar";

                //console.log(message.length + " " + message);
                var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=Amplifier@9&mobile=";
                url += existingUser.mobile;
                url += "&message=";
                url += message;
                url += "&sender=EXMBZR&type=3";
                request({
                        url: url,
                        json: true
                    }, function (error, response, body) {
                        //console.log(response);
                        //console.log(body);

                        if (!error && response.statusCode === 200 && body.status == 'success' && body.mobilenumbers != '') {
                            smsIndex += 1;
                            console.log(smsIndex + ". SMS sent to: " + sentName + " at "+ existingUser.mobile);
                        


                        }else{
                            console.log(error + " " + response);
                        }
                });



            }else{
                //console.log("No user mobile set");
            }

            counter += 1;
            if(counter == nLength){
                res.json(true);
            }


        }else{
            counter += 1;
            if(counter == nLength){
                res.json(true);
            }
        } 


        });


    });
    

});


module.exports = router;