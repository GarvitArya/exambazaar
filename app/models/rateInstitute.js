var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var rateInstituteSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'targetStudyProvider', required: true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
    _deadline: { type: Date},
    _finished: { type: Date}
});
rateInstituteSchema.plugin(deepPopulate);
module.exports = mongoose.model('rateInstitute', rateInstituteSchema);
