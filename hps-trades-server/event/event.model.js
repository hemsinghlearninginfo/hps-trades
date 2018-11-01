const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    heading: { type: String, required: true },
    message: { type: String, required: true },
    fromDate: { type: Date, default: Date.now },
    toDate: { type: Date, default: Date.now },
    eventType:
    {
        type: Schema.Types.ObjectId,
        ref: 'EventType'
    },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);