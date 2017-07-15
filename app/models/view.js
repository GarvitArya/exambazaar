var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var viewSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'targetStudyProvider' },
    state: { type: String },
    url: { type: String },
    user: { type: Schema.ObjectId, ref: 'User' },
    _date: { type: Date, default: Date.now },
    ip: {
        city: {type: String},
        country: {type: String},
        region: {type: String},
        lat: {type: String},
        long: {type: String},
        zip: {type: String},
        org: {type: String},
        as: {type: String},
        isp: {type: String},
        query: {type: String},
    },
    claim: { type: Boolean, default: false },
});
viewSchema.plugin(deepPopulate);
module.exports = mongoose.model('view', viewSchema);