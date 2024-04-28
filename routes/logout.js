const controller = require('../controllers/refresh');
var express = require('express');
var router = express.Router();

app.delete("/:value", controller.deleting);

module.exports = router;