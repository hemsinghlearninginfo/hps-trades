import { authHeaderAppJson } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const tradeService = {
    getAllRules,
    addUpdateRules,
    getAllNameSpaces,
    addUpdateNameSpaces,
};


function getAllRules(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderAppJson()
    };
    return fetch(`${myConfig.ApiUrl}userRules?udi=${userId}`, requestOptions)
        .then(commonService.handleResponse);
}


function getAllNameSpaces(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderAppJson()
    };
    return fetch(`${myConfig.ApiUrl}namespace?udi=${userId}`, requestOptions)
        .then(commonService.handleResponse);
}

function addUpdateRules(rule) {
    const requestOptions = {
        method: 'POST',
        headers: authHeaderAppJson(),
        body: JSON.stringify(rule)
    };
    return fetch(`${myConfig.ApiUrl}userRules/addupdate`, requestOptions)
        .then(commonService.handleResponse);
}

function addUpdateNameSpaces(namespace) {
    const requestOptions = {
        method: 'POST',
        headers: authHeaderAppJson(),
        body: JSON.stringify(namespace)
    };
    return fetch(`${myConfig.ApiUrl}namespace/addupdate`, requestOptions)
        .then(commonService.handleResponse);
}



// function getMarket() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeaderAppJson()
//     };
//     return fetch(`${myConfig.ApiUrl}market`, requestOptions)
//         .then(commonService.handleResponse);
// }


// function addUpdate(stock) {
//     const requestOptions = {
//         method: 'POST',
//         headers: authHeaderAppJson(),
//         body: JSON.stringify(stock)
//     };
//     return fetch(`${myConfig.ApiUrl}stock/addupdate`, requestOptions)
//         .then(commonService.handleResponse);
// }

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeaderAppJson()
//     };
//     return fetch(`${myConfig.ApiUrl}stock`, requestOptions)
//         .then(commonService.handleResponse);
// }
