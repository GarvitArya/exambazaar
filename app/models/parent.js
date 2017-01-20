// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parentSchema = mongoose.Schema({
    _student: { type: Schema.ObjectId, required: true,ref: 'student' },
    basic: {
        salutation: {type: String},
        firstName: {type: String,required: true},
        lastName: {type: String},
        middleName: {type: String},
        gender: {type: String},
        dob: { type: Date},
        role: {type: String}
    },
    contact: {
        mobile: {type: String},
        email: {type: String}
    },
    other:{
        heq: {type: String}, 
        profession: {type: String},
        salary: {type: String}
    },
    _created: { type: Date, default: Date.now }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('parent', parentSchema);
