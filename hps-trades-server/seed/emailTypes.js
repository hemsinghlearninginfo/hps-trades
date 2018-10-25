const db = require('../_helpers/db');
const EmailTypes = db.EmailType;
const constants = require('../_helpers/constants');

module.exports = {
    seedEmailTypes
};

async function seedEmailTypes() {
    for (let i = 0; i < constants.emailTypes().length; i++) {
        const findEmailType = await EmailTypes.findOne({ type: constants.emailTypes()[i].type });
        if (!findEmailType) {
            const emailType = new EmailTypes(constants.emailTypes()[i]);
            await emailType.save();
        }
    }
}
