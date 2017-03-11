var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var sendGridCredential = require('../app/models/sendGridCredential');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});

mongoose.createConnection(config.url);

mongoose.Promise = require('bluebird');


router.post('/save', function(req, res) {
    var thisSendGridCredential = req.body;
    var apiKey = thisSendGridCredential.apiKey;
    var emailTemplate = thisSendGridCredential.emailTemplate;
    
    console.log("SendGrid Credential is: " + JSON.stringify(thisSendGridCredential));
    
    var existingSendGridCredential = sendGridCredential.findOne({ 'apiKey': apiKey},function (err, existingSendGridCredential) {
        if (err) return handleError(err);
        
        if(existingSendGridCredential){
            for (var property in thisSendGridCredential) {
                existingSendGridCredential[property] = thisSendGridCredential[property];
            }
            console.log("SendGrid Credential is: " + JSON.stringify(existingSendGridCredential));
            existingSendGridCredential.save(function(err, existingSendGridCredential) {
                if (err) return console.error(err);
                console.log(existingSendGridCredential._id + " saved!");
                res.json('Done');
            });
        }else{
            var this_sendGridCredential = new sendGridCredential({
                apiKey: apiKey,
                emailTemplate: emailTemplate
            });
            this_sendGridCredential.save(function(err, this_sendGridCredential) {
            if (err) return console.error(err);
                console.log("SendGrid Credential saved with id: " + this_sendGridCredential._id);
                res.json(this_sendGridCredential._id);
            });
        }
    });
});

//to get all sendGridCredentials
router.get('/', function(req, res) {
    sendGridCredential.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get all sendGridCredentials
router.get('/getOne', function(req, res) {
    sendGridCredential.findOne({active: true}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular sendGridCredential with _id sendGridCredentialId
router.get('/edit/:sendGridCredentialId', function(req, res) {
    var sendGridCredentialId = req.params.sendGridCredentialId;
    console.log(sendGridCredentialId);
    sendGridCredential
        .findOne({ '_id': sendGridCredentialId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});


module.exports = router;