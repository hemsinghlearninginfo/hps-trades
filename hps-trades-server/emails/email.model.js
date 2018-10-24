const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    template : {type : String},
    from: { type: String, required: true },
    to: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    htmlBody: { type: String, required: true },
    textBody: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    placeHolder1 : { type: String, default: null  },
    placeHolder2 : { type: String, default: null  },
    placeHolder3 : { type: String, default: null  },
    placeHolder4 : { type: String, default: null  },
    placeHolder5 : { type: String, default: null  },
    message1 : { type: String, default: null  },
    message2 : { type: String, default: null  },
    message3 : { type: String, default: null  },
    message4 : { type: String, default: null  },
    message5 : { type: String, default: null  },
    link1: { type: String, default: null  },
    link1Validity : { type: Date, default: null  },
    link2: { type: String, default: null },
    link2Validity : { type: Date, default: null },
    link3: { type: String, default: null },
    link3Validity : { type: Date, default: null },
    link4: { type: String, default: null },
    link4Validity : { type: Date, default: null },
    link5: { type: String, default: null },
    link5Validity : { type: Date, default: null }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Email', schema);