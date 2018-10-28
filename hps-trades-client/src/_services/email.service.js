import { authHeader } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const emailService = {
    emailForNewUserRegistration
};

function emailForNewUserRegistration(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${myConfig.ApiUrl}email/emailfornewuserregistration`, requestOptions)
        .then(commonService.handleResponse);
}
