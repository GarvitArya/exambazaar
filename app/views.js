var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var view = require('../app/models/view');


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
            var basicFillTasks = [];
            var counter = 0;
            var nLength = views.length;
            views.forEach(function(thisFillTask, index){
                var newTask = {
                    user: {
                        _id: thisFillTask.user._id,
                        name: thisFillTask.user.basic.name,
                    },
                    institute: {
                        _id: thisFillTask.institute._id,
                        name: thisFillTask.institute.name,
                        address: thisFillTask.institute.address,
                        city: thisFillTask.institute.city,
                        pincode: thisFillTask.institute.pincode
                    },
                    _created: thisFillTask._created,
                    _deadline: thisFillTask._deadline,
                    _finished: thisFillTask._finished,
                    active: thisFillTask.active,

                };
                counter = counter + 1;
                basicFillTasks.push(newTask);
                if(counter == nLength){
                    res.json(basicFillTasks);
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
        .find({user: userId})
        .deepPopulate('institute')
        .exec(function (err, views) {
        if (!err){
            var basicViews = [];
            var counter = 0;
            var nLength = views.length;
            views.forEach(function(thisView, index){
                var newView = {
                    user: userId,
                    institute: {
                        _id: thisView.institute._id,
                        name: thisView.institute.name,
                        logo: thisView.institute.logo,
                        address: thisView.institute.address,
                        city: thisView.institute.city,
                        pincode: thisView.institute.pincode
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
    var institute = viewForm.institute;
    var user = viewForm.user;
    var ip = viewForm.ip;
    var claim = viewForm.claim;
    
    console.log(JSON.stringify(ip));
    var newview = new view({
        institute: institute
    });
    if(user){
        newview.user = user;
    }
    if(ip){
        newview.ip = ip;
    }
    if(claim){
        newview.claim = claim;
    }
    newview.save(function(err, newview) {
        if (err) return console.error(err);
        res.json(newview._id);
    });
    
    
});

module.exports = router;