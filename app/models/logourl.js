var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


var logourlSchema = mongoose.Schema({
    filename: { type: String},
    newurl: { type: String},
    oldurl: { type: String}
});
logourlSchema.plugin(deepPopulate);
module.exports = mongoose.model('logourl', logourlSchema);
