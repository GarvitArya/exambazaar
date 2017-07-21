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


function sendWelcome(user){
    console.log("User is: " + user);
    if(user.email){
    var templateName = 'Welcome Email';
    var fromEmail = {
        email: 'always@exambazaar.com',
        name: 'Always Exambazaar'
    };
    var to = user.email;
    var username = user.basic.name;
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
        mobileNumber = thisUser.contact.email;
    }
    if(thisUser && thisUser.email){
        userEmail = thisUser.email;
    }
    //console.log(mobileNumber);
    
    
    if(mobileNumber){
        var existingUser = user.findOne({ 'mobile': mobileNumber },function (err, existingUser) {
            if(existingUser){
                console.log('I am existing');
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
                if(thisUser.name){
                    console.log('Adding Name ' +thisUser.name );
                    this_user.basic ={
                        name: thisUser.name
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
                    sendWelcome(this_user);
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
                    existingUser.basic.name = thisFbUser.name;
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
                    existingUser.basic.name = thisFbUser.name;
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
                existingUser.basic.name = thisFbUser.name;
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
                sendWelcome(existingUser);
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
                existingUser.basic.name = thisFbUser.name;
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
    var start = moment().subtract(2, 'day').startOf('day');
    var end = moment().endOf('day');
    
    user.find({_created: {  $gte : start, $lte : end}}, {userType: 1, basic: 1, mobile: 1, facebook: 1, email: 1, image: 1, fbemail: 1, fbimage: 1, _created: 1}, function(err, docs) {
    if (!err){
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
    user.find({"basic.name":{'$regex' : query, '$options' : 'i'}}, {basic:1, blogger:1, image:1},function(err, docs) {
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

router.get('/referexists/:mobile', function(req, res) {
    var mobile = req.params.mobile;
    var thisUser = user
        .findOne({ 'mobile': mobile },{mobile:1})
        .exec(function (err, thisUser) {
        if (!err){
            console.log(thisUser);
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

router.post('/markLatLng', function(req, res) {
    //console.log('Here');
    var positionForm = req.body;
    var userId = positionForm.userId;
    var latlng = positionForm.latlng;
    console.log('Here');
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
    //console.log("User fetched is " + userId);
    user
        .findOne({ '_id': userId },{logins:0})
        //.deepPopulate('partner')
        .exec(function (err, thisuser) {
        if (!err){
            
            //console.log(thisuser);
            res.json(thisuser);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/blogger/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    //console.log("User fetched is " + userId);
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
router.get('/activateBlogger/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{blogger:1})
        .exec(function (err, thisUser) {
        if (!err){
            thisUser.blogger.active = true;
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                res.json(thisUser._id);
            });
        } else {throw err;}
    });
});
router.get('/deactivateBlogger/:userId', function(req, res) {
    var userId = req.params.userId;
    var thisUser = user
        .findOne({ '_id': userId },{blogger:1})
        .exec(function (err, thisUser) {
        if (!err){
            thisUser.blogger.active = false;
            thisUser.save(function(err, thisUser) {
                if (err) return console.error(err);
                res.json(thisUser._id);
            });
        } else {throw err;}
    });
});

//to get a particular user with _id userId
router.get('/emails/:userId', function(req, res) {
    var userId = req.params.userId;
    //var mobile = req.params.mobile;
    //console.log("User fetched is " + userId);
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
    console.log("User is " + userId);
    user
        .findOne({ '_id': userId },{basic:1, mobile:1, email:1})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
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


                //console.log("Sending Welcome SMS");
                var message = "Hi " + sentName + "\nReview your coaching institute to get discounts on courses of " + partnerOffers[randomNumber] + " and many others. Get upto 80% off!\nwww.exambazaar.com";

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
    
        }
    });

});


module.exports = router;