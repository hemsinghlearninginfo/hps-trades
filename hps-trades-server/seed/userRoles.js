const db = require('../_helpers/db');
const UserRoles = db.UserRole;

module.exports = {
    seedUserRoles
};

async function seedUserRoles() {
    let roles = [{
        role: 'SysAdmin',
        description: 'Super System Admin'
    },
    {
        role: 'Master',
        description: 'Master Admin'
    },
    {
        role: 'User',
        description: 'User'
    }];

    for (var i = 0; i < roles.length; i++) {
        let findUserRole = await UserRoles.findOne({ role: roles[i].role });
        if (!findUserRole) {
            const userRole = new UserRoles(roles[i]);
            await userRole.save();
        }
    }
}
