const express = require('express');
const router = express.Router();
const emailService = require('./email.service');

// routes
router.post('/emailfornewuserregistration', emailForNewUserRegistration);
router.post('/sendemailforpassword', sendEmailForPassword);
router.post('/isvalidlink', isValidLink);

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
  emailService.isValidLink(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
  // const emailTypeFound = await EmailDb.findOne({ link1: /link1/ })
  // if (!emailTypeFound) {
  //     throw 'Email type is not found';
  // }   
}