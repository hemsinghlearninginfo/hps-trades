const nodemailer = require('nodemailer');
const fs = require("fs");
const EmailTemplate = require('email-templates').EmailTemplate;
const db = require('_helpers/db');
const Email = db.Email;

module.exports = {
    //sendEmail,
    sendEmailForPassword
};

async function sendEmailForPassword(emailParam) {
    var emailObject = new Email(emailParam);
    emailObject.template = "_template/forgotPassword";
    emailObject.from = emailObject.from || process.env.HPS_TRADES_GMAIL_ID_WITH_NAME;
    emailObject.subject = emailObject.subject || 'Password Reset - HPS Trades';

    sendEmail(emailObject);
    //var sendResetPasswordLink = getTemplate(emailParam);
    // var sendResetPasswordLink = transporter.templateSender(
    //     new EmailTemplate(emailParam.template), {
    //         from: emailParam.from,
    //     });

    // console.log('sendResetPasswordLink', sendResetPasswordLink);

    // sendResetPasswordLink({
    //     to: emailObject.to,
    //     subject: emailObject.subject
    // }, {
    //         name: name,
    //         username: username,
    //         token: tokenUrl
    //     }, function (err, info) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log('Link sent\n' + JSON.stringify(info));
    //         }
    //     });
}

function sendEmail(emailParam) {
    emailParam.to = emailParam.to || 'hemsingh81@gmail.com';
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.HPS_TRADES_GMAIL_ID,
            pass: process.env.HPS_TRADES_GMIAL_PWD
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    emailParam.from = emailParam.from || process.env.HPS_TRADES_GMAIL_ID;
    emailParam.body = parseBodyFromTemplate(emailParam)

    let mailOptions = {
        from: 'hps.trades.email@gmail.com',
        to: 'hemsingh81@gmail.com',
        subject: 'Password Reset - HPS Trades',
        text: 'Hello world?',
        html: '<b>Hello world</b>'
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function parseBodyFromTemplate(emailObject) {
    let result = '';
    try {
        result = fs.readFileSync(`${emailObject.template}/html.ejs`, 'utf8').toString();
        result = result.replace(/<#=NAME=#>/g, 'Hem');
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return result;
}