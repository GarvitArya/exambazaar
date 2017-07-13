var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var blogpostSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    relativeurl: String,
    title: String,
    subtitle:String,
    content: String,
    tags:[String],
    keywords:[String],
    
    exams: [{ type: Schema.ObjectId, ref: 'exam' }],
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
});
blogpostSchema.plugin(deepPopulate);
module.exports = mongoose.model('blogpost', blogpostSchema);
