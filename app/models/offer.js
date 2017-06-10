var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var offerSchema = mongoose.Schema({
    provider: { 
        name: String,
        website: String,
        logo: String,
    },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    faculty: String,
    competitive_environment: String,
    quality_of_material: String,
    infrastructure: String,
    text: String,
    year_of_start: String,
    checked: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
});
offerSchema.plugin(deepPopulate);
module.exports = mongoose.model('offer', offerSchema);
