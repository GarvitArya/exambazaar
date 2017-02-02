// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var addressSchema = mongoose.Schema({
    street: {type: String,required: true},
    city: {type: String,required: true},
    pincode: {type: String,required: true},
    tel: {type: String,required: false}
});
// define the schema for our user model
var transportVehicleSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    type : { type: String},
    registration : { type: String},
    driver: {
        name: { type: String,required: true},   
        mobile: {type: String,required: true},
        imageUrl: {type: String},
        address : addressSchema
    },
    owner: {
        name: { type: String,required: true},   
        mobile: {type: String,required: true},
        imageUrl: {type: String},
        address : addressSchema
    },
    _created: { type: Date, default: Date.now }
});
transportVehicleSchema.plugin(deepPopulate);
module.exports = mongoose.model('transportVehicle', transportVehicleSchema);
