const controller = require('../controllers/quizActivity');
var express = require('express');
const { validateToken } = require('../middleware/jwt');
const verifyRole = require('../middleware/verifyRole');
var router = express.Router();

router.get('/', validateToken, verifyRole("ADMIN"), controller.getAll);
router.get('/:id', controller.getById);
router.get('/user/:value', validateToken, controller.getByUser);
router.get('/quiz/:value', validateToken, controller.getByQuiz);
router.post('/', validateToken, controller.create);
router.delete('/', validateToken, verifyRole("ADMIN"), controller.deleting);

module.exports = router;
