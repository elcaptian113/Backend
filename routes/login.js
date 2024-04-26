const controller = require('../controllers/login');
var express = require('express');
var router = express.Router();

router.post('/', controller.loginHandler);

module.exports = router;
const controller = require('../controllers/login');
var express = require('express');
var router = express.Router();


router.post('/', controller.loginHandler);


module.exports = router;