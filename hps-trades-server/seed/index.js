var user = require('./user');
var userRoles = require('./userRoles');
var emailTypes = require('./emailTypes');

module.exports = {
    seedDB
}

const runDBObjects = async () => {
    const fistResponse = await userRoles.seedUserRoles();
    const secondResponse = await user.seedSysAdmin(fistResponse);
    const thirdAsyncRequest = await emailTypes.seedEmailTypes(secondResponse);
};

function seedDB() {
    console.log('Seeding DB Starts');
    runDBObjects();
}