const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    template : {type : String},
    from: { type: String, required: true },
    to: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    token: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Email', schema);