const db = require('../_helpers/db');
const bcrypt = require('bcryptjs');
const User = db.User;

module.exports = {
    seedSysAdmin
};

async function seedSysAdmin() {
    let username = 'hpssysadmin@gmail.com';
    const user = await User.findOne({ username });
    if (!user) {
        let userParam = {
            username: username,
            password: 'hpsadmin@123',
            firstName: 'hps',
            lastName: 'family'
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