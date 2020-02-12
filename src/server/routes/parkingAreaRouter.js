var express = require('express');
var router = express.Router();

var parkingAreaController = require('../controllers/parkingAreaController');

router.post('/create', parkingAreaController.createParkingArea);
router.get('/all', parkingAreaController.getParkingAreas);

module.exports = router;