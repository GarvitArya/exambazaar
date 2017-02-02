var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var transportVehicle = require('../app/models/transportVehicle');
var address = require('../app/models/address');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.post('/save', function(req, res) {
    var thisTransportVehicle = req.body;
    var thisInstitute = req.body.institute.data;
    
    
    thisInstitute = institute.findOne({ '_id': thisInstitute._id },function (err, thisInstitute) {
        if (err) return handleError(err);
        var DriverAddress = new address({
            street:thisTransportVehicle.driver.address.street,
            city:thisTransportVehicle.driver.address.city,
            pincode:thisTransportVehicle.driver.address.pincode,
            tel:thisTransportVehicle.driver.address.tel
        });
        var OwnerAddress = new address({
            street:thisTransportVehicle.owner.address.street,
            city:thisTransportVehicle.owner.address.city,
            pincode:thisTransportVehicle.owner.address.pincode,
            tel:thisTransportVehicle.owner.address.tel
        });
        var this_transportVehicle = new transportVehicle({
            _institute: thisInstitute,
            type: thisTransportVehicle.type,
            registration: thisTransportVehicle.registration,
            driver: {
                name: thisTransportVehicle.driver.name, 
                mobile: thisTransportVehicle.driver.mobile,
                imageUrl: thisTransportVehicle.driver.imageUrl,
                address : DriverAddress
            },
            owner: {
                name: thisTransportVehicle.owner.name, 
                mobile: thisTransportVehicle.owner.mobile,
                imageUrl: thisTransportVehicle.owner.imageUrl,
                address : OwnerAddress
            }
        });
        this_transportVehicle.save(function(err, this_transportVehicle) {
            if (err) return console.error(err);
            console.log("Saved Transport Vehicle with id: " + this_transportVehicle._id);
            
            
            //save teacher in the institute data
            thisInstitute.transportVehicles.push(this_transportVehicle);
            thisInstitute.save(function(err, thisInstitute) {
                if (err) return console.error(err);
            });
            //save reference to institute
            res.json(this_transportVehicle._id);
        });
    });
});




//to get all teachers
router.get('/', function(req, res) {
    transportVehicle.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular teacher with _id teacherId
router.get('/edit/:transportVehicleId', function(req, res) {
    var transportVehicleId = req.params.transportVehicleId;
    console.log(transportVehicleId);
    transportVehicle
        .findOne({ '_id': transportVehicleId })
        .deepPopulate('_institute')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The teacher name is: ' + JSON.stringify(teacher.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
module.exports = router;