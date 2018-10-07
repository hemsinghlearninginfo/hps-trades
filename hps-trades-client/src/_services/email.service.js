import { authHeader } from '../_helpers';
import { myConfig } from '../config';

export const emailService = {
    sendEmail
};

function sendEmail(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ... authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(myConfig.ApiUrl + 'email/sendemail', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}