var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var streamSchema = mongoose.Schema({
    name: {type: String,required: true,unique:true},
    displayname: {type: String},
    active:{type: Boolean, default: true},
    rank: {type: Number}
    
});
streamSchema.plugin(deepPopulate);
module.exports = mongoose.model('stream', streamSchema);
