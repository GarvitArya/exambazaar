var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var providerSchema = mongoose.Schema({
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
    _created: { type: Date, default: Date.now }
});


providerSchema.plugin(deepPopulate);
var provider = mongoose.model('provider', providerSchema);

module.exports = provider;
