const express = require('express');
const router = express.Router();
const emailService = require('./email.service');
const util = require('../_helpers/util');
const commonDbMethods = require('../_helpers/commonDbMethods');

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

    let queryString = req.query.url;
    let decryptUrl = util.decrypt(queryString);

    let action = util.getQueryStringValue(decryptUrl, 'action');
    let token = util.getQueryStringValue(decryptUrl, 'token');
    let recordId = util.getQueryStringValue(decryptUrl, 'rec');

    let emailToken = {
      recordId,
      link1: queryString
    }
    emailService.isValidLink(emailToken)
      .then(response => {
        //res.json({})
        if (response) {
          commonDbMethods.performActionsAsPerEmailULR(action, recordId)
            .then(response => {
              return response;
            })
            .catch(error => {
              return error;
            });
        }
        else {
          throw 'Invalid URL';
        }
      })
      .catch(err => {
        //next(err)
        throw 'Error in processing your request, please try agian.'
      });
  }
  else {
    throw 'Invalid url';
  }
}


//#region - Private method start

//#endregion - Private method ends