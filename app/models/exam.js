var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var examSchema = mongoose.Schema({
    name: {type: String,required: true,unique:true},
    displayname: {type: String},
    briefDescription: {type: String},
    active: {type: Boolean, default:'false'},
    rank: {type: Number},
    stream: { type: Schema.ObjectId, ref: 'stream' },
    what: {type: String},
    brochure: {type: String},
    website: {type: String},
    appear: {type: String},
    registration: {type: String},
    dates: {type: String},
    syllabus: {type: String},
    pattern: {type: String},
    preparation: {type: String},
    studysource: {type: String},
    previouspapers: {type: String},
    qualify: {type: String},
    colleges: {type: String},
    doubts: {type: String}
    
});
examSchema.plugin(deepPopulate);
module.exports = mongoose.model('exam', examSchema);
