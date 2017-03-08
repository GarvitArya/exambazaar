var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var awsCredential = require('../app/models/awsCredential');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});

mongoose.createConnection(config.url);

mongoose.Promise = require('bluebird');


router.post('/save', function(req, res) {
    var thisAwsCredential = req.body;
    var accessKey = thisAwsCredential.accessKey;
    var secretKey = thisAwsCredential.secretKey;
    var bucket = thisAwsCredential.bucket;
    var region = thisAwsCredential.region;
    
    console.log("Aws Credential is: " + JSON.stringify(thisAwsCredential));
    
    var existingAwsCredential = awsCredential.findOne({ 'accessKey': accessKey},function (err, existingAwsCredential) {
        if (err) return handleError(err);
        
        if(existingAwsCredential){
            for (var property in thisAwsCredential) {
                existingAwsCredential[property] = thisAwsCredential[property];
            }
            console.log("AWS Credential is: " + JSON.stringify(existingAwsCredential));
            existingAwsCredential.save(function(err, existingAwsCredential) {
                if (err) return console.error(err);
                console.log(existingAwsCredential._id + " saved!");
                res.json('Done');
            });
        }else{
            var this_awsCredential = new awsCredential({
                accessKey: accessKey,
                secretKey: secretKey,
                bucket: bucket,
                region: region
            });
            this_awsCredential.save(function(err, this_awsCredential) {
            if (err) return console.error(err);
                console.log("AWS Credential saved with id: " + this_awsCredential._id);
                res.json(this_awsCredential._id);
            });
        }
    });
});

//to get all awsCredentials
router.get('/', function(req, res) {
    awsCredential.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get all awsCredentials
router.get('/getOne', function(req, res) {
    awsCredential.findOne({active: true}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular awsCredential with _id awsCredentialId
router.get('/edit/:awsCredentialId', function(req, res) {
    var awsCredentialId = req.params.awsCredentialId;
    console.log(awsCredentialId);
    awsCredential
        .findOne({ '_id': awsCredentialId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});


module.exports = router;