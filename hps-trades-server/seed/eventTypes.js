const db = require('../_helpers/db');
const EventTypeDb = db.EventType;
const constants = require('../_helpers/dataConstants');

module.exports = {
    seedEventTypes
};

async function seedEventTypes() {
    for (let i = 0; i < constants.eventTypes().length; i++) {
        const findEventType = await EventTypeDb.findOne({ type: constants.eventTypes()[i].type });
        if (!findEventType) {
            const emailType = new EventTypeDb(constants.eventTypes()[i]);
            await emailType.save();
        }
    }
}
