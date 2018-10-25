const db = require('../_helpers/db');
const UserRoles = db.UserRole;
const constants = require('../_helpers/constants');

module.exports = {
    seedUserRoles
};

async function seedUserRoles() {
    for (var i = 0; i < constants.userRoles().length; i++) {
        let findUserRole = await UserRoles.findOne({ role: constants.userRoles()[i].role });
        if (!findUserRole) {
            const userRole = new UserRoles(constants.userRoles()[i]);
            await userRole.save();
        }
    }
}
