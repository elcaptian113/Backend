const controller = require('../controllers/courseActivity');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/user/:value', controller.getByUser);
router.get('/latest/:value', controller.getByUserLast);
router.post('/', controller.create);
router.delete('/', controller.deleting);

module.exports = router;
