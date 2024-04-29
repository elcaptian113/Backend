const controller = require('../controllers/chapters');
var express = require('express');
var router = express.Router();

const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/subject/:value', controller.getBySubject);
router.post('/', validateToken, verifyRole("ADMIN"), controller.create);
router.put('/', validateToken, verifyRole("ADMIN"), controller.update);
router.delete('/', validateToken, verifyRole("ADMIN"), controller.deleting);

module.exports = router;
