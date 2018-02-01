var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var reviewSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'coaching', required: true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    faculty: String,
    competitive_environment: String,
    quality_of_material: String,
    infrastructure: String,
    text: String,
    year_of_start: String,
    exam: { type: Schema.ObjectId, ref: 'exam' },
    stream: { type: Schema.ObjectId, ref: 'stream' },
    coupon: { type: Schema.ObjectId, ref: 'coupon' },
    tags: [String],
    
    checked: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
});
reviewSchema.plugin(deepPopulate);
module.exports = mongoose.model('review', reviewSchema);
