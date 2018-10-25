
module.exports = {
    userRoles,
    emailTypes
}

function userRoles() {
    var ur = [];
    ur[0] = {
        role: 'SysAdmin',
        description: 'Super System Admin'
    };
    ur[1] = {
        role: 'Master',
        description: 'Master Admin'
    }
    ur[2] = {
        role: 'User',
        description: 'User'
    }
    return ur;
};


function emailTypes() {
    var et = [];

    et[0] = {
        type: 'NewUserRequest',
        description: 'Send Email from Master for New User Request'
    };
    et[1] = {
        type: 'NewUserRegistered',
        description: 'Send Email from System when user register him self'
    };
    et[2] = {
        type: 'ForgotPasswordRequest',
        description: 'Forgot Password'
    };
    return et;
}