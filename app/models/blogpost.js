var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var reviewSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    title: String,
    subtitle:String,
    tags:[String],
    keywords:[String],
    content: String,
    
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
});
reviewSchema.plugin(deepPopulate);
module.exports = mongoose.model('review', reviewSchema);
