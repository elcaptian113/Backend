const controller = require('../controllers/linkedAccounts');
var express = require('express');
const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');
var router = express.Router();

router.get('/', validateToken, verifyRole("ADMIN"), controller.getAll);
router.get('/:id', validateToken, verifyRole("ADMIN"), controller.getById);
router.get('/parent/:value', validateToken, controller.getByParent);
router.get('/student/:value', validateToken, controller.getByStudent);
router.post('/', validateToken, controller.create);
router.put('/', validateToken, controller.update);
router.delete('/', validateToken, controller.deleting);

module.exports = router;
