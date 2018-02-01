var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var addContactInfoSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'coaching', required: true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
    _deadline: { type: Date},
    _finished: { type: Date}
});
addContactInfoSchema.plugin(deepPopulate);
module.exports = mongoose.model('addContactInfo', addContactInfoSchema);
