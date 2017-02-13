var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var targetStudyProvider = require('../app/models/targetStudyProvider');
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
        //console.log(docs);
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
    targetStudyProvider.find({"city" : city}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,targetStudyWebsite:1, rank:1, city:1, pincode:1},{sort: '-rank'},function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }); //.limit(500)
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
    //var cityCourse = req.params.cityCourse;
    console.log("cityCourse is : "+JSON.stringify(cityCourse));
    var city = cityCourse.city;
    var course = cityCourse.course;
    
    console.log("City is: "+city);
    console.log("Course is: "+course);
    targetStudyProvider.find({"city" : city,"coursesOffered" : { $elemMatch : { $regex : course, $options : 'i' } }}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,targetStudyWebsite:1, rank:1, city:1, pincode:1},{sort: '-rank'},function(err, providerList) {
    if (!err){
        res.json(providerList);
    } else {throw err;}
    }); //.limit(500)
});
router.post('/savecoaching', function(req, res) {
    var thisProvider = req.body.targetStudyProvider;
    var coachingId = thisProvider._id;
    
    targetStudyProvider.findOne({"_id" : coachingId}, {},function(err, oldProvider) {
    if (!err){
        
        //oldProvider = thisProvider;
        console.log("New Coaching is: " + JSON.stringify(thisProvider));
        for (var property in thisProvider) {
            oldProvider[property] = thisProvider[property];
            //console.log(oldProvider[property]);
            if (oldProvider.hasOwnProperty(property)) {
                
                // do stuff
            }
        }
        console.log("Coaching is: " + JSON.stringify(oldProvider));
        
        //save the changes
        oldProvider.save(function(err, thisprovider) {
            if (err) return console.error(err);
            console.log(thisprovider._id + " saved!");
            res.json('Done');
        });
        
        
        
    } else {throw err;}
    }); //.limit(500)
});
router.get('/coaching/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    //console.log(coachingId);
    targetStudyProvider.findOne({"_id" : coachingId}, {},function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    }); //.limit(500)
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
    var allproviders =  targetStudyProvider.find({}, {coursesOffered:1},function(err, allproviders) {
    if (!err){
         allproviders.forEach(function(thisprovider, index){
             //console.log(index);
            console.log(thisprovider._id);
            var thiscourses = thisprovider.coursesOffered;
            thiscourses.forEach(function(thiscourse, courseindex){
                if(allCourses.indexOf(thiscourse)== -1){
                    allCourses.push(thiscourse);
                    console.log("------"+thiscourse+"-----");
                }
            });
             
         });
        console.log(allCourses);
        }
    });
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
            if( thisprovider.logo=="/img/bullets/box-orange-arrow.gif" || thisprovider.logo=="//img/bullets/box-orange-arrow.gif"){
                thisprovider.logo = "";
                console.log('Provider ' + thisprovider._id);
                thisprovider.save(function(err, thisprovider) {
                    if (err) return console.error(err);
                    console.log("Logo removed for: " + thisprovider._id);
                });
            }
            if(thisprovider.website){
                if(thisprovider.website.indexOf("https://targetstudy.com") != -1){
                    console.log("Removing website " + thisprovider.website + " for " + thisprovider.name + ", " + thisprovider.city);
                    thisprovider.website = '';

                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisprovider._id + " saved!");
                    });

                }
                
                    /*console.log("Null Removing website " + thisprovider.website + " for " + thisprovider.name + ", " + thisprovider.city);
                    thisprovider.website = '';

                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisprovider._id + " saved!");
                    });*/

                
            }  
         });
    }
    });
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