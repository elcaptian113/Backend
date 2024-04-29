const controller = require('../controllers/quizes');
var express = require('express');
const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');
var router = express.Router();

router.get('/', validateToken, verifyRole("ADMIN"), controller.getAll);
router.get('/:id', validateToken, controller.getById);
router.get('/module/:value', validateToken, controller.getByModule);
router.post('/', validateToken, verifyRole("ADMIN"), controller.create);
router.put('/', validateToken, verifyRole("ADMIN"), controller.update);
router.delete('/', validateToken, verifyRole("ADMIN"), controller.deleting);

module.exports = router;
