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

var educationProviderSchema = mongoose.Schema({
    type: {type: String, default:'Coaching'},
    name: {type: String,required: true},
    website: String,
    phone: String,
    address: String,
    area: String,
    students: String,
    faculty: String,
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
