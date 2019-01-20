import { authHeader, authHeaderAppJson } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const stockService = {
    getMarket,
    // getEventTypesByUser,
    // getAllEventsByUser,
    // createByUser,
    // deleteByUser,
};

function getMarket() {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderAppJson()
    };
    return fetch(`${myConfig.ApiUrl}market`, requestOptions)
        .then(commonService.handleResponse);
}

// function getEventTypesByUser(userRole) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeaderAppJson()
//     };
//     return fetch(`${myConfig.ApiUrl}event/geteventtypebyuser/?userrole=${userRole}`, requestOptions)
//         .then(commonService.handleResponse);
// }

// function getAllEventsByUser(userId) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeaderAppJson()
//     };
//     return fetch(`${myConfig.ApiUrl}event/geteventsbyuser/?userid=${userId}`, requestOptions)
//         .then(commonService.handleResponse);
// }

// function createByUser(formEvent) {
//     const requestOptions = {
//         method: 'POST',
//         headers: authHeaderAppJson(),
//         body: JSON.stringify(formEvent)
//     };
//     return fetch(`${myConfig.ApiUrl}event/createbyuser`, requestOptions)
//         .then(commonService.handleResponse);
// }

// function deleteByUser(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeaderAppJson(),
//     };
//     return fetch(`${myConfig.ApiUrl}event/deletebyuser/?id=${id}`, requestOptions)
//         .then(commonService.handleResponse);
// }