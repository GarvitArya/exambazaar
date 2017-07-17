var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var blogTagSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    tag: { type: String, unique: true, required: true },
    
    active: { type: Boolean, default: false },
    _created: { type: Date, default: Date.now },
});
blogTagSchema.plugin(deepPopulate);
module.exports = mongoose.model('blogTag', blogTagSchema);
