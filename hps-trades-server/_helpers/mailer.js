

var path = require("path");
var templatesDir = path.resolve(__dirname, "hpsTempEmails");
var Email = require("email-templates");

const mailjet = require("node-mailjet").connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);


const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
        "Messages": [
            {
                "From": {
                    "Email": "info@hpstrades.com",
                    "Name": "hps-trades"
                },
                "To": [
                    {
                        "Email": "hemsingh81@gmail.com",
                        "Name": "Hem Singh"
                    }
                ],
                "Subject": "Your email flight plan!",
                "TextPart": "Dear Hem Singh 1, welcome to Mailjet! May the delivery force be with you!",
                "HTMLPart": "<h3>Dear passenger 1, welcome to Mailjet!</h3><br />May the delivery force be with you!"
            }
        ]
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })

const sendEmail = (messageInfo, text, html) => {
    return mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: { Email: messageInfo.fromEmail, Name: messageInfo.fromName },
                To: [{ Email: messageInfo.email }],
                Subject: messageInfo.subject,
                TextPart: text,
                HTMLPart: html
            }
        ]
    });
};

exports.sendOne = function (templateName, messageInfo, locals) {
    const email = new Email({
        views: { root: templatesDir, options: { extension: "ejs" } }
    });

    return Promise.all([
        email.render(`${templateName}/html`, locals),
        email.render(`${templateName}/text`, locals)
    ])
        .then(([html, text]) => {
            //request.post();
            return sendEmail(messageInfo, text, html);
        })
        .catch(console.error);
};

