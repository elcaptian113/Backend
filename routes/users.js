const controller = require('../controllers/users');
var express = require('express');
const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');

var router = express.Router();


router.get('/', validateToken, verifyRole("ADMIN"), controller.getAll);
router.get('/:id', validateToken, controller.getById);
router.get('/username/:value', validateToken, controller.getByUsername);
router.post('/', controller.create);
router.put('/', validateToken, controller.update);
router.delete('/', validateToken, verifyRole("ADMIN"), controller.deleting);

module.exports = router;