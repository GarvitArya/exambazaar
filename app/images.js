var express = require('express');
var router = express.Router();
var request = require("request");
var path = require('path');
var config = require('../config/mydatabase.js');
var image = require('../app/models/image');
var s3 = require('../app/models/s3');

var fs = require('fs');
var aws = require('aws-sdk');
var crypto = require('crypto');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

aws.config.update({
    accessKeyId: "AKIAIGYUJGKTAIDG55EQ",
    secretAccessKey: "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",
    "region": "ap-south-1"
});




router.post('/s3Credentials', function(req, res) {
    var filename = req.body.filename;
    var contentType = req.body.contentType;
    if (filename) {
        var s3Config = {
          accessKey: 'AKIAJF3I6K6RKBWSLOGQ',
          secretKey: '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',
          bucket: 'exambazaar',
          region: 'ap-south-1'
        };
        var filename = crypto.randomBytes(16).toString('hex') + path.extname(filename);
        res.json(s3.s3Credentials(s3Config, {filename: filename, contentType: contentType}));
    }else{
        console.log('No file name');
    }
    
});
router.post('/save', function(req, res) {
    var imageObj = req.body;
    var thisImage = imageObj.img;
    
    var s3 = new aws.S3({signatureVersion: 'v4'});
    var fileName = 'file1.png';//req.query['file-name'];
    var fileType = 'image/png';//req.query['file-type'];
    var S3_BUCKET ='exambazaar';
    console.log(S3_BUCKET);
    const s3Params = {
        Bucket: S3_BUCKET,
        Body: thisImage,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };
    console.log(JSON.stringify(s3Params));
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    var returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    request({
            url: returnData.signedRequest,
            json: true
        }, function (error, response, body) {
        console.log('Here');
            console.log(error + ' ' + response + ' ' + body);
            if (!error && response.statusCode === 200) {
                console.log(body) // Print the json response
            }
    });
    console.log(JSON.stringify(returnData));
    //res.end();
    });
    
    
    
    
    var newImage = {
        data: thisImage,
        contentType: 'image/png'
    };
    console.log("Image is: " + JSON.stringify(newImage));
    var this_image = new image({
        img: newImage
    });
    this_image.save(function(err, this_image) {
    if (err) return console.error(err);
        console.log("Image saved with id: " + this_image._id);
        res.json(this_image._id);
    });
});


//to get all images
router.get('/', function(req, res) {
    image.find({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular image with _id imageId
router.get('/edit/:imageId', function(req, res) {
    var imageId = req.params.imageId;
    console.log(imageId);
    image
        .findOne({ '_id': imageId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

module.exports = router;