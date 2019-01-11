const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    UserMapping: require('../userMapping/userMapping.model'),
    Email: require('../emails/email.model'),
    UserRole: require('../masters/userRoles/userRole.model'),
    EmailType: require('../masters/emailTypes/emailType.model'),
    EventType: require('../masters/eventTypes/eventType.model'),
    Event: require('../event/event.model')
};