var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var view = require('../app/models/view');
var targetStudyProvider = require('../app/models/targetStudyProvider');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular view with _id viewId
router.get('/edit/:viewId', function(req, res) {
    var viewId = req.params.viewId;
    //console.log(viewId);
    view
        .findOne({ '_id': viewId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/masterViewSummary', function(req, res) {
    view.count({}, function(err, totalViews) {
    if (!err){
        var start = new Date();
        start.setHours(0,0,0,0);
        var end = new Date();
        end.setHours(23,59,59,999);
        
        view.count({_date: {$gte: start, $lt: end}}, function(err, todayViews) {
            if (!err){
                var start = new Date();
                start.setDate(start.getDate()-7);
                start.setHours(0,0,0,0);
                var end = new Date();
                end.setHours(23,59,59,999);
                
                view.count({_date: {$gte: start, $lt: end}}, function(err, weekViews) {
                if (!err){
                    var start = new Date();
                    start.setDate(start.getDate()-1);
                    start.setHours(0,0,0,0);
                    var end = new Date();
                    end.setDate(end.getDate()-1);
                    end.setHours(23,59,59,999);
                    
                    view.count({_date: {$gte: start, $lt: end}}, function(err, yesterdayViews) {
                    if (!err){
                        var viewSummary ={
                            total: totalViews,
                            week: weekViews,
                            yesterday: yesterdayViews,
                            today: todayViews
                        };
                        res.json(viewSummary);
                    } else {throw err;}
                    });
                    
                } else {throw err;}
                });
                
            } else {throw err;}
        });
    } else {throw err;}
    });
});

router.get('/dailySummary', function(req, res) {
    var viewSummary = view.aggregate(
    [
        {$match: {}},
        {$group: { _id : {
            year:{$year:"$_date"},
            month:{$month:"$_date"},
            day:{$dayOfMonth:"$_date"}
        },count:{$sum: 1 }},
        }/*,
        {$sort:{"_date":-1}}*/

    ],function(err, viewSummary) {
    if (!err){
        res.json(viewSummary);
    } else {throw err;}
    });
});

router.get('/hourlyHeatmap', function(req, res) {
    
    var viewSummary = view.aggregate(
    [
        {$match: {}},
        {$group: { _id : {
            hour:{$hour:"$_date"},
        },count:{$sum: 1 }},
        }
    ],function(err, viewSummary) {
    if (!err){
        res.json(viewSummary);
    } else {throw err;}
    });
});

router.post('/markDone', function(req, res) {
    var viewForm = req.body;
    var institute = viewForm.institute;
    var user = viewForm.user;
    view
        .findOne({ 'institute': institute, 'user':user })
        .exec(function (err, thisTask) {
        if (!err){
            //console.log(docs);
            if(thisTask){
                thisTask.active = false;
                thisTask._finished = Date.now();
                thisTask.save(function(err, thisTask) {
                    if (err) return console.error(err);
                    res.json(thisTask._id);
                });
            }
            
        } else {throw err;}
    });
    
});

//to get all views
router.get('/', function(req, res) {
    var views = view
        .find({})
        .deepPopulate('institute user')
        .exec(function (err, views) {
        if (!err){
            var basicViews = [];
            var counter = 0;
            var nLength = views.length;
            views.forEach(function(thisView, index){
                var newTask = {
                    user: {
                        _id: thisView.user._id,
                        name: thisView.user.basic.name,
                    },
                    institute: {
                        _id: thisView.institute._id,
                        name: thisView.institute.name,
                        address: thisView.institute.address,
                        city: thisView.institute.city,
                        pincode: thisView.institute.pincode
                    },
                    _created: thisView._created,
                    _deadline: thisView._deadline,
                    _finished: thisView._finished,
                    active: thisView.active,

                };
                counter = counter + 1;
                basicViews.push(newTask);
                if(counter == nLength){
                    res.json(basicViews);
                }
            });
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
});
//to get all views for a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    var views = view
        .find({user: userId, institute: {$exists: true}})
        .sort( { _date: -1 } )
        //.deepPopulate('institute institute.exams institute.exams.stream')
        .exec(function (err, views) {
        if (!err){
            var basicViews = [];
            var groupNames = [];
            var counter = 0;
            var nLength = views.length;
            
            var viewInstituteIds =  views.map(function(a) {return a.institute;});
            var allProviderViews = targetStudyProvider
                .find({_id : { $in : viewInstituteIds }, disabled: {$ne: true}},{name:1 , groupName:1, exams:1, disabled: 1, city:1, logo:1})
                .deepPopulate('exams exams.stream')
                .exec(function (err, allProviderViews) {
                if (!err){
                var instituteIds = allProviderViews.map(function(a) {return a._id.toString();});
                     
                views.forEach(function(thisView, index){
                    var iIndex = instituteIds.indexOf(thisView.institute.toString());
                    thisView.institute = allProviderViews[iIndex];
                    
                    if(thisView.institute && !thisView.institute.disabled && thisView.institute.exams.length > 0){

                    var gIndex = groupNames.indexOf(thisView.institute.groupName);

                    if(gIndex == -1){
                        var newView = {
                            user: userId,
                            groupName: thisView.institute.groupName,
                            logo: thisView.institute.logo,

                            viewSummary: [{
                                exam: thisView.institute.exams[0].name,
                                stream: thisView.institute.exams[0].stream.name,
                                city: thisView.institute.city,
                                _date: thisView._date
                            }],

                        };
                        basicViews.push(newView);
                        groupNames.push(thisView.institute.groupName);
                    }else{
                        var thisViewSummary = basicViews[gIndex].viewSummary;
                        var currCities = thisViewSummary.map(function(a) {return a.city;});


                        var cIndex = currCities.indexOf(thisView.institute.city);

                        if(cIndex == -1){
                            var newViewSummary = {
                                exam: thisView.institute.exams[0].name,
                                stream: thisView.institute.exams[0].stream.name,
                                city: thisView.institute.city,
                                _date: thisView._date
                            };
                            basicViews[gIndex].viewSummary.push(newViewSummary);
                            //console.log(newViewSummary);
                        }else{
                            //do nothing
                        }
                    }

                    }


                    counter = counter + 1;
                    if(counter == nLength){
                        //console.log(basicViews);

                        res.json(basicViews);
                    }




                    });
                    
                    
                    //res.json(cityProviders);

                } else {throw err;}
            });
            
            /*
            
            */
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
    
});
router.get('/institute/:instituteId', function(req, res) {
    var instituteId = req.params.instituteId;
    var views = view
        .find({institute: instituteId})
        .deepPopulate('user')
        .exec(function (err, views) {
        if (!err){
            var basicViews = [];
            var counter = 0;
            var nLength = views.length;
            views.forEach(function(thisView, index){
                var newView = {
                    institute: institute,
                    user: {
                        _id: thisView.user._id,
                        name: thisView.user.basic.name,
                        mobile: thisView.user.contact.mobile
                    },
                    _date: thisView._date
                };
                counter = counter + 1;
                basicViews.push(newView);
                if(counter == nLength){
                    res.json(basicViews);
                }
            });
            
            if(nLength == 0){
                res.json([]);
            }
        } else {throw err;}
    });
    
});


router.post('/save', function(req, res) {
    var viewForm = req.body;
    var institutes = viewForm.institutes;
    var user = viewForm.user;
    var state = viewForm.state;
    var ip = viewForm.ip;
    var claim = viewForm.claim;
    var url = viewForm.url;
    //console.log(JSON.stringify(institutes));
    
    if(institutes && institutes.length > 0){
        var nLength = institutes.length;
        var counter = 0;
        institutes.forEach(function(thisInstitute, index){
            var newview = new view({
                institute: thisInstitute
            });
            if(user){
                newview.user = user;
            }
            if(state){
                newview.state = state;
            }
            if(ip){
                newview.ip = ip;
            }
            if(claim){
                newview.claim = claim;
            }
            if(url){
                newview.url = url;
            }
            newview.save(function(err, newview) {
                if (err) return console.error(err);
                counter = counter + 1;
                if(counter == nLength){
                    res.json('Done');
                }
            });

        });
    }else{
        var newview = new view({
        });
        if(user){
            newview.user = user;
        }
        if(state){
            newview.state = state;
        }
        if(ip){
            newview.ip = ip;
        }
        if(claim){
            newview.claim = claim;
        }
        if(url){
            newview.url = url;
        }
        newview.save(function(err, newview) {
            if (err) return console.error(err);
            console.log("New view used: " + newview._id);
            res.json('Done');
        });
    }
    
    
});

module.exports = router;