var user = require('./user');
var userRoles = require('./userRoles');

module.exports = {
    seedDB
}

const runDBObjects = async () => {
    const fistResponse = await userRoles.seedUserRoles();
    const secondResponse = await user.seedSysAdmin(fistResponse);
    // const thirdAsyncRequest = await example.thirdAsyncRequest(secondResponse);
};

function seedDB() {
    console.log('Seeding DB Starts');
    runDBObjects();
}