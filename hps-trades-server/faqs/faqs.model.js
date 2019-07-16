const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    question : {type : String , default: ''},
    answer : {type : String , default: ''},
    createdDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FAQs', schema);