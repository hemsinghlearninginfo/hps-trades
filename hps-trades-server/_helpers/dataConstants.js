
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
    et.push({ type: 'NewUserRequest', description: 'Send Email from Master for New User Request' });
    et.push({ type: 'NewUserRegistered', description: 'Send Email from System when user register him self' });
    et.push({ type: 'ForgotPasswordRequest', description: 'Forgot Password' });
    return et;
}

function eventTypes() {
    var et = [];
    et.push({ type: 'UnderMaintenance', description: 'Site Under Maintenance' });
    et.push({ type: 'MarketClose', description: 'Market Close' });
    et.push({ type: 'Annoucement', description: 'Annoucement' });
    return et;
}