var express = require('express');
var router = express.Router();
//basiccoaching
var config = require('../config/mydatabase.js');
var coaching = require('../app/models/coaching');
var city = require('../app/models/city');
var cirffactor = require('../app/models/cirffactor');
var blogpost = require('../app/models/blogpost');
var cisaved = require('../app/models/cisaved');
var email = require('../app/models/email');
var disableProvider = require('../app/models/disableProvider');
var oldcoaching = require('../app/models/oldcoaching');
var exam = require('../app/models/exam');
var stream = require('../app/models/stream');
var view = require('../app/models/view');
var review = require('../app/models/review');
var result = require('../app/models/result');
var group = require('../app/models/group');
var logourl = require('../app/models/logourl');
var moment = require('moment');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var ObjectId = require('mongodb').ObjectID;

router.get('/examcities/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam.findOne({active: true, name: examName}, {_id: 1},function(err, thisExam) {
        if (!err){
            
            if(thisExam){
                var examId = ObjectId(thisExam._id.toString());
                console.log(examId);
                /*coaching.aggregate(
                [
                    {$match: { disabled: false, type: 'Coaching', { $in: [ examId, "$exams" ] } } },
                    {"$group": { "_id": { city: "$city" }, count:{$sum:1} } }
                ],function(err, docs) {
                if (!err){
                    console.log(docs);
                    
                    res.json(docs);
                } else {throw err;}
                });*/
                
                coaching.aggregate([
                    { "$unwind": "$exams" },
                    { "$group": {
                          _id: { city: "$city" },
                          exams: { $push: "$exams" },
                          mcount: { $sum: {$cond: [{$eq: [examId,"$exams"]},1,0]}}
                        }
                    },
                    { $match: {mcount: {$gt: 10}}},
                    { "$project": { "city": "$_id.city", "_id": 0, count: "$mcount" }},
                    {$sort:{"count":-1}}
                ],function(err, docs) {
                    if (!err){
                        console.log(docs);

                        res.json(docs);
                    } else {throw err;}
                });
                
            }else{
                res.json([]);
            }
        }
    });
});

router.get('/cities', function(req, res) {
    
            
    coaching.aggregate(
    [
        {$match: { disabled: false, type: 'Coaching'} },
        {"$group": { "_id": { city: "$city", state: "$state" }, count:{$sum:1} } }
    ],function(err, docs) {
    if (!err){
        //console.log(docs);
        docs.forEach(function(thisCityState, cindex){
            thisCityState._id.count = thisCityState.count;
        });
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
    
    
    /*
    coaching.distinct( ("city","state"),function(err, docs) {
    if (!err){
        console.log(docs);
        res.json(docs);
    } else {throw err;}
    });*/
});

router.get('/providercities/:query', function(req, res) {
    var query = req.params.query.toLowerCase();
    console.log(query);
    
    
    
    if(query == 'exambazaar'){
        query = '';
    }
    //console.log('Query is: ' + query);
    var cityNames = coaching.aggregate(
    [
        {$match: {city:{'$regex' : query, '$options' : 'i'}, disabled: false} },
        {"$group": { "_id": { city: "$city" }, count:{$sum:1} } },
        {$sort:{"count":-1}}

    ],function(err, cityNames) {
    if (!err){
        console.log(cityNames);
        cityNames = cityNames.map(function(a) {return a._id.city;});
        //console.log(cityNames);
        /*var queryGroups = [];
        groupNames.forEach(function(thisGroup, index){
            var qGroup = {
                name: thisGroup._id.name,
                centers: thisGroup.count,
                logo: thisGroup.logo,
            };
            queryGroups.push(qGroup);
        });*/
        //console.log(queryGroups);
        res.json(cityNames);
    } else {throw err;}
    });
    
    
    /*var cities = coaching.distinct( ("city"),function(err, cities) {
    if (!err){
        if(query == "exambazaar"){
            res.json(cities);
        }else{
            var queryCities = [];
            cities.forEach(function(thisCity, index){
                if(thisCity.toLowerCase().indexOf(query) != -1){
                    queryCities.push(thisCity);
                }

            });
            console.log(queryCities);
            res.json(queryCities);
        }
    } else {throw err;}
    });*/
});

router.get('/oneOff', function(req, res) {
    var allCityNewCities = [];
    /*var allCityNewCities = [{city:"Alappuzha",newcity:"Alleppey"},
    {city:"Bhiwadi",newcity:"Alwar"},
{city:"Modasa",newcity:"Aravalli"},
{city:"Arangabad",newcity:"Aurangabad"},
{city:"Bagalkot ",newcity:"Bagalkote"},
{city:"Kantabanjhi",newcity:"Balangir"},
{city:"Balasore",newcity:"Baleswar"},
{city:"Bengaluru",newcity:"Bangalore"},
{city:"Bengaluru",newcity:"bangalore"},
{city:"Belagavi",newcity:"Belgaum"},
{city:"Bulandshahar",newcity:"Bulandshahr"},
{city:"Badhra",newcity:"Charkhi Dadri "},
{city:"Sadulpur",newcity:"Churu"},
{city:"Kochi",newcity:"Cochin"},
{city:"Siliguri",newcity:"Darjeeling"},
{city:"Shirpur",newcity:"Dhule"},
{city:"Duliajan",newcity:"Dibrugarh"},
{city:"Angamali",newcity:"Ernakulam"},
{city:"Bina",newcity:"Etawa"},
{city:"Amaravati",newcity:"Guntur"},
{city:"Bhadra",newcity:"Hanumangarh"},
{city:"Agroha",newcity:"Hisar"},
{city:"Hissar",newcity:"Hisar"},
{city:"Hoshairpur",newcity:"Hoshiarpur "},
{city:"Mukerian",newcity:"Hoshiarpur "},
{city:"Thodupuzha",newcity:"Idukki"},
{city:"Mhow",newcity:"Indore"},
{city:"Kotputli",newcity:"Jaipur"},
{city:"Safidon",newcity:"Jind"},
{city:"Kuzhithurai",newcity:"Kanyakumari"},
{city:"Nagarcoil",newcity:"Kanyakumari"},
{city:"Khandagiri",newcity:"Khorda"},
{city:"Muvattupuzha",newcity:"Kochi"},
{city:"Gauribidanur",newcity:"Kolar"},
{city:"Kottarakkara",newcity:"Kollam"},
{city:"Damanjodi",newcity:"Koraput"},
{city:"Raikot",newcity:"Ludhiana"},
{city:"Kosi Kalan",newcity:"Mathura"},
{city:"Kishanpura",newcity:"Mohali"},
{city:"Kangra",newcity:"Nagarkot"},
{city:"Shahid Bhagat Singh Nagar",newcity:"Nawanshahr"},
{city:"Sumerpur",newcity:"Pali"},
{city:"Midnapore",newcity:"Paschim Medinipur"},
{city:"Kotdwar",newcity:"Pauri Garhwal"},
{city:"Khordha",newcity:"Puri"},
{city:"Bhojpur",newcity:"Raisen"},
{city:"Paramakudi",newcity:"Ramanathapuram"},
{city:"Sasaram",newcity:"Rohats"},
{city:"Attur",newcity:"Salem"},
{city:"Burla",newcity:"Sambalpur"},
{city:"Chitrakoot",newcity:"Satna"},
{city:"Trimulgery",newcity:"Secunderabad"},
{city:"Vindhyanagar",newcity:"Singrauli"},
{city:"Sivagangai",newcity:"sivaganga"},
{city:"Sahyadri",newcity:"Solapur"},
{city:"Tiruvanmalai",newcity:"Thiruvannamalai"},
{city:"Chalakudy",newcity:"Thrissur"},
{city:"Tiruvavur",newcity:"Tiruvarur"},
{city:"Tumakuru",newcity:"Tumkur"},
{city:"Pantnagar",newcity:"Udham Singh Nagar"},
{city:"Rudrapur",newcity:"Udham Singh Nagar"},
{city:"Tapi",newcity:"Vyara"},
{city:"Hanamkonda",newcity:"Warangal"}];*/

    res.json(true);
    var allCities = allCityNewCities.map(function(a) {return a.city;});
    
    var changecounter = 0;
    var counter = 0;
    var allProviders = coaching
        .find({ 'city': { $in : allCities} }, { address: 1, city: 1})
        .exec(function (err, allProviders) {
            
        if (!err){
            if(allProviders){
                var nProviders = allProviders.length;
                console.log(nProviders);
                allProviders.forEach(function(rProvider, rindex){
                    var bIndex = allCities.indexOf(rProvider.city);
                    
                    if(bIndex != -1){
                        
                        var newCity = allCityNewCities[bIndex].newcity;
                        if(newCity != rProvider.city){
                            changecounter += 1;
                            var oldAddress = rProvider.address;
                            var oldCity = rProvider.city;
                            
                            rProvider.address = rProvider.address + ", " + rProvider.city;
                            console.log("Change address from: " + oldAddress + " to " + rProvider.address);
                            
                            rProvider.city = newCity;
                            console.log("Change city from: " + oldCity + " to " + rProvider.city);
                            /*rProvider.save(function(err, rProvider) {
                            if (err) return     console.error(err);
                                console.log("Saved: " + rProvider._id);
                                //res.json(rProvider._id);
                            });*/
                        }
                        counter += 1;
                        if(counter == nProviders){
                            console.log("Total " + changecounter + " changes!");
                        }
                        
                    }else{
                        console.log('Somethign went very wrong: ' + rProvider.city);
                    }
                    
                });
                
            }else{
                //res.json(null);
            }
        } else {throw err;}
    });
});

router.post('/bulkDisableProviders', function(req, res) {
    var disableForm = req.body;
    var instituteIds = disableForm.instituteIds;
    var user = disableForm.user;
    console.log('You are about to disable: ' + JSON.stringify(instituteIds) + ' and user is ' + user);
    var nLength = instituteIds.length;
    var counter = 0;
    
    instituteIds.forEach(function(thisInstituteId, index){
        //JHI
        
        var thisProvider = coaching.findOne( {"_id" : thisInstituteId, type: 'Coaching'}, {disabled:1},function(err, thisProvider) {
        if (!err){
            counter = counter +1;
            thisProvider.disabled = true;
            thisProvider.save(function(err, thisProvider) {
                if (err) return console.error(err);
                
                var newDisabled = new disableProvider({
                    institute: thisProvider._id,
                    user: user
                });
                newDisabled.save(function(err, newDisabled) {
                    if (err) return console.error(err);
                    //res.json(newDisabled._id);
                    console.log("The following provider is disabled: " + thisProvider._id + ' ' + thisProvider.address + ', ' + thisProvider.city);
                });
                
                
                //res.json('Done');
            });
            if(counter == nLength){
                res.json('Done');
            }
        } else {throw err;}
        });
        
        
    });
    
});

router.post('/cirf', function(req, res) {
    var cirfForm = req.body;
    var instituteIds = cirfForm.instituteIds;
    var examId = cirfForm.examId;
    var statements = [];
    
    var allProviders = coaching.find( {"_id" : {$in: instituteIds}, type: 'Coaching'}, {rating: 1, name: 1, groupName: 1},function(err, allProviders) {
    if (!err){
    var nLength = allProviders.length;
    var counter = 0;

    if(nLength == 0){
        res.json(false);
    }
    allProviders.forEach(function(this_Provider, index){
        var groupName = this_Provider.groupName;
        
        var thisProvider = coaching.findOne( {"groupName" : groupName, type: 'Coaching', $and: [{"rating": {$exists: true}},{"rating.n_exams": {$exists: true}}]}, {rating: 1, name: 1, groupName: 1, cirf: 1},function(err, thisProvider) {
        if (!err){
            
        if(thisProvider){
            
        console.log('Coaching Id is: ' + thisProvider._id);
        statements.push('Coaching Id is: ' + thisProvider._id);
        var rating = thisProvider.rating;

        var allCIRFs = cirffactor.find( {exam : examId}, {},function(err, allCIRFs) {
        if (!err){
        var cCounter = 0;
        var nCIRFs = allCIRFs.length;
        var providerScore = 0;
        var totalScore = 0;

        if(allCIRFs && allCIRFs.length > 0){
            var providerExamCIRFScore = {
                exam: examId,
                cirf: null,
                unscaledScore: null,
                unscaledWeight: null,
                factors: [],
            };
            console.log('------------------------');
            statements.push('------------------------');
            console.log('Coaching: ' + thisProvider.name);
            statements.push('Coaching: ' + thisProvider.name);
            allCIRFs.forEach(function(thisCIRF, index){
                var factorScore = 0;
                var factorWeight = Number(thisCIRF.weight);
                totalScore += factorWeight;
                
                var newFactor = {
                    name: thisCIRF.name,  
                    weight: thisCIRF.weight,
                    factorScore: null,
                    subfactors: [],
                };
                
                var subfactors = thisCIRF.subfactors;
                var examCIRF = false;
                if(thisCIRF.exam.length == 1){
                    examCIRF = true;
                }
                subfactors.forEach(function(thisSubfactor, sindex){
                    var subfactorScore = 0;
                    
                    if(thisSubfactor.type == 'Bucket'){
                        var buckets = thisSubfactor.buckets;
                        var defaultBucket = null;
                        
                        var validBuckets = [];
                        var ratingVariable = thisSubfactor.variable;
                        var providerVariable = rating[ratingVariable];
                        
                        if(examCIRF){
                            if(rating.examRating && rating.examRating.length > 0){
                                rating.examRating.forEach(function(thisExamRating, eindex){
                                    if(thisExamRating.exam.toString() == examId.toString()){
                                        
                                        providerVariable = thisExamRating.rating[ratingVariable];
                                        //console.log('I am here ' + JSON.stringify(providerVariable));
                                    }
                                    
                                });
                            }
                        }
                        
                        if(providerVariable.value){
                            providerVariable.value = parseInt(providerVariable.value.match(/\d+/),10);
                        }
                        
                        /*if(providerVariable.value && providerVariable.value.indexOf('%') != -1){
                            providerVariable.value = parseFloat(providerVariable.value);
                        }*/
                        //console.log(providerVariable.value);
                        if(true){
                            var option = providerVariable.option;
                            if(!option){
                                option = '';
                            }else{
                                option = option.replace(" ", ""); 
                                option = option.replace("%", "");
                            }
                            
                            
                            if(option.indexOf('-') != -1){
                                var splits = option.split("-");
                                var sum = 0;
                                splits.forEach(function(thisValue, vindex){
                                    sum += parseFloat(thisValue);
                                    //console.log(thisValue);
                                });
                                sum = sum/splits.length;
                                providerVariable.value = sum;
                            }
                            if(option.indexOf('>') != -1){
                                var opt1 = option.replace(">", "");
                                
                                
                                providerVariable.value = parseFloat(opt1) + 1;
                                
                                
                            }
                            if(option.indexOf('<') != -1){
                                var opt1 = option.replace("<", "");
                                
                                providerVariable.value = parseFloat(opt1) - 1;
                                
                                
                            }
                        }
                        //console.log("***** " + providerVariable);

                        if(buckets && buckets.length > 0){
                            buckets.forEach(function(thisBucket, bindex){
                                if(!defaultBucket){
                                    defaultBucket = thisBucket;
                                }
                                if(thisBucket.score < defaultBucket.score){
                                    defaultBucket = thisBucket;
                                }
                            });
                            if(!providerVariable.value){
                                //console.log('Alert: ' + providerVariable);
                            }
                            buckets.forEach(function(thisBucket, bindex){
                            
                            var valid = false;
                            
                            if(Number(thisBucket.range.min) <= Number(providerVariable.value) && Number(thisBucket.range.max) >= Number(providerVariable.value)){
                                valid = true;
                            }
                            if(valid){
                                validBuckets.push(thisBucket);
                            }
                                
                            });
                            
                            var providerBucket = null;
                            validBuckets.forEach(function(thisBucket, bindex){
                                if(!providerBucket){
                                    providerBucket = thisBucket;
                                }
                                if(thisBucket.score > providerBucket.score){
                                    providerBucket = thisBucket;
                                }
                            });
                            
                            if(!providerBucket){
                                providerBucket = defaultBucket;
                            }
                            //console.log("      " + providerVariable.value + " -- " + JSON.stringify(providerBucket));
                            //console.log("      Scored " + providerBucket.score + " out of 100!");
                            
                            subfactorScore = providerBucket.score;
                            
                        }



                        //console.log(thisSubfactor.name + " " + thisSubfactor.weight + " " + thisSubfactor.variable + " " + rating[thisSubfactor.variable]);
                    }
                    if(thisSubfactor.type == 'Checklist'){
                        var weight = 0;
                        var checklists = thisSubfactor.checklists;
                        var ratingVariable = thisSubfactor.variable;
                        var providerVariable = rating[ratingVariable];
                        
                        checklists.forEach(function(thisChecklist, cindex){
                            var checklistVariable = thisChecklist.variable;
                            if(providerVariable[checklistVariable]){
                                weight += Number(thisChecklist.score);
                            }
                            
                        });
                        
                        //console.log("      Scored " + weight + " out of 100!");
                        subfactorScore = weight;
                    }
                    //console.log(subfactorScore);
                    var newSubFactor = {
                        name: thisSubfactor.name,  
                        weight: thisSubfactor.weight,
                        score: subfactorScore,
                    };
                    newFactor.subfactors.push(newSubFactor);
                    var subFactorScore = Number(subfactorScore * Number(thisSubfactor.weight) * factorWeight / 100 / 100);
                    console.log("      => Subfactor Name: " + thisSubfactor.name + " | Subfactor Weight: " + thisSubfactor.weight + " | Subfactor Score: " + subFactorScore + " out of " + thisSubfactor.weight * thisCIRF.weight / 100);
                    statements.push("      => Subfactor Name: " + thisSubfactor.name + " | Subfactor Weight: " + thisSubfactor.weight + " | Subfactor Score: " + subFactorScore + " out of " + thisSubfactor.weight * thisCIRF.weight / 100);
                    
                    
                    factorScore += subFactorScore;
                    //console.log(sindex + ". " + thisSubfactor.name + " | Subfactor Weight: " + thisSubfactor.weight);

                });
                newFactor.factorScore = factorScore;
                providerExamCIRFScore.factors.push(newFactor);
                console.log(thisCIRF.name + " | Factor Weight: " + thisCIRF.weight + " | " + factorScore);
                statements.push(thisCIRF.name + " | Factor Weight: " + thisCIRF.weight + " | " + factorScore);
                providerScore += Number(factorScore);
            });
            
            var scaledScore = Number(providerScore * 100 / totalScore);
            scaledScore = Math.round(scaledScore * 100) / 100;
            providerExamCIRFScore.unscaledWeight = totalScore;
            providerExamCIRFScore.unscaledScore = providerScore;
            providerExamCIRFScore.cirf = scaledScore;
            console.log(thisProvider.name + ' rating is: ' + scaledScore + " .i.e. " + providerScore + ' out of ' + totalScore);
            statements.push(thisProvider.name + ' rating is: ' + scaledScore + " .i.e. " + providerScore + ' out of ' + totalScore);
            console.log('------------------------');
            statements.push('------------------------');
        }
        counter = counter +1;
        if(counter == nLength){
            console.log(providerExamCIRFScore);
            if(!thisProvider.cirf){
                thisProvider.cirf = [];
            }
            var cIndex = -1;
            if(thisProvider.cirf.length > 0){
                var cirfExamIds = thisProvider.cirf.map(function(a) {return a.exam.toString();});
                cIndex = cirfExamIds.indexOf(examId);
            }
            
            if(cIndex != -1){
                thisProvider.cirf.splice(cIndex, 1);
                thisProvider.cirf.push(providerExamCIRFScore);
                
            }else{
                thisProvider.cirf.push(providerExamCIRFScore);
            }
            //console.log(thisProvider.cirf);
            thisProvider.save(function(err, thisProvider) {
                if (err) return console.error(err);
                console.log("CIRF saved for: "+ thisProvider._id);
            });
               
            res.json(statements);
        }
    } else {throw err;}
    });
        
        }else{
            console.log('Could not find rating for the coaching!');
            statements.push('Could not find rating for the coaching!');
            res.json(statements);
        }    

        }
        });
    
    });
        
        
    } else {throw err;}
    });
    
});

router.post('/cirfRatingJEEMainAdvanced', function(req, res) {
    console.log('CIRF Bulk Started');
    res.json(true);
    var examId = ObjectId('58ac2b8c7f7f514550cd3aea');
    var groupNames = coaching.aggregate(
    [
        {$match: {exams: examId, disabled: false} },
        {"$group": { "_id": { name: "$name" }, count:{$sum:1}, oneid: { $first: "$_id" } } },
        {$sort:{"count":-1}},
        { "$project": { "_id": "$_id.name", "_id": 0, oneid: "$oneid" }},
        //, count: "$count"
    ],function(err, groupNames) {
    if (!err){
        var groupIds = groupNames.map(function(a) {return a.oneid.toString();});
        var statements = [];
        var allProviders = coaching.find( {_id: {$in: groupIds}}, {rating: 1, name: 1, groupName: 1, exams: 1, disabled: 1},function(err, allProviders) {
            if (!err){
            var nLength = allProviders.length;


            if(nLength == 0){
                //res.json(false);
            }
                console.log('Number of coachings: ' + allProviders.length);
            allProviders.forEach(function(this_Provider, index){
                var groupName = this_Provider.groupName;
                //console.log('Rating for: ' + groupName);
                var thisProvider = coaching.findOne( {"groupName" : groupName, type: 'Coaching', $and: [{"rating": {$exists: true}},{"rating.n_exams": {$exists: true}}]}, {rating: 1, name: 1, groupName: 1, cirf: 1},function(err, thisProvider) {
                if (!err){

                if(thisProvider){
                var counter = 0;
                //console.log('We are rating coaching Id is: ' + thisProvider._id);
                statements.push('Coaching Id is: ' + thisProvider._id);
                var rating = thisProvider.rating;

                var allCIRFs = cirffactor.find( {exam : examId}, {},function(err, allCIRFs) {
                if (!err){
                var cCounter = 0;
                var nCIRFs = allCIRFs.length;
                var providerScore = 0;
                var totalScore = 0;
                if(allCIRFs && allCIRFs.length > 0){
                    var providerExamCIRFScore = {
                        exam: examId,
                        cirf: null,
                        unscaledScore: null,
                        unscaledWeight: null,
                        factors: [],
                    };
                    //console.log('------------------------');
                    statements.push('------------------------');
                    //console.log('Coaching: ' + thisProvider.name);
                    statements.push('Coaching: ' + thisProvider.name);
                    allCIRFs.forEach(function(thisCIRF, index){
                        var factorScore = 0;
                        var factorWeight = Number(thisCIRF.weight);
                        totalScore += factorWeight;

                        var newFactor = {
                            name: thisCIRF.name,  
                            weight: thisCIRF.weight,
                            factorScore: null,
                            subfactors: [],
                        };

                        var subfactors = thisCIRF.subfactors;
                        var examCIRF = false;
                        if(thisCIRF.exam.length == 1){
                            examCIRF = true;
                        }
                        subfactors.forEach(function(thisSubfactor, sindex){
                            var subfactorScore = 0;

                            if(thisSubfactor.type == 'Bucket'){
                                var buckets = thisSubfactor.buckets;
                                var defaultBucket = null;

                                var validBuckets = [];
                                var ratingVariable = thisSubfactor.variable;
                                var providerVariable = rating[ratingVariable];

                                if(examCIRF){
                                    if(rating.examRating && rating.examRating.length > 0){
                                        rating.examRating.forEach(function(thisExamRating, eindex){
                                            if(thisExamRating.exam.toString() == examId.toString()){

                                                providerVariable = thisExamRating.rating[ratingVariable];
                                                //console.log('I am here ' + JSON.stringify(providerVariable));
                                            }

                                        });
                                    }
                                }
                                if(providerVariable && providerVariable.value && providerVariable.value.indexOf('%') != -1){
                                    providerVariable.value = parseFloat(providerVariable.value);
                                }
                                if(providerVariable && providerVariable.value == ''){
                                    var option = providerVariable.option;
                                    if(!option){
                                        option = '';
                                    }
                                    //console.log(providerVariable);
                                    if(option.indexOf('-') != -1){
                                        var splits = option.split("-");
                                        var sum = 0;
                                        splits.forEach(function(thisValue, vindex){
                                            sum += parseFloat(thisValue);
                                            //console.log(thisValue);
                                        });
                                        sum = sum/splits.length;
                                        providerVariable.value = sum;
                                    }
                                    if(option.indexOf('>') != -1){
                                        var opt1 = option.replace(">", "");

                                        providerVariable.value = parseFloat(opt1) + 1;

                                    }
                                    if(option.indexOf('<') != -1){
                                        var opt1 = option.replace(">", "");
                                        providerVariable.value = parseFloat(opt1) - 1;

                                    }
                                }
                                //console.log(ratingVariable + " " + providerVariable);

                                if(providerVariable && buckets && buckets.length > 0){
                                    buckets.forEach(function(thisBucket, bindex){
                                        if(!defaultBucket){
                                            defaultBucket = thisBucket;
                                        }
                                        if(thisBucket.score < defaultBucket.score){
                                            defaultBucket = thisBucket;
                                        }
                                    });
                                    if(providerVariable && !providerVariable.value){
                                        //console.log('Alert: ' + providerVariable);
                                    }
                                    buckets.forEach(function(thisBucket, bindex){

                                    var valid = false;

                                    if(Number(thisBucket.range.min) <= Number(providerVariable.value) && Number(thisBucket.range.max) >= Number(providerVariable.value)){
                                        valid = true;
                                    }
                                    if(valid){
                                        validBuckets.push(thisBucket);
                                    }

                                    });

                                    var providerBucket = null;
                                    validBuckets.forEach(function(thisBucket, bindex){
                                        if(!providerBucket){
                                            providerBucket = thisBucket;
                                        }
                                        if(thisBucket.score > providerBucket.score){
                                            providerBucket = thisBucket;
                                        }
                                    });

                                    if(!providerBucket){
                                        providerBucket = defaultBucket;
                                    }
                                    //console.log("      " + providerVariable.value + " -- " + JSON.stringify(providerBucket));
                                    //console.log("      Scored " + providerBucket.score + " out of 100!");

                                    subfactorScore = providerBucket.score;

                                }



                                //console.log(thisSubfactor.name + " " + thisSubfactor.weight + " " + thisSubfactor.variable + " " + rating[thisSubfactor.variable]);
                            }
                            if(thisSubfactor.type == 'Checklist'){
                                var weight = 0;
                                var checklists = thisSubfactor.checklists;
                                var ratingVariable = thisSubfactor.variable;
                                var providerVariable = rating[ratingVariable];

                                checklists.forEach(function(thisChecklist, cindex){
                                    var checklistVariable = thisChecklist.variable;
                                    if(providerVariable[checklistVariable]){
                                        weight += Number(thisChecklist.score);
                                    }

                                });

                                //console.log("      Scored " + weight + " out of 100!");
                                subfactorScore = weight;
                            }
                            //console.log(subfactorScore);
                            var newSubFactor = {
                                name: thisSubfactor.name,  
                                weight: thisSubfactor.weight,
                                score: subfactorScore,
                            };
                            newFactor.subfactors.push(newSubFactor);
                            var subFactorScore = Number(subfactorScore * Number(thisSubfactor.weight) * factorWeight / 100 / 100);
                            //console.log("      => Subfactor Name: " + thisSubfactor.name + " | Subfactor Weight: " + thisSubfactor.weight + " | Subfactor Score: " + subFactorScore + " out of " + thisSubfactor.weight * thisCIRF.weight / 100);
                            statements.push("      => Subfactor Name: " + thisSubfactor.name + " | Subfactor Weight: " + thisSubfactor.weight + " | Subfactor Score: " + subFactorScore + " out of " + thisSubfactor.weight * thisCIRF.weight / 100);


                            factorScore += subFactorScore;
                            //console.log(sindex + ". " + thisSubfactor.name + " | Subfactor Weight: " + thisSubfactor.weight);

                        });
                        newFactor.factorScore = factorScore;
                        providerExamCIRFScore.factors.push(newFactor);
                        //console.log(thisCIRF.name + " | Factor Weight: " + thisCIRF.weight + " | " + factorScore);
                        statements.push(thisCIRF.name + " | Factor Weight: " + thisCIRF.weight + " | " + factorScore);
                        providerScore += Number(factorScore);
                    });

                    var scaledScore = Number(providerScore * 100 / totalScore);
                    scaledScore = Math.round(scaledScore * 100) / 100;
                    providerExamCIRFScore.unscaledWeight = totalScore;
                    providerExamCIRFScore.unscaledScore = providerScore;
                    providerExamCIRFScore.cirf = scaledScore;
                    //console.log(thisProvider.name + ' rating is: ' + scaledScore + " .i.e. " + providerScore + ' out of ' + totalScore);
                    statements.push(thisProvider.name + ' rating is: ' + scaledScore + " .i.e. " + providerScore + ' out of ' + totalScore);
                    //console.log('------------------------');
                    statements.push('------------------------');
                }
                counter = counter +1;
                if(counter == 1){
                    //console.log(providerExamCIRFScore);
                    if(!thisProvider.cirf){
                        thisProvider.cirf = [];
                    }
                    var cIndex = -1;
                    if(thisProvider.cirf.length > 0){
                        var cirfExamIds = thisProvider.cirf.map(function(a) {return a.exam.toString();});
                        cIndex = cirfExamIds.indexOf(examId.toString());
                    }

                    if(cIndex != -1){
                        thisProvider.cirf.splice(cIndex, 1);
                        thisProvider.cirf.push(providerExamCIRFScore);
                        

                    }else{
                        thisProvider.cirf.push(providerExamCIRFScore);
                        console.log("New CIRF added for: "+ thisProvider._id);
                    }
                    //console.log(thisProvider.cirf);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Saved: "+ thisProvider._id);
                    });

                    //res.json(statements);
                }
            } else {throw err;}
            });

                }else{
                    //console.log('Could not find rating for the coaching: ' + this_Provider._id + " " + groupName);
                    statements.push('Could not find rating for the coaching!');
                    //res.json(statements);
                }    

                }
                });

            });


            } else {throw err;}
            });
        
        
        //console.log(groupNames);
    } else {throw err;}
    });
    
    
    
});

//to get all providers
router.get('/websites', function(req, res) {
    console.log("Getting Websites");
    coaching.distinct( "website",function(err, docs) {
    if (!err){
        console.log(docs);
        docs.forEach(function(thisWebsite, index){
            console.log(thisWebsite);
        });
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/cityProviderCount/:city', function(req, res) {
    /*, $where: "this.exams && this.exams.length > 0"*/
    var city = req.params.city;
    console.log('City is ' + city);
    coaching.count({city: city}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/count', function(req, res) {
    coaching.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
router.get('/city/:city', function(req, res) {
    var city = req.params.city;
    var cityProviders = coaching
        .find({'city': city, disabled: {$ne: true}, type: 'Coaching' },{name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,coachingWebsite:1, rank:1, city:1, pincode:1, exams:1,location:1,email:1, ebNote:1, latlng:1, latlngna:1, ebVerifyState:1, groupName:1})
        .deepPopulate('exams location ebNote.user')
        .exec(function (err, cityProviders) {
        if (!err){
            
            //console.log(cityProviders);
            res.json(cityProviders);
            
        } else {throw err;}
    });
});

router.get('/cityCount', function(req, res) {
    //console.log("In city count");
    var cities = coaching.distinct( "city",function(err, cities) {
    if (!err){
        var allCityCount = [];
        cities.forEach(function(thisCity, index){
            var cityCount = coaching.count({"city" : thisCity}, function(err, cityCount) {
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


router.post('/bulkAddResult', function(req, res) {
    var examResult = req.body;
    var providerId = examResult.providerId;
    var examResults = examResult.examResults;
    var nExams = examResults.length;
    var bigCounter = 0;
    var bigCounter2 = 0;
    var tResults = 0;
    var resSent = false;
    examResults.forEach(function(examResult, index){
        tResults = tResults + examResult.result.length;
    });
    
    
    
    console.log('Express received: ' + tResults + " results");
    //, type: 'Coaching'
    var thisProvider = coaching
        .findOne({ _id: providerId }, {results:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
        if(thisProvider){
            
            examResults.forEach(function(examResult, index){
            bigCounter = bigCounter + 1;
    
            var exam = examResult.exam;
            var result = examResult.result;
            var nResult = examResult.result.length;
            var counter = 0;
            console.log('Starting Bulk Add of ' + nResult + ' Results for: ' + exam);
            
            var newResults = result.map(function(a) {return a._id;});
            var ExistingResults = thisProvider.results.map(function(a) {return a._id;});

            //console.log('New Result are: ' +JSON.stringify(newResults));
            //console.log('Existing Result are: ' + JSON.stringify(ExistingResults));
            var deleteResults = [];
            ExistingResults.forEach(function(thisResult, index){
                if(thisResult){
                    if(newResults.indexOf(thisResult.toString()) == -1){
                        deleteResults.push(thisResult);
                    }
                }


            });
            //console.log('About to delete the following: ' + JSON.stringify(deleteResults));


            result.forEach(function(thisResult, index){
            counter = counter + 1;
            bigCounter2 = bigCounter2 + 1;
            if(thisResult._id && thisResult._id != ''){
                thisProvider.results.forEach(function(existingResult, existingIndex){
                    if(existingResult._id == thisResult._id){
                        //console.log(thisResult.name);
                        if(thisResult.name =='' || thisResult.name == null){
                           //thisResult.active = false; 
                           console.log('Splicing the result' + thisResult._id);
                            deleteResults.push(thisResult._id);
                            //thisProvider.results.splice(existingIndex, 1);
                            //console.log(JSON.stringify(thisProvider.results));
                        }else{
                            if(thisResult.name !='' && thisResult.name !=null){
                                for (var property in thisResult) {
                                existingResult[property] = thisResult[property];
                                }
                                existingResult.name = titleCase(thisResult.name);

                            }


                        }
                    }
                });

            }else{
                if(thisResult.name != ''){
                    console.log('I am here second loop ' + thisResult.name);

                    thisResult.name = titleCase(thisResult.name);
                    var newResult = {
                        year: thisResult.year,
                        subgroup: thisResult.subgroup,
                        name: thisResult.name,
                        rank: thisResult.rank,
                        marks: thisResult.marks,
                        percentile: thisResult.percentile,
                        percentage: thisResult.percentage,
                        passFail: thisResult.passFail,
                        category: thisResult.category,
                        image: thisResult.image,
                        exam: exam
                    };

                    thisProvider.results.push(newResult);

                }


            }
            if(counter == nResult){
                console.log(JSON.stringify(deleteResults));
                var subSetResults = []; thisProvider.results.forEach(function(thisResult, index){
                    var delIndex = deleteResults.indexOf(thisResult._id.toString());
                    if(delIndex == -1){
                        subSetResults.push(thisResult);
                    }
                });
                //console.log('New Results are: ' + JSON.stringify(subSetResults));
                thisProvider.results = subSetResults;




                thisProvider.save(function(err, thisProvider) {
                    if (err) return console.error(err);
                    console.log("Results edited for provider id: "+ thisProvider._id);
                    console.log('Total results are: '+ thisProvider.results.length);
                    //res.json('Done');
                    if(bigCounter == nExams && bigCounter2 == tResults && !resSent){
                        resSent = true;
                        res.json('Done');
                    }

                });

            }

            });

            
            });
            
            
        }else{
            console.log('No such provider');
            res.json('Error');
        }
        } else {throw err;}
    });
    
});



router.post('/addResult', function(req, res) {
    var newResultForm = req.body;
    var imageUrl = newResultForm.result.image;
    var newResult = newResultForm.result;
    var providerId = newResultForm.providerId;
    console.log('Express received: ' + JSON.stringify(newResultForm));
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {results:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){
                var nResult = thisProvider.results.length;
                console.log('There are ' + nResults +' results');
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

router.post('/addPrimaryManagement', function(req, res) {
    var newManagementForm = req.body;
    var newManagement = newManagementForm.management;
    var mobile = newManagement.mobile;
    var providerId = newManagementForm.providerId;
    console.log('Express received: ' + JSON.stringify(newManagementForm));
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {management:1})
        .exec(function (err, thisProvider) {
        if (!err){
            if(thisProvider){
                thisProvider.primaryManagement = newManagement;
                thisProvider.save(function(err, thisProvider) {
                    if (err) return console.error(err);
                    console.log("Management data saved for " + thisProvider._id);
                    res.json('Done');
                });
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

router.post('/removeManagement', function(req, res) {
    var newManagementForm = req.body;
    var newManagement = newManagementForm.management;
    var mobile = newManagement.mobile;
    var providerId = newManagementForm.providerId;
    console.log('Express received to remove: ' + JSON.stringify(newManagementForm));
    var thisProvider = coaching
        .findOne({ _id: providerId, type: 'Coaching' }, {management:1})
        .exec(function (err, thisProvider) {
        if (!err){
            if(thisProvider){
                console.log(thisProvider._id);
                var existingId = newManagement._id;
                if(existingId){
                    console.log(existingId);
                    var providerManagement = thisProvider.management;
                    var providerManagementIds = providerManagement.map(function(a) {return a._id.toString();});
                    var mIndex = providerManagementIds.indexOf(existingId.toString());
                    
                    console.log(providerManagementIds);
                    console.log(mIndex);
                    if(mIndex != -1){
                        console.log(mIndex);
                        thisProvider.management.splice(mIndex, 1);
                        thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Management data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                        
                    }else{
                        
                    }
                    
                }else{
                    console.log('No such management');
                    res.json('Error');
                }
                
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});


router.post('/addManagement', function(req, res) {
    var newManagementForm = req.body;
    var newManagement = newManagementForm.management;
    var mobile = newManagement.mobile;
    var providerId = newManagementForm.providerId;
    console.log('Express received: ' + JSON.stringify(newManagementForm));
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {management:1})
        .exec(function (err, thisProvider) {
        if (!err){
            if(thisProvider){
                //DEF
                var existingId = newManagement._id;
                if(existingId){
                    var providerManagement = thisProvider.management;
                    var providerManagementIds = providerManagement.map(function(a) {return a._id;});
                    var mIndex = providerManagementIds.indexOf(existingId);
                    if(mIndex != -1){
                        thisProvider.management[mIndex] = newManagement;
                        thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Management data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                        
                    }else{
                        
                    }
                    
                }
                
                
                var nManagement = thisProvider.management.length;
                var managementExists = false;
                var counter = 0;
                 thisProvider.management.forEach(function(thisManagement, index){
                counter = counter + 1;
                if(!managementExists){
                
                if(mobile == thisManagement.mobile){
                    managementExists = true; console.log(JSON.stringify(newManagement));     
                    for (var property in newManagement) {
                        thisManagement[property] = newManagement[property];
                    }
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Management data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                    
                }   
                        
                }
                if(!managementExists && counter == nManagement){ thisProvider.management.push(newManagement);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Management data saved for " + thisProvider._id);
                        res.json('Done');
                    });
                }
                });
                
                if(nManagement == 0){
                    //console.log('----------Here---------');
                    //create new management
                    thisProvider.management.push(newManagement);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Management data saved for " + thisProvider._id);
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
    //, type: 'Coaching'
    var thisProvider = coaching
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
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {course:1})
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


router.post('/courseSummary', function(req, res) {
    var allProviders = coaching
        .find({disabled: false, course: {$exists:true}, $where:'this.course.length>3'}, {course:1})
        .exec(function (err, allProviders) {
        if (!err){
            
            if(allProviders){
                var nProviders = allProviders.length;
                var counter = 0;
                var allCourses = [];
                allProviders.forEach(function(thisProvider, index){
                    var thisPCourse = thisProvider.course;
                    var nCourses = thisPCourse.length;
                    thisPCourse.forEach(function(thisCourse, cindex){
                        if(thisCourse.fees && thisCourse.fees != '' && Number(thisCourse.fees) > 0){
                            allCourses.push(thisCourse);
                        }
                        
                    });
                    if(index == nProviders - 1){
                        //console.log(allCourses.length);
                        res.json(allCourses);
                    }
                });
                //res.json(true);
            }else{
                console.log('No such provider');
                res.json(null);
            }
        } else {throw err;}
    });
    
});

function add(a, b) {
    return a + b;
}
router.post('/examListingsSummary', function(req, res) {
    var examGroups = [];
    
     var allExams = exam.find({active: true}, {exam: 1, name:1, displayname: 1, seoname: 1, stream: 1},function(err, allExams) {
        if (!err){
                var nExams = allExams.length;
                console.log(nExams + " total exams");
                var eCounter = 0;
                allExams.forEach(function(thisExam, index){
                var examId = thisExam._id;
                
                var groupNames = coaching.aggregate(
                [
                    {$match: {exams: examId, disabled: false} },
                    {"$group": { "_id": { name: "$name" }, count:{$sum:1} } },
                    {$sort:{"count":-1}}

                ],function(err, groupNames) {
                if (!err){
                    var nGroupCounts = groupNames.length;
                    var groupCounts = groupNames.map(function(a) {return Number(a.count);});
                    //console.log(groupCounts);
                    
                    var nGroups = groupCounts.reduce(add, 0);


                    console.log(examId +" " + nGroupCounts + " " + nGroups);
                    groupNames = groupNames.slice(0, 5);
                    //console.log(groupNames);
                    var queryGroups = [];
                    groupNames.forEach(function(thisGroup, index){
                        var qGroup = {
                            name: thisGroup._id.name,
                            centers: thisGroup.count,
                        };
                        queryGroups.push(qGroup);
                    });
                    //console.log(queryGroups);
                    var thisExamGroup = {
                        exam: thisExam,
                        nGroups: nGroups,
                        topNgroups: queryGroups
                    };
                    examGroups.push(thisExamGroup);
                    eCounter += 1;
                    if(eCounter == nExams){
                        //console.log('I am here');
                        //console.log(examGroups);
                        res.json(examGroups);
                    }
                    //res.json(queryGroups);
                } else {throw err;}
                });
                
                
                /*var allProviders = coaching
                .find({disabled: false, exam: examId}, {exam: 1, name:1, groupname: 1})
                .exec(function (err, allProviders) {
                    if (!err){

                        if(allProviders){
                            var nProviders = allProviders.length;
                            console.log(nProviders);
                            res.json(true);
                        }else{
                            console.log('No such provider');
                            res.json(null);
                        }
                    } else {throw err;}
                });*/
                
                
                
            });
            
            
            
        }
     });
    
    
});


router.post('/coachingMaintenance', function(req, res) {
    var examId = '58ac2cb47e852a2c401a8c44';
    var addExamId = '58ac2ccc7e852a2c401a8c46';
    var counter = 0;
    var addcounter = 0;
    var active = false;
    
    
    if(active){
     var allProviders = coaching.find( {exams: examId, disabled: false}, {exams: 1},function(err, allProviders) {
    if (!err){
        if(allProviders){
            var nLength = allProviders.length;
            console.log(nLength);
            allProviders.forEach(function(thisProvider, index){
                var thisExam = thisProvider.exams;
                var aeIndex = thisExam.indexOf(addExamId);
                if(aeIndex != -1){
                    //console.log('Add Exam Exists');
                }else{
                    addcounter += 1;
                    thisProvider.exams.push(addExamId);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Coaching Updated " + thisProvider._id);
                    });
                    //console.log(thisProvider._id);
                }
                counter += 1;
                if(counter == nLength){
                    console.log("All done - " + addcounter + " coachings have been edited!");
                }
                
                
            });
            res.json(true);
        }else{
            res.json(false);
        }
        
    } else {throw err;}
    });
    }else{
        res.json(false);
    }
});
router.post('/addVideo', function(req, res) {
    var newVideoForm = req.body;
    var videoLink = newVideoForm.video.link;
    var newVideo = newVideoForm.video;
    var providerId = newVideoForm.providerId;
    console.log('Express received: ' + JSON.stringify(newVideoForm));
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {video:1})
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
router.post('/addResultPic', function(req, res) {
    var newResultPicForm = req.body;
    var image = newResultPicForm.image;
    var providerId = newResultPicForm.providerId;
    var resultId = newResultPicForm.resultId;
    
    console.log('Add Result Pic: Express received: ' + JSON.stringify(newResultPicForm));
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {results:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){   
                thisProvider.results.forEach(function(thisResult, index){
                    if(thisResult._id == resultId){
                        thisResult.image = image;
                        thisProvider.save(function(err, thisProvider) {
                            if (err) return console.error(err);
                            console.log("Result pic saved for " + thisResult._id);
                            res.json('Done');
                        });
                    }
                    
                });
                
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});

router.post('/addLogo', function(req, res) {
    var newLogoForm = req.body;
    var logo = newLogoForm.logo;
    var providerId = newLogoForm.providerId;
    console.log('Express received: ' + JSON.stringify(newLogoForm));
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {logo:1, oldlogo:1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            if(thisProvider){
                thisProvider.logo = logo;
                thisProvider.save(function(err, thisProvider) {
                    if (err) return console.error(err);
                    console.log("Logo data saved for " + thisProvider._id);
                    res.json('Done');
                });
            }else{
                console.log('No such provider');
                res.json('Error');
            }
        } else {throw err;}
    });
    
});
router.get('/coachingAddressService/', function(req, res) {
    
    var allproviders =  coaching.find({
            /*'city':'Noida',*/
            $or: [{'latlngna': {$exists: false}}, {'latlngna': false}],
            latlng: {$exists: false}, type: 'Coaching',
        }, {address:1, city:1},function(err, allproviders) {
        if (!err){
            //console.log(allproviders);
            res.json(allproviders);
        }else {throw err;}
        }).limit(20).skip( Math.floor(Math.random() * (400 - 20 + 1)) + 20 );
    
});

router.post('/bulkSaveLatLng', function(req, res) {
    /*var LatLngForm = req.body;
    var nLength = LatLngForm.length;
    var counter = 0;
    //console.log(LatLngForm);
    LatLngForm.forEach(function(thisLatLng, index){
        //JHI
        
        var thisProvider = coaching.findOne( {"_id" : thisLatLng._id, type: 'Coaching'}, {latlng:1, latlngna:1},function(err, thisProvider) {
        if (!err){
            counter = counter +1;
            var latlng = thisLatLng.latlng;
            if(latlng && latlng.lat !='' && latlng.lng !=''){
                console.log('Setting latlng for: ' + thisLatLng._id + ' ' + JSON.stringify(latlng));
                thisProvider.latlngna = false;
                thisProvider.latlng = latlng;
                thisProvider.save(function(err, thisProvider) {
                    if (err) return console.error(err);
                    console.log("Lat long saved for " + thisProvider._id);

                    //res.json('Done');
                });
            }else{
                console.log('---- ' + JSON.stringify(thisLatLng));
                if(thisLatLng && thisLatLng.latlngna){
                    thisProvider.latlngna = true;
                    console.log('Setting latlngna for: ' + thisLatLng._id);
                    thisProvider.save(function(err, thisProvider) {
                        if (err) return console.error(err);
                        console.log("Lat long not available for " + thisProvider._id);

                        //res.json('Done');
                    });
                }
                
            }
            
            
            if(counter == nLength){
                res.json('Done');
            }
        } else {throw err;}
        });
        
        
    });*/
    
    
    
    
});



router.post('/aroundme', function(req, res) {
    var kmsToRadian = function(kms){
        var earthRadiusInKms = 6371;
        return kms / earthRadiusInKms;
    };
    
    var queryForm = req.body;
    
    var thisLng = Number(queryForm.latlng.lng);
    var thisLat = Number(queryForm.latlng.lat);
    var kms = Number(queryForm.distanceinKm);
    var examArray = queryForm.examArray;
    
    var coordinates = [thisLng, thisLat];
    
    var query = {
        "loc" : {
            $geoWithin : {
                $centerSphere : [coordinates, kmsToRadian(kms)]
            }
        },
        disabled: false,
        exams: {$exists: true}, 
        $where:'this.exams.length>0'
    };
    
    /*var query = {
        "loc" :
           { $near :
              {
                $geometry : {
                   type : "Point" ,
                   coordinates : coordinates },
                $maxDistance : 1
              }
           }  
    };*/
    
    var allProviders = coaching.find( query, {name:1, logo:1, loc:1, address: 1, phone:1, mobile: 1, website: 1, ebVerifyState: 1, exams: 1},function(err, allProviders) {
    if (!err){
        
       
        var sLength = examArray.length;
        var nLength = allProviders.length;
        if(sLength > 0){
            var filteredProviders = [];
            allProviders.forEach(function(thisprovider, index){
                var thisExams = thisprovider.exams;
                var shouldInclude = containsAny(examArray, thisExams);
                //console.log(shouldInclude);
                if(shouldInclude){
                    filteredProviders.push(thisprovider);
                }
            });
            
            var nLength2 = filteredProviders.length; 
            console.log(nLength + " -> " + nLength2);
            res.json(filteredProviders);
        }else{
            console.log(nLength);
            res.json(allProviders);
        }
        
        
    } else {throw err;}
    });
    
    
});

function containsAny(source,target)
{
    var result = source.filter(function(item){ return target.indexOf(item) > -1});   
    return (result.length > 0);  
}    

router.post('/setLocOfAll', function(req, res) {
    console.log('service starting');
    var allProviders = coaching.find( { latlng: {$exists: true}, loc: {$exists: false}, type: 'Coaching'}, {latlng:1, loc: 1},function(err, allProviders) {
    if (!err){
        var nLength = allProviders.length;
        var counter = 0;
        console.log(nLength);
        allProviders.forEach(function(thisprovider, index){
            var thisLatLng = thisprovider.latlng;
            var thisLng = Number(thisLatLng.lng);
            var thisLat = Number(thisLatLng.lat);
            
            thisprovider.loc = {
                type : 'Point',
                coordinates : [thisLng, thisLat]
            };
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log("Loc saved for " + thisprovider._id);
                counter += 1;
                if(counter == nLength){
                    res.json('Done');    
                }
            });
        });
        
        if(nLength == 0){
            res.json('Done');    
        }
        
    } else {throw err;}
    });//.limit(1000);
    
});

router.post('/bulkCheckLogos', function(req, res) {
    var checkLogoForm = req.body;
    console.log(checkLogoForm);
    var instituteIds = checkLogoForm.ids;
    var nLength = instituteIds.length;
    var counter = 0;
    
    instituteIds.forEach(function(thisInstituteId, index){
        //JHI
        
        var thisProvider = coaching.findOne( {"_id" : thisInstituteId, type: 'Coaching'}, {logoChecked:1},function(err, thisProvider) {
        if (!err){
            counter = counter +1;
            thisProvider.logoChecked = true;
            thisProvider.save(function(err, thisProvider) {
                if (err) return console.error(err);
                console.log("Logo Checked for " + thisProvider._id);
                
                //res.json('Done');
            });
            if(counter == nLength){
                res.json('Done');
            }
        } else {throw err;}
        });
        
        
    });
    
});

router.post('/addPhoto', function(req, res) {
    var newPhotoForm = req.body;
    var imageUrl = newPhotoForm.photo.image;
    var newPhoto = newPhotoForm.photo;
    var providerId = newPhotoForm.providerId;
    console.log('Express received: ' + JSON.stringify(newPhotoForm));
    //, type: 'Coaching' 
    var thisProvider = coaching
        .findOne({ _id: providerId}, {photo:1})
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

router.get('/query/:query', function(req, res) {
    var query = req.params.query;
    console.log(query);
    coaching.find({name:{'$regex' : query, '$options' : 'i'}, disabled: false, type: 'Coaching', exams: {$exists: true}, $where:'this.exams.length>0'}, {name:1 , address:1, city:1, state:1, logo:1, groupName:1},function(err, docs) {
    if (!err){
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }).sort( { city: 1 } ); //.limit(500) .sort( { rank: -1 } )
});


router.get('/coachingGroupQuery/:query', function(req, res) {
    var query = req.params.query;
    
    coaching.find({name:{'$regex' : query, '$options' : 'i'}, disabled: false, type: 'Coaching'}, {name:1 , address:1, city:1, state:1, logo:1, groupName:1, phone:1, mobile:1, email:1, pincode:1, website:1},function(err, docs) {
    if (!err){
        console.log(query + " " + docs.length);
        res.json(docs);
    } else {throw err;}
    }).sort( { name: 1 } ); 
    //.limit(500) .sort( { rank: -1 } )
});

router.get('/dailySummary', function(req, res) {
    var coachingSummary = coaching.aggregate(
    [
        {$match: {}},
        {$group: { _id : {
            year:{$year:"$_created"},
            month:{$month:"$_created"},
            day:{$dayOfMonth:"$_created"}
        },count:{$sum: 1 }},
        }/*,
        {$sort:{"_date":-1}}*/

    ],function(err, coachingSummary) {
    if (!err){
        res.json(coachingSummary);
    } else {throw err;}
    });
});

router.post('/p5Analytics', function(req, res) {
    var analyticsForm = req.body;
    var start = analyticsForm.start;
    var end = analyticsForm.end;
    
    start = moment(start).startOf('day').toDate();
    end = moment(end).endOf('day').toDate();
    
    var p5Analytics = view.aggregate(
    [
        {$match: { institute: {$exists: true}, state: 'showGroup', _date: {$gte: start, $lt: end} }},
        {"$group": { "_id": { institute: "$institute" }, count:{$sum:1} } },
    ],function(err, p5Analytics) {
    if (!err){
        var p5InstituteIds = [];
        var p5Views = [];
        var counter = 0;
        var nInstitutes = p5Analytics.length;
        if(nInstitutes == 0){
            res.json([]);
        }else{
            p5InstituteIds = p5Analytics.map(function(a) {return a._id.institute.toString();});
                        
            var allInstitutes = coaching.find({_id:{$in: p5InstituteIds}}, {name:1, city: 1, state: 1},function(err, allInstitutes) {
            if (!err){
                var nInstitutes2 = allInstitutes.length;
                console.log(nInstitutes2);
                allInstitutes.forEach(function(thisInstitute, index){
                    var pIndex = p5InstituteIds.indexOf(thisInstitute._id.toString());
                    
                    if(pIndex != -1){
                        var newView = {
                            _id: thisInstitute._id,
                            name: thisInstitute.name,
                            city: thisInstitute.city,
                            state: thisInstitute.state,
                            views: p5Analytics[pIndex].count
                        };
                        if(newView._id && newView._id != ''){
                            p5Views.push(newView);
                        }
                    }
                    counter += 1;
                    if(counter == nInstitutes2){
                        res.json(p5Views);
                    }
                });
            } else {throw err;}
            });
            
            
            
            
        }
        
    } else {throw err;}
    });
    
    
    
});

router.get('/blogCoachingGroupQuery/:query', function(req, res) {
    var query = req.params.query;
    
    
    var groupNames = coaching.aggregate(
    [
        {$match: {name:{'$regex' : query, '$options' : 'i'}, disabled: false} },
        {"$group": { "_id": { name: "$name" }, count:{$sum:1}, logo: { $first: "$logo" } } },
        {$sort:{"count":-1}}

    ],function(err, groupNames) {
    if (!err){
        groupNames = groupNames.slice(0, 20);
        //console.log(groupNames);
        var queryGroups = [];
        groupNames.forEach(function(thisGroup, index){
            var qGroup = {
                name: thisGroup._id.name,
                centers: thisGroup.count,
                logo: thisGroup.logo,
            };
            queryGroups.push(qGroup);
        });
        console.log(queryGroups);
        res.json(queryGroups);
    } else {throw err;}
    });
    
    /*coaching.find({name:{'$regex' : query, '$options' : 'i'}, disabled: false}, {name:1 , logo:1, groupName:1},function(err, docs) {
    if (!err){
        var groupNames = docs.map(function(a) {return a.groupName;});
        
        
        console.log(query + " " + groupNames);
        res.json(docs);
    } else {throw err;}
    }).sort( { city: 1 } ); //.limit(500) .sort( { rank: -1 } )*/
});

router.get('/contacts', function(req, res) {
    var allMobiles = coaching.distinct( "mobile",function(err, allMobiles) {
    if (!err){
        console.log('There are: ' + allMobiles.length + ' unique mobiles!');
        var allPhones = coaching.distinct( "phone",function(err, allPhones) {
        if (!err){ 
            console.log('There are: ' + allPhones.length + ' unique phones!');
            var allcontacts = allMobiles.concat(allPhones);
            console.log('There are: ' + allcontacts.length + ' unique contacts!');
            res.json(allcontacts);
        } else {throw err;}
        });
    } else {throw err;}
    });
    
    var allEmails = coaching.distinct( "email",function(err, allEmails) {
    if (!err){ 
        console.log('There are: ' + allEmails.length + ' unique emails!');
    } else {throw err;}
    });
    
    allProviders = coaching.find({email: {$exists: true}, $where:"this.email.length>0 && this.email[0] !=''"},{email:1},function(err, allProviders) {
    if (!err){
        var counter = 0; 
        var nEmails = 0; 
        var nLength = allProviders.length;
        console.log('Looking at ' + nLength + ' coachings!');
        allProviders.forEach(function(thisprovider, index){
            var thisEmail = thisprovider.email;
            counter += 1;
            nEmails += thisEmail.length;
            if(index % 1000 == 0){
                console.log('Looking at coaching no: ' + index);
            }
            if(counter == nLength){
                console.log(nLength + ' coachings have emails');
                console.log(nEmails + ' total emails exist');
            }
        });
        
        
    } else {throw err;}
    });
    
});


function sanitizeMobile(mobile){
    var trimmedmobile = mobile.split(' ').join('').toString();
    trimmedmobile = trimmedmobile.replace(/\-/g,"");
    trimmedmobile = trimmedmobile.replace("+(91)", "");
    trimmedmobile = trimmedmobile.replace("+91", "");
    //trimmedmobile = trimmedmobile.split('-').join('');
    //trimmedmobile = trimmedmobile.split('+').join('').toString();
    var remove = false;
    if(trimmedmobile.length > 0){
        //console.log(trimmedmobile);
        trimmedmobile = trimmedmobile.replace(/^0+/, '');
    }
    
    
    var mlength = trimmedmobile.length;
    
    var validMobile = false;
    if(mlength < 10){
        //console.log('Less than 10 digits | ' + mobile + " | " + trimmedmobile);
        
        if(mlength < 5){
            remove = true;
        }
    }
    if(mlength == 10){
        var firstChar = trimmedmobile.charAt(0);
        var validFirstChars = ["6","7","8","9"];
        
        if(validFirstChars.indexOf(firstChar) != -1){
            validMobile = true;
            if(trimmedmobile != mobile){
                console.log('Changing Mobile from ' + mobile + " to " + trimmedmobile);
            }
            mobile = trimmedmobile;
            //console.log('Correct Mobile | ' + mobile);
        }else{
            //console.log('Incorrect Mobile | ' + mobile);
        }
    }
    if(mlength > 10){
        //console.log('More than 10 digits | ' + mobile + " | " + trimmedmobile);
    }
    var santizedMobile = {
        valid: validMobile,
        mobile: mobile,
        remove: remove
    };
    return(mobile);
};

router.get('/sanitizeMobiles', function(req, res) {
    console.log('Starting sanitizing mobiles!');
    res.json(true);
    var nCounter = 0;
    var allProviders = coaching.find({mobile: {$exists: true}, $where:"this.mobile.length>0"}, {mobile:1},function(err, allProviders) {
    if (!err){
        console.log('There are ' + allProviders.length + ' coachings!');
        allProviders.forEach(function(thisProvider, index){
            var newMobiles = [];
            var thisMobiles = thisProvider.mobile;
            var anyChange = false;
            thisMobiles.forEach(function(thismobile, mindex){
                var newMobile = sanitizeMobile(thismobile);
                newMobiles.push(newMobile);
                
                if(mindex == thisMobiles.length - 1){
                    thisProvider.mobile = newMobiles;
                    thisProvider.save(function(err, thisProvider){
                        if (err) return console.error(err);
                        nCounter += 1;
                        //console.log(nCounter + '. Coaching saved: ' + thisProvider._id);
                        //console.log(thisProvider.mobile);
                    });
                    
                    
                }
            });
            
            
        });
        
        
    } else {throw err;}
    }).limit(35000);
});

router.get('/allResults/:examName', function(req, res) {
    var examName = req.params.examName;
    console.log("Exam name is: " + examName);
    
    var thisExam = exam.findOne({name: examName}, {name:1},function(err, thisExam) {
        if (!err){
            var examId = thisExam._id.toString();
            console.log('Exam Id is: ' + examId);
            
            var allResultProviders = coaching.find({results: {$exists: true}, $where:'this.results.length>0', exams:{$elemMatch:{$eq:thisExam._id}} }, {groupName:1, results:1, logo:1, city:1},function(err, allResultProviders) {
            if (!err){
                var allResults = [];
                var nProviders = allResultProviders.length;
                var counter = 0;
                console.log(nProviders);
                allResultProviders.forEach(function(thisprovider, index){
                    var thisResults = thisprovider.results;
                    var nResults = thisResults.length;
                    var rCounter = 0;

                    if(nResults > 0){
                        thisResults.forEach(function(currResult, rindex){
                            if(currResult.exam == examId && (!currResult.category || currResult.category=='' || currResult.category =='General')){
                                currResult.coaching = thisprovider.groupName;

                                var newResult ={
                                coaching: {
                                    name: thisprovider.groupName,
                                    logo: thisprovider.logo,
                                    _id: thisprovider._id,
                                    city: thisprovider.city,
                                },
                                    result: currResult,
                                };
                                //console.log(thisprovider.groupName);
                                allResults.push(newResult);
                            }
                            rCounter += 1;
                        });
                    }
                    counter = counter + 1;
                    if(counter == nProviders && rCounter == nResults){
                        //console.log(allResults);
                        res.json(allResults);
                    }

                });

                //res.json(allResultProviders);
            } else {throw err;}
            });

        }else {throw err;}
    });
    
    
    
    
});


router.post('/showGroupHelper', function(req, res) {
    var cityCoachingForm = req.body;
    var city = cityCoachingForm.city;
    var coachingName = cityCoachingForm.coachingName;
    
    var cityProvider = coaching.findOne({name: coachingName, city: city, exams: {$exists: true}, $where:'this.exams.length>0'}, {exams:1},function(err, cityProvider) {
    if (!err){
        var thisExam = cityProvider.exams[0];
        
        var thisExam =exam
            .findOne({_id: thisExam})
            .deepPopulate('stream')
            .exec(function (err, thisExam) {
            if (!err){
                var examName = thisExam.name;
                var streamName = thisExam.stream.name;
                
                var examStream = {
                    exam: examName,
                    stream: streamName,
                };
                res.json(examStream);
            } else {throw err;}
        });
    } else {throw err;}
    }).sort( { name: 1 } ).limit(20); //.limit(500) .sort( { rank: -1 } )
});

router.post('/showGroupHelperById', function(req, res) {
    var coachingForm = req.body;
    var coachingId = coachingForm._id;
    
    var cityProvider = coaching.findOne({_id: coachingId, exams: {$exists: true}, $where:'this.exams.length>0'}, {exams:1, city:1, groupName: 1},function(err, cityProvider) {
    if (!err){
        var thisExam = cityProvider.exams[0];
        
        var thisExam =exam
            .findOne({_id: thisExam})
            .deepPopulate('stream')
            .exec(function (err, thisExam) {
            if (!err){
                var examName = thisExam.name;
                var streamName = thisExam.stream.name;
                
                var examStream = {
                    exam: examName,
                    stream: streamName,
                    city: cityProvider.city,
                    groupName: cityProvider.groupName,
                };
                res.json(examStream);
            } else {throw err;}
        });
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

router.post('/allExamsInAll/', function(req, res) {
    var groupExamForm = req.body;
    var instituteArray = groupExamForm.instituteArray;
    var examArray = groupExamForm.examArray;
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {exams:1},function(err, allGroupProviders) {
    if (!err){
        var allExams = [];
        allGroupProviders.forEach(function(thisGroup, index){
            var thisExams = thisGroup.exams;
            allExams = allExams.concat(thisExams);
        });
        res.json(allExams);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});
router.post('/commonExamsInAll/', function(req, res) {
    var groupExamForm = req.body;
    var instituteArray = groupExamForm.instituteArray;
    var examArray = groupExamForm.examArray;
    console.log(JSON.stringify(examArray));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {exams:1},function(err, allGroupProviders) {
    if (!err){
        //console.log(allGroupProviders);
        var examsObj = [];
        examArray.forEach(function(toAddExam, eindex){
            var newExamObj = {
                exam: toAddExam,
                common: true,
            }
            examsObj.push(newExamObj);
        });    
        allGroupProviders.forEach(function(thisGroup, index){
            var thisExams = thisGroup.exams;
            examsObj.forEach(function(commonExamObj, eindex){
                var exIndex = thisExams.indexOf(commonExamObj.exam);
                
                if(exIndex == -1){
                    commonExamObj.common = false;
                }
            });
            
            //console.log(JSON.stringify(examsObj));
        });
        var commonExams = [];
        examsObj.forEach(function(commonExamObj, eindex){
            if(commonExamObj.common == true){
                commonExams.push(commonExamObj.exam);
            }
        });
        //console.log(commonExams);
        res.json(commonExams);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/addExamsToAll/', function(req, res) {
    var groupExamForm = req.body;
    var instituteArray = groupExamForm.instituteArray;
    var examArray = groupExamForm.examArray;
    //console.log(JSON.stringify(groupExamForm));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {exams:1},function(err, allGroupProviders) {
    if (!err){
        //console.log(allGroupProviders);
        
        allGroupProviders.forEach(function(thisGroup, index){
            var thisExams = thisGroup.exams;
            examArray.forEach(function(toAddExam, eindex){
                var exIndex = thisExams.indexOf(toAddExam);
                
                if(exIndex == -1){
                    thisExams.push(toAddExam);
                }
            });
            
            thisGroup.exams = thisExams;
            thisGroup.save(function(err, thisGroup) {
                if (err) return console.error(err);
                console.log(thisGroup._id + " saved!");
            });
            
        });
        
        res.json(allGroupProviders);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/setLogoForAll/', function(req, res) {
    var groupLogoForm = req.body;
    var instituteArray = groupLogoForm.instituteArray;
    var logo = groupLogoForm.logo;
    //console.log(JSON.stringify(groupLogoForm));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {logo:1},function(err, allGroupProviders) {
    if (!err){
        //console.log(allGroupProviders);
        
        allGroupProviders.forEach(function(thisGroup, index){
            thisGroup.logo = logo;
            thisGroup.save(function(err, thisGroup) {
                if (err) return console.error(err);
                console.log(thisGroup._id + " saved!");
            });
            
        });
        
        res.json(allGroupProviders);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/setWebsiteForAll/', function(req, res) {
    var groupWebsiteForm = req.body;
    var instituteArray = groupWebsiteForm.instituteArray;
    var websiteArray = groupWebsiteForm.websiteArray;
    //console.log(JSON.stringify(groupWebsiteForm));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {website:1},function(err, allGroupProviders) {
    if (!err){
        //console.log(allGroupProviders);
        
        allGroupProviders.forEach(function(thisGroup, index){
            
            var thisProviderWebsite = thisGroup.website;
            if(!thisProviderWebsite){
                thisProviderWebsite = [];
            }else{
                if(thisProviderWebsite.length > 0 && thisProviderWebsite[0] == ''){
                    thisProviderWebsite.splice(0,1);
                }
            }
            console.log(thisProviderWebsite);
            if(Array.isArray(thisProviderWebsite)){
                
            }else{
                console.log('Converting Website from string to array: ' + thisGroup._id);
                var res = thisProviderWebsite.split(",");
                if(res && res.length > 0){
                    thisProviderWebsite = res;
                }else{
                    thisProviderWebsite = [thisProviderWebsite];
                }
            }
            
            websiteArray.forEach(function(thisWebsite, eindex){
                var thisWebsiteIndex = thisProviderWebsite.indexOf(thisWebsite);
                if(thisWebsiteIndex == -1){
                    thisProviderWebsite.push(thisWebsite);
                }
            });
            
            //thisGroup.logo = logo;
            thisGroup.save(function(err, thisGroup) {
                if (err) return console.error(err);
                console.log(thisGroup._id + " saved!");
            });
            
        });
        
        res.json(allGroupProviders);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/setEmailForAll/', function(req, res) {
    var groupExamForm = req.body;
    var instituteArray = groupExamForm.instituteArray;
    var emailArray = groupExamForm.emailArray;
    //console.log(JSON.stringify(groupExamForm));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {email:1},function(err, allGroupProviders) {
    if (!err){
        //console.log(allGroupProviders);
        
        allGroupProviders.forEach(function(thisGroup, index){
            
            var thisProviderEmail = thisGroup.email;
            emailArray.forEach(function(thisEmail, eindex){
                var thisEmailIndex = thisProviderEmail.indexOf(thisEmail);
                if(thisEmailIndex == -1){
                    thisProviderEmail.push(thisEmail);
                }
            });
            
            //thisGroup.logo = logo;
            thisGroup.save(function(err, thisGroup) {
                if (err) return console.error(err);
                console.log(thisGroup._id + " saved!");
            });
            
        });
        
        res.json(allGroupProviders);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/renameAllCoaching/', function(req, res) {
    var groupNameForm = req.body;
    var instituteArray = groupNameForm.instituteArray;
    var newName = groupNameForm.name;
    //console.log(JSON.stringify(groupNameForm));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {name:1},function(err, allGroupProviders) {
    if (!err){
        //console.log(allGroupProviders);
        
        allGroupProviders.forEach(function(thisGroup, index){
            
            thisGroup.name = newName;
            thisGroup.save(function(err, thisGroup) {
                if (err) return console.error(err);
                console.log(thisGroup._id + " saved!");
            });
            
        });
        
        res.json(allGroupProviders);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/renameAllGroupName/', function(req, res) {
    var groupNameForm = req.body;
    var instituteArray = groupNameForm.instituteArray;
    var newGroupName = groupNameForm.groupName;
    //console.log(JSON.stringify(groupNameForm));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {groupName:1},function(err, allGroupProviders) {
    if (!err){
        allGroupProviders.forEach(function(thisGroup, index){
            
            thisGroup.groupName = newGroupName;
            thisGroup.save(function(err, thisGroup) {
                if (err) return console.error(err);
                console.log(thisGroup._id + " saved!");
            });
            
        });
        
        res.json(allGroupProviders);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/removeExamsFromAll/', function(req, res) {
    var groupExamForm = req.body;
    var instituteArray = groupExamForm.instituteArray;
    var examArray = groupExamForm.examArray;
    //console.log(JSON.stringify(groupExamForm));
    var allGroupProviders = coaching.find({_id:{$in: instituteArray}}, {exams:1},function(err, allGroupProviders) {
    if (!err){
        
        allGroupProviders.forEach(function(thisGroup, index){
            var thisExams = thisGroup.exams;
            examArray.forEach(function(toRemoveExam, eindex){
                var exIndex = thisExams.indexOf(toRemoveExam);
                
                if(exIndex != -1){
                    console.log(exIndex + ' removed');
                    thisExams.splice(exIndex, 1);
                }
            });
            
            thisGroup.exams = thisExams;
            thisGroup.save(function(err, thisGroup) {
                if (err) return console.error(err);
                console.log(thisGroup._id + " saved!");
            });
            
        });
        
        res.json(allGroupProviders);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});

router.post('/cityQuery', function(req, res) {
    var cityQueryForm = req.body;
    var query = cityQueryForm.query;
    var city = cityQueryForm.city;
    
    console.log(query);
    if(query == 'exambazaar'){
        query = '';
    }
    
    var cityProviders = coaching.find({name:{'$regex' : query, '$options' : 'i'}, city: city, type: 'Coaching' }, {name:1 , address:1, city:1, state:1, logo:1, exams:1},function(err, cityProviders) {
    if (!err){
        res.json(cityProviders);
    } else {throw err;}
    }).sort( { name: 1 } ).limit(20); //.limit(500) .sort( { rank: -1 } )
});

router.post('/cityReviewQuery', function(req, res) {
    var cityQueryForm = req.body;
    var query = cityQueryForm.query;
    var city = cityQueryForm.city;
    
    
    if(query == 'exambazaar'){
        query = '';
    }
    //console.log('Query is: ' + query);
    var groupNames = coaching.aggregate(
    [
        {$match: {name:{'$regex' : query, '$options' : 'i'}, city: city, disabled: false} },
        {"$group": { "_id": { name: "$name" }, count:{$sum:1}, logo: { $first: "$logo" } } },
        {$sort:{"count":-1}}

    ],function(err, groupNames) {
    if (!err){
        groupNames = groupNames.slice(0, 20);
        //console.log(groupNames);
        var queryGroups = [];
        groupNames.forEach(function(thisGroup, index){
            var qGroup = {
                name: thisGroup._id.name,
                centers: thisGroup.count,
                logo: thisGroup.logo,
            };
            queryGroups.push(qGroup);
        });
        //console.log(queryGroups);
        res.json(queryGroups);
    } else {throw err;}
    });
    /*
    
    var cityProviders = coaching.find({name:{'$regex' : query, '$options' : 'i'}, city: city, type: 'Coaching'}, {name:1 , address:1, city:1, state:1, logo:1, exams:1},function(err, cityProviders) {
    if (!err){
        var providerNames = cityProviders.map(function(a) {return a.name;});
        var uniqueProviderNames = [];
        var cityQueryProviders = [];
        
        
        providerNames.forEach(function(thisprovider, index){
            if(uniqueProviderNames.indexOf(thisprovider) == -1){
                uniqueProviderNames.push(thisprovider);
            }
        });
        
        
        res.json(cityProviders);
    } else {throw err;}
    }).sort( { name: 1 } ).limit(20); //.limit(500) .sort( { rank: -1 } )*/
});

router.post('/cityGroupExamQuery', function(req, res) {
    var cityGroupExamQueryForm = req.body;
    var query = cityGroupExamQueryForm.query;
    var city = cityGroupExamQueryForm.city;
    var stream = cityGroupExamQueryForm.stream;
    var exam = cityGroupExamQueryForm.exam;
    
    //console.log(JSON.stringify(cityGroupExamQueryForm));
    //, exams: exam
    coaching.find({name:{'$regex' : query, '$options' : 'i'}, city: city, type: 'Coaching'}, {name:1 , address:1, city:1, state:1, logo:1, groupName: 1},function(err, docs) {
    if (!err){
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }).sort( { city: 1 } ); //.limit(500) .sort( { rank: -1 } )
});

router.get('/group/:query', function(req, res) {
    var query = req.params.query;
    coaching.find({name:{'$regex' : query, '$options' : 'i'}, type: 'Coaching'}, {name:1 ,group:1, groupName:1, address:1, city:1, state:1, logo:1, website:1, coachingWebsite:1},function(err, docs) {
    if (!err){
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }); //.limit(500) .sort( { rank: -1 } )
});


router.get('/providersWithAreas', function(req, res) {
    coaching.find({"name" : {$regex : ".*-.*"}, type: 'Coaching'}, {name:1 , address:1},function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }); //.limit(500)
});

router.get('/generateTRanks', function(req, res) {
    res.json(true);
    
    var allCoachings = coaching.find({disabled: false, type: 'Coaching'}, {gRank: 1, cRank: 1, tRank: 1, sponsoredRank: 1},function(err, allCoachings) {
        if (!err){
            allCoachings.forEach(function(thisCoaching, index){
                var thisTRank = {};
                var thisGRank = thisCoaching.gRank;
                var thisCRank = thisCoaching.cRank;
                var thisSponsoredRank = thisCoaching.sponsoredRank;
                var allExamIds = [];
                if(thisGRank){
                    for (var property in thisGRank) {
                        if(allExamIds.indexOf(property) == -1){
                            allExamIds.push(property);
                        }
                    }
                }
                if(thisCRank){
                    for (var property in thisCRank) {
                        if(allExamIds.indexOf(property) == -1){
                            allExamIds.push(property);
                        }
                    }
                }
                if(thisSponsoredRank){
                    for (var property in thisSponsoredRank) {
                        if(allExamIds.indexOf(property) == -1){
                            allExamIds.push(property);
                        }
                    }
                }
                var nExams = allExamIds.length;
                var counter = 0;
                allExamIds.forEach(function(thisExamId, eindex){
                    thisTRank[thisExamId] = 0;
                    if(thisGRank && thisGRank[thisExamId]){
                        thisTRank[thisExamId] += thisGRank[thisExamId];
                    }
                    if(thisCRank && thisCRank[thisExamId]){
                        thisTRank[thisExamId] += thisCRank[thisExamId];
                    }
                    if(thisSponsoredRank && thisSponsoredRank[thisExamId]){
                        thisTRank[thisExamId] += thisSponsoredRank[thisExamId];
                    }
                    counter += 1;
                });
                if(counter == nExams){
                    thisCoaching.tRank = thisTRank;
                    thisCoaching.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisCoaching._id + " saved!");
                    })
                }
            });
        } else {throw err;}
    });
});

router.get('/generateTWithoutSponsorRanks', function(req, res) {
    res.json(true);
    console.log('Starting T without Sponsored Ranks');
    var allCoachings = coaching.find({disabled: false, type: 'Coaching'}, {gRank: 1, cRank: 1, tWithoutSponsorRank: 1},function(err, allCoachings) {
        if (!err){
            allCoachings.forEach(function(thisCoaching, index){
                var thisTRank = {};
                var thisGRank = thisCoaching.gRank;
                var thisCRank = thisCoaching.cRank;
                var allExamIds = [];
                if(thisGRank){
                    for (var property in thisGRank) {
                        if(allExamIds.indexOf(property) == -1){
                            allExamIds.push(property);
                        }
                    }
                }
                if(thisCRank){
                    for (var property in thisCRank) {
                        if(allExamIds.indexOf(property) == -1){
                            allExamIds.push(property);
                        }
                    }
                }
                var nExams = allExamIds.length;
                var counter = 0;
                allExamIds.forEach(function(thisExamId, eindex){
                    thisTRank[thisExamId] = 0;
                    if(thisGRank && thisGRank[thisExamId]){
                        thisTRank[thisExamId] += thisGRank[thisExamId];
                    }
                    if(thisCRank && thisCRank[thisExamId]){
                        thisTRank[thisExamId] += thisCRank[thisExamId];
                    }
                    counter += 1;
                });
                if(counter == nExams){
                    thisCoaching.tWithoutSponsorRank = thisTRank;
                    thisCoaching.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisCoaching._id + " saved!");
                    })
                }
            });
        } else {throw err;}
    });
});

router.get('/generateCityPosition', function(req, res) {
    res.json(true);
    
    var allExams = exam.find({active: true}, {_id: 1},function(err, allExams) {
        if (!err){
            if(allExams && allExams.length){
            var allExamIds = allExams.map(function(a) {return a._id.toString();});
            
            var allCities = city.find({active: true}, {name: 1},function(err, allCities) {
            
            allCities.forEach(function(thisCity, cityindex){
            var scores = [];
            var scoreExamIds = [];
            var cityName = thisCity.name;
            var allCoachings = coaching.aggregate(
            [
                {$match: {disabled: false, city: cityName} },
                {"$group": { 
                    "_id": { groupName: "$groupName", city: "$city"}, 
                    count: {$sum:1},
                    _ids: { $addToSet: "$_id" },
                    tWithoutSponsorRank: { $first: "$tWithoutSponsorRank"},
                }},
            ],function(err, allCoachings) {
            if (!err){
                console.log('There are ' + allCoachings.length + " coachings in " + cityName + "!");
                
                allCoachings.forEach(function(thisCoaching, index){
                    if(scores && scores.length > 0){
                        scoreExamIds = scores.map(function(a) {return a.exam.toString();});
                    }
                    var thisTWithoutSponsorRank = thisCoaching.tWithoutSponsorRank;
                    var thisCoachingIds = thisCoaching._ids.map(function(a) {return a.toString();});
                    
                    if(thisTWithoutSponsorRank){
                    
                    for (var property in thisTWithoutSponsorRank) {
                        
                        var thisExamIndex = scoreExamIds.indexOf(property);
                        if(thisExamIndex == -1){
                            var newExamScore = {
                                exam: property,
                                coachings: [],
                            };
                            thisExamIndex = scores.length;
                            scores.push(newExamScore);
                            
                        }
                        
                        if(thisExamIndex != -1 && Number(thisTWithoutSponsorRank[property]) > 0){
                            var newCoaching = {
                                _ids: thisCoachingIds,
                                score: Number(thisTWithoutSponsorRank[property])
                            };
                            
                            scores[thisExamIndex].coachings.push(newCoaching);
                            
                            
                            
                        }else{
                            if(thisExamIndex == -1){
                                console.log('Something went very wrong');
                            }
                            
                        }

                    };
                    }
                });
                
                var coachingCityPositions = [];
                var coachingCityPositionIds = [];
                
                scores.forEach(function(thisScore, index){
                var thisExam = thisScore.exam;
                if(thisScore.coachings && thisScore.coachings.length > 0){
                    //console.log(thisScore.coachings.length);
                    thisScore.coachings.sort(function(a,b){
                      return (b.score - a.score);
                    });
                    thisScore.coachings.forEach(function(thisCoaching, cindex){
                    
                    var thisCoachingIds = thisCoaching._ids;
                    var thisScore = thisCoaching.score;
                    //thisScore.coachings[cindex].rank = cindex + 1;

                    thisCoachingIds.forEach(function(thisCoachingId, cidindex){
                        var coachingId = thisCoachingId.toString();
                        
                        if(coachingCityPositions.length > 0){
                            coachingCityPositionIds = coachingCityPositions.map(function(a) {return a.coaching.toString();});
                        }
                        var thisCoachingIdIndex = coachingCityPositionIds.indexOf(coachingId);
                        if(thisCoachingIdIndex == -1){
                            var newcoaching = {
                                coaching: coachingId,
                                cityPosition: {}
                            };
                            thisCoachingIdIndex = coachingCityPositions.length;
                            coachingCityPositions.push(newcoaching);
                        }
                        if(thisCoachingIdIndex != -1){
                            if(!coachingCityPositions[thisCoachingIdIndex].cityPosition){
                                coachingCityPositions[thisCoachingIdIndex].cityPosition = {};   
                            }
                            
                            coachingCityPositions[thisCoachingIdIndex].cityPosition[thisExam] = cindex + 1;
                            
                            
                        }else{
                            console.log("Something went very wrong!");
                        }
                    });
                    });

                }
                    
                });
                coachingCityPositions.forEach(function(thisCoachingCityPosition, cpindex){
                    var thisCoachingCentre = coaching
                    .findOne({'_id': thisCoachingCityPosition.coaching}, {cityPosition: 1})
                    .exec(function (err, thisCoachingCentre) {
                    if (!err){
                    if(thisCoachingCentre){
                        
                        thisCoachingCentre.cityPosition = thisCoachingCityPosition.cityPosition;

                        thisCoachingCentre.save(function(err, thisCoachingCentre) {
                            if (err) return console.error(err);
                            //console.log(thisCoachingCentre._id + " saved!");
                        });


                    }else{
                        console.log('Something went very wrong');
                    }


                    }else{
                        console.log('Error: ' + err);
                    }
                    });
                    
                    
                });
                
            } else {throw err;}
            });
                
            });
            });
                
            }else{
                console.log("Found no exams!");
            }
        }else{
            console.log("Error occured: " + err);
        }
    });
    
    
});

router.get('/generateSponsoredRanks', function(req, res) {
    res.json(true);
    console.log('Starting Sponsored Ranks');
    var coachingId = '5a97bde62aeebc5a97e8c70a';
    var allExamIds = ['58cedb079eef5e0011c17e91', '58ac27030be6311eccbbc3a6'];
    var allCoachings = coaching.find({disabled: false, type: 'Coaching', _id: coachingId}, {sponsoredRank: 1},function(err, allCoachings) {
        if (!err){
            allCoachings.forEach(function(thisCoaching, index){
                var thisSponsoredRank = {};
                
                var nExams = allExamIds.length;
                var counter = 0;
                allExamIds.forEach(function(thisExamId, eindex){
                    thisSponsoredRank[thisExamId] = 10000;
                    counter += 1;
                });
                if(counter == nExams){
                    thisCoaching.sponsoredRank = thisSponsoredRank;
                    thisCoaching.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisCoaching._id + " saved!");
                    })
                }
            });
        } else {throw err;}
    });
});
router.post('/p4OrderExplainer', function(req, res) {
    //res.json(true);
    var cityExamForm = req.body;
    
    var cityName = cityExamForm.cityName;
    var examId = cityExamForm.examId.toString();
    //console.log(cityName + " | "  + examId);
    var thisExam = exam
        .findOne({'_id': examId}, {_id: 1})
        //.deepPopulate('stream')
        .exec(function (err, thisExam) {
        if (!err){
            if(thisExam){
            var examId = thisExam._id;
            
            var allCoachings = coaching.aggregate(
            [
                {$match: {disabled: false, "city" : cityName,"exams" : thisExam._id} },
                {"$group": { 
                    "_id": { groupName: "$groupName"}, 
                    count: {$sum:1}, 
                    /*hRank: {$sum:"$hRank"}, */
                    _ids: { $addToSet: "$_id" },
                    gRank: { $first: "$gRank." + examId },
                    sponsoredRank: { $first: "$sponsoredRank." + examId },
                    gRankInfo: { $first: "$gRankInfo." + examId },
                    cRank: { $first: "$cRank." + examId },
                    cRankInfo: { $first: "$cRankInfo." + examId },
                    tRank: { $first: "$tRank." + examId },
                }},
                
                {$sort:{"tRank":-1}},

            ],function(err, allCoachings) {
            if (!err){
                //console.log(allCoachings);
                res.json(allCoachings);
            } else {throw err;}
            });
                
                
                
            }else{
                res.json(null);
            }
            
        } else {throw err;}
    });
    
    
});
router.get('/generateCRanks', function(req, res) {
    res.json(true);
    var limit = 30000;
    var weight = {
        centres: 2,
        reviews: 10,
        course: 3,
        faculty: 1,
    }; 
    
    var allCoachings = coaching.aggregate(
    [
        {$match: {disabled: false} },
        {$unwind:"$exams"},
        /*{$unwind:"$results"},*/
        {"$group": { 
            "_id": { groupName: "$groupName", city: "$city"}, 
            count: {$sum:1},
            ids: { $addToSet: "$_id" },
            faculty: { $addToSet: "$faculty" },
            course: { $addToSet: "$course" },
            exams: { $addToSet: "$exams" },
        }},
        {$sort:{"count":-1}},
        {$limit: limit},
    ],function(err, allCoachings) {
    if (!err){
        console.log('There are: ' + allCoachings.length + " coachings!");
        allCoachings.forEach(function(thisCoaching, index){
            var thisCRank = {};
            var thisCRankInfo = {};
            var thisExams = thisCoaching.exams;
            var thisCoachingName = thisCoaching._id.groupName;
            var thisCoachingCity = thisCoaching._id.city;
            var eCounter = 0;
            var nExams = thisExams.length;
            var groupIds = thisCoaching.ids;
            thisExams.forEach(function(thisExam, index){
                var thisExamCRank = 0;
                var thisExamCRankInfo = {};
                thisExam = thisExam;
                
                var cReviews = review
                .find({institute: groupIds, active: true, exam: thisExam}, {_id: 1})
                .exec(function(err, cReviews) {
                if (!err){
                    if(groupIds && groupIds.length > 0){
                        var centreWeight = weight.centres *  groupIds.length;
                        if(centreWeight > 15){
                            centreWeight = 15;
                        }
                        thisExamCRank += centreWeight;
                        thisExamCRankInfo.centre = centreWeight;
                        
                    }
                    //console.log(cReviews);
                    if(cReviews && cReviews.length > 0){
                        var reviewWeight = weight.reviews *  cReviews.length;
                        if(reviewWeight > 100){
                            reviewWeight = 100;
                        }
                        //console.log("Review weight is: " + reviewWeight);
                        thisExamCRank += reviewWeight;
                        thisExamCRankInfo.review = reviewWeight;
                    }
                    //console.log("2. " + thisExamCRank);
                    if(thisCoaching.faculty){
                        var facultyWeight = weight.faculty * thisCoaching.faculty.length;
                        if(facultyWeight > 20){
                            facultyWeight = 20;
                        }
                        thisExamCRank += facultyWeight;
                        thisExamCRankInfo.faculty = facultyWeight;
                    }
                    //console.log("3. " + thisExamCRank);
                    if(thisCoaching.course){
                        var courseWeight = weight.course * thisCoaching.course.length;
                        if(courseWeight > 15){
                            courseWeight = 15;
                        }
                        thisExamCRank += courseWeight;
                        thisExamCRankInfo.course = courseWeight;
                    }
                    //console.log("4. " + thisExamCRank);
                    
                    thisCRank[thisExam] = thisExamCRank;
                    thisCRankInfo[thisExam] = thisExamCRankInfo;
                    eCounter += 1;
                    if(eCounter == nExams){
                        
                        var allGroupInstitutes = coaching.find({groupName: thisCoachingName, city: thisCoachingCity, disabled: false},{_id:1, cRank: 1},function (err, allGroupInstitutes) {
                            if (!err && allGroupInstitutes){
                                allGroupInstitutes.forEach(function(thisprovider, index){
                                    //thisprovider.cRank = null;
                                    thisprovider.cRank = thisCRank;
                                    thisprovider.cRankInfo = thisCRankInfo;
                                    thisprovider.save(function(err, thisprovider) {
                                    if (err) return console.error(err);
                                    console.log(thisprovider._id + " saved!");
                                });
                                    
                                });
                                
                                
                            }
                        });
                    }
                }
                });
                
                
                
            });
            
            
            

            

        });



    }
    });
    
    
    
});

router.get('/generateGRanks', function(req, res) {
    console.log('Starting Group Rank');
    res.json(true);
    var skip = 0;
    var limit = 30000;
    var weight = {
        expert_review: 250,
        rating: 50,
        results: 5,
        photo: 1,
        video: 1,
        logo: 5,
    }; 
    
    var allCoachings = coaching.aggregate(
    [
        {$match: {disabled: false} },
        {$unwind:"$exams"},
        /*{$unwind:"$results"},*/
        {"$group": { 
            "_id": { groupName: "$groupName"}, 
            count: {$sum:1},
            ids: { $addToSet: "$_id" },
            exams: { $addToSet: "$exams" },
            photo: { $addToSet: "$photo" },
            video: { $addToSet: "$video" },
            results: { $addToSet: "$results" },
            rating: { $addToSet: "$rating" },
            logo: { $first: "$logo" },
            examCirf: { $first: "$examCirf" },
            cirf: { $addToSet: "$cirf" },
        }},
        {$sort:{"count":-1}},
        {$limit: skip + limit},
        {$skip: skip},
    ],function(err, allCoachings) {
    if (!err){
        console.log("There are " + allCoachings.length + " coachings");
        allCoachings.forEach(function(thisCoaching, coachingindex){
            var thisGRank = {};
            var thisGRankInfo = {};
            var thisExams = thisCoaching.exams;
            var thisCoachingName = thisCoaching._id.groupName;
            var eCounter = 0;
            var nExams = thisExams.length;
            thisExams.forEach(function(thisExam, index){
                var thisExamGRank = 0;
                var thisExamGRankInfo = {};
                thisExam = thisExam;
                
                var expertReview = blogpost
                .findOne({blogSeries: 'Expert Reviews', coachingGroups: thisCoachingName, active: true, exams: thisExam}, {_id: 1})
                .exec(function(err, expertReview) {
                if (!err){
                    if(expertReview){
                        thisExamGRank += weight.expert_review;
                        thisExamGRankInfo.expert_review = weight.expert_review;
                    }else{
                        thisExamGRankInfo.expert_review = 0;
                    }
                    
                    //console.log(thisCoaching.photo);
                    if(thisCoaching.photo){
                        var thisCoachingPhotos = [];
                        thisCoaching.photo.forEach(function(thisCP, cpindex){
                            thisCoachingPhotos = thisCoachingPhotos.concat(thisCP);
                            
                        });
                        
                        var photoWeight = weight.photo * thisCoachingPhotos.length;
                        if(photoWeight > 20){
                            photoWeight = 20;
                        }
                        thisExamGRank += photoWeight;
                        thisExamGRankInfo.photo = photoWeight;
                    }
                    if(thisCoaching.video){
                        var thisCoachingVideos = [];
                        thisCoaching.video.forEach(function(thisCV, cvindex){
                            thisCoachingVideos = thisCoachingVideos.concat(thisCV);
                            
                        });
                        
                        var videoWeight = weight.photo * thisCoachingVideos.length;
                        if(videoWeight > 20){
                            videoWeight = 20;
                        }
                        thisExamGRank += videoWeight;
                        thisExamGRankInfo.video = videoWeight;
                    }
                    
                    
                    if(thisCoaching.results && thisCoaching.results.length > 0){
                        var thisCoachingResults = [];
                        
                        thisCoaching.results.forEach(function(thisCR, crindex){
                            thisCoachingResults = thisCoachingResults.concat(thisCR);
                            
                        });
                        
                        if(thisCoachingResults.length > 0){
                            var thisResultExams = thisCoachingResults.map(function(a) {return a.exam;});
                            var resultWeight = 0;
                            var rCount = 0;
                    
                            for(var i=0;i<thisResultExams.length;i++){

                                if(thisResultExams[i] && thisResultExams[i].toString() == thisExam.toString()){
                                    rCount += 1;
                                }
                            }
                            resultWeight = rCount * weight.results;
                            if(resultWeight > 100){
                                resultWeight = 100;
                            }
                            thisExamGRank += resultWeight;
                            thisExamGRankInfo.results = resultWeight;
                        }
                        
                    }
                    if(thisCoaching.logo && thisCoaching.logo.length > 0){
                        thisExamGRank += weight.logo;
                        thisExamGRankInfo.logo = weight.logo;
                    }
                    /*if(thisCoaching.examCirf && thisCoaching.examCirf[thisExam.toString()]){
                        //console.log("I am here!!");
                        var ratingWeight = thisCoaching.examCirf[thisExam.toString()] / 100 * 5 * weight.rating;
                        console.log(thisCoaching.examCirf[thisExam.toString()]);
                        console.log(ratingWeight);
                        thisExamGRank += ratingWeight;
                        thisExamGRankInfo.rating = ratingWeight;
                    }*/
                    //console.log(thisCoaching.cirf);
                    if(thisCoaching.cirf && thisCoaching.cirf.length > 0){
                        
                        var thisCoachingCirfs = [];
                        var found = false;
                        thisCoaching.cirf.forEach(function(thisCIRF, cirfindex){
                            thisCoachingCirfs = thisCoachingCirfs.concat(thisCIRF);
                            
                        }); thisCoachingCirfs.forEach(function(thisexamcirf, ecindex){
                            var cexamId = thisexamcirf.exam;
                            if(cexamId == thisExam.toString() && !found){
                                found = true;
                                var ratingWeight = thisexamcirf.cirf / 100 * 5 * weight.rating;
                                //console.log(thisexamcirf);
                                //console.log(thisexamcirf.cirf);
                                //console.log(ratingWeight);
                                thisExamGRank += ratingWeight;
                                thisExamGRankInfo.rating = ratingWeight;
                            }
                            
                        });
                        //var ratingWeight = thisCoaching.examCirf[thisExam.toString()] / 100 * 5 * weight.rating;
                        
                    }
                    thisGRank[thisExam] = thisExamGRank;
                    thisGRankInfo[thisExam] = thisExamGRankInfo;
                    eCounter += 1;
                    if(eCounter == nExams){
                        
                        var allGroupInstitutes = coaching.find({groupName: thisCoaching._id.groupName},{_id:1, gRank: 1},function (err, allGroupInstitutes) {
                            if (!err && allGroupInstitutes){
                                allGroupInstitutes.forEach(function(thisprovider, index){
                                    thisprovider.gRank = thisGRank;
                                    thisprovider.gRankInfo = thisGRankInfo;
                                    thisprovider.save(function(err, thisprovider) {
                                    if (err) return console.error(err);
                                    console.log(thisprovider._id + " saved!");
                                });
                                    
                                });
                                
                                
                            }
                        });
                        
                        //console.log(thisGRank);
                    }
                }
                });
                
                
                
            });
            
            
            

            

        });



    }
    });
    
    
    
});

router.get('/generateExamCirf', function(req, res) {
    res.json(true);
    var limit = 100000;
    
    var allCoachings = coaching.aggregate(
    [
        {$match: {disabled: false, cirf: {$exists: true} }},
        {$unwind:"$cirf"},
        {"$group": { 
            "_id": { groupName: "$groupName"}, 
            count: {$sum:1},
            ids: { $addToSet: "$_id" },
            cirf: { $addToSet: "$cirf" },
        }},
        
        {$sort:{"count":-1}},
        {$limit: limit},
    ],function(err, allCoachings) {
    if (!err){
        
        allCoachings.forEach(function(thisCoaching, index){
            if(thisCoaching.cirf && thisCoaching.cirf.length > 0){
                console.log(thisCoaching.ids.length + " | " + thisCoaching._id.groupName + " | " + thisCoaching.count);
                
                var thisCIRFs = thisCoaching.cirf;
                var examCirf = {};
                
                var cCounter = 0;
                var nCIRFs = thisCIRFs.length;
                
                thisCIRFs.forEach(function(thisCIRF, cindex){
                    var thisExam = thisCIRF.exam;
                    var thisScore = thisCIRF.cirf;
                    if(thisCIRF.exam && thisCIRF.cirf){
                        examCirf[thisCIRF.exam] = thisCIRF.cirf;
                    }
                    cCounter += 1;
                    if(cCounter == nCIRFs){
                        
                        var allGroupInstitutes = coaching.find({groupName: thisCoaching._id.groupName},{_id:1, gRank: 1},function (err, allGroupInstitutes) {
                            if (!err && allGroupInstitutes){
                                console.log(allGroupInstitutes.length);
                                allGroupInstitutes.forEach(function(thisprovider, index){
                                    thisprovider.examCirf = examCirf;
                                    thisprovider.save(function(err, thisprovider) {
                                    if (err) return console.error(err);
                                    console.log(thisprovider._id + " saved!");
                                });
                                    
                                });
                                
                                
                            }
                        });
                        
                        
                    }
                });
                
                
                
                
            }
            
        });
        


    }
    });
    
    
    
});


router.get('/changeProvidersStartingWith/:startsWith', function(req, res) {
    var startsWith = req.params.startsWith;
    console.log("Starts with is: "+startsWith);
    coaching.find({"name" : {$regex : ".*"+startsWith+".*"}, type: 'Coaching'}, {name:1 , website:1},function(err, allProviders) {
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

router.post('/CoachingStream', function(req, res) {
    var streamInfo = req.body;
    var streamName = streamInfo.categoryName;
    var examName = streamInfo.subCategoryName;
    var city = streamInfo.cityName;
    var skip = 0;
    var limit = 25;
    if(streamInfo && streamInfo.skip){
        skip = streamInfo.skip;
    }
    
    var thisExam = exam
        .findOne({'name': examName}, {_id: 1})
        //.deepPopulate('stream')
        .exec(function (err, thisExam) {
        if (!err){
            if(thisExam){
                
            /*coaching.find({"city" : city,"exams" : thisExam._id, disabled: {$ne: true}, type: 'Coaching'}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1, rank:1, city:1, pincode:1, exams:1, groupName:1, logo:1, results:1, latlng:1},{sort: '-rank'},function(err, providerList) {
                    if (!err){
                        //console.log(providerList);
                        res.json(providerList);
                    } else {throw err;}
                });*/
            var examId = thisExam._id;
            //console.log(examId);
            var sortString = "$tRank." + examId;
            var allCoachings = coaching.aggregate(
            [
                {$match: {disabled: false, "city" : city,"exams" : thisExam._id} },
                /*{$unwind:"$exams"},*/
                {"$group": { 
                    "_id": { groupName: "$groupName"}, 
                    count: {$sum:1}, 
                    /*hRank: {$sum:"$hRank"}, */
                    _ids: { $addToSet: "$_id" },
                    exams: { $addToSet: "$exams" },
                    logo: { $addToSet: "$logo" },
                    latlng: { $addToSet: "$latlng" },
                    tRank: { $first: sortString },
                    sponsoredRank: { $first: "$sponsoredRank." + examId },
                }},
                /*{$sort:{"expertReview":1, "count":-1, "_id.groupName": 1 }},*/
                /*{ "$project": { "_id": 1, count: 1, _ids: 1, exams: 1, logo: 1, latlng: 1, "gRank" }},*/
                
                
                {$sort:{"tRank":-1}},
                {$limit: skip + limit},
                {$skip: skip},

            ],function(err, allCoachings) {
            if (!err){
                
                var allProviders = [];
                var nCoachings = allCoachings.length;
                var counter = 0;
                allCoachings.forEach(function(thisProvider, pIndex){
                    /*console.log(thisProvider._id.groupName + " | " + thisProvider.tRank + " | " + thisProvider._ids.length);*/
                    var newProvider = {
                        groupName: thisProvider._id.groupName,
                        tRank: thisProvider.tRank,
                        
                        exams: [],
                        latlngs: [],
                        count: thisProvider.count,
                    };
                    
                    if(thisProvider.sponsoredRank){
                        newProvider.sponsoredRank = thisProvider.sponsoredRank;
                    }
                    
                    var thisExams = [];
                    thisProvider.exams.forEach(function(thisExamString, eIndex){
                        var setofExams = thisExamString.toString().split(',');
                        
                        setofExams.forEach(function(thisExam, eIndex){
                            thisExam = thisExam.trim();
                            var examIndex = thisExams.indexOf(thisExam.toString());
                            if(examIndex == -1){
                                thisExams.push(thisExam.toString());
                            }
                        });  
                    });
                    thisProvider.logo.forEach(function(thisLogo, lIndex){
                        if(thisLogo && thisLogo != '' && !newProvider.logo){
                            newProvider.logo = thisLogo;
                        }
                    });
                    thisProvider.latlng.forEach(function(thisLatlng, lIndex){
                        newProvider.latlngs.push(thisLatlng);
                    });
                    var thisProviderId = thisProvider._ids[0];
                    
                    newProvider.exams = thisExams;
                    
                    
                    
                    var allGroupInstitutes = coaching.find({ 'groupName': newProvider.groupName },{_id:1},function (err, allGroupInstitutes) {
                    if (!err){
                        allGroupInstitutes = allGroupInstitutes.map(function(a) {return a._id;});
                        
                        var groupResults = result
                        .find({provider: { $in : allGroupInstitutes }, active: true, exam: thisExam._id, image: {$exists: true}})
                        .limit(20)
                        .exec(function(err, groupResults) {
                        if (!err){
                        newProvider.groupResults = groupResults;



                        var expertReview = blogpost
                        .findOne({blogSeries: 'Expert Reviews', coachingGroups: newProvider.groupName, exams: thisExam._id, active: true}, {title:1, urlslug: 1,seoDescription: 1, coverPhoto: 1, _published: 1})
                        .exec(function(err, expertReview) {
                        if (!err){

                        newProvider.expertReview = expertReview;
                        allProviders.push(newProvider);
                        counter += 1;
                        if(counter == nCoachings){
                            
                            /**/
                            
                            var allGroupNames = null;

                            if(allProviders && allProviders.length > 0){
                                allGroupNames = allProviders.map(function(a) {return a.groupName;});

                                var allRatedInstitutes = coaching.find({ 'groupName': allGroupNames, cirf: {$exists: true}, $where: "this.cirf.length > 0" },{_id:1, groupName: 1, cirf: 1},function (err, allRatedInstitutes) {
                                if (!err){
                                    
                                    
                                if(allRatedInstitutes && allRatedInstitutes.length > 0){
                                var nRatings = allRatedInstitutes.length;
                                var rCounter = 0;
                                allRatedInstitutes.forEach(function(thisProvider, pIndex){

                                var pCIRFs = thisProvider.cirf;
                                if(pCIRFs && pCIRFs.length > 0){
                                    var pCIRFexams = pCIRFs.map(function(a) {return a.exam.toString();});
                                    

                                    var pcIndex = pCIRFexams.indexOf(thisExam._id.toString());

                                    if(pcIndex != -1){
                                        var thisRating = pCIRFs[pcIndex];
                                        var gName = thisProvider.groupName;
                                        var gIndex = allGroupNames.indexOf(gName);
                                        if(gIndex != -1){
                                            allProviders[gIndex].examCirf = thisRating;
                                        }
                                        
                                    }else{
                                        
                                    }




                                }


                                if(pIndex == allRatedInstitutes.length - 1){
                                    allProviders.sort(function(a,b){
                                      return (b.tRank - a.tRank);
                                    });
                                    //console.log(allProviders.map(function(a) {return a.groupName;}));
                                    //console.log(allProviders.map(function(a) {return a.tRank;}));
                                    res.json(allProviders);
                                }
                                


                                });



                                }else{
                                    
                                    allProviders.sort(function(a,b){
                                      return (b.tRank - a.tRank);
                                    });
                                    console.log(allProviders.map(function(a) {return a.groupName;}));
                                    console.log(allProviders.map(function(a) {return a.tRank;}));
                                    
                                    res.json(allProviders);
                                }
                               
                                }
                                });


                            } 

                            /*allProviders.forEach(function(thisProvider, pIndex){
                                thisProvider.examCirf = Math.random() * 2 + 3;
                            });*/
                            
                            //abcd

                           
                        }

                        } else {throw err;}    
                        });


                        } else {throw err;}
                    });


                        }else {throw err;}
                    });
                    
                    
                    
                });
                
                if(nCoachings == 0){
                    res.json([]);
                }
            } else {throw err;}
            });
                
                
                
                
                
                
                
                
                
                
            }else{
                res.json(null);
            }
            
        } else {throw err;}
    });
    
    
    /*coaching.find({"city" : city,"coursesOffered" : { $elemMatch : { $regex : course, $options : 'i' } }}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,coachingWebsite:1, rank:1, city:1, pincode:1},{sort: '-rank'},function(err, providerList) {
    if (!err){
        res.json(providerList);
    } else {throw err;}
    });*/
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
            if(thisExam){
                coaching.find({"city" : city,"exams" : thisExam._id, disabled: {$ne: true}, type: 'Coaching'}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,coachingWebsite:1, rank:1, city:1, pincode:1, exams:1, group:1, groupName:1, logo:1, results:1, latlng:1},{sort: '-rank'},function(err, providerList) {
                    if (!err){
                        //console.log(providerList);
                        res.json(providerList);
                    } else {throw err;}
                });
            }else{
                res.json(null);
            }
            
        } else {throw err;}
    });
    
    
    /*coaching.find({"city" : city,"coursesOffered" : { $elemMatch : { $regex : course, $options : 'i' } }}, {name:1 , address:1, coursesOffered:1, phone:1, mobile:1, website:1,coachingWebsite:1, rank:1, city:1, pincode:1},{sort: '-rank'},function(err, providerList) {
    if (!err){
        res.json(providerList);
    } else {throw err;}
    });*/
});

router.post('/setEBVerifyState', function(req, res) {
    var verifyForm = req.body;
    var provider = verifyForm.provider;
    var state = verifyForm.state;
    var user = verifyForm.user;
    //, type: 'Coaching'
    var thisProvider = coaching
        .findOne({'_id': provider}, {ebVerifyState:1, ebVerify: 1})
        .exec(function (err, thisProvider) {
        if (!err){
            var newVerify = {
                state: state,
                user: user
            };
            if(!thisProvider.ebVerify || thisProvider.ebVerify.length == 0){
                thisProvider.ebVerify = [];
            }
            thisProvider.ebVerifyState = state;
            thisProvider.ebVerify.push(newVerify);
            thisProvider.save(function(err, thisProvider) {
                if (err) return console.error(err);
                res.json('Done');
                console.log(thisProvider._id + " saved!");
            });
            
            /*if(thisProvider.ebVerify && thisProvider.ebVerify.length > 0){
                thisProvider.ebVerifyState = state;
                thisProvider.ebVerify.push(newVerify);
            }else{
                thisProvider.ebVerify = [];
                thisProvider.ebVerifyState = state;
                thisProvider.ebVerify.push(newVerify);
            }*/
        } else {throw err;}
    });
});

router.post('/setEBContactInfoState', function(req, res) {
    var verifyForm = req.body;
    var provider = verifyForm.provider;
    var contactInfoState = verifyForm.contactInfoState;
    var user = verifyForm.user;
    //, type: 'Coaching'
    var thisProvider = coaching
        .findOne({'_id': provider}, {addContactInfoDone:1, addContactInfoRequired: 1, addContactInfoAssigned: 1})
        .exec(function (err, thisProvider) {
        if (!err){
            
            thisProvider.addContactInfoDone = true;
            thisProvider.contactInfoState = contactInfoState;
            thisProvider.save(function(err, thisProvider) {
                if (err) return console.error(err);
                res.json('Done');
                console.log(thisProvider._id + " saved!");
            });
            
            /*if(thisProvider.ebVerify && thisProvider.ebVerify.length > 0){
                thisProvider.ebVerifyState = state;
                thisProvider.ebVerify.push(newVerify);
            }else{
                thisProvider.ebVerify = [];
                thisProvider.ebVerifyState = state;
                thisProvider.ebVerify.push(newVerify);
            }*/
        } else {throw err;}
    });
});

router.post('/bulksavecoaching', function(req, res) {
    var thisProviders = req.body;
    
    var nLength = thisProviders.length;
    var counter = 0;
    var newProviderIds = [];
    
    thisProviders.forEach(function(thisProviderForm, pIndex){
        var thisProvider = thisProviderForm.coaching;
        if(thisProvider.city){
            thisProvider.city = thisProvider.city.trim();
            thisProvider.city = titleCase(thisProvider.city);
        }
        if(thisProvider.state){
            thisProvider.state = thisProvider.state.trim();
            thisProvider.state = titleCase(thisProvider.state);
        }
         
        var userId = thisProviderForm.user;
        if(userId && !thisProvider._id){
            thisProvider._createdBy = userId;
        }
        //console.log(JSON.stringify(thisProvider));
        //console.log(userId);
        var arrayProps = ['email','phone','mobile','website'];
        oldProvider = new coaching({});
        for (var property in thisProvider) {
            if(arrayProps.indexOf(property) != -1){
                console.log(property + " " + thisProvider[property]);
                
                var newValueArr = thisProvider[property].split(",");
                var finalValueArr = [];
                newValueArr.forEach(function(thisValue, vIndex){
                    thisValue = thisValue.trim();
                    if(thisValue && thisValue !=''){
                        finalValueArr.push(thisValue);
                    }
                });
                oldProvider[property] = finalValueArr;
                console.log(property + " " + JSON.stringify(finalValueArr));
            }else{
                oldProvider[property] = thisProvider[property];    
            }
        }
        
        if(userId){
            var newSave = {
                user: userId
            }
            oldProvider._saved.push(newSave);
            console.log('--------- '+ userId);
        }
        //save the changes
        oldProvider.save(function(err, thisprovider) {
            if (err) return console.error(err);
            console.log(thisprovider._id + " saved!");
            newProviderIds.push(thisprovider._id);
            counter = counter + 1;
            if(counter == nLength){
                console.log(newProviderIds);
                res.json(newProviderIds);
            }
            //res.json(thisprovider._id);
        });
        
        if(nLength == 0){
            res.json([]);
        }
        
        
    });
    
});

router.get('/removecoaching/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    coaching.remove({_id: coachingId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Coaching removed!');
            res.json(true);
        }                              
    });
    
});

router.post('/savecoaching', function(req, res) {
    var thisProvider = req.body.coaching;
    var userId = req.body.user;
    console.log(thisProvider.rating);
    //console.log("Other listings are: " + thisProvider.otherlistings);
    //console.log(thisProvider.rating);
    var coachingId = thisProvider._id;
    
    var oldProvider = coaching.findOne({"_id" : coachingId}, {},function(err, oldProvider) {
    if (!err){
        
        //oldProvider = thisProvider;
        if(oldProvider){
            //console.log("New Coaching is: " + JSON.stringify(thisProvider));
            for (var property in thisProvider) {
                oldProvider[property] = thisProvider[property];
                if(property=='latlng'){
                    //console.log('Yes location is there: ' + thisProvider[property]);
                    oldProvider['latlngna'] = false;
                }
                if(property=='rating'){
                    
                    console.log(JSON.stringify(oldProvider[property]));
                }
            }
            if(userId){
                var newSave = {
                    user: userId
                }
                oldProvider._saved.push(newSave);
                console.log('--------- '+ userId);
            }
            //console.log("Coaching is: " + JSON.stringify(oldProvider));
            
            if(thisProvider.latlng){
                var thisLatLng = thisProvider.latlng;
                var thisLng = Number(thisLatLng.lng);
                var thisLat = Number(thisLatLng.lat);

                oldProvider.loc = {
                    type : 'Point',
                    coordinates : [thisLng, thisLat]
                };
            }
            //save the changes
            oldProvider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                res.json(thisprovider._id);
            });
            
        }else{
            //create a new provider
            console.log("--------New Coaching is: " + JSON.stringify(thisProvider));
            oldProvider = new coaching({});
            for (var property in thisProvider) {
                oldProvider[property] = thisProvider[property];
            }
            //console.log("Coaching is: " + JSON.stringify(oldProvider));
            if(thisProvider.latlng){
                var thisLatLng = thisProvider.latlng;
                var thisLng = Number(thisLatLng.lng);
                var thisLat = Number(thisLatLng.lat);

                oldProvider.loc = {
                    type : 'Point',
                    coordinates : [thisLng, thisLat]
                };
            }
            
            if(userId){
                var newSave = {
                    user: userId
                }
                oldProvider._saved.push(newSave);
                console.log('--------- '+ userId);
            }
            //save the changes
            
            
            oldProvider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
                res.json(thisprovider._id);
            });
            
        }
        
        
        
        
    } else {throw err;}
    }); //.limit(500)
});


router.get('/getGroupInfo/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    console.log('Fetching group info for: ' + coachingId);
    //type: 'Coaching'
    var thisProvider = coaching
        .findOne({'_id': coachingId},{groupName:1})
        .exec(function (err, thisProvider) {
        if (!err){
        if (thisProvider){
            var groupName = thisProvider.groupName;
            var thisGroupProviders = coaching
                .find({'groupName': groupName},{name:1, description:1, address:1, email:1, website:1, facebookPage: 1, youtubeChannel:1, logo:1,photo:1, video:1})
                .exec(function (err, thisGroupProviders) {
                if (!err){
                console.log('There are: ' + thisGroupProviders.length + " centers");
                var groupInfo = {
                    email: [],
                    website: [],
                    facebookPage: [],
                    youtubeChannel: [],
                    logo: [],
                    photo: [],
                    video: [],
                    exams: [],
                    course: [],
                };
                var nonArrayProps =['facebookPage', 'youtubeChannel','logo'];
                thisGroupProviders.forEach(function(thisGroup, gIndex){
                    
                for (var property in groupInfo) {
                    if(thisGroup[property]){
                        //console.log(property);
                        if(nonArrayProps.indexOf(property) == -1){
                            thisGroup[property].forEach(function(thispropertyVal, pIndex){ if(groupInfo[property].indexOf(thispropertyVal) == -1){  
                                groupInfo[property].push(thispropertyVal);
                            }

                            });
                        }else{
                            //console.log("Property is: " + property + " " +thisGroup[property]);
                            if(groupInfo[property].indexOf(thisGroup[property]) == -1){  
                                groupInfo[property].push(thisGroup[property]);
                            }
                        }

                    }


                }

                });



                res.json(groupInfo);
                } else {throw err;}
            });
        }else{
            res.json(null);
        }
        } else {throw err;}
    });
});

router.get('/claimcoaching/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    console.log('Fetching coaching ' + coachingId);
    //, type: 'Coaching'
    var thisProvider = coaching
        .findOne({'_id': coachingId},{type: 1, name: 1, description: 1, groupName: 1, coachingWebsite: 1, website: 1, otherlistings: 1, facebookPage: 1, twitter: 1, youtubeChannel: 1, email: 1, address: 1, mapAddress: 1, latlng: 1, loc: 1, location: 1, city: 1, state: 1, pincode: 1, logo: 1,  mobile: 1, phone: 1, results:1, course:1, photo:1, video:1, faculty:1, exams: 1, disabled: 1, ebVerifyState: 1, ebNote: 1, _saved:1, _created: 1, rating: 1})
        .deepPopulate('exams exams.stream location faculty.exams ebNote.user results.exam rating.examRating.exam')
        .exec(function (err, thisProvider) {
        if (!err){
            res.json(thisProvider);
        } else {throw err;}
    });
});

router.get('/coaching/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    console.log('Fetching coaching ' + coachingId);
    //, type: 'Coaching'
    var thisProvider = coaching
        .findOne({'_id': coachingId})
        .deepPopulate('exams exams.stream location faculty.exams ebNote.user results.exam rating.examRating.exam')
        .exec(function (err, thisProvider) {
        if (!err){
            res.json(thisProvider);
        } else {throw err;}
    });
});

router.get('/titleCaseName/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    //, type: 'Coaching'
    var thisProvider = coaching
        .findOne({'_id': coachingId}, {groupName: 1, name:1, website: 1, address:1, city:1, phone:1, mobile:1, email:1, logo:1, exams:1, _createdBy:1, _created:1})
        .exec(function (err, thisProvider) {
        if (!err){
            if(thisProvider){
                thisProvider.name = titleCase(thisProvider.name);
                thisProvider.groupName = thisProvider.name;

                thisProvider.save(function(err, thisProvider) {
                if (err) return console.error(err);
                    console.log(thisProvider._id + " saved!");
                    res.json(thisProvider);
                });
            }else{
                res.json(false);
            }
        } else {throw err;}
    });
});

router.get('/coachingreview/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    //console.log('Fetching coaching ' + coachingId);
    
    var thisProvider = coaching
        .findOne({'_id': coachingId, disabled: {$ne: true}, type: 'Coaching'},{name:1, description:1, groupName:1, email:1, address:1, location:1, city:1, state:1, pincode:1, logo:1, mobile:1, phone:1, course:1, exams:1})
        .deepPopulate('exams exams.stream location')
        .exec(function (err, thisProvider) {
        if (!err){
            res.json(thisProvider);
        } else {throw err;}
    });
});

router.get('/fillSummary/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    //console.log('Fetching coaching ' + coachingId);
    
    var thisProvider = coaching
        .findOne({'_id': coachingId, type: 'Coaching'})
        //.deepPopulate('exams exams.stream location faculty.exams ebNote.user results.exam')
        .exec(function (err, thisProvider) {
        if (!err){
            var fillSummary = {
                contact:{
                    phone: thisProvider.phone.length,
                    mobile: thisProvider.mobile.length,
                    email: thisProvider.email.length,
                    website: thisProvider.website,
                    facebookPage: thisProvider.facebookPage,
                    youtubeChannel: thisProvider.youtubeChannel,
                },
                info:{
                    results: thisProvider.results.length,
                    photo: thisProvider.photo.length,
                    video: thisProvider.video.length,
                    faculty: thisProvider.faculty.length,
                    
                },
                name: thisProvider.name,
                logo: thisProvider.logo,
                address: thisProvider.address,
                city: thisProvider.city,
                state: thisProvider.state,
                pincode: thisProvider.pincode,
                latlng: thisProvider.latlng,
                ebVerifyState: thisProvider.ebVerifyState,
                ebNote: thisProvider.ebNote,
                _savedLength: thisProvider._saved.length,
            };
            //console.log(fillSummary);
            
            res.json(fillSummary);
        } else {throw err;}
    });
});


router.post('/coachingGroup', function(req, res) {
    var groupCity = req.body;
    var groupName = groupCity.groupName;
    var cityName = groupCity.cityName;
    
    var mNames = ["Mahendra", "Mahendra's", "Mahendra's Institute", "Mahendra Institute"];
    //console.log(groupName);
    if(mNames.indexOf(groupName) != -1){
        groupName = mNames;
        //console.log('I am here');
    }
    //city: cityName,
    var thisGroup = coaching
        .find({'groupName': groupName, disabled:false, type: 'Coaching'})
        .deepPopulate('exams exams.stream location results.exam')
        .exec(function (err, thisGroup) {
        if (!err){
            //console.log(thisGroup);
            res.json(thisGroup);
        } else {throw err;}
    });
});

router.post('/cityGroupCentres', function(req, res) {
    var namearea = req.body;
    var nameslug = namearea.nameslug;
    var areaslug = namearea.areaslug;
    var thisGroup = coaching
        .findOne({'nameslug': nameslug, 'areaslug': areaslug, disabled:false, type: 'Coaching'}, {groupName: 1, city: 1})
        .exec(function (err, thisGroup) {
        if (!err){
        if(thisGroup){
            var thisCentreGroupName = thisGroup.groupName;
            var thisCentreCity = thisGroup.city;
            var thisCentreId = thisGroup._id.toString();
            
            var otherCityCoachings = coaching
            .find({'groupName': thisCentreGroupName, 'city': thisCentreCity, disabled:false, type: 'Coaching', _id: {$ne: thisCentreId}}, {groupName: 1, city: 1, address: 1, location: 1, pincode: 1})
            .deepPopulate('location')
            .exec(function (err, otherCityCoachings) {
            if (!err){
                if(otherCityCoachings){
                    //console.log(otherCityCoachings);
                    res.json(otherCityCoachings);
                    
                }else{
                    res.json([]);
                }
            }
            });
        }else{
            res.json(null);
        }
            
        } else {throw err;}
    });
});

router.post('/coachingGroup2', function(req, res) {
    var namearea = req.body;
    var nameslug = namearea.nameslug;
    var areaslug = namearea.areaslug;
    var thisGroup = coaching
        .findOne({'nameslug': nameslug, 'areaslug': areaslug, disabled:false, type: 'Coaching'}, {nameslug: 1, areaslug: 1, name:1, groupName: 1, address: 1, city: 1, pincode: 1, logo: 1, mobile: 1, phone: 1, email:1, exams: 1, cityPosition: 1, location: 1, mapAddress: 1})
        //course: 1, photo: 1, video: 1, faculty: 1, 
        .deepPopulate('location')
        .exec(function (err, thisGroup) {
        if (!err){
        if(thisGroup){
            console.log(thisGroup._id);
            var thisCentreExams = thisGroup.exams;
            var thisCentreGroupName = thisGroup.groupName;

            if(thisCentreExams && thisCentreExams.length > 0){
            var streamExams = [];
            var streamExamStreamIds = [];
            var allExams = exam
            .find({_id: thisCentreExams, active:true}, {exam_page_name:1, stream: 1, rank: 1, logo: 1, resultFormat: 1})
            //.deepPopulate('photo.tags video.tags')
            .exec(function (err, allExams) {
            if(allExams){
            var allExamIds = allExams.map(function(a) {return a._id.toString();});
            var allExamStreamIds = allExams.map(function(a) {return a.stream.toString();});
                
            var allStreams = stream
            .find({_id: allExamStreamIds, active:true}, {displayname:1, rank: 1, logo: 1})
            .exec(function (err, allStreams) {
            if(allStreams){
            var allStreamIds = allStreams.map(function(a) {return a._id.toString();});
            allStreams.forEach(function(thisStream, sIndex){
                if(streamExams.length > 0){
                    streamExamStreamIds = streamExams.map(function(a) {return a._id.toString();});
                }
                var thisSIndex = streamExamStreamIds.indexOf(thisStream._id.toString());
                
                if(thisSIndex == -1){
                    var newStream = {
                        _id: thisStream._id.toString(),
                        displayname: thisStream.displayname,
                        logo: thisStream.logo,
                        rank: thisStream.rank,
                        exams: [],
                    };
                    streamExams.push(newStream);
                }else{
                    
                }

            });
            
            var allowedProperties = [
                "_id",
                "exam_page_name",
                "stream",
                "rank",
                "logo",
                "resultFormat",      
            ];
            allExams.forEach(function(thisGroupExam, tgIndex){
                var thisGroupExamStream = thisGroupExam.stream.toString();
                if(streamExams.length > 0){
                    streamExamStreamIds = streamExams.map(function(a) {return a._id.toString();});
                }
                var thisSIndex = streamExamStreamIds.indexOf(thisGroupExamStream);
                if(thisSIndex == -1){
                    console.log('Something went very wrong!!');
                }else{
                    var newExam = {};
                    for (var property in thisGroupExam) {
                        if(allowedProperties.indexOf(property) != -1){
                            newExam[property] = thisGroupExam[property];
                        }

                    };
                    streamExams[thisSIndex].exams.push(newExam);
                }
            });
                
            if(streamExams && streamExams.length > 0){
                streamExams.sort(function(a,b) {return (a.rank > b.rank) ? -1 : ((b.rank > a.rank) ? 1 : 0);} );  
                
                streamExams.forEach(function(thisStreamExam, seIndex){
                    if(thisStreamExam.exams && thisStreamExam.exams.length > 0){
                        thisStreamExam.exams.sort(function(a,b) {return (a.rank > b.rank) ? -1 : ((b.rank > a.rank) ? 1 : 0);} );
                    }
                });
                console.log(streamExams);
            }    
            
            
                
            var allGroupCoachings = coaching
            .find({groupName: thisCentreGroupName, disabled:false, type: 'Coaching'}, {course: 1, photo: 1, video: 1, faculty: 1})
            .deepPopulate('photo.tags video.tags')
            .exec(function (err, allGroupCoachings) {
                
            if(allGroupCoachings && allGroupCoachings.length > 0){
                var result1 = [], result2 = [];
                for (var i = 0; i < allGroupCoachings.length; i++) {
                  if (allGroupCoachings[i]._id.toString() === thisGroup._id.toString()) {
                    result1.push(allGroupCoachings[i]);
                  } else {
                    result2.push(allGroupCoachings[i]);
                  }
                }
                allGroupCoachings = result1.concat(result2);
                var allCourses = [];
                var allPhotos = [];
                var allVideos = [];
                var allFaculty = [];
                if(streamExams.length > 0){
                    streamExamStreamIds = streamExams.map(function(a) {return a._id.toString();});
                }
                allGroupCoachings.forEach(function(thisCoaching, cIndex){
                if(thisCoaching.course && thisCoaching.course.length > 0){
                thisCoaching.course.forEach(function(thisCourse, courseIndex){
                    
                var thisExamId = thisCourse.exam.toString();
                var thisExamIndex = allExamIds.indexOf(thisExamId);
                /*if(thisExamIndex == -1){
                    console.log(thisExamId);    
                    console.log(allExamIds);    
                    console.log(thisExamIndex);   
                }*/    
                 
                    
                if(thisExamIndex != -1){
                var thisExamStreamId = allExamStreamIds[thisExamIndex];
                var thisStreamIndex = streamExamStreamIds.indexOf(thisExamStreamId);
                if(thisStreamIndex != -1){
                    var thisStreamExams = streamExams[thisStreamIndex].exams;
                    if(thisStreamExams && thisStreamExams.length > 0){
                    var thisStreamExamIds = thisStreamExams.map(function(a) {return a._id.toString();});
                    var thisStreamExamArrayIndex = thisStreamExamIds.indexOf(thisExamId);
                    if(thisStreamExamArrayIndex != -1){
                        if(!streamExams[thisStreamIndex].exams[thisStreamExamArrayIndex].course){
                            streamExams[thisStreamIndex].exams[thisStreamExamArrayIndex].course = [];
                        }
                        streamExams[thisStreamIndex].exams[thisStreamExamArrayIndex].course.push(thisCourse);


                    }
                        
                        
                    }

                }
                    
                }else{
                    console.log('Could not find exam!!');
                }
                
                /*if(thisCentreExams.indexOf(thisCourse.exam) != -1){
                    allCourses.push(thisCourse);
                }*/

                });

                }
                //console.log("Photos " + thisCoaching.photo.length);
                if(thisCoaching.photo && thisCoaching.photo.length > 0){
                    allPhotos = allPhotos.concat(thisCoaching.photo);
                }
                if(thisCoaching.video && thisCoaching.video.length > 0){
                    allVideos = allVideos.concat(thisCoaching.video);
                }
                if(thisCoaching.faculty && thisCoaching.faculty.length > 0){
                    allFaculty = allFaculty.concat(thisCoaching.faculty);
                }
                    
                    
                    
                });
                //thisGroup.course = allCourses;
                
                thisGroup.photo = allPhotos;
                thisGroup.video = allVideos;
                thisGroup.faculty = allFaculty;
                
                var allowedProperties = [
                    "faculty",
                    "video",
                    "photo",
                    "_id",
                    "name",
                    "address",
                    "city",
                    "pincode",
                    "logo",
                    "groupName",
                    "areaslug",
                    "nameslug",
                    "phone",
                    "mobile",
                    "email",
                    "cityPosition",
                    "location",
                    "mapAddress",
                ];
                //console.log(thisGroup.location);
                var newGroup = {};
                for (var property in thisGroup) {
                    if(allowedProperties.indexOf(property) != -1){
                        newGroup[property] = thisGroup[property];
                    }
                    
                };
                //console.log(streamExams);
                newGroup.streamExams = streamExams;
                //console.log(thisGroup.course.length + " | " + allCourses.length);
                //console.log(thisGroup.photo.length + " | " + allPhotos.length);
                //console.log(newGroup);
                res.json(newGroup);

            }else{  
                res.json(thisGroup);
            }

            });

            }else{
                res.json(thisGroup);
            }
                
                
                
            });
                
            }else{
                res.json(thisGroup);
            }
            
                
                
                
            });
                
            


            }else{
                res.json(thisGroup);
            }


            //console.log(thisCentreExams);
            //res.json(thisGroup);
        }else{
            res.json(null);
        }
            
        } else {throw err;}
    });
});
router.post('/coachingGroupCityCentres', function(req, res) {
    var groupCity = req.body;
    var groupName = groupCity.groupName;
    var cityName = groupCity.cityName;
    
    //city: cityName,
    var thisGroup = coaching
        .find({'groupName': groupName, disabled:false, type: 'Coaching', city: cityName}, {location:1, name:1, address:1, city:1, state:1, pincode:1, phone:1, mobile: 1, email:1, logo:1})
        .deepPopulate('location')
        .exec(function (err, thisGroup) {
        if (!err){
            //console.log(thisGroup);
            res.json(thisGroup);
        } else {throw err;}
    });
});

router.get('/getGroupName/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    if(mongoose.Types.ObjectId.isValid(coachingId)){
        var thisProvider = coaching
        .findOne({'_id': coachingId, type: 'Coaching'},{name:1, groupName:1})
            .exec(function (err, thisProvider) {
            if (!err){
                if(thisProvider){
                    res.json(thisProvider.groupName);
                }else{
                    res.json(null);
                }

            } else {throw err;}
        });
    }else{
        res.json(null);
    }
    
});

router.get('/basiccoaching/:coachingId', function(req, res) {
    
    /*var emails = email
        .find({'user': '58900bd8fc519c0a04be52e8'},{})
        .exec(function (err, emails) {
        if (!err){
            var counter = 0;
            var nLength = emails.length;
            emails.forEach(function(thisEmail, emailIndex){
                thisEmail.user = '5a04512a63c45b592385f27b';
                thisEmail.save(function(err, thisEmail) {
                    if (err) return console.error(err);
                    console.log(thisEmail._id + " saved!");
                });
            });


        } else {throw err;}
    });*/
    
    var coachingId = req.params.coachingId;
    if(mongoose.Types.ObjectId.isValid(coachingId)){
        var thisProvider = coaching
        .findOne({'_id': coachingId, type: 'Coaching'},{name:1, website: 1, address:1, city:1, state:1, logo:1,email:1, mobile:1, phone:1, groupName:1})
            /*.deepPopulate('exams exams.stream location faculty.exams ebNote.user')*/
            .exec(function (err, thisProvider) {
            if (!err){
                if(thisProvider){
                    var coachingId = thisProvider._id;
                    
                    var emails = email
                    .find({'institute': coachingId},{})
                    .deepPopulate('user')
                    .exec(function (err, emails) {
                    if (!err){
                        var emailsBasic = [];
                        var counter = 0;
                        var nLength = emails.length;
                        emails.forEach(function(thisEmail, emailIndex){
                            console.log(thisEmail);
                            var newemailUser = {
                                user: thisEmail.user._id,
                                name: thisEmail.user.basic.name,
                                to: thisEmail.to,
                                fromEmail: thisEmail.fromEmail,
                                _date: thisEmail._date
                            }
                            console.log(newemailUser);
                            counter = counter + 1;
                            emailsBasic.push(newemailUser);
                            if(counter == nLength){
                                var providerBasic = {
                                    provider: thisProvider,
                                    emailSent: emailsBasic
                                };
                                
                                
                                res.json(providerBasic);
                            }

                        });
                        if(nLength==0){
                            var providerBasic = {
                                provider: thisProvider,
                                emailSent: []
                            };
                            res.json(providerBasic);
                        }
                        //ABC


                    } else {throw err;}
                });
                    
                }else{
                    res.json(null);
                }

            } else {throw err;}
        });
    }else{
        res.json(null);
    }
    
});

router.get('/cisavedUsers/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    console.log('Fetching saved users for ' + coachingId);
    var cisavedUsers = cisaved
        .find({'institute': coachingId},{user:1, _date: 1})
        .deepPopulate('user')
        .exec(function (err, cisavedUsers) {
        if (!err){
            var cisavedUsersBasic = [];
            var counter = 0;
            var nLength = cisavedUsers.length;
            cisavedUsers.forEach(function(thissave, saveindex){
                var newcisavedUser = {
                    user: thissave.user._id,
                    name: thissave.user.basic.name,
                    _date: thissave._date
                }
                //console.log(newcisavedUser);
                counter = counter + 1;
                cisavedUsersBasic.push(newcisavedUser);
                if(counter == nLength){
                    //console.log(JSON.stringify(cisavedUsersBasic));
                    res.json(cisavedUsersBasic);
                }
                
            });
            if(nLength==0){
                res.json([]);
            }
            //ABC
            
            
        } else {throw err;}
    });
});


router.get('/setRank0', function(req, res) {
    //console.log("Starting now");
    /*var allproviders =  coaching.find({type: 'Coaching'}, {},function(err, allproviders) {
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
    });*/
    var examId = '5909803d7be9410011e38c61';
    var allproviders =  coaching.find({exams: examId}, {exams: 1},function(err, allproviders) {
    if (!err){
         allproviders.forEach(function(thisprovider, index){
            var thisExams = thisprovider.exams;
            var eIndex = thisExams.indexOf(examId);
             console.log('There are ' + allproviders.length + " providers!");
             if(eIndex != -1){
                 console.log(thisExams.length);
                 thisExams.splice(eIndex, 1);
                 //thisprovider.exams = newExams;
                 console.log(thisExams.length);
                 thisprovider.save(function(err, thisprovider) {
                    if (err) return console.error(err);
                    console.log(thisprovider._id + " saved!");
                });
             }
                
            
            
         });
    }
    });
});



router.get('/checkLogo/:pageNumber', function(req, res) {
    var pageNumber = req.params.pageNumber;
    if(!pageNumber){
        pageNumber=1;
    }
    var allproviders =  coaching.find({ logo: { $exists: true, $ne: ''}, logoChecked: {$ne: true}, type: 'Coaching'}, {logo:1, newlogo:1, logoBackup:1, name:1},function(err, allproviders) {
        if (!err){
            res.json(allproviders);
            /*var counter = 0;
            var changes = 0;
            var nLength = allproviders.length;
            allproviders.forEach(function(thisprovider, index){
                counter = counter + 1;
                var logo = thisprovider.logo;
                var newlogo = thisprovider.logo;
                var res = logo.split("/");
                var filename = res[res.length-1].toLowerCase();

                res = newlogo.split("/");
                var newfilename = res[res.length-1].toLowerCase();

                console.log(counter + ' ' + filename + newfilename);
                if(filename != newfilename){
                    changes = changes + 1;
                    console.log(counter + ' ' + filename + newfilename);
                }

                if(counter == nLength){
                    console.log(changes + " logos to be changed in " + nLength + " providers!");
                    //res.json('Done');
                }
                });*/
             
        }else {throw err;}
        }).skip(pageNumber > 0 ? ((pageNumber-1)*500) : 0).limit(500);
    
    
    
});

router.get('/sandbox2Service/:cityName', function(req, res) {
    var city = req.params.cityName;
    if(!city || city==''){
        city = 'Jaipur';
    }
    console.log("Sandbox2 Service Starting now for " + city);
    /*, $where: "this.exams && this.exams.length > 0"*/
    coaching.find({city: city, latlng: {$exists: true}, type: 'Coaching'}, {latlng:1, name:1, address:1, mobile:1, phone:1, website:1, email:1, logo:1, ebVerifyState:1},function(err, allproviders) {
        var counter = 0;
        var changes = 0;
        var nLength = allproviders.length;
        
        res.json(allproviders);
        
        
    });
    
});

router.get('/databaseService', function(req, res) {
    console.log("Database Service Starting now");
    res.json('Done');
    
    var allResultProviders = coaching.find({results: {$exists: true}, $where:'this.results.length>0'}, {groupName:1, results:1, logo:1, city:1},function(err, allResultProviders) {
        if (!err){
            var resultsLength = 0;
            var nProviders = allResultProviders.length;
            var counter = 0;
            console.log("There are " + nProviders + " providers!");
            
            allResultProviders.forEach(function(thisprovider, index){
                //console.log(JSON.stringify(thisprovider.results));
                resultsLength += thisprovider.results.length;
                counter += 1;
                
                var nResults = thisprovider.results.length;
                var rCounter = 0;
                
                thisprovider.results.forEach(function(thisresult, rindex){
                    
                    var newResult = new result({
                    });
                    var rProperties = ["exam","year","name","category","rank","subgroup","percentile","percentage","marks","passFail","active","course","image","_added"];  
                        
                    rProperties.forEach(function(thisproperty, pindex){
                        newResult[thisproperty] = thisresult[thisproperty];
                    });
                        
                    newResult.provider = thisprovider._id.toString();
                   
                    newResult.save(function(err, newResult) {
                        if (err) return console.error(err);
                        console.log(newResult._id + " saved!");
                    });
                    rCounter += 1;
                    if(rCounter && counter == nProviders){
                        console.log("Total Results are: " + resultsLength);
                    }
                    
                });
                
                
            });
            
        }
    });
    
    /*var allproviders = coaching.find({"name" : {$regex : ".*Pvt Ltd."}}, {name:1, groupName: 1},function(err, allproviders) {
        
        var counter = 0;
        var changes = 0;
        var nLength = allproviders.length;
        console.log(nLength);
        allproviders.forEach(function(thisprovider, index){
            var thisName = thisprovider.name;
            var pIndex = thisName.indexOf("Pvt Ltd.");
            thisName = thisName.substr(0, pIndex);
            thisName = thisName.trim();
            
            console.log(thisprovider.name + " : " + thisName);
            thisprovider.name = thisName;
            thisprovider.groupName = thisName;
            
            changes = changes + 1;
            
            
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
            });
            
        });
        console.log("To change: " + changes + " providers!");
        
    });*/
    /*coaching.find({"email": { $exists: true}, _id: '5870ef3280ea0e0698890917'}, {email:1},function(err, allproviders) {
        var counter = 0;
        var changes = 0;
        var nLength = allproviders.length;
        console.log(nLength);
        allproviders.forEach(function(thisprovider, index){
            console.log(thisprovider.email.length);
            
            
            if(thisprovider.email.length > 3){
                console.log(thisprovider._id + thisprovider.email);
                changes = changes + 1;
            }
            
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
            });
            
        });
        console.log("To change: " + changes + " providers!");
        
    });*/
    
    /*coaching.find({"city": 'Kota', disabled: false}, {verfiyAssigned: 1, ebVerify:1, disabled:1},function(err, allproviders) {
        var counter = 0;
        var changes = 0;
        var nLength = allproviders.length;
        allproviders.forEach(function(thisprovider, index){
            
            thisprovider.verfiyAssigned = false;
            thisprovider.ebVerify = [];
            thisprovider.ebVerifyState = '';
            changes = changes  +1;
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
            });
            
        });
        console.log("To change: " + changes + " providers!");
        
    });*/
    /*
    coaching.find({"website": { $exists: true,$ne:'' }, type: 'Coaching'}, {website:1, newwebsite:1},function(err, allproviders) {
        var counter = 0;
        var changes = 0;
        var nLength = allproviders.length;
        allproviders.forEach(function(thisprovider, index){
            //var website = thisprovider.website;
            //thisprovider.newwebsite = [thisprovider.website];
            
            var website = thisprovider.website;
            website.forEach(function(thiswebsite, windex){
                if(thiswebsite.trim ==''){
                    console.log(thisprovider._id);
                    changes = changes + 1;
                }
            });
            
            thisprovider.website = thisprovider.newwebsite;
            console.log(index +" " + thisprovider.newwebsite);
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
            });
            
        });
        console.log("To change: " + changes + " providers!");
        
    });
    */
    //"email": { $exists: true, $ne: null } 
    /*var states = [
        "Andhra Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Delhi",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Punjab",
        "Rajasthan",
        "Tamil Nadu",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
    ];
    res.json('Done');
    coaching.find({}, {email:1, state:1},function(err, allproviders) {
        var counter = 0;
        var changes = 0;
        var nLength = allproviders.length;
        allproviders.forEach(function(thisprovider, index){
            var thisState = thisprovider.state;
            var sIndex = states.indexOf(thisState);
            
            if(sIndex == -1){
                //console.log(thisprovider);
                states.forEach(function(this_state, stateIndex){
                    if(thisState.indexOf(this_state) != -1){
                        //console.log(thisState + ' ' + this_state);
                        thisprovider.state = this_state;
                        thisprovider.save(function(err, thisprovider) {
                            if (err) return console.error(err);
                            console.log(thisprovider._id + " saved!");
                        });
                        changes = changes + 1;
                        
                    }
                });
                
                
            }
        });
        console.log("To change: " + changes + " providers!");
        
    });*/
    
   
    
    /*var allproviders =  coaching.find({city:'Jaipur'}, {email:1, state:1},function(err, allproviders) {
        if (!err){
            var counter = 0;
            var changes = 0;
            var nLength = allproviders.length;

            allproviders.forEach(function(thisprovider, index){
                counter = counter + 1;
                
                var instituteEmails = thisprovider.email;
                if(!instituteEmails || instituteEmails.length == 0){
                    changes += 1;
                    console.log(thisprovider._id);
                    
                }

                if(counter == nLength){
                    console.log(changes + " institutes out of " + nLength +   "don't have emails");

                }
            }); 

           } else {throw err;}
        });*/
    
    
    
    //, newlogo: { $exists: false}
    //, newlogo: {$exists:false}
    //logo: { $exists: true, $ne: ''}
    /*var groups = group.find({}, function(err, groups) {
        if (!err){
        var groupNames = groups.map(function(a) {return a.group;});
        var allproviders =  coaching.find({ }, {group:1, groupName:1},function(err, allproviders) {
            if (!err){
                var counter = 0;
                var changes = 0;
                var nLength = allproviders.length;

                allproviders.forEach(function(thisprovider, index){
                counter = counter + 1;
                var gIndex = groupNames.indexOf(thisprovider.groupName);
                if(gIndex!=-1){
                    console.log(counter + thisprovider._id);
                    thisprovider.group = groups[gIndex]._id;
                    changes = changes + 1;
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisprovider._id + " saved!");
                    });
                }


                if(counter == nLength){
                    console.log(changes + " logos to be changed in " + nLength + " providers!");
                    
                }
                }); 

           } else {throw err;}
        });
            
             
        }else {throw err;}
        });*/
    
    
    
    
    
});

function titleCase(str) {
  str = str.toLowerCase();
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

router.get('/cityStateService', function(req, res) {
    console.log("City State Service Starting now");
    res.json('Done');
    
    
    var allProviders = coaching.find({type:'Coaching'}, {name:1, city:1, state:1},function(err, allProviders) {
        if (!err){
            var nProviders = allProviders.length;
            var counter = 0;
            console.log("There are " + nProviders + " providers!");
            var allStates = [];
            allProviders.forEach(function(thisprovider, index){
                if(index%2000 == 0){
                    console.log('At ' + index + ' provider! Counter is: ' + counter);
                }
                
                if(thisprovider.city && thisprovider.state){
                    
                    thisprovider.city = thisprovider.city.trim();
                    thisprovider.city = titleCase(thisprovider.city);

                    thisprovider.state = thisprovider.state.trim();
                    thisprovider.state =    titleCase(thisprovider.state);

                    var stateNames = allStates.map(function(a) {return a.state;});
                    var sIndex = stateNames.indexOf(thisprovider.state);

                    if(sIndex == -1){
                        var newState = {
                            state: thisprovider.state,
                            cities: []
                        };
                        allStates.push(newState);
                    }

                    var stateNames = allStates.map(function(a) {return a.state;});
                    var sIndex = stateNames.indexOf(thisprovider.state);

                    if(sIndex != -1){
                        var cities = allStates[sIndex].cities;
                        var cIndex = cities.indexOf(thisprovider.city);
                        if(cIndex == -1){
                        allStates[sIndex].cities.push(thisprovider.city);
                        }
                    }else{
                        console.log('This shouldnt happen');
                    }

                    counter += 1;
                    if(counter == nProviders){
                        var nCities = 0;
                        allStates.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );  
                        allStates.forEach(function(thisstate, index){
                            //console.log(thisstate.state);
                            //console.log(JSON.stringify(thisstate.cities));
                            nCities += thisstate.cities.length;
                        });
                        
                        console.log('Total States: ' + allStates.length);
                        console.log('Total Cities: ' + nCities);
                    }
                    
                    
                }else{
                    counter += 1;
                    console.log('Check: ' + thisprovider._id);
                }
                
                
                //console.log(thisprovider.city + ", " + thisprovider.city);
                thisprovider.save(function(err, thisprovider) {
                    if (err) return console.error(err);
                    console.log(thisprovider._id + " saved!");
                });
            });
            
        }else{
            
        }
    });
    
    
});

router.get('/cityStateService2', function(req, res) {
    console.log("City State 2 Service Starting now");
    var bCounter = 0;
    res.json('Done');
    var allProviders = coaching.find({type:'Coaching', disabled: false}, {name:1, city:1, state:1},function(err, allProviders) {
        if (!err){
            var nProviders = allProviders.length;
            var counter = 0;
            console.log("There are " + nProviders + " providers!");
            allProviders.forEach(function(thisprovider, index){
                
                if(thisprovider.city && thisprovider.state){
                    var thisCity = thisprovider.city.trim();
                    var thisState = thisprovider.state.trim();

                    if(thisCity != thisprovider.city){
                        console.log(thisprovider._id);
                        bCounter += 1;
                        thisprovider.city = thisCity;
                        thisprovider.save(function(err, thisprovider) {
                            if (err) return console.error(err);
                            console.log(index + ' ' + thisprovider._id + " saved!");
                        });
                    }
                    if(thisState != thisprovider.state){
                        console.log(thisprovider._id);
                        thisprovider.state = thisState;
                        thisprovider.save(function(err, thisprovider) {
                            if (err) return console.error(err);
                            console.log(index + ' ' + thisprovider._id + " saved!");
                        });
                        bCounter += 1;
                    }
                    
                    
                }else{
                    console.log('Check ' + thisprovider._id);
                }
                
                
                /**/
                counter += 1;
                if(counter == nProviders){
                    console.log('Total changes are: ' + bCounter);
                }
            });
            
        }else{
            
        }
    });
    
    /*coaching.distinct( ("city"),function(err, docs) {
    if (!err){
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });*/
});

router.get('/logoService', function(req, res) {
    console.log("Logo Service Starting now");
    var allproviders =  coaching.find({"logo": { $exists: true, $ne: null }, type: 'Coaching' }, {logo:1},function(err, allproviders) {
    if (!err){
         res.json('Done');
         var counter = 0;
         var changes = 0;
         var nLength = allproviders.length;
         allproviders.forEach(function(thisprovider, index){
             counter = counter + 1;
            if(thisprovider.logo){
                
                var logo = thisprovider.logo;
                //console.log(counter + ". " + logo);
                if(logo.indexOf('ge.php') != -1 || logo.indexOf('box-orange-arrow.gif') != -1){
                    changes = changes + 1;
                    //console.log(logo);
                    console.log("Yes logo needs to changed: " + logo + ' for: ' + thisprovider._id);
                    thisprovider.logo = '';
                    /*thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log(thisprovider._id + " saved!");
                    });*/
                }
            }
                
            if(counter == nLength){
                console.log(changes + " logo changes needed out of " + nLength + " providers!");
                //res.json('Done');
            }
         });
    }
    });
});

router.get('/UniqueLogoService', function(req, res) {
    console.log("Getting all logos");
    
    
    coaching.find({logo: {$exists: true, $ne: ''}, type: 'Coaching'},{groupName:1, logo:1},function(err, allProviders) {
    if (!err){
        var uniqueGroups = [];
        var uniqueLogos = [];
        var counter = 0; 
        var nLength = allProviders.length;
        //res.json('Done');
        allProviders.forEach(function(thisprovider, index){
            var groupName = thisprovider.groupName;
            var logo = thisprovider.logo;
            counter = counter + 1;
            if(uniqueGroups.indexOf(groupName) == -1){
                uniqueGroups.push(groupName);
                uniqueLogos.push(logo);
            }
            if(counter == nLength){
                //console.log(uniqueLogos);
                res.json(uniqueLogos);
            }
        });
        
        
    } else {throw err;}
    }).limit(1000);
    
    /*coaching.distinct( "logo",function(err, docs) {
    if (!err){ 
        console.log('There are: ' + docs.length + ' unique logos!');
        res.json(docs);
    } else {throw err;}
    });*/
});

router.get('/allDistinct', function(req, res) {
    console.log("Getting all distinct institutes with count");
    
    coaching.find({type: 'Coaching'},{name:1, groupName:1},function(err, allProviders) {
    if (!err){
        res.json('Done');
        allProviders.forEach(function(thisprovider, index){
            thisprovider.groupName = thisprovider.name;
            thisprovider.save(function(err, thisprovider) {
                if (err) return console.error(err);
                console.log(thisprovider._id + " saved!");
            });
        });
        
        
    } else {throw err;}
    });
    
    /*coaching.distinct("name",function(err, docs) {
    if (!err){ 
        console.log(docs.length);
        console.log(docs);
        res.json(docs);
    } else {throw err;}
    }).limit(5000);*/
    /*var uniqueName = [];
    var nameCount = [];
    var allproviders =  coaching.find({}, {name:1},function(err, allproviders) {
        var counter = 0;
        var nProviders = allproviders.length;
        res.json('Done');
        allproviders.forEach(function(thisprovider, index){
            
            var nameIndex = uniqueName.indexOf(thisprovider.name);
            
            if(nameIndex == -1){
                uniqueName.push(thisprovider.name);
                var newPair = {
                    name: thisprovider.name,
                    count: 1
                };
                nameCount.push(newPair);
            }else{
                nameCount[nameIndex].count += 1;
            }
            counter = counter + 1;
            
            if(counter == nProviders){
                console.info(JSON.stringify(nameCount));
            }
        });
    });*/
    
    
    
});


router.get('/getAllCourses', function(req, res) {
    //console.log("Starting now");
    var allCourses = [];
    var allproviders =  coaching.find({type: 'Coaching'}, {coursesOffered:1, exams:1,name:1},function(err, allproviders) {
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

router.get('/uprank/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    //console.log(coachingId);
    var thisProvider = coaching.findOne({"_id" : coachingId, type: 'Coaching'}, {},function(err, thisProvider) {
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
router.get('/downrank/:coachingId', function(req, res) {
    var coachingId = req.params.coachingId;
    //console.log(coachingId);
    var thisProvider = coaching.findOne({"_id" : coachingId, type: 'Coaching'}, {},function(err, thisProvider) {
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
    var allproviders =  coaching.find({type: 'Coaching'}, { website:1, name:1, city:1},function(err, allproviders) {
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
                
                
                /*var oldWebsite = oldcoaching
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

                
            }  
         }).limit(2000).skip(6000);
    }
    });
    res.json('Done');
});

router.get('/edit/removeDuplicates/:city', function(req, res) {
    var city = req.params.city;
    console.log("City is: "+city);
    var allproviders =  coaching.find({"city" : city, type: 'Coaching'}, { address:1, name:1},function(err, allproviders) {
    if (!err){
        console.log("There are " + allproviders.length + " providers right now.");
        allproviders.forEach(function(thisprovider, index){
            
            var url = thisprovider.website;
            var address = thisprovider.address;
            var name = thisprovider.name;
            console.log("Processing " + index + " " + address + " " + name);
            //{'website': url}
            var thisproviders = coaching.find({'address': address, 'name': name}, { address:1},function(err, thisproviders) {
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

function titleCase(str) {
  if(str){
      str = str.toLowerCase().split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
      }
      return str.join(' ');
  }
}


router.get('/emailService', function(req, res) {
    console.log("Email Service Starting now");
    res.json('Done');
    /*, $where:'this.email.length>0'*/
    var allProviders = coaching.find({email: {$exists: true}}, {groupName:1, email:1, logo:1, city:1},function(err, allProviders) {
        if (!err){
            var emailLength = 0;
            var nProviders = allProviders.length;
            var counter = 0;
            console.log("There are " + nProviders + " providers!");
            
            allProviders.forEach(function(thisprovider, index){
                emailLength += thisprovider.email.length;
                counter += 1;
                
                var nemail = thisprovider.email.length;
                var rCounter = 0;
                
                if( Object.prototype.toString.call( thisprovider.email ) === '[object Array]' ) {
                    //console.log('Email is an array: ' + thisprovider.email);
                }else{
                    console.log('Email not an array: ' + thisprovider.email);
                }
                thisprovider.email.forEach(function(thisemail, rindex){
                    
                    
                    
                    rCounter += 1;
                    if(rCounter && counter == nProviders){
                        console.log("Total Emails are: " + emailLength);
                    }
                    
                });
                
                
            });
            
        }
    });
});


router.get('/groupSummaryService', function(req, res) {
    console.log("Group Website Service Starting now");
    //res.json('Done');
    
    var groupNames = coaching.aggregate(
    [
        {$match: {disabled: false} },
        {"$group": { "_id": { groupName: "$groupName" }, count:{$sum:1}, exams: { $addToSet: "$exams" } } },
        {$sort:{"count":-1}}

    ],function(err, groupNames) {
    if (!err){
        var filterGroupNames = [];
        
        groupNames.forEach(function(thisgroup, index){
            if(thisgroup.count > 5){
                filterGroupNames.push(thisgroup);
            }
        });
        console.log(filterGroupNames.length);
        filterGroupNames.forEach(function(thisgroup, index){
            //console.log(thisgroup);
            var thisExams = thisgroup.exams;
            var allExams = [];
            thisExams.forEach(function(thisset, sindex){
                thisset.forEach(function(thisExam, eindex){
                    var exIndex = allExams.indexOf(thisExam.toString());
                    if(exIndex == -1){
                        allExams.push(thisExam.toString());
                    }
                });
            });
            thisgroup.exams = allExams;
        });
        
        
        filterGroupNames = filterGroupNames.map(function(a) {return {name:a._id.groupName, count: a.count, exams: a.exams};});
        //console.log(filterGroupNames);
        
        res.json(filterGroupNames);
    } else {throw err;}
    });
    
    /*, $where:'this.email.length>0'*/
    /*var allProviders = coaching.find({website: {$exists: true} , $where:"this.website.length==0"}, {website:1, groupName: 1},function(err, allProviders) {
        if (!err){
            var websiteLength = 0;
            var nProviders = allProviders.length;
            var counter = 0;
            console.log("There are " + nProviders + " providers!");
            
            allProviders.forEach(function(thisprovider, index){
                //console.log(thisprovider.groupName);
                if(!thisprovider.website){
                    thisprovider.website = [];
                    thisprovider.save(function(err, thisprovider) {
                        if (err) return console.error(err);
                        console.log("Website saved for " + thisprovider._id);
                    });
                }
                
            });
            
        }
    });*/
});

router.get('/citySummaryService', function(req, res) {
    console.log("City Summary Service Starting now");
    //res.json('Done');
    
    var groupNames = coaching.aggregate(
    [
        {$match: {disabled: false, type: 'Coaching'} },
        {"$group": { "_id": { city: "$city" }, count:{$sum:1}, state: { $addToSet: "$state" } } },
        {$sort:{"count":-1}}

    ],function(err, groupNames) {
    if (!err){
        var filterGroupNames = [];
        
        console.log(groupNames);
        
        
        res.json(groupNames);
    } else {throw err;}
    });
});

/*

var ObjectId = require('mongodb').ObjectID;
router.get('/cacsService', function(req, res) {
    //58ac2811b9ae260088289993, 58e337f7ceefed001156cebb, 58e33815ceefed001156cebc - CA CPT
    //58ac2824b9ae260088289994, 58e33887ceefed001156cec0, 58e338b2ceefed001156cec2 - CS Foundation
    console.log("CA & CS Summary Service Starting now");
    var examId = '58ac2824b9ae260088289994';
    var toAddExam1 = '58e33887ceefed001156cec0';
    var toAddExam2 = '58e338b2ceefed001156cec2';
    
    var allCoachings = coaching.find({exams: ObjectId(examId)}, {name:1 , exams:1, _saved: 1, contactInfoState:1, addContactInfoDone:1, ebVerifyState:1},function(err, allCoachings) {
    if (!err){
        var toSet = false;
        var toEdit = false;
        var toEditCoachings = [];
        var toSetCoachings = [];
        allCoachings.forEach(function(thisProvider, pindex){
            var thisExams = thisProvider.exams;
            var saved = thisProvider._saved;
            var ebVerifyState = thisProvider.ebVerifyState;
            var contactInfoState = thisProvider.contactInfoState;
            var addContactInfoDone = thisProvider.addContactInfoDone;
            toSet = true;
            toEdit = false;
            if(saved && saved.length > 0){
                toSet = false;
            }
            if(ebVerifyState && ebVerifyState != ''){
                toSet = true;
            }
            if(contactInfoState && contactInfoState != ''){
                toSet = true;
            }
            if(addContactInfoDone){
                toSet = true;
            }
            if(toSet){
                toSetCoachings.push(thisProvider);
                if(thisExams.indexOf(toAddExam1) == -1){
                    thisProvider.exams.push(toAddExam1);
                    toEdit = true;
                }
                if(thisExams.indexOf(toAddExam2) == -1){
                    thisProvider.exams.push(toAddExam2);
                    toEdit = true;
                }
                if(toEdit){
                    toEditCoachings.push(thisProvider);
                    thisProvider.save(function(err, thisProvider) {
                    if (err) return console.error(err);
                        console.log("Coaching saved: "+ thisProvider._id);
                    });
                    
                }
            }
        });
        
        console.log(toSetCoachings.length + " to be changed out of " + allCoachings.length);
        console.log(toEditCoachings.length + " to be edited out of " + allCoachings.length);
        res.json(true);
    } else {throw err;}
    });
});

*/

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

router.post('/suggestedcoachings', function(req, res) {
    var examUserinfo = req.body;
    var thisExam = examUserinfo.exam;
    var userinfo = examUserinfo.userinfo;
    var userId = null;
    var howmany = 15;
    if(userinfo.user){
        userId = userinfo.user;
    }
    var city = null;
    if(userinfo.city){
        city = userinfo.city;
    }
    var latlng = null;
    if(userinfo.latlng){
        latlng = userinfo.latlng;
    }
    
    if(thisExam){
        if(latlng){
        var kmsToRadian = function(kms){
            var earthRadiusInKms = 6371;
            return kms / earthRadiusInKms;
        };
        var thisLng = Number(latlng.lng);
        var thisLat = Number(latlng.lat);
        var kms = 50;
        var examArray = [thisExam];

        var coordinates = [thisLng, thisLat];
        var query = {
            "loc" : {
                $geoWithin : {
                    $centerSphere : [coordinates, kmsToRadian(kms)]
                }
            },
            disabled: false,
            exams: thisExam, 
            //exams: {$exists: true}, 
            //$where:'this.exams.length>0'
        };
        
        var allProviders = coaching.find(query, {name:1, groupName:1, logo:1, loc:1, address: 1, city:1},function(err, allProviders) {
        if (!err){
            var allProviderswithDistance = [];
            allProviders.forEach(function(thisProvider, pindex){
                var pCoordinates = thisProvider.loc.coordinates;
                var thisDistance = getDistanceFromLatLonInKm(pCoordinates[1],pCoordinates[0],coordinates[1],coordinates[0]);
                thisDistance = Math.round(thisDistance * 10) / 10;
                var newProvider = {
                    _id: thisProvider._id,
                    name: thisProvider.name,
                    address: thisProvider.address,
                    city: thisProvider.city,
                    logo: thisProvider.logo,
                    groupName: thisProvider.groupName,
                    distance: thisDistance,
                };
                
                allProviderswithDistance.push(newProvider);
            });
            res.json(allProviderswithDistance);

        } else {throw err;}
        }).limit(howmany);
        
    }else if(city && country == "India"){
        console.log("Finding institutes based on city: " + city);
        var allProviders = coaching
            .find({'city': city, exams: thisExam}, {name:1, groupName:1, logo:1, loc:1, address: 1, city:1})
            .exec(function (err, allProviders) {
            if (!err){
                res.json(allProviders);
            } else {throw err;}
        }).limit(howmany);
        
        
    }else{
        console.log("Finding institutes on no basis!");
        var allProviders = coaching
            .find({exams: thisExam}, {name:1, groupName:1, logo:1, loc:1, address: 1, city:1})
            .exec(function (err, allProviders) {
            if (!err){
                res.json(allProviders);
            } else {throw err;}
        }).limit(howmany);
    }    
    }else{
        console.log("Finding institutes on no basis!");
        var allProviders = coaching
            .find({exams: thisExam}, {name:1, groupName:1, logo:1, loc:1, address: 1, city:1})
            .exec(function (err, allProviders) {
            if (!err){
                res.json(allProviders);
            } else {throw err;}
        }).limit(howmany);
    }
    
});

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
router.get('/generateurlslugs', function(req, res) {
    res.json(true);
    console.log('I am here');
    
    var allCoachings = coaching
        .find({location: {$exists: true}, disabled: false}, {name:1, location: 1, city: 1})
        .deepPopulate('location')
        .exec(function (err, allCoachings) {
        if (!err){
            console.log('There are '  +allCoachings.length + " coachings!");
            allCoachings.forEach(function(thisCoaching, index){
                var coachingName = thisCoaching.name;
                var coachingArea = thisCoaching.location.area;
                var coachingCity = thisCoaching.city;
                
                thisCoaching.nameslug = slugify(coachingName);
                thisCoaching.areaslug = slugify(coachingArea + " " + coachingCity);
                
                //console.log(thisCoaching.urlslug1);
                //console.log(thisCoaching.urlslug2);
                
                
                
                
                thisCoaching.save(function(err, thisCoaching) {
                if (err) return console.error(err);
                    console.log("Coaching saved " + thisCoaching._id);
                    //res.json('Done');
                });
                
            });
            
        } else {throw err;}
    });
    
});


module.exports = router;