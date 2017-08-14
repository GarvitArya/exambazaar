var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var sendGridCredentialSchema = mongoose.Schema({
    apiKey: {type: String,required: true},
    emailTemplate: [{
        name: {type: String},
        templateKey: {type: String}
    }],
    active:{type: Boolean, default: true},
    _created: { type: Date, default: Date.now }
    
});
sendGridCredentialSchema.plugin(deepPopulate);
module.exports = mongoose.model('sendGridCredential', sendGridCredentialSchema);
