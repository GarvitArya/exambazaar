var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var personSchema = mongoose.Schema({
    name: {type: String,required: true},
    designation: {type: String},
    mobile: {type: String,required: true},
    phone: {type: String},
    email: {type: String}
});

var centreSchema = mongoose.Schema({
    
});

var educationProviderSchema = mongoose.Schema({
    type: {type: String, default:'Coaching'},
    name: {type: String,required: true},
    logo: String,
    
    //basic info
    address: {type: String,required: true},
    area: String,
    city: String,
    state: String,
    pincode: String,
    
    //contact info
    mobile: [String],
    phone: [String],
    website: String,
    linkWebsite: String,
    
    //internal ranking
    rank: {type: Number,default: 0},
    //facilities
    students: String,
    outStationStudents: String,
    faculty: String,
    otherStaff: String,
    
    coursesOffered: [String],
    facilities_available: [String],
    facilities_unavailable: [String],
    persons: [personSchema],
    active: {type: Boolean, default:false},
    _created: { type: Date, default: Date.now }
});


educationProviderSchema.plugin(deepPopulate);
var educationProvider = mongoose.model('educationProvider', educationProviderSchema);

module.exports = educationProvider;
