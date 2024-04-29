const controller = require('../controllers/courseActivity');
var express = require('express');
var router = express.Router();

const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');

router.get('/', validateToken, verifyRole("ADMIN"), controller.getAll);
router.get('/:id', validateToken, controller.getById);
router.get('/user/:value', validateToken, controller.getByUser);
router.get('/latest/:value', validateToken, controller.getByUserLast);
router.post('/', validateToken, controller.create);
router.delete('/', validateToken, verifyRole("ADMIN"), controller.deleting);

module.exports = router;
