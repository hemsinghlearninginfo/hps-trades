import { authHeader } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';


export const emailService = {
    isURLValidate,
    emailForNewUserRegistration
};


function isURLValidate(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${myConfig.ApiUrl}email/isvalidlink?url=${url}`, requestOptions)
        .then(commonService.handleResponse);
}


function emailForNewUserRegistration(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${myConfig.ApiUrl}email/emailfornewuserregistration`, requestOptions)
        .then(commonService.handleResponse);
}


