
module.exports = {
    userRoles,
    emailTypes,
    eventTypes,
    emailActions,
    markets,
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
    et.push({ type: 'NewUserRegistered', description: 'Send Email from system when register him self', returnMessage: 'New user register' });
    et.push({ type: 'NewUserRegisteredConfirm', description: 'Send Email from system when new user registration confirmed', returnMessage: 'New user register confirm' });
    et.push({ type: 'ForgotPasswordRequest', description: 'Forgot Password', returnMessage: 'Forgot password request' });
    return et;
}

function eventTypes() {
    var et = [];
    et.push({ type: 'UnderMaintenance', name: 'Under Maintenance', isAllowToClose: false, description: 'Site Under Maintenance', userRole : 'SysAdmin' });
    et.push({ type: 'MarketClose', name: 'Market Close', isAllowToClose: false, description: 'Market Close', userRole : 'SysAdmin' });
    et.push({ type: 'Announcement', name: 'Announcement', description: 'Announcement', userRole : 'Master' });
    return et;
}

function emailActions() {
    var ea = {
        NEW_USER_REGISTER_CONFIRM: 'NewUserRegisterForConfirm'
    }
    return ea;
};

function markets() {
    var m = [];
    m.push({ name: 'NSE', description: 'NSE'});
    m.push({ name: 'MCX', description: 'NSE'});
    return m;
};