var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var cirffactorSchema = mongoose.Schema({
    name: { type: String },
    weight: { type: String }, //out of 100
    exam: [{ type: Schema.ObjectId, ref: 'exam' }],
    subfactors: [Schema.Types.Mixed],
    _created: { type: Date, default: Date.now },
});
cirffactorSchema.plugin(deepPopulate);
module.exports = mongoose.model('cirffactor', cirffactorSchema);
