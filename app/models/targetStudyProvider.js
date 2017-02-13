var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var targetStudyProviderSchema = mongoose.Schema({
    type: {type: String, default:'Coaching'},
    name: {type: String,required: true},
    targetStudyWebsite: String,
    website: String,
    email: String,
    address: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    logo: String,
    oldlogo: String,
    mobile: [String],
    phone: [String],
    coursesOffered: [String],
    rank: {type: Number,default: 0},
    _created: { type: Date, default: Date.now }
});


targetStudyProviderSchema.plugin(deepPopulate);
var targetStudyProvider = mongoose.model('targetStudyProvider', targetStudyProviderSchema);

module.exports = targetStudyProvider;
