const db = require('_helpers/db');
const UserRole = db.UserRole;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await UserRole.find();
}

async function getById(id) {
    return await UserRole.findById(id);
}

async function create(userRoleParam) {
    // validate
    if (await UserRole.findOne({ role: userRoleParam.role })) {
        throw 'Role "' + userRoleParam.role + '" is already added';
    }
    const userRole = new UserRole(userRoleParam);
    // save user
    await userRole.save();
}

async function update(id, userRoleParam) {
    const userRole = await UserRole.findById(id);

    // validate
    if (!userRole) throw 'User not found';
    if (userRole.role !== userRoleParam.role && await UserRole.findOne({ role: userRoleParam.role })) {
        throw 'Role "' + userRoleParam.role + '" is already added';
    }

    // copy userParam properties to user
    Object.assign(userRole, userRoleParam);

    await userRole.save();
}

async function _delete(id) {
    await UserRole.findByIdAndRemove(id);
}