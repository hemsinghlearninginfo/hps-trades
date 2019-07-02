const db = require('_helpers/db');
const email = require('_helpers/email');
const UserMappingDb = db.UserMapping;
const constants = require('_helpers/dataconstants');
const uniqueString = require('unique-string');
const util = require('../_helpers/util');

module.exports = {
    addUpdate,
    getAll,
};

async function addUpdate(userMappingData) {
    //userMappingData
    let userMappingDataObject = null;
    if (userMappingData.id === null) {
        userMappingDataObject = new UserMappingDb();
    }
    else{
        userMappingDataObject = await UserMappingDb.findById(userMappingData.id);
    }
    userMappingDataObject.masterUserId = userMappingData.masterUserId;
    userMappingDataObject.childUserId = userMappingData.childUserId;
    userMappingDataObject.comment = userMappingData.comment;
    try {
        await userMappingDataObject.save();
    } catch (error) {
        console.log(error);
    }
}

async function getAll() {
    try {
        return await UserMappingDb.find();
    } catch (error) {
        console.log(error);
    }
}
