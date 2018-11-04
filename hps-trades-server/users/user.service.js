const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const UserDb = db.User;
const UserRoleDb = db.UserRole;
const emailService = require('../emails/email.service');
const dataConstants = require('../_helpers/dataConstants');

module.exports = {
    authenticate,
    forgotPasswordToEmail,
    isValidForgotpasswordLink,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await UserDb.findOne({ username });
    if (user) {
        if (bcrypt.compareSync(password, user.hash)) {
            if (user.isRegistrationActive) {
                const { hash, ...userWithoutHash } = user.toObject();
                const token = jwt.sign({ sub: user.id }, config.secret);
                return {
                    ...userWithoutHash,
                    token
                };
            }
            else {
                throw 'Your account is not activated, please check you email and click on activation link.'; 
            }
        }
    }
}

async function forgotPasswordToEmail({ username }) {
    const user = await UserDb.findOne({ username });
    if (user) {
        var emailPrams = {
            to: username,
            name: user.firstName
        }
        emailService.sendEmailForPassword(emailPrams);
    }
    else {
        throw 'Username "' + username + '" is not found';
    }
}

async function isValidForgotpasswordLink({ link }) {
    console.log(link);
    // const user = await User.findOne({ username });
    // if (user) {
    //     var emailPrams = {
    //         to: username,
    //         name: user.firstName
    //     }
    //     emailService.sendEmailForPassword(emailPrams);
    // }
    // else {
    //     throw 'Username "' + username + '" is not found';
    // }
}

async function getAll() {
    return await UserDb.find().select('-hash');
}

async function getById(id) {
    return await UserDb.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await UserDb.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new UserDb(userParam);

    // Set user Role
    if (user.role === undefined) {
        const userRole = await UserRoleDb.findOne({ role: dataConstants.userRoles()[2].role });
        if (userRole) {
            user.userRole = userRole._id;
        }
        else {
            throw 'User Role not found';
        }
    }

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await UserDb.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await UserDb.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await UserDb.findByIdAndRemove(id);
}
