var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var admin = require('../app/models/admin');
var address = require('../app/models/address');
var user = require('../app/models/user');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');
//to add a admin
router.post('/save', function(req, res) {
    var thisAdmin = req.body;
    var thisInstitute = thisAdmin.institute;
    
    thisInstitute = institute.findOne({ '_id': thisInstitute },function (err, thisInstitute) {
        if (err) return handleError(err);
        var thisAddress = new address({
            street:thisAdmin.address.street,
            city:thisAdmin.address.city,
            pincode:thisAdmin.address.pincode,
            tel:thisAdmin.address.tel
        });
        
        var this_admin = new admin({
            _institute: thisInstitute,
            basic: {
                salutation: thisAdmin.basic.salutation,
                firstName: thisAdmin.basic.firstName,
                lastName: thisAdmin.basic.lastName,
                middleName: thisAdmin.basic.middleName,
                gender: thisAdmin.basic.gender,
                dob: thisAdmin.basic.dob,
            },
            account: {
                imageUrl:thisAdmin.account.imageUrl
            },
            contact: {
            mobile: thisAdmin.contact.mobile,
            email: thisAdmin.contact.email
            },
            address: thisAddress
        });
        this_admin.save(function(err, this_admin) {
            if (err) return console.error(err);
            console.log("Saved admin with id: " + this_admin._id);
            var hash = bcrypt.hashSync(thisAdmin.basic.lastName, bcrypt.genSaltSync(10));
            var this_user = new user({
                userType : 'Admin',
                firstName : thisAdmin.basic.firstName,
                //userName : thisAdmin.contact.mobile+"_"+thisAdmin.basic.firstName,
                mobile : thisAdmin.contact.mobile,
                password : hash,
                _admin : this_admin._id,
                _institute: thisInstitute
            });
            this_user.save(function(err, this_user) {
                if (err) return console.error(err);
                console.log("User admin with id: " + this_user._id);
            });
            //save admin in the institute data
            thisInstitute.admins.push(this_admin);
            thisInstitute.save(function(err, thisInstitute) {
                if (err) return console.error(err);
            });
            //save reference to institute
            res.json(this_admin._id);
        });
    });
});




//to get all admins
router.get('/', function(req, res) {
    admin.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular admin with _id adminId
router.get('/edit/:adminId', function(req, res) {
    var adminId = req.params.adminId;
    console.log("Admin id is: " + adminId);
    admin
        .findOne({ '_id': adminId })
        .deepPopulate('batches _institute subjects subjects._batch subjects._batch.students')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The admin name is: ' + JSON.stringify(admin.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});


router.get('/count', function(req, res) {
    admin.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

module.exports = router;