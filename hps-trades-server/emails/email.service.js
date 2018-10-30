const db = require('_helpers/db');
const email = require('_helpers/email');
const EmailDb = db.Email;
const EmailTypeDb = db.EmailType;
const constants = require('_helpers/dataconstants');
const uniqueString = require('unique-string');
const util = require('../_helpers/util');

module.exports = {
    emailForNewUserRegistration,
    sendEmailForPassword,
    isValidLink,
};


async function emailForNewUserRegistration(emailParam) {
    const emailTypeFound = await EmailTypeDb.findOne({ type: constants.emailTypes()[0].type })
    if (!emailTypeFound) {
        throw 'Email type is not found';
    }

    let newUserToken = uniqueString();
    let newUserRequestValidity = new Date();
    newUserRequestValidity.setDate(newUserRequestValidity.getDate() + 5);

    let webSiteValid = new Date();
    webSiteValid.setDate(newUserRequestValidity.getDate() + 99999);

    let emailObject = new EmailDb();

    emailObject.type = emailTypeFound._id;
    emailObject.template = "_template/newUserRegistered";
    emailObject.from = process.env.HPS_TRADES_GMAIL_ID_WITH_NAME;
    emailObject.subject = 'New User Registration Request - HPS Trades';
    emailObject.to = emailParam.username;
    emailObject.name = emailParam.firstName;

    let link1 = util.encrypt((process.env.HPS_TRADES_MAIN_MAIL_ACTION_OTHER)
        .replace('{0}', constants.emailActions().NEW_USER_REGISTER_CONFIRM)
        .replace('{1}', newUserToken)
        .replace('{2}', emailObject._id)
    );
    emailObject.link1 = process.env.HPS_TRADES_MAIN_APP_URL + (process.env.HPS_TRADES_MAIN_APP_URL_CONFIRM).replace('{0}', link1);
    emailObject.link1Validity = newUserRequestValidity;
    emailObject.link1RedirectPage = '/';
    emailObject.link1Message = constants.emailTypes()[0].returnMessage;

    emailObject.link2 = process.env.HPS_TRADES_MAIN_APP_URL;
    emailObject.link2Validity = webSiteValid;
    emailObject.link2RedirectPage = '/';
    emailObject.link2Message = '';

    emailObject.htmlBody = email.parseEmailBodyFromTemplate(emailObject, true);
    emailObject.textBody = email.parseEmailBodyFromTemplate(emailObject, false);

    email.sendEmail(emailObject);

    // save email into database
    try {
        await emailObject.save();
    } catch (error) {
        console.log(error);
    }
}


async function sendEmailForPassword(emailParam) {
    const emailTypeFound = await EmailTypeDb.findOne({ type: constants.emailTypes()[2].type })
    if (!emailTypeFound) {
        throw 'Email type is not found';
    }

    let token = uniqueString();
    let validityDate = new Date();
    validityDate.setDate(validityDate.getDate() + 1);

    let emailObject = new EmailDb();

    emailObject.type = emailTypeFound._id;
    emailObject.template = "_template/forgotPassword";
    emailObject.from = process.env.HPS_TRADES_GMAIL_ID_WITH_NAME;
    emailObject.subject = 'Password Reset - HPS Trades';
    emailObject.to = emailParam.to;
    emailObject.name = emailParam.name;

    emailObject.link1 = process.env.HPS_TRADES_MAIN_APP_URL + (process.env.HPS_TRADES_MAIN_APP_URL_CONFIRM).replace('{0}', token);
    emailObject.link1Validity = validityDate;
    emailObject.link1RedirectPage = '/';
    emailObject.link1Message = constants.emailTypes()[0].returnMessage;

    emailObject.htmlBody = email.parseEmailBodyFromTemplate(emailObject, true);
    emailObject.textBody = email.parseEmailBodyFromTemplate(emailObject, false);

    email.sendEmail(emailObject);

    // save email into database
    const emailToSave = new EmailDb(emailObject);
    await emailToSave.save();
}

async function isValidLink({ recordId, link1, link2, link3, link4, link5 }) {
    const emailTypeFound = await EmailDb.findOne({ _id: recordId })
    let isLinkValid = false;
    if (!emailTypeFound) {
        throw 'Email type is not found';
    }
    else {
        isLinkValid = ((link1 && emailTypeFound.link1 !== undefined && (emailTypeFound.link1.toString()).indexOf(link1)) >= 0 ? true : false)
        || ((link2 && emailTypeFound.link2 !== undefined && (emailTypeFound.link2.toString()).indexOf(link2)) >= 0 ? true : false)
        || ((link3 && emailTypeFound.link3 !== undefined && (emailTypeFound.link3.toString()).indexOf(link3)) >= 0 ? true : false)
        || ((link4 && emailTypeFound.link4 !== undefined && (emailTypeFound.link4.toString()).indexOf(link4)) >= 0 ? true : false)
        || ((link5 && emailTypeFound.link5 !== undefined && (emailTypeFound.link5.toString()).indexOf(link5)) >= 0 ? true : false);
    }
    return isLinkValid;
}