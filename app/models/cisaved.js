var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var cisavedSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'targetStudyProvider', required: true, unique:true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    _date: { type: Date, default: Date.now }
});
cisavedSchema.plugin(deepPopulate);
module.exports = mongoose.model('cisaved', cisavedSchema);
