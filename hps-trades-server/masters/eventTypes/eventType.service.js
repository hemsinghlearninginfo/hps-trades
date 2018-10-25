const db = require('_helpers/db');
const EventTypeDb = db.EventType;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await EventTypeDb.find();
}

async function getById(id) {
    return await EventTypeDb.findById(id);
}

async function create(eventTypeParam) {
    // validate
    if (await EventTypeDb.findOne({ type: eventTypeParam.type })) {
        throw 'Event Type "' + eventTypeParam.type + '" is already added';
    }
    const eventType = new EventTypeDb(eventTypeParam);
    // save user
    await eventType.save();
}

async function update(id, eventTypeParam) {
    const eventType = await EventTypeDb.findById(id);

    // validate
    if (!eventType) throw 'event type not found';
    if (eventType.type !== eventTypeParam.type && await EventTypeDb.findOne({ type: eventTypeParam.type })) {
        throw 'Event Type "' + eventTypeParam.type + '" is already added';
    }

    // copy userParam properties to user
    Object.assign(eventType, eventTypeParam);

    await eventType.save();
}

async function _delete(id) {
    await EventTypeDb.findByIdAndRemove(id);
}