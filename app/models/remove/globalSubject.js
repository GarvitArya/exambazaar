var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var globalSubjectSchema = mongoose.Schema({
    instituteType: { type: String},
    affiliation: { type: String},
    name: { type: String, required: true },
    code: { type: String}
});

// create the model for users and expose it to our app

module.exports = mongoose.model('globalSubject', globalSubjectSchema);
