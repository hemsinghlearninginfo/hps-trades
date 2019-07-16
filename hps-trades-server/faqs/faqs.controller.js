const express = require('express');
const router = express.Router();
const faqsService = require('./faqs.service');

// routes
router.get('/', getAll);
router.post('/', addUpdate);

module.exports = router;

function getAll(req, res, next) {
  faqsService.getAll()
    .then(userRules => res.json(userRules))
    .catch(err => next(err));
}

function addUpdate(req, res, next) {
  faqsService.addUpdate(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
