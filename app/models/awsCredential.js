var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var awsCredentialSchema = mongoose.Schema({
    accessKey: {type: String,required: true},
    secretKey: {type: String,required: true},
    bucket: {type: String,required: true},
    region: {type: String,required: true},
    active: {type: Boolean,default: true},
    _created: { type: Date, default: Date.now }
    
});
awsCredentialSchema.plugin(deepPopulate);
module.exports = mongoose.model('awsCredential', awsCredentialSchema);
