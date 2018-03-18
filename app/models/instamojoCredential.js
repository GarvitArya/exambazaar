var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var instamojoCredentialSchema = mongoose.Schema({
    xapikey: {type: String}, 
    xauthtoken: {type: String},
    active:{type: Boolean, default: true},
    _created: { type: Date, default: Date.now }
    
});
instamojoCredentialSchema.plugin(deepPopulate);
module.exports = mongoose.model('instamojoCredential', instamojoCredentialSchema);
