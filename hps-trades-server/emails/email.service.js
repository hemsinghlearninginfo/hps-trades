const db = require('_helpers/db');
const email = require('_helpers/email');
const Email = db.Email;

module.exports = {
    sendEmailForPassword
};

async function sendEmailForPassword(emailParam) {
    var emailObject = new Email();
    emailObject.template = "_template/forgotPassword";
    emailObject.from =  process.env.HPS_TRADES_GMAIL_ID_WITH_NAME;
    emailObject.subject = 'Password Reset - HPS Trades';
    emailObject.to = emailParam.to;
    emailObject.name = emailParam.name;

    emailObject.htmlBody = email.parseEmailBodyFromTemplate(emailObject, true);
    emailObject.textBody = email.parseEmailBodyFromTemplate(emailObject, false);

    email.sendEmail(emailObject);
    
    // save email into database
    const emailToSave = new Email(emailObject);
    await emailToSave.save();
}
