const express = require('express');
const router = express.Router();
const emailService = require('./email.service');

// routes
router.post('/sendemail', sendemail);

module.exports = router;

function sendemail(req, res, next) {
  console.log('-----sendemail-----');
  // emailService.send(req.body)
  //       .then(() => res.json({}))
  //       .catch(err => next(err));
}

function sendEmailForPassword(req, res, next) {
  emailService.sendEmailForPassword(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}