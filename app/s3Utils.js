var express = require('express');
var router = express.Router();
var request = require("request");

var config = require('../config/mydatabase.js');
var user = require('../app/models/user');
var test = require('../app/models/test');
var exam = require('../app/models/exam');
var stream = require('../app/models/stream');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

var moment = require('moment');
moment().format();

var s3 = require('s3');
var awsCredential = require('../app/models/awsCredential');

router.post('/download', function(req, res) {
    var fileInfo = req.body;
    var examStreams = [];
    
    var s3Config = awsCredential.findOne({active: true}, function(err, s3Config) {
        if (!err){
            var client = s3.createClient({
              maxAsyncS3: 20,     // this is the default
              s3RetryCount: 3,    // this is the default
              s3RetryDelay: 1000, // this is the default
              multipartUploadThreshold: 20971520, // this is the default (20 MB)
              multipartUploadSize: 15728640, // this is the default (15 MB)
              s3Options: {
                accessKeyId: s3Config.accessKey,
                secretAccessKey: s3Config.secretKey,
                region: s3Config.region,
                // endpoint: 's3.yourdomain.com',
                // sslEnabled: false
                // any other options are passed to new AWS.S3()
                // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
              },
            });
            
    var allExams = exam.find({}, {displayname:1, stream:1 },function(err, allExams) {
        if (!err){
            var nExams = allExams.length;
            var eCounter = 0;
            var allStreams = stream.find({}, {displayname:1},function(err, allStreams) {
                if (!err){
                    var streamIds = allStreams.map(function(a) {return a._id.toString();});
                    allExams.forEach(function(thisExam, index){
                        var newExamStream = {
                            _id: thisExam._id,
                            exam: thisExam.displayname,
                        };
                        var sIndex = streamIds.indexOf(thisExam.stream.toString());
                        if(sIndex != -1){
                            newExamStream.stream = allStreams[sIndex].displayname;
                        }
                        examStreams.push(newExamStream);
                        eCounter += 1;
                        
                        if(eCounter == nExams){
                        var examStreamsIds = examStreams.map(function(a) {return a._id.toString();});
                            
                        var allTests = test.find({active: true}, function(err, allTests) {
                            if (!err){
                                
                            var nTests = allTests.length;
                            console.log("Tests overall " + nTests);
                            var tCounter = 0;
                            allTests.forEach(function(thisTest, index){
                                var thisExam = thisTest.exam.toString();
                                var thisIndex = examStreamsIds.indexOf(thisExam);
                                if(thisIndex != -1){
                                var examStream = examStreams[thisIndex];    
                                    
                                var question = thisTest.url.question;
                                var splits = question.split("/");
                                var fileName = splits[splits.length - 1];
                                var localFileName = thisTest.name + "#" + thisTest.description + "#" + fileName;

                                var localFile = "downloads-5Oct/tests/" + examStream.stream + "/" + examStream.exam + "/" + localFileName;
                                //console.log("Downloading " + fileName + " to " + localFile);    
                                
                                    
                                var params = {
                                    localFile: localFile,
                                    s3Params: {
                                        Bucket: s3Config.bucket,
                                        Key: fileName,
                                        // other options supported by getObject
                                        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
                                        },
                                };
                                var downloader = client.downloadFile(params);
                                    downloader.on('error', function(err) {
                                    console.error("unable to download:", err.stack);
                                });
                                var progress = 0;
                                var currProgress = 0;
                                var lastProgress = 0;
                                downloader.on('progress', function() {
                                    progress = downloader.progressAmount/downloader.progressTotal * 100;
                                    progress = Math.round(progress)
                                    currProgress = Math.ceil(progress / 10) * 10;
                                    if(currProgress > lastProgress){
                                        //console.log("Progress: " + progress + "%");
                                        lastProgress = currProgress;
                                    }

                                });
                                downloader.on('end', function() {
                                    console.log("Done downloading: " + fileName + " to " + localFile);
                                });    
                                    
                                    
                                    
                                    
                                    
                                }


                            });

                            } else {throw err;}
                        });//.limit(10);
                            
                            
                            
                            
                            
                            
                            
                            
                        }
                    });
                }else {throw err;}
            });
        } else {throw err;}
    });
    
    
    
            
            
            /*var test = fileInfo.test;
            var examStream = test.examStream;
            var question = test.url.question;
            var splits = question.split("/");
            var fileName = splits[splits.length - 1];
            var localFileName = examStream.test.name + "#" + examStream.test.description + "#" + fileName;
            
            var localFile = "downloads/tests/" + examStream.stream.displayname + "/" + examStream.exam.displayname + "/" + localFileName;
            //console.log("-----------------");
            //console.log("Downloading file: " + fileName);
            //console.log("Downloading to: " + localFile);
            var params = {
                localFile: localFile,
                s3Params: {
                    Bucket: s3Config.bucket,
                    Key: fileName,
                    // other options supported by getObject
                    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
                    },
            };
            var downloader = client.downloadFile(params);
                downloader.on('error', function(err) {
                console.error("unable to download:", err.stack);
            });
            var progress = 0;
            var currProgress = 0;
            var lastProgress = 0;
            downloader.on('progress', function() {
                progress = downloader.progressAmount/downloader.progressTotal * 100;
                progress = Math.round(progress)
                currProgress = Math.ceil(progress / 10) * 10;
                if(currProgress > lastProgress){
                    //console.log("Progress: " + progress + "%");
                    lastProgress = currProgress;
                }
                
            });
            downloader.on('end', function() {
                console.log("Done downloading: " + fileName + " to " + localFile);
            });
            */
            res.json(true);
            
        } else {throw err;}
    });
    
  
});


module.exports = router;