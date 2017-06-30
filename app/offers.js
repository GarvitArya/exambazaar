var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var offer = require('../app/models/offer');
var coupon = require('../app/models/coupon');

var user = require('../app/models/user');
var email = require('../app/models/email');


var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular offer with _id offerId
router.get('/edit/:offerId', function(req, res) {
    var offerId = req.params.offerId;
    //console.log(offerId);
    offer
        .findOne({ '_id': offerId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/remove/:offerId', function(req, res) {
    var offerId = req.params.offerId;
    console.log(offerId);
    offer.remove({_id: new mongodb.ObjectID(offerId)}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(offerId + ' removed!');
            res.json("Done");
        }                              
    });
});

router.get('/offersCount', function(req, res) {
    offer.count({active: true}, function(err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/', function(req, res) {
    var offers = offer
        .find({})
        .deepPopulate('provider')
        .exec(function (err, offers) {
        if (!err){
            res.json(offers);
        } else {throw err;}
    });
});

router.get('/activeOffers', function(req, res) {
    var activeOffers = offer
        .find({active: true})
        .deepPopulate('provider')
        .exec(function (err, activeOffers) {
        if (!err){
            var providerOffers = [];
            var providerIds = [];
            var nLength = activeOffers.length;
            if(nLength == 0){
                res.json([]);
            }
            
            var counter = 0;
            activeOffers.forEach(function(thisOffer, index){
                var thisProvider = thisOffer.provider;
                thisOffer.provider = {
                    _id: thisProvider._id,    
                    name: thisProvider.name,    
                    logo: thisProvider.logo,    
                };
                var providerIds =  providerOffers.map(function(a) {return a._id;});
                
                var pIndex = providerIds.indexOf(thisProvider._id);
                if(pIndex == -1){
                    var newProviderOffer = {
                        _id: thisProvider._id,
                        image: thisProvider.logo,
                        displayname: thisProvider.name,
                        offers: [thisOffer],
                    };
                    providerOffers.push(newProviderOffer);
                }else{
                    var thisProviderOffer = providerOffers[pIndex];
                    thisProviderOffer.offers.push(thisOffer);
                }
                counter += 1;
                if(counter == nLength){
                    res.json(providerOffers);
                }
            });
            
        } else {throw err;}
    });
});

router.get('/activeOffersBasic', function(req, res) {
    var activeOffers = offer
        .find({active: true})
        .deepPopulate('provider')
        .exec(function (err, activeOffers) {
        if (!err){
            var providerOffers = [];
            var providerIds = [];
            var nLength = activeOffers.length;
            if(nLength == 0){
                res.json([]);
            }
            var counter = 0;
            activeOffers.forEach(function(thisOffer, index){
                var thisProvider = thisOffer.provider;
                thisOffer.provider = {
                    _id: thisProvider._id,    
                    name: thisProvider.name,    
                    logo: thisProvider.logo,    
                };
                var providerIds =  providerOffers.map(function(a) {return a._id;});
                
                var pIndex = providerIds.indexOf(thisProvider._id);
                if(pIndex == -1){
                    var newProviderOffer = {
                        _id: thisProvider._id,
                        image: thisProvider.logo,
                        displayname: thisProvider.name,
                        //offers: [thisOffer],
                    };
                    providerOffers.push(newProviderOffer);
                }else{
                    //var thisProviderOffer = providerOffers[pIndex];
                    //thisProviderOffer.offers.push(thisOffer);
                }
                counter += 1;
                if(counter == nLength){
                    res.json(providerOffers);
                }
            });
            
        } else {throw err;}
    });
});

router.get('/activeOffersMedium', function(req, res) {
    var activeOffers = offer
        .find({active: true})
        .deepPopulate('provider')
        .exec(function (err, activeOffers) {
        if (!err){
            
            
            /*var uniqueCouponNames = coupon.distinct( "name",function(err, uniqueCouponNames) {
            if (!err){
            console.log(uniqueCouponNames);    
            var nCouponNames = uniqueCouponNames.length;
            var couponcounter = 0;
            uniqueCouponNames.forEach(function(thisCouponName, cindex){
                console.log(thisCouponName + " " + thisOffer._id);
                var uniqueCoupon = coupon.findOne({user: { $exists: false }, offer: thisOffer._id, name: thisCouponName})
                //.deepPopulate('provider')
                .exec(function (err, uniqueCoupon) {
                    if (!err){
                        couponcounter += 1;
                        if(uniqueCoupon)
                        console.log(uniqueCoupon);


                        couponcounter += 1;
                    }
                });

            });
            
            } else {throw err;}
            });*/    
            
            var nOffer = activeOffers.length;
            
            
            var providerOffers = [];
            var providerIds = [];
            var nLength = activeOffers.length;
            if(nLength == 0){
                res.json([]);
            }
            var offercounter = 0;
            
            activeOffers.forEach(function(thisOffer, index){
                
                var thisProvider = thisOffer.provider;
                thisOffer.provider = {
                    _id: thisProvider._id,    
                    name: thisProvider.name,    
                    logo: thisProvider.logo,    
                };
                var providerIds =  providerOffers.map(function(a) {return a._id;});
                
                var pIndex = providerIds.indexOf(thisProvider._id);
                if(pIndex == -1){
                    var newProviderOffer = {
                        _id: thisProvider._id,
                        image: thisProvider.logo,
                        displayname: thisProvider.name,
                        offers: [thisOffer],
                    };
                    providerOffers.push(newProviderOffer);
                }else{
                    var thisProviderOffer = providerOffers[pIndex];
                    thisProviderOffer.offers.push(thisOffer);
                }
                offercounter += 1;
                if(offercounter == nLength){
                    res.json(providerOffers);
                }
                
                
                
                
            });
            
            
            
            
            
            
            
        } else {throw err;}
    });
});
router.get('/providerOffers/:providerId', function(req, res) {
    var providerId = req.params.providerId;
    console.log("Provider is: " + providerId);
    var offers = offer
        .find({provider: providerId})
        .deepPopulate('coupons')
        .exec(function (err, offers) {
        if (!err){
            res.json(offers);
        } else {throw err;}
    });
});

router.get('/activate/:offerId', function(req, res) {
    var offerId = req.params.offerId;
    var thisOffer = offer
        .findOne({_id: offerId}, {active: 1})
        .exec(function (err, thisOffer) {
        if (!err){
            
            thisOffer.active = true;
            
            thisOffer.save(function(err, thisOffer) {
                if (err) return console.error(err);
                console.log(thisOffer);
                res.json(thisOffer._id);
            });
        } else {throw err;}
    });
});

router.post('/nameExists', function(req, res) {
    var nameForm = req.body;
    var name = nameForm.name;
    //console.log("Name is: " + name);
    var offers = offer
        .find({name: name})
        .exec(function (err, offers) {
        if (!err){
            //console.log(name + offers.length);
            if(offers && offers.length > 0){
                res.json(true);
            }else{
                res.json(false);    
            }
        } else {throw err;}
    });
});

router.post('/save', function(req, res) {
    var offerForm = req.body;
    var couponBuilder = offerForm.couponBuilder;
    
    
    
    var newoffer = new offer({
    });
    for (var property in offerForm) {
        if(property != 'couponBuilder'){
            newoffer[property] = offerForm[property];
        }
        
    }
    
    newoffer.save(function(err, newoffer) {
        if (err) return console.error(err);
        var nLength = couponBuilder.length;
        var counter = 0;
        var couponIds = [];
        couponBuilder.forEach(function(thisCouponBuilder, index){
            var couponCodes = thisCouponBuilder.couponCodes;
            var nCouponLength = couponCodes.length;
            var couponcounter = 0;
            couponCodes.forEach(function(thisCode, cindex){
                var newcoupon = new coupon({
                    provider: newoffer.provider,
                    offer: newoffer._id,
                    code: thisCode.code,
                    socialShareCode: thisCode.socialShareCode,
                });
                for (var property in thisCouponBuilder) {
                    if(property != 'couponCodes'){
                        newcoupon[property] = thisCouponBuilder[property];
                    }
                }
                console.log(JSON.stringify(newcoupon));
                newcoupon.save(function(err, newcoupon) {
                    couponcounter += 1;
                    if(couponIds.indexOf(newcoupon._id) == -1){
                        couponIds.push(newcoupon._id);
                    }
                    /*if(newoffer.coupons.indexOf(newcoupon._id) == -1){
                        newoffer.coupons.push(newcoupon);
                        newoffer.save(function(err, newoffer) {
                            console.log(newcoupon._id + " added to coupons of " +  newoffer._id);
                            
                        });
                        
                    }*/
                    console.log(couponcounter + " " + nCouponLength);
                    if(couponcounter == nCouponLength){
                    counter += 1;
                    console.log(counter + " " + nLength);
                        if(counter == nLength){
                            console.log(couponIds);
                            newoffer.coupons = couponIds;
                            newoffer.save(function(err, newoffer) {
                                if (err) return console.error(err);
                                console.log(newoffer);
                                res.json(newoffer._id);
                            });
                        }
                    }
                    
                });
                
                
            });
            
        });
        
        
        
    });
    
    
    
});


module.exports = router;