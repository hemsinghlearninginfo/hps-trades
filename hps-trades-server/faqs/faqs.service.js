const db = require('_helpers/db');
const FAQsDb = db.FAQs;

module.exports = {
    getAll,
    addUpdate,
};

async function getAll() {
    return await FAQsDb.find({});
}

async function addUpdate(paramData) {
    let dbObject = null;
    if (paramData.id === undefined) {
        dbObject = new FAQsDb();
    }
    else {
        dbObject = await FAQsDb.findById(paramData.id);
    }
    dbObject.question = paramData.question;
    dbObject.answer = paramData.answer;
    try {
        await dbObject.save();
    } catch (error) {
        console.log(error);
    }
}
