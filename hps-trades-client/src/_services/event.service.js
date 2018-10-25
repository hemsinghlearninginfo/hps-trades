import { authHeader } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const eventService = {
    getAllEventTypes
};

function getAllEventTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(myConfig.ApiUrl + 'users', requestOptions)
        .then(commonService.handleResponse);
}