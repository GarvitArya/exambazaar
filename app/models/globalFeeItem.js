// load the things we need
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var globalFeeItemSchema = mongoose.Schema({
    name: {type: String,required: true},
    type: {type: String}
});

globalFeeItemSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('globalFeeItem', globalFeeItemSchema);
