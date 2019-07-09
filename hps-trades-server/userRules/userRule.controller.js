const express = require('express');
const router = express.Router();
const userRuleService = require('./userRule.service');

// routes
router.get('/', getAll);
router.post('/addUpdate', addUpdate);

// router.post('/authenticate', authenticate);
// router.post('/forgotpasswordtoemail', forgotPasswordToEmail);
// router.post('/isvalidforgotpasswordlink', isValidForgotpasswordLink);
// router.post('/register', register);
// router.put('/updateisregistration', updateIsRegistration);
// router.get('/getallwithtype', getAllWithType);
// router.get('/current', getCurrent);
// router.get('/:id', getById);
// router.put('/:id', update);
// router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    userRuleService.getAll()
        .then(userRules => res.json(userRules))
        .catch(err => next(err));
}

function addUpdate(req, res, next) {
    userRuleService.addUpdate(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
  }


// function authenticate(req, res, next) {
//     userService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

// function forgotPasswordToEmail(req, res, next) {
//     userService.forgotPasswordToEmail(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function isValidForgotpasswordLink(req, res, next) {
//     userService.isValidForgotpasswordLink(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function register(req, res, next) {
//     userService.create(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }


// function getCurrent(req, res, next) {
//     userService.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
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

// function getAllWithType(req, res, next) {
//     userService.getAllWithType()
//         .then((userWithType) => userWithType ? res.json(userWithType) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function updateIsRegistration(req, res, next) {
//     userService.updateIsRegistration(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }