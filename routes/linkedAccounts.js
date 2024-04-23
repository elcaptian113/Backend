const controller = require('../controllers/linkedAccounts');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/parent/:value', controller.getByParent);
router.get('/student/:value', controller.getByStudent);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;
