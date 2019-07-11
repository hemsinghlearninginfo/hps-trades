const db = require('_helpers/db');
const TradingNameSpaceDb = db.TradingNameSpace;

module.exports = {
    getAll,
    addUpdate,
};

async function getAll(userName) {
    return await TradingNameSpaceDb.find({ userName });
}

async function addUpdate(paramData) {
    let dbObject = null;
    if (paramData.id === undefined) {
        dbObject = new UserRuleDb();
    }
    else {
        dbObject = await TradingNameSpaceDb.findById(paramData.id);
    }
    dbObject.label = paramData.label;
    dbObject.description = paramData.description;
    dbObject.type = paramData.type;
    try {
        await dbObject.save();
    } catch (error) {
        console.log(error);
    }
}
