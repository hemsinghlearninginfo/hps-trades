const express = require('express');
const router = express.Router();
const emailService = require('./email.service');
const util = require('../_helpers/util');
const commonDbMethods = require('../_helpers/commonDbMethods');
const errorConstants = require('../_helpers/errorConstants');

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

    var urlResponse = {
      status : 'sucess',
      urlToRedirect : ''
    }

    emailService.isValidLink(emailToken)
      .then(response => {
        if (response) {
          commonDbMethods.performActionsAsPerEmailULR(action, recordId)
            .then(actionResponse => {
              urlResponse.urlToRedirect = actionResponse
              res.json({ urlResponse });
            })
            .catch(err => next(err));
        }
        else {
          throw errorConstants.GenericError;
        }
      })
      .catch(err => {
        //next(err)
        throw errorConstants.GenericError;
      });
  }
  else {
    throw errorConstants.GenericError;
  }
}


//#region - Private method start

//#endregion - Private method ends