const db = require('_helpers/db');
const EmailType = db.EmailType;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await EmailType.find();
}

async function getById(id) {
    return await EmailType.findById(id);
}

async function create(emailTypeParam) {
    // validate
    if (await EmailType.findOne({ type: emailTypeParam.role })) {
        throw 'Email Type "' + emailTypeParam.type + '" is already added';
    }
    const emailType = new EmailType(emailTypeParam);
    // save user
    await emailType.save();
}

async function update(id, emailTypeParam) {
    const emailType = await EmailType.findById(id);

    // validate
    if (!emailType) throw 'email type not found';
    if (emailType.type !== emailTypeParam.type && await EmailType.findOne({ type: emailTypeParam.type })) {
        throw 'Email Type "' + emailTypeParam.type + '" is already added';
    }

    // copy userParam properties to user
    Object.assign(emailType, emailTypeParam);

    await emailType.save();
}

async function _delete(id) {
    await EmailType.findByIdAndRemove(id);
}