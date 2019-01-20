const db = require('_helpers/db');
const Market = db.Market;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Market.find();
}

async function getById(id) {
    return await Market.findById(id);
}

async function create(marketParam) {
    // validate
    if (await Market.findOne({ name: marketParam.name })) {
        throw 'Market "' + marketParam.name + '" is already added';
    }
    const newMarket = new Market(marketParam);
    await newMarket.save();
}

async function update(id, marketParam) {
    const market = await Market.findById(id);

    // validate
    if (!market) throw 'market type not found';
    if (market.name !== marketParam.name && await Market.findOne({ name: marketParam.name })) {
        throw 'Market Name "' + marketParam.type + '" is already added';
    }

    // copy userParam properties to user
    Object.assign(market, marketParam);
    await market.save();
}

async function _delete(id) {
    await Market.findByIdAndRemove(id);
}