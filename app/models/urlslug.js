var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var urlslugSchema = mongoose.Schema({
    slug: {type: String, required: true, unique:true},
    title: {type: String },
    coaching: { type: Schema.ObjectId, ref: 'coaching' },
    stream: { type: Schema.ObjectId, ref: 'stream' },
    exam: { type: Schema.ObjectId, ref: 'exam' },
    city: { type: Schema.ObjectId, ref: 'city' },
});
urlslugSchema.plugin(deepPopulate);
module.exports = mongoose.model('urlslug', urlslugSchema);
