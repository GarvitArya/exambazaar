var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var toverifyciSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'targetStudyProvider', required: true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
    _deadline: { type: Date},
    _finished: { type: Date}
});
toverifyciSchema.plugin(deepPopulate);
module.exports = mongoose.model('toverifyci', toverifyciSchema);
