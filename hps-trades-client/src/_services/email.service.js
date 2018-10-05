import { authHeader } from '../_helpers';


export const emailService = {
    sendEmail
};

export const config = {
    apiUrl: 'http://localhost:4000',
};

function sendEmail(email, userName = "Anakin Skywalker") {
    const requestOptions = {
        method: 'POST',
        headers: { ... authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userName })
    };
    return fetch(`${config.apiUrl}/api/sendemail`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                alert(response);
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}