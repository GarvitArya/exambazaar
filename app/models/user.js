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
        category: {type: String},
        PwD: {type: Boolean},
        dob: { type: Date}
    },
    location: [{
        lat:{type: String},
        lng:{type: String},
        sublocality_level_2: {type: String},    
        sublocality: {type: String},    
        city: {type: String},    
        state: {type: String},    
        country: {type: String},
        _date: { type: Date, default: Date.now }
    }],
    interest:{
       category: [{type: String}],
       exam: [{type: String}],
    },
    mobile : { type: String, trim: true, index: true, unique: true, sparse: true}, //, required: true, unique:true
    facebookId : { type: String, trim: true, index: true, unique: true, sparse: true},
    facebook : {
        link: { type: String},
        accessToken: { type: String},
    },
    eligibility:{
        category: {
            general: { type: Boolean},
            sc: { type: Boolean},
            st: { type: Boolean},
            obc: { type: Boolean},
            pwd: { type: Boolean},
        },
        age: { type: String},
        educationLevel:{
            level: { type: String},
            name: { type: String}
        },
        class12Subjects:{
            biology: { type: Boolean},
            chemistry: { type: Boolean},
            biotechnology: { type: Boolean},
            physics: { type: Boolean},
            mathematics: { type: Boolean},
            english: { type: Boolean},
            others: { type: Boolean}
        },
        class12Percentage: { type: String},
        undergradMajor:{
            mbbs: { type: Boolean},
            bds: { type: Boolean},
            bsc: { type: Boolean},
            bftech: { type: Boolean},
            be: { type: Boolean},
            btech: { type: Boolean},
            bcom: { type: Boolean},
            ba: { type: Boolean},
            barch: { type: Boolean},
            llb: { type: Boolean},
            fiveyearintegratedllb: { type: Boolean},
            fiveyearballb: { type: Boolean},
            lawdegreeequivalenttollb: { type: Boolean},
            others: { type: Boolean},
        },
        undergradPercentage: { type: String},
        postgradMajor:{
            mcom: { type: Boolean},
            msc: { type: Boolean},
            ma: { type: Boolean},
            mca: { type: Boolean},
            mtech: { type: Boolean},
            mba: { type: Boolean},
            ms: { type: Boolean},
            llm: { type: Boolean},
            others: { type: Boolean},
        },
        postgradPercentage: { type: String},
    },
    
    partner: [{ type: Schema.ObjectId, ref: 'coaching' }],
    shortlisted: [{
        institute: { type: Schema.ObjectId, ref: 'coaching' },
        _date: { type: Date, default: Date.now }
    }],
    email : { type: String},
    image : { type: String},//, default:'https://exambazaar.com/images/user.png'
    fbemail : { type: String},
    fbimage : { type: String},
    verified : { type: Boolean, default: false},
    emailverified : { type: Boolean, default: false},
    active : { type: Boolean, default: true},
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
            
    }],
    latlng: {
        lat: {type: String},
        lng: {type: String}
    },
    blogger:{
        active: { type: Boolean, default: false },
        gallery: [{
            image: String,
            _created: { type: Date, default: Date.now },
        }],
        profileCredential: String,
        facebookProfile: String,
    },
    referralcode: {type: String},
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
