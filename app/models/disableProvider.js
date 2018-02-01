var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var disableProviderSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'coaching', required: true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    _date: { type: Date, default: Date.now }
});
disableProviderSchema.plugin(deepPopulate);
module.exports = mongoose.model('disableProvider', disableProviderSchema);
