const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    isAllowToClose: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('EventType', schema);