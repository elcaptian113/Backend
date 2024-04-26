var express = require('express');
var router = express.Router();
const controller = require('../controllers/refresh');


router.get("/", controller.handleRefresh);

module.exports = router;