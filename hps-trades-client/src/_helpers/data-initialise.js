import { dataInitialiseService } from '../_services';
import { myConfig } from '../config';
import { dataManager } from '../dataManager';

export const dataInitialise = {
    init,
}

function init() {
    getUserRoles();
}

function getUserRoles() {
    try {
        dataInitialiseService.getUserRoles(myConfig.Master_UserRoles)
            .then((responseText) => {
                return responseText;
            })
            .then((response) => {
                var obj = {
                    type: myConfig.Master_UserRoles,
                    data: response,
                    valid: getValidDate()
                }
                dataManager.setObjectByName(myConfig.Master_UserRoles, obj);
                console.log('USR : ', dataManager.getObjectByName(myConfig.Master_UserRoles));
            });
    }
    catch (error) {
        return error;
    }
}

function getValidDate() {
    var currentDateTime = new Date();
    return currentDateTime.setMinutes(currentDateTime.getMinutes() + myConfig.CacheValidateInMinutes);
}