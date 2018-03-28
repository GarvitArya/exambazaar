var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var admissionInterestSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    coachingExam: { type: String },
    year: { type: String },
    _created: { type: Date, default: Date.now },
});


admissionInterestSchema.plugin(deepPopulate);
var admissionInterest = mongoose.model('admissionInterest', admissionInterestSchema);


module.exports = admissionInterest;
