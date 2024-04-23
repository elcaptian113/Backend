const controller = require('../controllers/chapters');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/subject/:value', controller.getBySubject);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;
