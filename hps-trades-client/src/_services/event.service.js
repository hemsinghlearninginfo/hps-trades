import { authHeader, authHeaderAppJson } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const eventService = {
    getEventTypesByUser,
    getAllEventsByUser,
    create
};

function getEventTypesByUser(userRole) {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderAppJson()
    };
    return fetch(`${myConfig.ApiUrl}event/geteventtypebyuser/?userrole=${userRole}`, requestOptions)
        .then(commonService.handleResponse);
}

function getAllEventsByUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderAppJson()
    };
    return fetch(`${myConfig.ApiUrl}event/geteventsbyuser/?userid=${userId}`, requestOptions)
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