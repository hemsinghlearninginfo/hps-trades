const db = require('_helpers/db');
const email = require('_helpers/email');
const UserMappingDb = db.UserMapping;
const constants = require('_helpers/dataconstants');
const uniqueString = require('unique-string');
const util = require('../_helpers/util');

module.exports = {
    addUpdate,
    get,
};

async function addUpdate(userMappingData) {
    //userMappingData
    let userMappingDataObject = new EmailDb();
    try {
        await userMappingDataObject.save();
    } catch (error) {
        console.log(error);
    }
}

async function get() {
    //userMappingData
    try {
        return await UserMappingDb.find({});
    } catch (error) {
        console.log(error);
    }
}
