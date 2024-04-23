const controller = require('../controllers/modules');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/subject/:value', controller.getBySubject);
router.get('/chapter/:value', controller.getByChapter);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;
