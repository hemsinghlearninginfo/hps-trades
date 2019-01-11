const express = require('express');
const router = express.Router();
const userMapping = require('./userMapping.service');

// routes
router.post('/addUpdate', addUpdate);
router.post('/get', get);

module.exports = router;

function addUpdate(req, res, next) {
  userMapping.addUpdate(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function get(req, res, next) {
  userMapping.get(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

