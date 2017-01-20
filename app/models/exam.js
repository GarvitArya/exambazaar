var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var examSchema = mongoose.Schema({
    _subject: { type: Schema.ObjectId, required: true,ref: 'subject' },
    info: {
        name: {type: String,required: true},    
        type: {type: String,required: true},  
        date: {type: Date,required: true},  
        maxMarks: {type: Number},  
        weightage: {type: Number,required: true}  
    },
    _evals: [{ type: Schema.ObjectId, ref: 'eval' }]
});
examSchema.plugin(deepPopulate);
module.exports = mongoose.model('exam', examSchema);
