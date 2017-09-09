var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var socialMediaPostSchema = mongoose.Schema({
    socialMediaCredential: { type: Schema.ObjectId, ref: 'socialMediaCredential' },
    facebook:{
        postid: {type: String, unique: true},
    },
    exams: [{ type: Schema.ObjectId, ref: 'exam' }],
    active:{type: Boolean, default: true},
    deleted:{type: Boolean, default: false},
    _created: { type: Date, default: Date.now }
    
});
socialMediaPostSchema.plugin(deepPopulate);
module.exports = mongoose.model('socialMediaPost', socialMediaPostSchema);
