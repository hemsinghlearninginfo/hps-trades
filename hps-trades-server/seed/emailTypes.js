const db = require('../_helpers/db');
const EmailTypeDb = db.EmailType;
const constants = require('../_helpers/dataConstants');

module.exports = {
    seedEmailTypes
};

async function seedEmailTypes() {
    for (let i = 0; i < constants.emailTypes().length; i++) {
        const findEmailType = await EmailTypeDb.findOne({ type: constants.emailTypes()[i].type });
        if (!findEmailType) {
            const emailType = new EmailTypeDb(constants.emailTypes()[i]);
            await emailType.save();
        }
    }
}
