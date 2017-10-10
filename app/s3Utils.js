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

                                var localFile = "downloads-6Oct/tests/" + examStream.stream + "/" + examStream.exam + "/" + localFileName;
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
                                    tCounter += 1;
                                    console.log("Test number " + index + " done downloading: " + fileName + " to " + localFile + " " + tCounter + "/" + nTests + " done!");
                                    
                                    if(tCounter == nTests){
                                        console.log("------------");
                                        console.log("All downloaded");
                                        console.log("------------");
                                    }
                                });    
                                    
                                    
                                    
                                    
                                    
                                }


                            });

                            } else {throw err;}
                        }).limit(100).skip(100);
                            
                            
                            
                            
                            
                            
                            
                            
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


router.post('/downloadFromURLS', function(req, res) {
    var urls = [
        "https://exambazaar.s3.amazonaws.com/0246be667bb09df526a9d675cfd30219.jpeg",
"https://exambazaar.s3.amazonaws.com/02eac0a6a56da6bf29e391fd21c90f97.jpg",
"https://exambazaar.s3.amazonaws.com/09bc68293c3d9e06e324b0ff0e332a24.jpg",
"https://exambazaar.s3.amazonaws.com/09d252901d287dc18937a3fa52ac60d7.jpg",
"https://exambazaar.s3.amazonaws.com/0fdf181a888be7311a9236a2f2285dc2.jpeg",
"https://exambazaar.s3.amazonaws.com/118a53bfe4de9dc85de5024a41ed097d.jpeg",
"https://exambazaar.s3.amazonaws.com/12763e3c8c0f961d817c7ded5bcb0ef5.png",
"https://exambazaar.s3.amazonaws.com/160c54a211f415f20b49e6eb37d7a1d6.jpg",
"https://exambazaar.s3.amazonaws.com/16aa7dfc18e371fc960527f8a48a3202.jpeg",
"https://exambazaar.s3.amazonaws.com/17ff4f7e9ae0708bda3467e4b1293acf.jpg",
"https://exambazaar.s3.amazonaws.com/180cba1dcb45b3269e3eddf032fc9ed3.jpeg",
"https://exambazaar.s3.amazonaws.com/1a9e0bd588410c7abc01769df7de740d.jpg",
"https://exambazaar.s3.amazonaws.com/1b147ada1842beab461372dcd4e04778.jpg",
"https://exambazaar.s3.amazonaws.com/1e81702d6eaea8b0d4e3b6cb3c02b86f.jpg",
"https://exambazaar.s3.amazonaws.com/1f755bb499d62b09d0b000c1a9a78bbc.jpg",
"https://exambazaar.s3.amazonaws.com/34ac348181a907b063cee29b5a622624.jpg",
"https://exambazaar.s3.amazonaws.com/3b0e1bb2cf3bbc504fce9fc34889db89.jpg",
"https://exambazaar.s3.amazonaws.com/3ffa2918d184a2cae59d839c6a6a4190.jpg",
"https://exambazaar.s3.amazonaws.com/41aff8b7510e2f20c9b0c4c483f24896.jpg",
"https://exambazaar.s3.amazonaws.com/42e7fb06edf2540526a129aad312910a.jpeg",
"https://exambazaar.s3.amazonaws.com/44cc837447986983e1d99364d09d6200.jpeg",
"https://exambazaar.s3.amazonaws.com/4b5d4497c37e46e7afa9bc2f26b03f7f.jpg",
"https://exambazaar.s3.amazonaws.com/4d213de5189eae49a00ac9098c97ee6d.jpg",
"https://exambazaar.s3.amazonaws.com/4e02467ca80700c33df63a7ac9424d83.jpg",
"https://exambazaar.s3.amazonaws.com/4e657100532d19f71da4861c8c38e7ae.jpg",
"https://exambazaar.s3.amazonaws.com/5226a719cd2f1b251169e3fba2f1c7dd.jpg",
"https://exambazaar.s3.amazonaws.com/538642476f678f1a40f89258f862c2d3.PNG",
"https://exambazaar.s3.amazonaws.com/63a3337f5db36a67c7d7f555476cac87.png",
"https://exambazaar.s3.amazonaws.com/655f5fa80884e4c004c0c9144c653c82.jpeg",
"https://exambazaar.s3.amazonaws.com/65f9d74316864ed6e6e02a1a0ebcfbb3.PNG",
"https://exambazaar.s3.amazonaws.com/668bf11a8978cd92efb0569bf1e448a7.jpeg",
"https://exambazaar.s3.amazonaws.com/68ecded96ff19294f9e342bd3a0c56bd.jpeg",
"https://exambazaar.s3.amazonaws.com/6c10586cc1749f92161484961049e1cd.jpeg",
"https://exambazaar.s3.amazonaws.com/6c1a5eadb5fbb7e08309cf777e953d09.jpg",
"https://exambazaar.s3.amazonaws.com/6d857fc902acaa837652f9f20541b89c.jpg",
"https://exambazaar.s3.amazonaws.com/6d87e8505048aa3025da998a4da4d613.jpg",
"https://exambazaar.s3.amazonaws.com/6d8ec54b992c965cb0633420807ee204.jpg",
"https://exambazaar.s3.amazonaws.com/6dd4ada3d8e24fcd73e643dac4845158.jpg",
"https://exambazaar.s3.amazonaws.com/785027c5bed2eaa536a522358246b1d2.jpeg",
"https://exambazaar.s3.amazonaws.com/7bae5083c9b308f61ba47fbdd6c5a774.jpg",
"https://exambazaar.s3.amazonaws.com/7c59d1b833774510b018555e30556da2.PNG",
"https://exambazaar.s3.amazonaws.com/7dadbaff60342fa7287b13aeefb32334.PNG",
"https://exambazaar.s3.amazonaws.com/7e3dc7dc71019752d2594acbc4b6e617.jpeg",
"https://exambazaar.s3.amazonaws.com/809231474a85bdc43f2cdee08a3ba292.jpeg",
"https://exambazaar.s3.amazonaws.com/895df150dbc9838c826b96623573a0ac.jpeg",
"https://exambazaar.s3.amazonaws.com/8a0c8fc2c2af182b3f7efc7f7e2ba87e.jpg",
"https://exambazaar.s3.amazonaws.com/8b8ede17680275e4aaf1297ee7d0218e.PNG",
"https://exambazaar.s3.amazonaws.com/8e4fffb96fc6b9692be3f2a9fe5418d3.jpeg",
"https://exambazaar.s3.amazonaws.com/9117ca0eed40070a374e0027ccadb681.jpeg",
"https://exambazaar.s3.amazonaws.com/92e4263d7cb03b91435675f7a2782dae.jpg",
"https://exambazaar.s3.amazonaws.com/97b6ce7bd97bc778032dc21f0a5e7410.jpg",
"https://exambazaar.s3.amazonaws.com/98a57ba65c14773c44609bf7ffd2784f.jpg",
"https://exambazaar.s3.amazonaws.com/a176628b0d721f6b32c4272e9adf97d7.jpeg",
"https://exambazaar.s3.amazonaws.com/a1e74fb5f9472381b8773d70a801a970.png",
"https://exambazaar.s3.amazonaws.com/a3c1d9e25d7ec1381c388a93b1cb7a42.jpg",
"https://exambazaar.s3.amazonaws.com/af70045db18fc32d97757442d21d92d6.jpg",
"https://exambazaar.s3.amazonaws.com/af7d476dc823da74873867479917c51e.jpeg",
"https://exambazaar.s3.amazonaws.com/b0d57688c72e707195b16440c9480674.jpg",
"https://exambazaar.s3.amazonaws.com/b11b3948880d634f7a7d9756e0153e83.jpeg",
"https://exambazaar.s3.amazonaws.com/b450ce427c9a9a3794c45bb440858d58.PNG",
"https://exambazaar.s3.amazonaws.com/b6e47ba4116a46f028be2bdfa18bdd09.png",
"https://exambazaar.s3.amazonaws.com/b7e35fbdf6598f042618848910996cb1.jpg",
"https://exambazaar.s3.amazonaws.com/bc64706eb02e99e0759d698496a2e529.jpg",
"https://exambazaar.s3.amazonaws.com/bc8b63464ec4f1138a779df42e405927.jpg",
"https://exambazaar.s3.amazonaws.com/bece383f42cc15b21512f50221598cea.jpg",
"https://exambazaar.s3.amazonaws.com/bf6de48cf236d448d24d21dfa4b48a19.jpg",
"https://exambazaar.s3.amazonaws.com/c10aa72dd223c70c2591d02b91cb8fd7.PNG",
"https://exambazaar.s3.amazonaws.com/c2649612aad002a6d74f4649c9e46229.jpg",
"https://exambazaar.s3.amazonaws.com/c4f8d100a15846a09a58abcdd0f031b9.jpeg",
"https://exambazaar.s3.amazonaws.com/c57d4545d606a9ecd2280896233b2224.png",
"https://exambazaar.s3.amazonaws.com/c9539e0111dd6e62f140a70d2b7cd62d.jpeg",
"https://exambazaar.s3.amazonaws.com/d129976d0e5956db02b2efd054bc67f1.jpg",
"https://exambazaar.s3.amazonaws.com/d3ba36456ffe44556abd2fb7e39cebaf.jpg",
"https://exambazaar.s3.amazonaws.com/d4672306f07df0e28952a77a65075b50.jpg",
"https://exambazaar.s3.amazonaws.com/dccde39eca7e1aa235b23942177e1d00.jpg",
"https://exambazaar.s3.amazonaws.com/e0d8edf5f806f4b41502269e0528fd48.jpeg",
"https://exambazaar.s3.amazonaws.com/e1a8f5c4e290712f645ea14da3be6464.jpeg",
"https://exambazaar.s3.amazonaws.com/ec7812d92462d68f2fd42f0eb1752bf7.jpg",
"https://exambazaar.s3.amazonaws.com/eed36cc4f06cc23039ab11acf376ff49.jpeg",
"https://exambazaar.s3.amazonaws.com/ef3a086a175fa5d6710669d90e6df2e2.jpg",
"https://exambazaar.s3.amazonaws.com/f1f32f7d1ed5c155e838699ac89d47d8.jpeg",
"https://exambazaar.s3.amazonaws.com/f217632d5b9e6f1c423b1486b24fc219.jpg",
"https://exambazaar.s3.amazonaws.com/f398789eaa3f00d26967344c5698f69e.jpg",
"https://exambazaar.s3.amazonaws.com/f9ef201a6a3ef4cae5e3fd4c69490eec.jpg",
"https://exambazaar.s3.amazonaws.com/fcfb6dc1b59e8532b5b2b94b0a4aea99.jpeg",
];
    
    var nUrls = urls.length;
    var uCounter = 0;
    
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
          },
        });
            
        urls.forEach(function(thisURL, index){
            var splits = thisURL.split("/");
            var fileName = splits[splits.length - 1];
            var localFile = "downloads/blogcovers/" + fileName;


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
                uCounter += 1;
                console.log("File " + index + " done downloading: " + fileName + " to " + localFile + " " + uCounter + "/" + nUrls + " done!");

                if(uCounter == nUrls){
                    console.log("------------");
                    console.log("All downloaded");
                    console.log("------------");
                }
            }); 
            
        });
        res.json(true);
            
        } else {throw err;}
    });
    
  
});


module.exports = router;