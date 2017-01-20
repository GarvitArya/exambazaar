// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

// define the schema for our user model
var userSchema = mongoose.Schema({
    userType : String,
    firstName : String,
    mobile : { type: String},
    verified : { type: String, default: "False"},
    password : String,
    _student: [{ type: Schema.ObjectId, ref: 'student' }],
    _teacher: [{ type: Schema.ObjectId, ref: 'teacher' }],
    _admin: [{ type: Schema.ObjectId, ref: 'admin' }],
    _master: { type: Schema.ObjectId, ref: 'master' },
    _institute: { type: Schema.ObjectId, ref: 'institute' },
    logins:[{type: Date, default: Date.now}],
    _created: { type: Date, default: Date.now },
    _merged: { type: Boolean, default: false}
});
userSchema.plugin(passportLocalMongoose);

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    console.log("Password is: " + password + " " + this.password);
    console.log(bcrypt.compareSync(password, this.password));
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
