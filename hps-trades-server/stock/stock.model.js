const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    market:
    {
        type: Schema.Types.ObjectId,
        ref: 'Market'
    },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    expiryDate: { type: Date, default: null },
    quantity: { type: Number, default: 1 },
    unit: { type: String, default: '' },

    isIndex: { type: Boolean, default: false },
    isFuture: { type: Boolean, default: false },
    isDerivates: { type: Boolean, default: false },
    derivatesType: { type: String, default: '' },

    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },

});

const autoPopulateChilds = function (next) {
    this.populate('market');
    next();
};

schema.
    pre('findOne', autoPopulateChilds).
    pre('find', autoPopulateChilds);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Stock', schema);