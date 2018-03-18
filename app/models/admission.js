var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var admissionSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    coaching: { type: Schema.ObjectId, required: true, ref: 'coaching' },
    details: Schema.Types.Mixed,
    payment: {
        payment_request_id: {type: String},
        payment_id: {type: String},
        details: {type: String},
    },
    _created: { type: Date, default: Date.now },
});


admissionSchema.plugin(deepPopulate);
var admission = mongoose.model('admission', admissionSchema);


module.exports = admission;
