var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var commentSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    blogpost: { type: Schema.ObjectId, required: true, ref: 'blogpost' },
    comment: { type: String, required: true },
    
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
});
commentSchema.plugin(deepPopulate);
module.exports = mongoose.model('comment', commentSchema);
