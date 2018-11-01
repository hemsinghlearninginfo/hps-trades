const config = require('config.json');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const EventDb = db.Event;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    // getAll,
    // getById,
    create,
};

// async function getAll() {
//     return await EventDb.find().select('-hash');
// }

// async function getById(id) {
//     return await EventDb.findById(id).select('-hash');
// }

async function create(newEvent) {
    // validate
    // if (await EventDb.findOne({ username: newEvent.username })) {
    //     throw 'Username "' + newEvent.username + '" is already taken';
    // }
    // let event = {
    //     heading: newEvent.heading,
    //     message: newEvent.message,
    //     fromDate: newEvent.fromDate,
    //     toDate: newEvent.toDate,
    //     eventType: newEvent.type
    // }
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
