const db = require('../_helpers/db');
const MarketDb = db.Market;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    seedmarket
};

async function seedmarket() {
    for (let i = 0; i < dataConstants.markets().length; i++) {
        const findMarket = await MarketDb.findOne({ name: dataConstants.markets()[i].name });
        if (!findMarket) {
            const market = new MarketDb(dataConstants.markets()[i]);
            await market.save();
        }
    }
}
