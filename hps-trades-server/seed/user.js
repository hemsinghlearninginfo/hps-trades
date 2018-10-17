const db = require('../_helpers/db');
const bcrypt = require('bcryptjs');
const User = db.User;
const UserRole = db.UserRole;

module.exports = {
    seedSysAdmin
};

async function seedSysAdmin() {
    let username = 'hpssysadmin@gmail.com';
    const user = await User.findOne({ username });
    const userRole = await UserRole.findOne({ role: 'SysAdmin' });
    if (!user && userRole) {
        let userParam = {
            username: username,
            password: 'hpsadmin@123',
            firstName: 'hps',
            lastName: 'family',
            role: userRole._id
        }
        const user = new User(userParam);
        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
    }
}