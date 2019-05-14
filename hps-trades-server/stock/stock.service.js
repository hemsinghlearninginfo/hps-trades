const config = require('config.json');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const StockDb = db.Stock;
// const EventDb = db.Event;
// const UserRoleDb = db.UserRole;
// const EventTypeDb = db.EventType;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    getAll,
    addUpdate,
    // getById,
    // deleteByUser,
    // createByUser,
    // getEventsWithInCurrentTime,
    // getEventTypeByUser,
    // getAllEventsByUser,
};

async function getAll() {
    try {
        return await StockDb.find();
    } catch (error) {
        console.log(error);
    }
}


async function addUpdate(stockParam) {
    if (stockParam.id !== '') {
        await StockDb.update({ _id: stockParam.id }, stockParam, { upsert: true })
    }
    else {
        // validate
        if (await StockDb.findOne({ symbol: stockParam.symbol })) {
            throw 'Stock "' + stockParam.symbol + '" is already added.';
        }
        // save user
        const stock = new StockDb(stockParam);
        await stock.save();
    }
}
