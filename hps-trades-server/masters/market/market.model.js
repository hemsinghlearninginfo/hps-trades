const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, default : null },
    description: { type: String, required: true },
    isActive : {type: Boolean, default : true},
    isDelete : {type: Boolean, default : false},
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Market', schema);