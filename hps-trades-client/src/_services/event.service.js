import { authHeader, authHeaderAppJson } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const eventService = {
    getAllActiveEventTypes,
    getEventTypesByUser,
    create
};

function getAllActiveEventTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${myConfig.ApiUrl}eventtype`, requestOptions)
        .then(commonService.handleResponse);
}

function getEventTypesByUser(userRole) {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderAppJson()
    };
    return fetch(`${myConfig.ApiUrl}event/geteventtypebyuser/?userrole=${userRole}`, requestOptions)
        .then(commonService.handleResponse);
}

function create(formEvent) {
    const requestOptions = {
        method: 'POST',
        headers: authHeaderAppJson(),
        body: JSON.stringify(formEvent)
    };
    return fetch(`${myConfig.ApiUrl}event/create`, requestOptions)
        .then(commonService.handleResponse);
}