var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var locationSchema = mongoose.Schema({
    area: {type: String,required: true},
    city: {type: String,required: true}
});
locationSchema.plugin(deepPopulate);
module.exports = mongoose.model('location', locationSchema);
