var express = require('express');
var router = express.Router();
var request = require("request");

var config = require('../config/mydatabase.js');
var user = require('../app/models/user');
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
                    var request = sg.emptyRequest({
                      method: 'POST',
                      path: '/v3/mail/send',
                      body: mail.toJSON(),
                    });
                    sg.API(request, function(error, response) {
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
        var message = "Hi " + user.basic.name + "\nWe are so happy you are here!\n\nThank you for signing up and check our exclusive discounts at Exambazaar.com\n https://www.exambazaar.com";
        
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

//to get all users
router.get('/', function(req, res) {
    user.find({}, function(err, docs) {
    if (!err){ 
        res.json(docs);
    } else {throw err;}
    });
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
        //.deepPopulate('_master.contact')
        .exec(function (err, thisuser) {
        if (!err){
            
            //console.log(thisuser);
            res.json(thisuser);
            //process.exit();
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
        .findOne({ '_id': userId },{basic:1})
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
    console.log(userId);
    user
        .findOne({ '_id': userId },{shortlisted:1})
        .deepPopulate('shortlisted._id')
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

module.exports = router;