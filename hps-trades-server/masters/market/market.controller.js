const express = require('express');
const router = express.Router();
const marketService = require('./market.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    marketService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    marketService.getAll()
        .then(markets => res.json(markets))
        .catch(err => next(err));
}

function getById(req, res, next) {
    marketService.getById(req.params.id)
        .then(market => market ? res.json(market) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    marketService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    marketService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}