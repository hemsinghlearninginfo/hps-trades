const db = require('../_helpers/db');
const EventTypeDb = db.EventType;
const UserRoleDb = db.UserRole;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    seedEventTypes
};

async function seedEventTypes() {
    for (let i = 0; i < dataConstants.eventTypes().length; i++) {
        const findEventType = await EventTypeDb.findOne({ type: dataConstants.eventTypes()[i].type });
        if (!findEventType) {
            // Fetch user Role and Bind it
            const findUserRole = await UserRoleDb.findOne({ role: dataConstants.eventTypes()[i].userRole });
            if (findUserRole) {
                const emailType = new EventTypeDb(dataConstants.eventTypes()[i]);
                emailType.userRole = findUserRole._id;
                await emailType.save();
            }
        }
    }
}
