const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userName:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    heading : {type : String , default: ''},
    description : {type : String , default: ''},
    color : {type : String, default : '#ffffff'},
    createdDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserRule', schema);