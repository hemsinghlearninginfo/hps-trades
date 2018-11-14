const express = require('express');
const router = express.Router();
const config = require('../config.json');
const userRoleService = require('./userRoles/userRole.service');

// routes
router.get('/', getAll);

module.exports = router;

async function getAll(req, res, next) {
    if (req.query.type === undefined)
        throw 'Invalid master Data';

    if (req.query.type === config.Master_UserRoles) {
        let dataUserRole = await getAllUserRole(req, res, next);
        return dataUserRole;
    }
}

async function getAllUserRole(req, res, next) {
    return userRoleService.getAll();
}

