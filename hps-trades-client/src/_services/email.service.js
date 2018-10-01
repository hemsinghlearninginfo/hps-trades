
export const emailService = {
    sendEmail
};

export const config = {
    apiUrl: 'http://localhost:4000',
};

function sendEmail(email, userName = "Anakin Skywalker"){
    return fetch(`${config.apiUrl}/api/sendemail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userName })
    }).then(response => response.json());
}
