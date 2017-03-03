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
    location: { type: Schema.ObjectId, ref: 'location' },
    city: String,
    state: String,
    pincode: String,
    logo: String,
    oldlogo: String,
    mobile: [String],
    phone: [String],
    faculty:[{
        name: String,
        image: {type: String,unique: true},
        subject: String,
        yearsExperience: String,
        qualification: String,
        description: String,
        tags: [{ type: Schema.ObjectId, ref: 'mediaTag' }],
        _added: { type: Date, default: Date.now }
    }],
    coursesOffered: [String],
    exams: [{ type: Schema.ObjectId, ref: 'exam' }],
    rank: {type: Number,default: 0},
    _created: { type: Date, default: Date.now }
});


targetStudyProviderSchema.plugin(deepPopulate);
var targetStudyProvider = mongoose.model('targetStudyProvider', targetStudyProviderSchema);

module.exports = targetStudyProvider;
