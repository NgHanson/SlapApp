var express = require('express');
var router = express.Router();

var eventController = require('../controllers/eventController');

router.get('/all', eventController.listEvent);
router.post('/create', eventController.createEvent);

module.exports = router;