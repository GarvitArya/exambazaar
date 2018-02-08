var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var citySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    metro: { type: Boolean, default: false},
    loc: {
        type: { type: String },
        coordinates: []
    },
    state: { type: String },
    count: { type: Number },
    logo: { type: String },
    active : { type: Boolean, default: true},
    _created: { type: Date, default: Date.now },
});
citySchema.index({ loc: '2dsphere'});
citySchema.plugin(deepPopulate);
module.exports = mongoose.model('city', citySchema);
