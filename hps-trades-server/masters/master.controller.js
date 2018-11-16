const express = require('express');
const router = express.Router();
const config = require('../config.json');
const userRoleService = require('./userRoles/userRole.service');

// routes
router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    if (req.query.type === undefined)
        throw 'Invalid master Data';

    if (req.query.type === config.Master_UserRoles) {
        getAllUserRole(req, res, next)
            .then(types => res.json(types))
            .catch(err => next(err));
    }
}

async function getAllUserRole(req, res, next) {
    return await userRoleService.getAll();
}

