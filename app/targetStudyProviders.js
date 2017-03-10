var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var targetStudyProvider = require('../app/models/targetStudyProvider');
var oldtargetStudyProvider = require('../app/models/oldtargetStudyProvider');
var exam = require('../app/models/exam');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get all providers
router.get('/cities', function(req, res) {
    console.log("Getting cities");
    targetStudyProvider.distinct( "city",function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});


//to get all providers
router.get('/websites', function(req, res) {
    console.log("Getting Websites");
    targetStudyProvider.distinct( "website",function(err, docs) {
    if (!err){
        console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/count', function(req, res) {
    targetStudyProvider.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
router.get('/city/:city', function(req, res) {
    var city = req.params.city;
    console.log("City is: "+city);
    
    var cityProviders = targetStudyProvider
        .find({'city': city, 'exams.0': { $exists: true }, "logo": { $ne: "/img/bullets/box-orange-arrow.gif" } },{name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,targetStudyWebsite:1, rank:1, city:1, pincode:1, exams:1,location:1,email:1})
        .deepPopulate('exams location')
        .exec(function (err, cityProviders) {
        if (!err){
            
            console.log(cityProviders);
            res.json(cityProviders);
            
        } else {throw err;}
    });
    /*targetStudyProvider.find({"city" : city}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,targetStudyWebsite:1, rank:1, city:1, pincode:1,exams:1},{sort: '-rank'},function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }); //.limit(500)*/
});

router.get('/cityCount', function(req, res) {
    //console.log("In city count");
    var cities = targetStudyProvider.distinct( "city",function(err, cities) {
    if (!err){
        var allCityCount = [];
        cities.forEach(function(thisCity, index){
            var cityCount = targetStudyProvider.count({"city" : thisCity}, function(err, cityCount) {
                if (!err){ 
                    console.log(thisCity + "-" + cityCount);
                    //res.json(docs);
                    var thisCityCount = {
                        city: thisCity,
                        count: cityCount
                    };
                    allCityCount.push(thisCityCount);
                } else {throw err;}
            });
        });
        /*console.log("Cities are: "+JSON.stringify(cities));
        allCityCount.forEach(function(thisCityCount, index){
            console.log(thisCityCount.city + " " + thisCityCount.count); 
        });*/
        
        
    } else {throw err;}
    });
});




router.post('/addResult', function(req, res) {
    var newResultForm = req.body;
    var imageUrl = newResultForm.result.image;
    var newResult = newResultForm.result;
    var providerId = newResultForm.providerId;
    console.log('Express received: ' + JSON.stringify(newResultForm));
    var thisProvider = targetStudyProvider
        .findOne({ _id: providerId }, {results:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){
                var nResult = thisProvider.results.length;
                var resultExists = false;
                var counter = 0;
                thisProvider.results.forEach(function(thisResult, index){
                counter = counter + 1;
                if(!resultExists){
                
                if(imageUrl == thisResult.image){
                    resultExists = true;
                    console.log(JSON.stringify(newResult));     
                    for (var property in newResult) {
                        thisResult[property] = newResult[property];
                    }
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Result data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                    
                }    
                        
                }
                if(!resultExists && counter == nResult){
                    //console.log('----------Here---------');
                    //create new result
                    thisProvider.results.push(newResult);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Result data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                });
                
                if(nResult == 0){
                    //console.log('----------Here---------');
                    //create new result
                    thisProvider.results.push(newResult);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Result data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});






router.post('/addFaculty', function(req, res) {
    var newFacultyForm = req.body;
    var imageUrl = newFacultyForm.faculty.image;
    var newFaculty = newFacultyForm.faculty;
    var providerId = newFacultyForm.providerId;
    console.log('Express received: ' + JSON.stringify(newFacultyForm));
    var thisProvider = targetStudyProvider
        .findOne({ _id: providerId }, {faculty:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){
                var nFaculty = thisProvider.faculty.length;
                var facultyExists = false;
                var counter = 0;
                
                thisProvider.faculty.forEach(function(thisFaculty, index){
                counter = counter + 1;
                if(!facultyExists){
                
                if(imageUrl == thisFaculty.image){
                    facultyExists = true;
                    console.log(JSON.stringify(newFaculty));     
                    for (var property in newFaculty) {
                        thisFaculty[property] = newFaculty[property];
                    }
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Faculty data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                    
                }    
                        
                }
                if(!facultyExists && counter == nFaculty){
                    //console.log('----------Here---------');
                    //create new faculty
                    thisProvider.faculty.push(newFaculty);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Faculty data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                });
                
                if(nFaculty == 0){
                    //console.log('----------Here---------');
                    //create new faculty
                    thisProvider.faculty.push(newFaculty);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Faculty data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

router.post('/addCourse', function(req, res) {
    var newCourseForm = req.body;
    var newCourse = newCourseForm.course;
    var courseId = newCourseForm.course._id || '';
    var providerId = newCourseForm.providerId;
    console.log('Express received: ' + JSON.stringify(newCourseForm));
    var thisProvider = targetStudyProvider
        .findOne({ _id: providerId }, {course:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){
                var nCourse = thisProvider.course.length;
                var courseExists = false;
                var counter = 0;
                
                thisProvider.course.forEach(function(thisCourse, index){
                counter = counter + 1;
                if(!courseExists){
                
                    if(courseId == thisCourse._id){
                        courseExists = true;
                        console.log(JSON.stringify(newCourse));     
                        for (var property in newCourse) {
                            thisCourse[property] = newCourse[property];
                        }
                        thisProvider.save(function(err, thisProvider) {
                            if (err) return console.error(err);
                            console.log("Course data saved for " + thisProvider._id);
                            res.json('Done');
                        });

                    }    
                        
                }
                if(!courseExists && counter == nCourse){
                    thisProvider.course.push(newCourse);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Course data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                });
                
                if(nCourse == 0){
                    thisProvider.course.push(newCourse);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Course data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

router.post('/addVideo', function(req, res) {
    var newVideoForm = req.body;
    var videoLink = newVideoForm.video.link;
    var newVideo = newVideoForm.video;
    var providerId = newVideoForm.providerId;
    console.log('Express received: ' + JSON.stringify(newVideoForm));
    var thisProvider = targetStudyProvider
        .findOne({ _id: providerId }, {video:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){
                var nVideo = thisProvider.video.length;
                var videoExists = false;
                var counter = 0;
                
                thisProvider.video.forEach(function(thisVideo, index){
                counter = counter + 1;
                if(!videoExists){
                
                    if(videoLink == thisVideo.link){
                        videoExists = true;
                        console.log(JSON.stringify(newVideo));     
                        for (var property in newVideo) {
                            thisVideo[property] = newVideo[property];
                        }
                        thisProvider.save(function(err, thisProvider) {
                            if (err) return console.error(err);
                            console.log("Video data saved for " + thisProvider._id);
                            res.json('Done');
                        });

                    }    
                        
                }
                if(!videoExists && counter == nVideo){
                    thisProvider.video.push(newVideo);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Video data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                });
                
                if(nVideo == 0){
                    thisProvider.video.push(newVideo);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Video data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});



router.post('/addPhoto', function(req, res) {
    var newPhotoForm = req.body;
    var imageUrl = newPhotoForm.photo.image;
    var newPhoto = newPhotoForm.photo;
    var providerId = newPhotoForm.providerId;
    console.log('Express received: ' + JSON.stringify(newPhotoForm));
    var thisProvider = targetStudyProvider
        .findOne({ _id: providerId }, {photo:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){
                var nPhoto = thisProvider.photo.length;
                var photoExists = false;
                var counter = 0;
                
                thisProvider.photo.forEach(function(thisPhoto, index){
                counter = counter + 1;
                if(!photoExists){
                
                    if(imageUrl == thisPhoto.image){
                        photoExists = true;
                        console.log(JSON.stringify(newPhoto));     
                        for (var property in newPhoto) {
                            thisPhoto[property] = newPhoto[property];
                        }
                        thisProvider.save(function(err, thisProvider) {
                            if (err) return console.error(err);
                            console.log("Photo data saved for " + thisProvider._id);
                            res.json('Done');
                        });

                    }    
                        
                }
                if(!photoExists && counter == nPhoto){
                    thisProvider.photo.push(newPhoto);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Photo data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                });
                
                if(nPhoto == 0){
                    thisProvider.photo.push(newPhoto);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Photo data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

router.get('/providersWithAreas', function(req, res) {
    targetStudyProvider.find({"name" : {$regex : ".*-.*"}}, {name:1 , address:1},function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }); //.limit(500)
});


router.get('/changeProvidersStartingWith/:startsWith', function(req, res) {
    var startsWith = req.params.startsWith;
    console.log("Starts with is: "+startsWith);
    targetStudyProvider.find({"name" : {$regex : ".*"+startsWith+".*"}}, {name:1 , website:1},function(err, allProviders) {
    if (!err){ 
        
        allProviders.forEach(function(thisprovider, index){
            var splitPoint = thisprovider.name.indexOf('-');
            if(splitPoint!= -1){
                var oldName = thisprovider.name;
                var newName = thisprovider.name.substring(0,splitPoint).trim();
                
                thisprovider.name = newName;
                thisprovider.save(function(err, thisprovider) {
                    if (err) return console.error(err);
                    console.log(oldName + " changed to " + newName);
                });
            }
            
        });
        
        res.json('Done');
    } else {throw err;}
    }); //.limit(500)
});

router.post('/cityCourse', function(req, res) {
    var cityCourse = req.body;
    //console.log("cityCourse is : "+JSON.stringify(cityCourse));
    var city = cityCourse.city;
    var course = cityCourse.course;
    
    var examName = course;
    var thisExam = exam
        .findOne({'name': examName})
        .deepPopulate('stream')
        .exec(function (err, thisExam) {
        if (!err){
            targetStudyProvider.find({"city" : city,"exams" : thisExam._id}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,targetStudyWebsite:1, rank:1, city:1, pincode:1, exams:1},{sort: '-rank'},function(err, providerList) {
            if (!err){
                console.log(providerList);
                res.json(providerList);
            } else {throw err;}
            });
        } else {throw err;}
    });
    
    
    /*targetStudyProvider.find({"city" : city,"coursesOffered" : { $elemMatch : { $regex : course, $options : 'i' } }}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,targetStudyWebsite:1, rank:1, city:1, pincode:1},{sort: '-rank'},function(err, providerList) {
    if (!err){
        res.json(providerList);
    } else {throw err;}
    });*/
});
router.post('/savecoaching', function(req, res) {
    var thisProvider = req.body.targetStudyProvider;
    console.log(thisProvider);
    var coachingId = thisProvider._id;
    
    var oldProvider = targetStudyProvider.findOne({"_id" : coachingId}, {},function(err, oldProvider) {
    if (!err){
        
        //oldProvider = thisProvider;
        if(oldProvider){
            console.log("New Coaching is: " + JSON.stringify(thisProvider));
            for (var property in thisProvider) {
                oldProvider[property] = thisProvider[property];
                if(property=='location'){
                    console.log('Yes location is there: ' + thisProvider[property]);
                }
            }
            console.log("Coaching is: " + JSON.stringify(oldProvider));

            //save the changes
            oldProvider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
                res.json('Done');
            });
            
        }else{
            //create a new provider
            console.log("--------New Coaching is: " + JSON.stringify(thisProvider));
            oldProvider = new targetStudyProvider({});
            for (var property in thisProvider) {
                oldProvider[property] = thisProvider[property];
            }
            console.log("Coaching is: " + JSON.stringify(oldProvider));

            //save the changes
            oldProvider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
                res.json('Done');
            });
            
        }
        
        
        
        
    } else {throw err;}
    }); //.limit(500)
});
router.get('/coaching/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    //console.log(coachingId);
    
    var thisProvider = targetStudyProvider
        .findOne({'_id': coachingId})
        .deepPopulate('exams exams.stream location faculty.exams')
        .exec(function (err, thisProvider) {
        if (!err){
            res.json(thisProvider);
        } else {throw err;}
    });
    
    /*targetStudyProvider.findOne({"_id" : coachingId}, {},function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    }); //.limit(500)*/
});




router.get('/setRank0', function(req, res) {
    console.log("Starting now");
    var allproviders =  targetStudyProvider.find({}, {},function(err, allproviders) {
    if (!err){
         allproviders.forEach(function(thisprovider, index){
             console.log(index);
            console.log(thisprovider);
            thisprovider.rank = 0;
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
            });
         });
    }
    });
});

router.get('/logoService', function(req, res) {
    console.log("Logo Service Starting now");
    var allproviders =  targetStudyProvider.find({}, {logo:1, oldlogo:1},function(err, allproviders) {
    if (!err){
         allproviders.forEach(function(thisprovider, index){
            //console.log(index);
            //console.log(thisprovider);
            if(thisprovider.logo){
                if(thisprovider.logo.indexOf('http') != -1){
                    if(thisprovider.logo != 'https://targetstudy.com/tools/ge.php')
                    thisprovider.oldlogo = thisprovider.logo;
                }
            }
                
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
            });
         });
    }
    });
});

router.get('/UniqueLogoService', function(req, res) {
    console.log("Getting all logos");
    targetStudyProvider.distinct( "oldlogo",function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/getAllCourses', function(req, res) {
    //console.log("Starting now");
    var allCourses = [];
    var allproviders =  targetStudyProvider.find({}, {coursesOffered:1, exams:1,name:1},function(err, allproviders) {
    if (!err){
        var courseExam = [];
         /*allproviders.forEach(function(thisprovider, index){
             //console.log(index);
            //console.log(thisprovider._id);
            
            var thiscourses = thisprovider.coursesOffered;
            thiscourses.forEach(function(thiscourse, courseindex){
                if(allCourses.indexOf(thiscourse)== -1){
                    
                    var examName = thiscourse;
                    //console.log(examName);
                    var thisExam = exam
                        .findOne({'name': examName})
                        .deepPopulate('stream')
                        .exec(function (err, thisExam) {
                        if (!err){
                            //console.log("Exam is: " + JSON.stringify(thisExam));
                            if(thisExam){
                                
                                var thiscourseExam = {
                                    course:thiscourse,
                                    exam:thisExam
                                };
                               //console.log("Exam is: " + JSON.stringify(thiscourseExam)); courseExam.push(thiscourseExam);
                            }
                            
                            //res.json(thisExam);
                        } else {throw err;}
                    });
                    allCourses.push(thiscourse);
                    //console.log("------"+thiscourse+"-----");
                }
            });
             
         });*/
        var courseExam = [
          {"course":"Bank PO Exam","exam":{"_id":"58ac2c7c7e852a2c401a8c3f","name":"Bank PO Exam","displayname":"Bank PO Exam","__v":0,"stream":{"_id":"58ac22b73cfd4f32bccf8a82","name":"bank","displayname":"Bank","__v":0}}},
{"course":"LIC AAO Exam","exam":{"_id":"58ac2cfb7e852a2c401a8c4a","name":"LIC AAO Exam","displayname":"LIC","__v":0,"stream":{"_id":"58ac22cf3cfd4f32bccf8a84","name":"insurance","displayname":"Insurance","__v":0}}},
{"course":"GATE","exam":{"_id":"58ac27787d227b1fa8208ff0","name":"GATE","displayname":"GATE","__v":0,"stream":{"_id":"58ac21ec144a140ee0fe62f1","name":"engineering","displayname":"Engineering","__v":0}}},
{"course":"RBI Assistant Exam","exam":{"_id":"58ac2c8b7e852a2c401a8c40","name":"RBI Assistant Exam","displayname":"RBI Assistant Exam","__v":0,"stream":{"_id":"58ac22b73cfd4f32bccf8a82","name":"bank","displayname":"Bank","__v":0}}},
{"course":"NTSE Exam","exam":{"_id":"58ac283cb9ae260088289995","name":"NTSE Exam","displayname":"NTSE","__v":0,"stream":{"_id":"58ac222e144a140ee0fe62f4","name":"school","displayname":"School","__v":0}}},
{"course":"TOEFL","exam":{"_id":"58ac29d7b9ae2600882899a0","name":"TOEFL","displayname":"TOEFL","__v":0,"stream":{"_id":"58ac22913cfd4f32bccf8a7f","name":"foreigneducation","displayname":"Foreign Education","__v":0}}},
{"course":"JEE","exam":{"_id":"58ac27030be6311eccbbc3a6","name":"JEE","displayname":"JEE Main & Advanced","__v":0,"stream":{"_id":"58ac21ec144a140ee0fe62f1","name":"engineering","displayname":"Engineering","__v":0}}},
{"course":"IELTS","exam":{"_id":"58ac29cbb9ae26008828999f","name":"IELTS","displayname":"IELTS","__v":0,"stream":{"_id":"58ac22913cfd4f32bccf8a7f","name":"foreigneducation","displayname":"Foreign Education","__v":0}}},
{"course":"GRE","exam":{"_id":"58ac29c2b9ae26008828999e","name":"GRE","displayname":"GRE","__v":0,"stream":{"_id":"58ac22913cfd4f32bccf8a7f","name":"foreigneducation","displayname":"Foreign Education","__v":0}}},
{"course":"SSC CPO (S.I) Exam","exam":{"_id":"58ac2bf47e852a2c401a8c38","name":"SSC CPO (S.I) Exam","displayname":"SSC CPO (S.I) Exam","__v":0,"stream":{"_id":"58ac22ac3cfd4f32bccf8a81","name":"ssc","displayname":"SSC","__v":0}}},
{"course":"SSC JE","exam":{"_id":"58ac2c317e852a2c401a8c3a","name":"SSC JE","displayname":"SSC JE","__v":0,"stream":{"_id":"58ac22ac3cfd4f32bccf8a81","name":"ssc","displayname":"SSC","__v":0}}},
{"course":"CAT","exam":{"_id":"58ac288cb9ae260088289996","name":"CAT","displayname":"CAT","__v":0,"stream":{"_id":"58ac226e3cfd4f32bccf8a7d","name":"mba","displayname":"MBA","__v":0}}},
{"course":"AILET","exam":{"_id":"58ac28f1b9ae26008828999a","name":"AILET","displayname":"AILET","__v":0,"stream":{"_id":"58ac22823cfd4f32bccf8a7e","name":"law","displayname":"Law","__v":0}}},
{"course":"AIIMS","exam":{"_id":"58ac27ae7d227b1fa8208ff2","name":"AIIMS","displayname":"AIIMS","__v":0,"stream":{"_id":"58ac2211144a140ee0fe62f2","name":"medical","displayname":"Medical","__v":0}}},
{"course":"IBPS PO CWE","exam":{"_id":"58ad20045401f52440af6f24","name":"IBPS PO CWE","displayname":"IBPS PO CWE","stream":{"_id":"58ac22b73cfd4f32bccf8a82","name":"bank","displayname":"Bank","__v":0},"__v":0}},
{"course":"Civil Services Exam","exam":{"_id":"58ac2b8c7f7f514550cd3aea","name":"Civil Services Exam","displayname":"Civil Services Exam","__v":0,"stream":{"_id":"58ac22a33cfd4f32bccf8a80","name":"civilservices","displayname":"Civil Services","__v":0}}},
{"course":"NDA Exam","exam":{"_id":"58ac2cb47e852a2c401a8c44","name":"NDA Exam","displayname":"NDA Exam","__v":0,"stream":{"_id":"58ac22c13cfd4f32bccf8a83","name":"defense","displayname":"Defense","__v":0}}},
{"course":"AFCAT","exam":{"_id":"58ac2cbe7e852a2c401a8c45","name":"AFCAT","displayname":"AFCAT","__v":0,"stream":{"_id":"58ac22c13cfd4f32bccf8a83","name":"defense","displayname":"Defense","__v":0}}},
{"course":"SAT","exam":{"_id":"58ac2925b9ae26008828999c","name":"SAT","displayname":"SAT","__v":0,"stream":{"_id":"58ac22913cfd4f32bccf8a7f","name":"foreigneducation","displayname":"Foreign Education","__v":0}}},
{"course":"NATA","exam":{"_id":"58ac27587d227b1fa8208fef","name":"NATA","displayname":"NATA","__v":0,"stream":{"_id":"58ac21ec144a140ee0fe62f1","name":"engineering","displayname":"Engineering","__v":0}}},
{"course":"CA CPT","exam":{"_id":"58ac2811b9ae260088289993","name":"CA CPT","displayname":"CA","__v":0,"stream":{"_id":"58ac2222144a140ee0fe62f3","name":"cacs","displayname":"CA & CS","__v":0}}},
{"course":"CDS Exam","exam":{"_id":"58ac2ca57e852a2c401a8c43","name":"CDS Exam","displayname":"CDS Exam","__v":0,"stream":{"_id":"58ac22c13cfd4f32bccf8a83","name":"defense","displayname":"Defense","__v":0}}},
{"course":"SNAP","exam":{"_id":"58ac28d5b9ae260088289998","name":"SNAP","displayname":"SNAP","__v":0,"stream":{"_id":"58ac226e3cfd4f32bccf8a7d","name":"mba","displayname":"MBA","__v":0}}},
{"course":"AIPMT","exam":{"_id":"58ac27997d227b1fa8208ff1","name":"AIPMT","displayname":"NEET UG","__v":0,"stream":{"_id":"58ac2211144a140ee0fe62f2","name":"medical","displayname":"Medical","__v":0}}},
{"course":"SBI PO Exam","exam":{"_id":"58ac2c8f7e852a2c401a8c41","name":"SBI PO Exam","displayname":"SBI PO Exam","__v":0,"stream":{"_id":"58ac22b73cfd4f32bccf8a82","name":"bank","displayname":"Bank","__v":0}}},
{"course":"I.A.F. Exam","exam":{"_id":"58ac2ccc7e852a2c401a8c46","name":"I.A.F. Exam","displayname":"I.A.F. Exam","__v":0,"stream":{"_id":"58ac22c13cfd4f32bccf8a83","name":"defense","displayname":"Defense","__v":0}}},
{"course":"Bank Clerical Exam","exam":{"_id":"58ac2c727e852a2c401a8c3e","name":"Bank Clerical Exam","displayname":"Bank Clerical Exam","__v":0,"stream":{"_id":"58ac22b73cfd4f32bccf8a82","name":"bank","displayname":"Bank","__v":0}}},
{"course":"CLAT","exam":{"_id":"58ac28e6b9ae260088289999","name":"CLAT","displayname":"CLAT","__v":0,"stream":{"_id":"58ac22823cfd4f32bccf8a7e","name":"law","displayname":"Law","__v":0}}},
{"course":"IBPS CWE Clerk","exam":{"_id":"58ac2c987e852a2c401a8c42","name":"IBPS Clerk CWE","displayname":"IBPS Clerk CWE","__v":0,"stream":{"_id":"58ac22b73cfd4f32bccf8a82","name":"bank","displayname":"Bank","__v":0}}},
{"course":"IBPS Clerk CWE","exam":{"_id":"58ac2c987e852a2c401a8c42","name":"IBPS Clerk CWE","displayname":"IBPS Clerk CWE","__v":0,"stream":{"_id":"58ac22b73cfd4f32bccf8a82","name":"bank","displayname":"Bank","__v":0}}},
{"course":"GMAT","exam":{"_id":"58ac29b8b9ae26008828999d","name":"GMAT","displayname":"GMAT","__v":0,"stream":{"_id":"58ac22913cfd4f32bccf8a7f","name":"foreigneducation","displayname":"Foreign Education","__v":0}}},
{"course":"SSC CGLE","exam":{"_id":"58ac2c277e852a2c401a8c39","name":"SSC CGLE","displayname":"SSC CGLE","__v":0,"stream":{"_id":"58ac22ac3cfd4f32bccf8a81","name":"ssc","displayname":"SSC","__v":0}}},
{"course":"XAT","exam":{"_id":"58ac28c6b9ae260088289997","name":"XAT","displayname":"XAT","__v":0,"stream":{"_id":"58ac226e3cfd4f32bccf8a7d","name":"mba","displayname":"MBA","__v":0}}},
{"course":"BITSAT","exam":{"_id":"58ac27230be6311eccbbc3a7","name":"BITSAT","displayname":"BITSAT","__v":0,"stream":{"_id":"58ac21ec144a140ee0fe62f1","name":"engineering","displayname":"Engineering","__v":0}}},
{"course":"I.N.A Exam","exam":{"_id":"58ac2cd97e852a2c401a8c47","name":"I.N.A Exam","displayname":"I.N.A Exam","__v":0,"stream":{"_id":"58ac22c13cfd4f32bccf8a83","name":"defense","displayname":"Defense","__v":0}}},
{"course":"G.I.C Exam","exam":{"_id":"58ac2cf37e852a2c401a8c49","name":"G.I.C Exam","displayname":"G.I.C Exam","__v":0,"stream":{"_id":"58ac22cf3cfd4f32bccf8a84","name":"insurance","displayname":"Insurance","__v":0}}},
{"course":"SSC CHSL Exam","exam":{"_id":"58ac2c3d7e852a2c401a8c3c","name":"SSC CHSL Exam","displayname":"SSC CHSL","__v":0,"stream":{"_id":"58ac22ac3cfd4f32bccf8a81","name":"ssc","displayname":"SSC","__v":0}}},
{"course":"CS Foundation Exam","exam":{"_id":"58ac2824b9ae260088289994","name":"CS Foundation Exam","displayname":"CS","__v":0,"stream":{"_id":"58ac2222144a140ee0fe62f3","name":"cacs","displayname":"CA & CS","__v":0}}},
{"course":"L.I.C D.O","exam":{"_id":"58ac2d047e852a2c401a8c4b","name":"L.I.C D.O","displayname":"L.I.C D.O","__v":0,"stream":{"_id":"58ac22cf3cfd4f32bccf8a84","name":"insurance","displayname":"Insurance","__v":0}}},
{"course":"IES/ISS Exam","exam":{"_id":"58ac2b9c7f7f514550cd3aeb","name":"IES/ISS Exam","displayname":"IES/ISS Exam","__v":0,"stream":{"_id":"58ac22a33cfd4f32bccf8a80","name":"civilservices","displayname":"Civil Services","__v":0}}},
{"course":"AFMC","exam":{"_id":"58ac27f4b9ae260088289992","name":"AFMC","displayname":"AFMC","__v":0,"stream":{"_id":"58ac2211144a140ee0fe62f2","name":"medical","displayname":"Medical","__v":0}}},
{"course":"IFS Exam","exam":{"_id":"58ac2ba87f7f514550cd3aec","name":"IFS Exam","displayname":"IFS Exam","__v":0,"stream":{"_id":"58ac22a33cfd4f32bccf8a80","name":"civilservices","displayname":"Civil Services","__v":0}}},
{"course":"LSAT","exam":{"_id":"58ac28fdb9ae26008828999b","name":"LSAT","displayname":"LSAT","__v":0,"stream":{"_id":"58ac22823cfd4f32bccf8a7e","name":"law","displayname":"Law","__v":0}}},
{"course":"IRDA Exam","exam":{"_id":"58ac2ce97e852a2c401a8c48","name":"IRDA Exam","displayname":"IRDA Exam","__v":0,"stream":{"_id":"58ac22cf3cfd4f32bccf8a84","name":"insurance","displayname":"Insurance","__v":0}}}  
        ];
        var excludedList =[
            '58818debd2a6f324d074b61d',
            '588b689109f8e092c42ed063',
            '58864dab10375c21d0dd097e',
            '58805c0568834500113e40f6',
            '587f27bf68834500113e3fb4',
            '588b9073bacc08647c61f7cf',
            '5889a72564d30a09449ae951',
            '5888714044b3e649589e3d2e',
            '5889bb5972b7e80914783924',
            '5873dc0fdc5b3027b48d817a',
            '5886d6a5b154802d00bc7b9e',
            '5888411b4f23586c7c9ea200',
            '5888c5d0c019b96a88de48b3',
            '5888849ae5823635d4e92f76',
        ];
        var courses = courseExam.map(function(a) {return a.course;});
        allproviders.forEach(function(thisprovider, index){
            var thiscourses = thisprovider.coursesOffered;
            thiscourses.forEach(function(thiscourse, courseindex){
                var examIndex = courses.indexOf(thiscourse);
                /*if(excludedList.indexOf(String(thisprovider._id)) == -1){
                    console.log('Excluded: ' + thisprovider.name);
                }*/
                var indexVal = excludedList.indexOf(String(thisprovider._id));
                if(examIndex!=-1 && indexVal == -1){
                    var thisCourseExam = courseExam[examIndex];
                    var examId = thisCourseExam.exam._id;
                   // console.log(thiscourse + ' ' + examId);
                    if(thisprovider._id=='5870f774b2a1c11da874027a'){
                        console.log(thisprovider.name);
                    }
                    thisprovider.exams.addToSet(examId);
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(index + " Provider saved: " + thisprovider.name + ' ' + thisprovider._id + ' ' + excludedList.indexOf(thisprovider._id));
                    });
                }else{
                    //console.log('Unlisted Exam is: ' + thiscourse);
                }
            });
        });
        
        res.json(courseExam);  
        //console.log(courseExam.length);
        //console.log(JSON.stringify(courseExam));
        }
    });//.limit(20000).skip(000); //
});

router.get('/uprank/:targetStudyProviderId', function(req, res) {
    var targetStudyProviderId = req.params.targetStudyProviderId;
    //console.log(targetStudyProviderId);
    var thisProvider = targetStudyProvider.findOne({"_id" : targetStudyProviderId}, {},function(err, thisProvider) {
    if (!err){
        
        if(thisProvider.rank){
            thisProvider.rank = thisProvider.rank + 1;
        }else{
            thisProvider.rank = 0;
            thisProvider.rank = thisProvider.rank + 1;
        }
        console.log(thisProvider);
        thisProvider.save(function(err, thisProvider) {
            if (err) return console.error(err);
            console.log(thisProvider._id + " saved!");
        });
        res.json("Done");
    } else {throw err;}
    });
});
router.get('/downrank/:targetStudyProviderId', function(req, res) {
    var targetStudyProviderId = req.params.targetStudyProviderId;
    //console.log(targetStudyProviderId);
    var thisProvider = targetStudyProvider.findOne({"_id" : targetStudyProviderId}, {},function(err, thisProvider) {
    if (!err){
        
        if(thisProvider.rank){
            thisProvider.rank = thisProvider.rank - 1;
        }else{
            thisProvider.rank = 0;
            thisProvider.rank = thisProvider.rank - 1;
        }
        console.log(thisProvider);
        thisProvider.save(function(err, thisProvider) {
            if (err) return console.error(err);
            console.log(thisProvider._id + " saved!");
        });
        res.json("Done");
    } else {throw err;}
    });
});

router.get('/cleanTargetstudyurls', function(req, res) {
    var allproviders =  targetStudyProvider.find({}, { website:1, name:1, city:1},function(err, allproviders) {
    if (!err){
        console.log('Here');
         allproviders.forEach(function(thisprovider, index){
           
            ///img/bullets/box-orange-arrow.gif 
            //console.log('Provider ' + thisprovider._id);
            /*if( thisprovider.logo=="/img/bullets/box-orange-arrow.gif" || thisprovider.logo=="//img/bullets/box-orange-arrow.gif"){
                thisprovider.logo = "";
                console.log('Provider ' + thisprovider._id);
                thisprovider.save(function(err, thisprovider) {
                    if (err) return console.error(err);
                    console.log("Logo removed for: " + thisprovider._id);
                });
            }*/
            if(thisprovider.website){
                
                
                /*var oldWebsite = oldtargetStudyProvider
                    .findOne({'_id': thisprovider._id})
                    .exec(function (err, oldWebsite) {
                    if (!err){
                        console.log(thisprovider.website + " " + oldWebsite.website);
                        
                        if(oldWebsite.website !='' && oldWebsite.website != thisprovider.website){
                            thisprovider.website = oldWebsite.website;
                            thisprovider.save(function(err, thisprovider) {
                                if (err) return console.error(err);
                                console.log(thisprovider._id + " saved!");
                            });
                        }
                        
                    } else {throw err;}
                });
                */
                var webUrl = thisprovider.website;
                var lastChar = webUrl.substring(webUrl.length-1, webUrl.length);
                if(lastChar=='/'){
                    thisprovider.website = thisprovider.website.substring(0,thisprovider.website.length-1);
                    console.log(thisprovider.website);
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisprovider._id + " saved!");
                    });
                }
                
                /*if(thisprovider.website.indexOf("https://targetstudy.com") != -1){
                    console.log("Removing website " + thisprovider.website + " for " + thisprovider.name + ", " + thisprovider.city);
                    thisprovider.website = '';

                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisprovider._id + " saved!");
                    });

                }*/
                
                    /*console.log("Null Removing website " + thisprovider.website + " for " + thisprovider.name + ", " + thisprovider.city);
                    thisprovider.website = '';

                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisprovider._id + " saved!");
                    });*/

                
            }  
         }).limit(2000).skip(6000);
    }
    });
    res.json('Done');
});

router.get('/edit/removeDuplicates/:city', function(req, res) {
    var city = req.params.city;
    console.log("City is: "+city);
    var allproviders =  targetStudyProvider.find({"city" : city}, { address:1, name:1},function(err, allproviders) {
    if (!err){
        console.log("There are " + allproviders.length + " providers right now.");
        allproviders.forEach(function(thisprovider, index){
            
            var url = thisprovider.website;
            var address = thisprovider.address;
            var name = thisprovider.name;
            console.log("Processing " + index + " " + address + " " + name);
            //{'website': url}
            var thisproviders = targetStudyProvider.find({'address': address, 'name': name}, { address:1},function(err, thisproviders) {
                if (!err){
                    thisproviders.forEach(function(removeProvider, providerindex){
                        
                        if(providerindex>0){
                            console.log("About to remove " + removeProvider._id + " " + removeProvider.address );
                             removeProvider.remove(function(err) {
                                if (err) {
                                    res.statusCode = 403;
                                    res.send(err);
                                } else {
                                    console.log("Provider deleted ");
                                    //res.send({});
                                }
                            });
                        }
                    });
                    
                }
            });
        });
        
        
        //console.log(docs);
        res.json("Ok");
    } else {throw err;}
    });
});
module.exports = router;