var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var urlslug = require('../app/models/urlslug');
var stream = require('../app/models/stream');
var exam = require('../app/models/exam');
var coaching = require('../app/models/coaching');
var city = require('../app/models/city');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

router.post('/save', function(req, res) {
    var thisUrlslug = req.body;
    var urlslugName = thisUrlslug.name;
    var urlslugDisplayName = thisUrlslug.displayname;
    //console.log("Urlslug is: " + JSON.stringify(urlslugName));
    var existingUrlslug = urlslug.findOne({ 'name': urlslugName },function (err, existingUrlslug) {
        if(existingUrlslug){
            for (var property in thisUrlslug) {
                existingUrlslug[property] = thisUrlslug[property];
                //console.log(existingExam[property]);
            }
            //console.log("Urlslug is: " + JSON.stringify(existingUrlslug));
            existingUrlslug.save(function(err, existingUrlslug) {
                if (err) return console.error(err);
                //console.log(existingUrlslug._id + " saved!");
                res.json('Done');
            });
        }else{
           var this_urlslug = new urlslug({
                name : urlslugName,
                displayname: urlslugDisplayName
            });
            this_urlslug.save(function(err, this_urlslug) {
                if (err) return console.error(err);
                res.json(this_urlslug._id);
            }); 
        }
        
    });
});

router.post('/bulksave', function(req, res) {
    
    var allExams = exam.find({active: true}, {seoname:1, urlslug: 1, coaching_page_name: 1}, function(err, allExams) {
    if (!err){
    var allCities = city.find({active: true}, {active: 1, name: 1}, function(err, allCities) {
    if (!err){
    if(allExams && allCities){
        //console.log(allExams.length);
        //console.log(allCities.length);
        //console.log(allExams);
        
        allExams.forEach(function(thisExam, eindex){
            allCities.forEach(function(thisCity, cindex){
                var title = thisExam.coaching_page_name + " Coaching in " + thisCity.name;
                var slug = slugify(title);
                
                var existingUrlslug = urlslug.findOne({ 'slug': slug },function (err, existingUrlslug) {
                if(existingUrlslug){
                    for (var property in thisUrlslug) {
                        existingUrlslug[property] = thisUrlslug[property];
                        //console.log(existingExam[property]);
                    }
                    //console.log("Urlslug is: " + JSON.stringify(existingUrlslug));
                    existingUrlslug.save(function(err, existingUrlslug) {
                        if (err) return console.error(err);
                        console.log(slug + " saved!");
                    });
                }else{
                   var this_urlslug = new urlslug({
                        slug : slug,
                        title : title,
                        stream : thisExam.stream,
                        exam : thisExam._id,
                        city : thisCity._id,
                    });
                    this_urlslug.save(function(err, this_urlslug) {
                        if (err) return console.error(err);
                        console.log(slug + " saved!");
                        //res.json(this_urlslug._id);
                    }); 
                }

            });

            });
        });
        
        res.json(true);

    }
    } else {throw err;}
    });

    } else {throw err;}
    });
    
    /*var existingUrlslug = urlslug.findOne({ 'name': urlslugName },function (err, existingUrlslug) {
        if(existingUrlslug){
            for (var property in thisUrlslug) {
                existingUrlslug[property] = thisUrlslug[property];
            existingUrlslug.save(function(err, existingUrlslug) {
                if (err) return console.error(err);
                res.json('Done');
            });
        }else{
           var this_urlslug = new urlslug({
                name : urlslugName,
                displayname: urlslugDisplayName
            });
            this_urlslug.save(function(err, this_urlslug) {
                if (err) return console.error(err);
                res.json(this_urlslug._id);
            }); 
        }
        
    });*/
});

router.get('/', function(req, res) {
    urlslug.find({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});
    
router.get('/count', function(req, res) {
    urlslug.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/edit/:urlslugId', function(req, res) {
    var urlslugId = req.params.urlslugId;
    //console.log("Urlslug is " + urlslugId);
    urlslug
        .findOne({ '_id': urlslugId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/urlslug/:urlslugName', function(req, res) {
    var urlslugName = req.params.urlslugName;
    //console.log("Urlslug is " + urlslugName);
    var thisUrlslug = urlslug
        .findOne({ 'slug': urlslugName },{})
        .exec(function (err, thisUrlslug) {
        if (!err){
            if(thisUrlslug){
                console.log(thisUrlslug);
                var uexam = thisUrlslug.exam;
                var ucity = thisUrlslug.city;
                var slugInfo = {
                        
                };
                
                var thisExam = exam
                .findOne({ '_id': uexam },{name: 1, stream: 1})
                .exec(function (err, thisExam) {
                if (!err){
                    slugInfo.examName = thisExam.name;
                    var ustream = thisExam.stream;
                    console.log(ustream);
                    var thisStream = stream
                    .findOne({ '_id': ustream },{name: 1})
                    .exec(function (err, thisStream) {
                    if (!err){
                        console.log(thisStream);
                        slugInfo.streamName = thisStream.name;
                        var thisCity = city
                        .findOne({ '_id': ucity },{name: 1})
                        .exec(function (err, thisCity) {
                        if (!err){
                            slugInfo.cityName = thisCity.name;
                            res.json(slugInfo);
                        } else {throw err;}
                        });
                    }else {throw err;}
                    });
                } else {throw err;}
                });
                
            }else{
                res.json(null);
            }
            
            //process.exit();
        } else {throw err;}
    });
});

module.exports = router;