var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


var groupSchema = mongoose.Schema({
    group: { type: String, required: true, unique: true}
});
groupSchema.plugin(deepPopulate);
module.exports = mongoose.model('group', groupSchema);
