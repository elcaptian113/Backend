var express = require('express');
var router = express.Router();
const controller = require('../controllers/refresh');


app.get("/", controller.handleRefresh);

module.exports = router;