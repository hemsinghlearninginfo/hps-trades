const db = require('../_helpers/db');
const EmailTypeDb = db.EmailType;
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    seedEmailTypes
};

async function seedEmailTypes() {
    for (let i = 0; i < dataConstants.emailTypes().length; i++) {
        const findEmailType = await EmailTypeDb.findOne({ type: dataConstants.emailTypes()[i].type });
        if (!findEmailType) {
            const emailType = new EmailTypeDb(dataConstants.emailTypes()[i]);
            await emailType.save();
        }
    }
}
