const express = require('express');
const router = express.Router();
const emailService = require('./email.service');
const util = require('../_helpers/util');

// routes
router.post('/emailfornewuserregistration', emailForNewUserRegistration);
router.post('/sendemailforpassword', sendEmailForPassword);
router.get('/isvalidlink', isValidLink);

module.exports = router;

function emailForNewUserRegistration(req, res, next) {
  emailService.emailForNewUserRegistration(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}


function sendEmailForPassword(req, res, next) {
  emailService.sendEmailForPassword(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}


function isValidLink(req, res, next) {
  if (req.query.url !== '') {
    var urlWithActionAndToken = util.decrypt(req.query.url);
    

    var action = util.getQueryStringValue(urlWithActionAndToken,'action');
    var token = util.getQueryStringValue(urlWithActionAndToken,'token');
    console.log(action);
    console.log(token);
    //emailService.isValidLink(req.body)
    //   .then(() => res.json({}))
    //   .catch(err => next(err));

    //res.send('done');
    // emailService.isValidLink(req.body)
    //   .then(() => res.json({}))
    //   .catch(err => next(err));
    // const emailTypeFound = await EmailDb.findOne({ link1: /link1/ })
    // if (!emailTypeFound) {
    //     throw 'Email type is not found';
    // }   
  }
  else {
    throw 'Invalid url';
  }
}