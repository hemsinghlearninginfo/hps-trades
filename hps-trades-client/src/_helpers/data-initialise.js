import { dataInitialiseService } from '../_services';
import { myConfig } from '../config';

export const dataInitialise = {
    init,
    getUserRoles,
}

function init(){
    console.log('getUserRoles : ' ,getUserRoles());
}

function getUserRoles() {
    return dataInitialiseService.getUserRoles(myConfig.Master_UserRoles);
}