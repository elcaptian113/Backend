const controller = require('../controllers/users');
var express = require('express');
const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');

var router = express.Router();


router.get('/', validateToken, verifyRole("ADMIN"), controller.getAll);
router.get('/:id', controller.getById);
router.get('/username/:value', controller.getByUsername);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;