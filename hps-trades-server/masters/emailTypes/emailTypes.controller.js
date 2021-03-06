﻿const express = require('express');
const router = express.Router();
const emailTypeService = require('./emailType.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    emailTypeService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    emailTypeService.getAll()
        .then(types => res.json(types))
        .catch(err => next(err));
}

function getById(req, res, next) {
    emailTypeService.getById(req.params.id)
        .then(type => type ? res.json(type) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    emailTypeService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    emailTypeService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}