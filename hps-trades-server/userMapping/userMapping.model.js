const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    masterUserId:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    childUserId:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
});

const autoPopulateChilds = function (next) {
    this.populate('masterUserId');
    this.populate('childUserId');
    next();
};

schema.
    pre('findOne', autoPopulateChilds).
    pre('find', autoPopulateChilds);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserMapping', schema);