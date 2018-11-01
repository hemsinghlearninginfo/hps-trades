import { authHeader, authHeaderAppJson } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const eventService = {
    getAllActiveEventTypes,
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

function create(formEvent) {
    const requestOptions = {
        method: 'POST',
        headers: authHeaderAppJson(),
        body: JSON.stringify(formEvent)
    };
    console.log(requestOptions);
    return fetch(`${myConfig.ApiUrl}event/create`, requestOptions)
        .then(commonService.handleResponse);
}