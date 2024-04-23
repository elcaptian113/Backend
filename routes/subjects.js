const controller = require('../controllers/subjects');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;
