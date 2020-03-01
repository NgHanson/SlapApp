var express = require('express');
var router = express.Router();

var parkingAreaController = require('../controllers/parkingAreaController');

router.post('/create', parkingAreaController.createParkingArea);
router.get('/all', parkingAreaController.getParkingAreas);
router.post('/nearby', parkingAreaController.getNearbyParking);
router.post('/analyticsrange', parkingAreaController.getParkingAnalyticsForTimeRange);

module.exports = router;