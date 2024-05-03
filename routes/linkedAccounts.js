const controller = require('../controllers/linkedAccounts');
var express = require('express');
const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');
var router = express.Router();

router.get('/', validateToken, verifyRole("ADMIN"), controller.getAll);
router.get('/:id', validateToken, verifyRole("ADMIN"), controller.getById);
router.get('/parentp/:value', validateToken, controller.getByParentPending);
router.get('/studentp/:value', validateToken, controller.getByStudentPending);
router.get('/parenta/:value', validateToken, controller.getByParentApproved);
router.get('/studenta/:value', validateToken, controller.getByStudentApproved);
router.post('/', validateToken, controller.create);
router.put('/', validateToken, controller.update);
router.delete('/', validateToken, controller.deleting);

module.exports = router;
