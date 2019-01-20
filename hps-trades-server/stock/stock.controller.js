const express = require('express');
const router = express.Router();
const stockService = require('./stock.service');
const util = require('../_helpers/util');

// routes
// router.post('/createbyuser', createByUser);
// router.get('/deletebyuser', deleteByUser);
// router.get('/geteventtypebyuser', getEventTypeByUser);
//router.get('/geteventsbyuser', getAllEventsByUser);
router.get('/', getAll);
router.get('/getallactive', getAllActive);
// router.get('/:id', getById);

module.exports = router;

function getAll(req, res, next) {
    stockService.getAll()
        .then(stocks => res.json(stocks))
        .catch(err => next(err));
}

function getAllActive(req, res, next) {
    stockService.getAllActive()
        .then(stocks => res.json(stocks))
        .catch(err => next(err));
}

// function createByUser(req, res, next) {
//     eventService.createByUser(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function deleteByUser(req, res, next) {
//     if (req.query.id === undefined)
//         throw 'Invalid URL';
//     eventService.deleteByUser(req.query.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function getEventTypeByUser(req, res, next) {
//     if (req.query.userrole === undefined)
//         throw 'Invalid URL';
//     eventService.getEventTypeByUser(req.query.userrole)
//         .then(types => res.json(types))
//         .catch(err => next(err));
// }

// function getAllEventsByUser(req, res, next) {
//     if (req.query.userid === undefined)
//         throw 'Invalid URL';
//     eventService.getAllEventsByUser(req.query.userid)
//         .then(types => res.json(types))
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