var mongoose = require('mongoose');
var addressSchema = mongoose.Schema({
    street: {type: String,required: true},
    city: {type: String,required: true},
    pincode: {type: String,required: true},
    tel: {type: String,required: false}
});
var address = mongoose.model('address', addressSchema);
module.exports = address;
