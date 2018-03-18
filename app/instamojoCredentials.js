var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var instamojoCredential = require('../app/models/instamojoCredential');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});

mongoose.createConnection(config.url);

mongoose.Promise = require('bluebird');


router.post('/save', function(req, res) {
    var thisInstamojoCredential = req.body;
    var apiKey = thisInstamojoCredential.apiKey;
    var emailTemplate = thisInstamojoCredential.emailTemplate;
    
    console.log("Instamojo Credential is: " + JSON.stringify(thisInstamojoCredential));
    
    var existingInstamojoCredential = instamojoCredential.findOne({ 'apiKey': apiKey},function (err, existingInstamojoCredential) {
        if (err) return handleError(err);
        
        if(existingInstamojoCredential){
            for (var property in thisInstamojoCredential) {
                existingInstamojoCredential[property] = thisInstamojoCredential[property];
            }
            console.log("Instamojo Credential is: " + JSON.stringify(existingInstamojoCredential));
            existingInstamojoCredential.save(function(err, existingInstamojoCredential) {
                if (err) return console.error(err);
                console.log(existingInstamojoCredential._id + " saved!");
                res.json('Done');
            });
        }else{
            var this_instamojoCredential = new instamojoCredential({
                apiKey: apiKey,
                emailTemplate: emailTemplate
            });
            this_instamojoCredential.save(function(err, this_instamojoCredential) {
            if (err) return console.error(err);
                console.log("Instamojo Credential saved with id: " + this_instamojoCredential._id);
                res.json(this_instamojoCredential._id);
            });
        }
    });
});

//to get all instamojoCredentials
router.get('/', function(req, res) {
    instamojoCredential.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get all instamojoCredentials
router.get('/getOne', function(req, res) {
    instamojoCredential.findOne({active: true}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular instamojoCredential with _id instamojoCredentialId
router.get('/edit/:instamojoCredentialId', function(req, res) {
    var instamojoCredentialId = req.params.instamojoCredentialId;
    console.log(instamojoCredentialId);
    instamojoCredential
        .findOne({ '_id': instamojoCredentialId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});


module.exports = router;