
module.exports = {
    userRoles,
    emailTypes,
    eventTypes
}

function userRoles() {
    var ur = [];
    ur.push({ role: 'SysAdmin', description: 'Super System Admin' });
    ur.push({ role: 'Master', description: 'Master Admin' });
    ur.push({ role: 'User', description: 'User' });
    return ur;
};


function emailTypes() {
    var et = [];
    et.push({ type: 'NewUserRegistered', description: 'Send Email from system when register him self', returnMessage : 'New user register' });
    et.push({ type: 'NewUserRegisteredConfirm', description: 'Send Email from system when new user registration confirmed', returnMessage : 'New user register confirm' });
    et.push({ type: 'ForgotPasswordRequest', description: 'Forgot Password', returnMessage : 'Forgot password request' });
    return et;
}

function eventTypes() {
    var et = [];
    et.push({ type: 'UnderMaintenance', description: 'Site Under Maintenance' });
    et.push({ type: 'MarketClose', description: 'Market Close' });
    et.push({ type: 'Annoucement', description: 'Annoucement' });
    return et;
}