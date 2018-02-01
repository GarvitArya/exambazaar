var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var availDiscountSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user', required: true  },
    institute: { type: Schema.ObjectId, ref: 'coaching' },
    exam: { type: Schema.ObjectId, ref: 'exam', required: true},
    course: {
        groupname: { type: 'String' },
        name: { type: 'String' },
        city: { type: 'String' },
        duration: { type: 'String' },
    },
    _created: { type: Date, default: Date.now },
});
availDiscountSchema.plugin(deepPopulate);
module.exports = mongoose.model('availDiscount', availDiscountSchema);