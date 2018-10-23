const nodemailer = require('nodemailer');
const fs = require("fs");
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
}

function sendEmail(emailParam) {
    emailParam.to = emailParam.to || 'hemsingh81@gmail.com';
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user:  process.env.HPS_TRADES_GMAIL_ID,
               pass: process.env.HPS_TRADES_GMIAL_PWD
           }
       });

    emailParam.from = emailParam.from || process.env.HPS_TRADES_GMAIL_ID;
    emailParam.body = parseBodyFromTemplate(emailParam, true);
    emailParam.text = parseBodyFromTemplate(emailParam, false)
    let mailOptions = {
        from: emailParam.from,
        to: emailParam.to,
        subject: emailParam.subject,
        text: emailParam.text,
        html: emailParam.body
    };
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log('Error: ', error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
}

function parseBodyFromTemplate(emailObject, isHTML = true) {
    let result = '';
    try {
        result = fs.readFileSync(`${emailObject.template}/${isHTML? `html` : 'text'}.ejs`, 'utf8').toString();
        result = result.replace(/<#=NAME=#>/g, 'Hem');
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return result;
}