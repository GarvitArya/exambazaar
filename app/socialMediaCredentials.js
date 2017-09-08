var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var socialMediaCredential = require('../app/models/socialMediaCredential');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});

mongoose.createConnection(config.url);

mongoose.Promise = require('bluebird');


router.post('/save', function(req, res) {
    var thisSocialMediaCredential = req.body;
    var thisFacebookId = null;
    if(thisSocialMediaCredential.facebook && thisSocialMediaCredential.facebook.id){
        thisFacebookId = thisSocialMediaCredential.facebook.id;
    }
    console.log("Social Media Credential is: " + JSON.stringify(thisSocialMediaCredential));
    console.log("Facebook id is: " + JSON.stringify(thisFacebookId));
    
    var existingSocialMediaCredential = socialMediaCredential.findOne({ 'facebook.id': thisFacebookId},function (err, existingSocialMediaCredential) {
        if (err) return handleError(err);
        
        if(existingSocialMediaCredential){
            for (var property in thisSocialMediaCredential) {
                existingSocialMediaCredential[property] = thisSocialMediaCredential[property];
            }
            console.log("Social Media Credential is: " + JSON.stringify(existingSocialMediaCredential));
            existingSocialMediaCredential.save(function(err, existingSocialMediaCredential) {
                if (err) return console.error(err);
                console.log(existingSocialMediaCredential._id + " saved!");
                res.json(existingSocialMediaCredential);
            });
        }else{
            console.log('Creating new page');
            var existingSocialMediaCredential = new socialMediaCredential({});
            for (var property in thisSocialMediaCredential) {
                existingSocialMediaCredential[property] = thisSocialMediaCredential[property];
            }
            existingSocialMediaCredential.save(function(err, existingSocialMediaCredential) {
            if (err) return console.error(err);
                console.log("Social Media Credential saved with id: " + existingSocialMediaCredential._id);
                res.json(existingSocialMediaCredential);
            });
        }
    });
});

//to get all socialMediaCredentials
router.get('/', function(req, res) {
    socialMediaCredential.find({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular socialMediaCredential with _id socialMediaCredentialId
router.get('/edit/:socialMediaCredentialId', function(req, res) {
    var socialMediaCredentialId = req.params.socialMediaCredentialId;
    socialMediaCredential
        .findOne({ '_id': socialMediaCredentialId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});


module.exports = router;