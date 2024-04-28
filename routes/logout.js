const controller = require('../controllers/refresh');
var express = require('express');
var router = express.Router();

router.delete('/', controller.deleting);

module.exports = router;