const db = require('../_helpers/db');
const EventTypeDb = db.EventType;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    seedEventTypes
};

async function seedEventTypes() {
    for (let i = 0; i < dataConstants.eventTypes().length; i++) {
        const findEventType = await EventTypeDb.findOne({ type: dataConstants.eventTypes()[i].type });
        if (!findEventType) {
            const emailType = new EventTypeDb(dataConstants.eventTypes()[i]);
            await emailType.save();
        }
    }
}
