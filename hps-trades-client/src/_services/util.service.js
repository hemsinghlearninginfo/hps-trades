import { authHeader } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const utilService = {
    isURLValidate
};

function isURLValidate(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${myConfig.ApiUrl}mailToken/?token=${url}`, requestOptions)
        .then(commonService.handleResponse);
}
