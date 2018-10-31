import { authHeader } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const eventService = {
    getAllActiveEventTypes
};

function getAllActiveEventTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${myConfig.ApiUrl}eventtype`, requestOptions)
        .then(commonService.handleResponse);
}