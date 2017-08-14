var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var userreferSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user' },
    mobile: String,
    _created: { type: Date, default: Date.now },
});
userreferSchema.plugin(deepPopulate);
module.exports = mongoose.model('userrefer', userreferSchema);
