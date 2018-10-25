const db = require('_helpers/db');
const email = require('_helpers/email');
const EmailDb = db.Email;
const EmailType = db.EmailType;

module.exports = {
    sendEmailForPassword
};

async function sendEmailForPassword(emailParam) {
    const emailTypeFound = await EmailType.findOne({ type: 'ForgotPasswordRequest' })
    if (!emailTypeFound) {
        throw 'Email type is not found';
    }
    var emailObject = new EmailDb();
    emailObject.type = emailTypeFound._id;
    emailObject.template = "_template/forgotPassword";
    emailObject.from = process.env.HPS_TRADES_GMAIL_ID_WITH_NAME;
    emailObject.subject = 'Password Reset - HPS Trades';
    emailObject.to = emailParam.to;
    emailObject.name = emailParam.name;

    emailObject.htmlBody = email.parseEmailBodyFromTemplate(emailObject, true);
    emailObject.textBody = email.parseEmailBodyFromTemplate(emailObject, false);

    email.sendEmail(emailObject);

    // save email into database
    const emailToSave = new EmailDb(emailObject);
    await emailToSave.save();
}
