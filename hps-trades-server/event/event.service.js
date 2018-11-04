const config = require('config.json');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const EventDb = db.Event;
const UserDb = db.User;
const EventTypeDb = db.EventType;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    // getAll,
    // getById,
    create,
    getEventTypeByUser,
};

// async function getAll() {
//     return await EventDb.find().select('-hash');
// }

async function getEventTypeByUser(userId) {
    //return await EventDb.findById(id).select('-hash');
    //const getEvents = EventType.findOne({role : })
    const user = UserDb.findOne({_id : userId});
    if(!user){
        throw 'Invalid user'
    }

    const eventTypes = EventTypeDb.findOne({userRole : user.role});
    if(!eventTypes){ throw 'Invalid user type'}

    return eventTypes;
}

async function create(newEvent) {
    const eventToAdd = new EventDb(newEvent);
    await eventToAdd.save();
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
