var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var socialMediaPostSchema = mongoose.Schema({
    socialMediaCredential: { type: Schema.ObjectId, ref: 'socialMediaCredential' },
    facebook:{
        postid: {type: String, unique: true},
    },
    question: { type: Schema.ObjectId, ref: 'question' },
    active:{type: Boolean, default: true},
    deleted:{type: Boolean, default: false},
    _created: { type: Date, default: Date.now },
    _scheduled: { type: Date }
    
});
socialMediaPostSchema.plugin(deepPopulate);
module.exports = mongoose.model('socialMediaPost', socialMediaPostSchema);
