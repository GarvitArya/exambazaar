var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


var imageSchema = mongoose.Schema({
    img: { data: Buffer, contentType: String }
});
imageSchema.plugin(deepPopulate);
module.exports = mongoose.model('image', imageSchema);
