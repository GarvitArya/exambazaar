// load the things we need
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var masterSchema = mongoose.Schema({
    basic: {
        firstName: {type: String,required: true},
        lastName: {type: String,required: true},
        middleName: {type: String},
        gender: {type: String,required: true},
        dob: { type: Date, required: true}
    },
    contact: {
        mobile: {type: String,required: true},
        email: {type: String}
    },
    account: {
        imageUrl: {type: String},
        lastLogin: { type: Date, default: Date.now }
    },
    logins:[{type: 'Moment',required: true}],
    _created: { type: Date, default: Date.now }
    //to add education
});
masterSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('master', masterSchema);
