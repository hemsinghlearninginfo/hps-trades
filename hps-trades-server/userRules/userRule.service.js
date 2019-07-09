
const db = require('_helpers/db');
const UserDb = db.User;
const UserRuleDb = db.UserRule;


module.exports = {
    getAll,
    addUpdate,
    // getAllWithType,
    // getById,
    // create,
    // update,
    // delete: _delete,
    // updateIsRegistration,
};


async function getAll() {
    return await UserRuleDb.find().select('-hash');
}

async function addUpdate(userRuleData) {
    let userRuleDataObject = null;
    if (userRuleData.id === undefined) {
        userRuleDataObject = new UserRuleDb();
    }
    else{
        userRuleDataObject = await UserRuleDb.findById(userRuleData.id);
    }
    userRuleDataObject.username = userRuleData.username;
    userRuleDataObject.heading = userRuleData.heading;
    userRuleDataObject.description = userRuleData.description;
    userRuleDataObject.ruleType = userRuleData.ruleType;
    try {
        await userRuleDataObject.save();
    } catch (error) {
        console.log(error);
    }
}


// async function getAllWithType() {
//     let userWithType = [];
//     for (let i = 1; i < dataConstants.userRoles().length; i++) {
//         const userRole = await UserRuleDb.findOne({ role: dataConstants.userRoles()[i].role });
//         const users = await UserDb.find({
//             $and: [{ isRegistrationActive: true }, { userRole: userRole.id }]
//         },
//             { _id: 1, firstName: 1, lastName: 1, username: 1 }
//         );
//         Object.keys(users).forEach(function (key) {
//             userWithType.push({
//                 id: users[key].id,
//                 firstName: users[key].firstName,
//                 lastName: users[key].lastName,
//                 email: users[key].username,
//                 type: userRole.role,
//             });
//         });
//     }
//     return userWithType;
// }

// async function getById(id) {
//     return await UserDb.findById(id).select('-hash');
// }

// async function create(userParam) {
//     // validate
//     if (await UserDb.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     const user = new UserDb(userParam);

//     // Set user Role
//     if (user.role === undefined) {
//         const userRole = await UserRuleDb.findOne({ role: dataConstants.userRoles()[2].role });
//         if (userRole) {
//             user.userRole = userRole._id;
//         }
//         else {
//             throw 'User Role not found';
//         }
//     }

//     // hash password
//     if (userParam.password) {
//         user.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // save user
//     await user.save();
// }

// async function update(id, userParam) {
//     const user = await UserDb.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await UserDb.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

// async function _delete(id) {
//     await UserDb.findByIdAndRemove(id);
// }



// async function updateIsRegistration(users) {
//     users.forEach(function (userItem) {
//         UserDb.update(
//             { _id: userItem.id },
//             { $set: { isRegistrationActive: userItem.isRegistrationActive, userRole: userItem.userRole } },
//             function (err) {
//                 if (err) throw err;
//             }
//         );
//     });
// }