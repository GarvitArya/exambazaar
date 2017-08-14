var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var mediaTagSchema = mongoose.Schema({
    media: {type: String,required: true},
    type: {type: String,required: true},
    subType: {type: String,required: true}
});
mediaTagSchema.plugin(deepPopulate);
module.exports = mongoose.model('mediaTag', mediaTagSchema);
