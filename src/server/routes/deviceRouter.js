var express = require('express');
var router = express.Router();

var deviceController = require('../controllers/deviceController');

router.get('/fromlot/:lot_id', deviceController.getDevicesForLot);

module.exports = router;