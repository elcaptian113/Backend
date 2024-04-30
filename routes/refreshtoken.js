var express = require('express');
var router = express.Router();
const controller = require('../controllers/refresh');


router.post("/", controller.handleRefresh);
router.post("/new", controller.create);
router.delete('/', controller.deleting);

module.exports = router;