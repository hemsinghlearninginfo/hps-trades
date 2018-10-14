const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Email: require('../emails/email.model'),
    UserRole: require('../userRoles/userRole.model')
};