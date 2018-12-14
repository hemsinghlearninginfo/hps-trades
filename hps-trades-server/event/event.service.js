const config = require('config.json');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const EventDb = db.Event;
const UserRoleDb = db.UserRole;
const EventTypeDb = db.EventType;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    // getAll,
    // getById,
    deleteByUser,
    createByUser,
    getEventsWithInCurrentTime,
    getEventTypeByUser,
    getAllEventsByUser,
};

async function getEventsWithInCurrentTime() {
    var currentDate = new Date();
    var query = { $and: [ { fromDate: { $lte: currentDate } }, { toDate: { $gte: currentDate } } ] };
    return await EventDb.find(query);
}

async function getAllEventsByUser(toFindUserId) {
    const events = await EventDb.find({ userId: toFindUserId });
    if (!events) { return []; }
    return events;
}

async function getEventTypeByUser(toFindUserRole) {
    const userRole = await UserRoleDb.findOne({ _id: toFindUserRole });

    let eventTypes = [];
    if (userRole !== null && userRole.role === dataConstants.userRoles()[0].role) {
        eventTypes = await EventTypeDb.find();
        if (!eventTypes) { throw 'Invalid user type' }
    }
    else {
        eventTypes = await EventTypeDb.find({ userRole: toFindUserRole });
        if (!eventTypes) { throw 'Invalid user type' }
    }
    return eventTypes;
}

async function createByUser(newEvent) {
    const eventToAdd = new EventDb(newEvent);
    await eventToAdd.save();
}

async function deleteByUser(id) {
    await EventDb.findByIdAndRemove(id);
}

// async function update(id, userParam) {
//     const user = await EventDb.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await EventDb.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

// async function _delete(id) {
//     await EventDb.findByIdAndRemove(id);
// }
