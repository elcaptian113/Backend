const controller = require('../controllers/quizes');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/module/:value', controller.getByModule);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;
