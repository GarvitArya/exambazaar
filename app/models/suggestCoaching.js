var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var suggestCoachingSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    coachingName:{ type: String, required: true },
    website:{ type: String, required: true },
    nCenters:{ type: Number },
    newCoachingGroup:{ type: Boolean, default: true },
    actioned: { type: Boolean, default: false },
    _created: { type: Date, default: Date.now }
});
suggestCoachingSchema.plugin(deepPopulate);
module.exports = mongoose.model('suggestCoaching', suggestCoachingSchema);
