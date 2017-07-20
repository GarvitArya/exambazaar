var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var upvoteSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    blogpost: { type: Schema.ObjectId, ref: 'blogpost' },
    _created: { type: Date, default: Date.now },
});
upvoteSchema.plugin(deepPopulate);
module.exports = mongoose.model('upvote', upvoteSchema);
