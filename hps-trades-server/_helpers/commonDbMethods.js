const db = require('./db');
const dataConstants = require('./dataConstants');
const errorConstants = require('./errorConstants');
const EmailDb = db.Email;
const UserDb = db.User;


module.exports = {
    performActionsAsPerEmailULR
};


async function performActionsAsPerEmailULR(action, emailRecordId) {
    const emailFound = await EmailDb.findOne({ _id: emailRecordId });
    if (!emailFound)
        throw 'Error in processing your request, please try agian.';
    if (action.toUpperCase() === dataConstants.emailTypes()[0].type.toUpperCase()) {
        return ConfirmNewUser(emailFound.to)
            .then(response => {
                if (response) {
                    return emailFound.link1RedirectPage;
                }
            })
            .catch(error => {
                throw errorConstants.GenericError;
            });
    }
}


async function ConfirmNewUser(username) {
    const userFound = await UserDb.findOne({ username: username });
    if (!userFound)
        throw username + ' not found in the system, please register';
    try {
        userFound.isRegistrationActive = true;
        await userFound.save();
        return true;
    } catch (error) {
        throw errorConstants.GenericError;
    }
}