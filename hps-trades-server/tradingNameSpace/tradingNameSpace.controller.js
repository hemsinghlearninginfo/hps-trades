const express = require('express');
const router = express.Router();
const tradingNameSpaceService = require('./tradingNameSpace.service').default;

// routes
router.get('/', getAll);
router.post('/addUpdate', addUpdate);

module.exports = router;

function getAll(req, res, next) {
  tradingNameSpaceService.getAll(req.userName)
    .then(userRules => res.json(userRules))
    .catch(err => next(err));
}

function addUpdate(req, res, next) {
  tradingNameSpaceService.addUpdate(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
