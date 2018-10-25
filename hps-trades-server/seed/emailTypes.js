const db = require('../_helpers/db');
const EmailTypes = db.EmailType;

module.exports = {
    seedEmailTypes
};

async function seedEmailTypes() {
    let emailTypes = [{
        type: 'NewUserRequest',
        description: 'Send Email from Master for New User Request'
    },
    {
        type: 'NewUserRegistered',
        description: 'Send Email from System when user register him self'
    },
    {
        type: 'ForgotPasswordRequest',
        description: 'Forgot Password'
    },
    ];

    for (let i = 0; i < emailTypes.length; i++) {
        const findEmailType = await EmailTypes.findOne({ type: emailTypes[i].type });
        if (!findEmailType) {
            const emailType = new EmailTypes(emailTypes[i]);
            await emailType.save();
        }
    }
}
