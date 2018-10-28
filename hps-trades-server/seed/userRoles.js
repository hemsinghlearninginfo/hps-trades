const db = require('../_helpers/db');
const UserRoles = db.UserRole;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    seedUserRoles
};

async function seedUserRoles() {
    for (var i = 0; i < dataConstants.userRoles().length; i++) {
        let findUserRole = await UserRoles.findOne({ role: dataConstants.userRoles()[i].role });
        if (!findUserRole) {
            const userRole = new UserRoles(dataConstants.userRoles()[i]);
            await userRole.save();
        }
    }
}
