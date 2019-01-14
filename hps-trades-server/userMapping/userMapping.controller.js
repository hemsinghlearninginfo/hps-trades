const express = require('express');
const router = express.Router();
const userMapping = require('./userMapping.service');

// routes
router.post('/addUpdate', addUpdate);
router.get('/', getAll);

module.exports = router;

function addUpdate(req, res, next) {
  userMapping.addUpdate(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userMapping.getAll()
        .then((userMapping) => userMapping ? res.json(userMapping) : res.sendStatus(404))
        .catch(err => next(err));
}

