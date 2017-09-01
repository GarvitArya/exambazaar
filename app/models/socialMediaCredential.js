var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var socialMediaCredentialSchema = mongoose.Schema({
    provider: {type: String,required: true},
    facebook:{
        pageId: {type: String},
    },
    exam: { type: Schema.ObjectId, ref: 'exam' },
    active:{type: Boolean, default: true},
    _created: { type: Date, default: Date.now }
    
});
socialMediaCredentialSchema.plugin(deepPopulate);
module.exports = mongoose.model('socialMediaCredential', socialMediaCredentialSchema);
