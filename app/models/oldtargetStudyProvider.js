var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var oldtargetStudyProviderSchema = mongoose.Schema({
    website: String
});


oldtargetStudyProviderSchema.plugin(deepPopulate);
var oldtargetStudyProvider = mongoose.model('oldtargetStudyProvider', oldtargetStudyProviderSchema);

module.exports = oldtargetStudyProvider;
