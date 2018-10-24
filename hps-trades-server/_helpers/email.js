const nodemailer = require('nodemailer');
const fs = require("fs");

module.exports = {
    sendEmail,
    parseEmailBodyFromTemplate,
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.HPS_TRADES_GMAIL_ID,
        pass: process.env.HPS_TRADES_GMIAL_PWD
    }
});

async function sendEmail(emailParam) {
    let mailOptions = {
        from: emailParam.from || process.env.HPS_TRADES_GMAIL_ID_WITH_NAME,
        to: emailParam.to,
        subject: emailParam.subject,
        text: emailParam.textBody,
        html: emailParam.htmlBody,
    };
    console.log(mailOptions);
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log('Error: ', error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
}

function parseEmailBodyFromTemplate(emailParam, isHTML = true) {
    let result = '';
    try {
        result = fs.readFileSync(`${emailParam.template}/${isHTML ? `html` : 'text'}.ejs`, 'utf8').toString();

        // result = result.replace(/<#=name=#>|<#=placeHolder1=#>|<#=placeHolder2=#>|<#=placeHolder3=#>|<#=placeHolder4=#>|<#=placeHolder5=#>|<#=message1=#>|<#=message2=#>|<#=message3=#>|<#=message4=#>|<#=message5=#>|<#=link1=#>|<#=link2=#>|<#=link3=#>|<#=link4=#>|<#=link5=#>/g, function (found) {
        //     return emailParam[found];
        // });

        result = result.replace(/<#=name=#>/g, emailParam.name);

        result = result.replace(/<#=placeHolder1=#>/g, emailParam.placeHolder1);
        result = result.replace(/<#=placeHolder2=#>/g, emailParam.placeHolder2);
        result = result.replace(/<#=placeHolder3=#>/g, emailParam.placeHolder3);
        result = result.replace(/<#=placeHolder4=#>/g, emailParam.placeHolder4);
        result = result.replace(/<#=placeHolder5=#>/g, emailParam.placeHolder5);

        result = result.replace(/<#=message1=#>/g, emailParam.message1);
        result = result.replace(/<#=message2=#>/g, emailParam.message2);
        result = result.replace(/<#=message3=#>/g, emailParam.message3);
        result = result.replace(/<#=message4=#>/g, emailParam.message4);
        result = result.replace(/<#=message5=#>/g, emailParam.message5);

        result = result.replace(/<#=link1=#>/g, emailParam.link1);
        result = result.replace(/<#=link2=#>/g, emailParam.link2);
        result = result.replace(/<#=link3=#>/g, emailParam.link3);
        result = result.replace(/<#=link4=#>/g, emailParam.link4);
        result = result.replace(/<#=link5=#>/g, emailParam.link5);

    } catch (e) {
        console.log('Error:', e.stack);
    }
    return result;
}
