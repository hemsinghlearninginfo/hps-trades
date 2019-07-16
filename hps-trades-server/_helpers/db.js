const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    UserRole: require('../masters/userRoles/userRole.model'),
    EmailType: require('../masters/emailTypes/emailType.model'),
    EventType: require('../masters/eventTypes/eventType.model'),
    Market: require('../masters/market/market.model'),

    User: require('../users/user.model'),
    UserMapping: require('../userMapping/userMapping.model'),
    Email: require('../emails/email.model'),
    Event: require('../event/event.model'),
    Stock: require('../stock/stock.model'),

    UserRule: require('../userRules/userRule.model'),
    TradingNameSpace: require('../tradingNameSpace/tradingNameSpace.model'),

    FAQs: require('../faqs/faqs.model'),
};