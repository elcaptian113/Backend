const controller = require('../controllers/modules');
var express = require('express');
var router = express.Router();

const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/subject/:value', controller.getBySubject);
router.get('/chapter/:value', controller.getByChapter);
router.post('/', validateToken, verifyRole("ADMIN"), controller.create);
router.put('/', validateToken, verifyRole("ADMIN"), controller.update);
router.delete('/', validateToken, verifyRole("ADMIN"), controller.deleting);

module.exports = router;
