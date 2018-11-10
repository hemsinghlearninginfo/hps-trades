const express = require('express');
const router = express.Router();
const eventService = require('./event.service');
const util = require('../_helpers/util')

// routes
router.post('/create', create);
router.get('/geteventtypebyuser', getEventTypeByUser);
router.get('/geteventsbyuser', getAllEventsByUser);
// router.get('/', getAll);
// router.get('/:id', getById);

module.exports = router;

function create(req, res, next) {
    eventService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getEventTypeByUser(req, res, next) {
    if (req.query.userrole === undefined)
        throw 'Invalid URL';
    eventService.getEventTypeByUser(req.query.userrole)
        .then(types => res.json(types))
        .catch(err => next(err));
}

function getAllEventsByUser(req, res, next) {
    if (req.query.userid === undefined)
        throw 'Invalid URL';
    eventService.getAllEventsByUser(req.query.userid)
        .then(types => res.json(types))
        .catch(err => next(err));
}

// function getAll(req, res, next) {
//     userService.getAll()
//         .then(users => res.json(users))
//         .catch(err => next(err));
// }

// function getById(req, res, next) {
//     userService.getById(req.params.id)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     userService.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }