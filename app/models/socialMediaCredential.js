var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var socialMediaCredentialSchema = mongoose.Schema({
    platform: {type: String,required: true},
    facebook:{
        id: {type: String, unique: true},
        link: {type: String},
        category: {type: String},
        name: {type: String},
        access_token: {type: String},
        data: [Schema.Types.Mixed],
    },
    exams: [{ type: Schema.ObjectId, ref: 'exam' }],
    active:{type: Boolean, default: true},
    _created: { type: Date, default: Date.now }
    
});
socialMediaCredentialSchema.plugin(deepPopulate);
module.exports = mongoose.model('socialMediaCredential', socialMediaCredentialSchema);
