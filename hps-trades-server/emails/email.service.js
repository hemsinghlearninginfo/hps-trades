﻿const nodemailer = require('nodemailer');
const db = require('_helpers/db');
const Email = db.Email;

module.exports = {
    sendemail
};

async function sendemail(emailParam) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.HPS_TRADES_GMAIL_ID,
            pass: process.env.HPS_TRADES_GMIAL_PWD
        }
    });

    const emailObject = new Email(emailParam)

    emailObject.from = emailObject.from || process.env.HPS_TRADES_GMAIL_ID;
    // var mailOptions = {
    //     from: emailParam.from,
    //     to: params.to,
    //     subject: params.subject,
    //     text: params.body
    // };
    console.log(emailObject);
    // transporter.sendMail(emailObject, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

}

