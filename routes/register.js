const controller = require('../controllers/register');
var express = require('express');
var router = express.Router();


router.post("/", controller.registerHandler); 

module.exports = router;