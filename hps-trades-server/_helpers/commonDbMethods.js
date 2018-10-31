const db = require('./db');
const dataConstants = require('./dataConstants');
const messageConstants = require('./messageConstants');
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
                return response;
            })
            .catch(error => {
                throw messageConstants.GenericError;
            });
    }
}


async function ConfirmNewUser(username) {
    var urlResponse = {
        status: 'sucess',
        urlToRedirect: '/',
        message: messageConstants.NEW_USER_EMAIL_APPROVED
    }
    const userFound = await UserDb.findOne({ username: username });
    if (!userFound)
        throw username + ' not found in the system, please register';
    try {
        if (!userFound.isRegistrationActive) {
            userFound.isRegistrationActive = true;
            await userFound.save();
            urlResponse.message = messageConstants.NEW_USER_EMAIL_APPROVED;
        }
        else {
            urlResponse.message = messageConstants.NEW_USER_EMAIL_ALLREADY_APPROVED;
        }
        return urlResponse;
    } catch (error) {
        throw messageConstants.GenericError;
    }
}