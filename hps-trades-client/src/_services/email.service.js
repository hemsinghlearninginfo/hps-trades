import { authHeader } from '../_helpers';
import { myConfig } from '../config';
import { commonService } from './';

export const emailService = {
    sendEmail
};

function sendEmail(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(myConfig.ApiUrl + 'email/sendemail', requestOptions)
        .then(commonService.handleResponse);
}
