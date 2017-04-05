// load the things we need
var mongoose = require('mongoose');
var Moment = require('moment');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

// define the schema for our user model
var userSchema = mongoose.Schema({
    userType : String, //student or master
    password : String,
    basic: {
        name: {type: String},
        gender: {type: String},
        dob: { type: Date}
    },
    location: [{
        lat:{type: String},
        long:{type: String}
    }],
    interest:{
       category: [{type: String}],
       exam: [{type: String}],
    },
    mobile : { type: String, required: true, unique:true },
    image : { type: String},
    partner: [{ type: Schema.ObjectId, ref: 'targetStudyProvider' }],
    shortlisted: [{
        institute: { type: Schema.ObjectId, ref: 'targetStudyProvider' },
        _date: { type: Date, default: Date.now }
    }],
    email : { type: String},
    verified : { type: Boolean, default: false},
    _created: { type: Date, default: Date.now },
    logins:[{
        loginTime: Date,
        ip: {
            city: {type: String},
            country: {type: String},
            lat: {type: String},
            long: {type: String},
            zip: {type: String},
            org: {type: String},
            as: {type: String},
            isp: {type: String},
            query: {type: String},
        },
            
    }] //,required: true
});
userSchema.plugin(passportLocalMongoose);

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    console.log("Password is: " + password + " " + this.password);
    console.log(bcrypt.compareSync(password, this.password));
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
