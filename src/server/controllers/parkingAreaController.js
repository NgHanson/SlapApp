const Pool = require('pg').Pool

const dbConfig = require('../../../config')['development']['database'];

//var Event = require('../models/event');

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
})


// Create Parking Lot
exports.createParkingArea = function(req, res) {
  
}

// Get Parking Lots
exports.getParkingAreas = function(req, res) {
  console.log("GET PARKING LOTS");
  pool.query('SELECT * FROM lots', (error, results) => {
    if (error) {
      console.log("ERROR", error);
    } else {
      if (results && results.rows) {
        var list = results.rows;
        console.log(list);
        res.send({parkingAreas: list});
      }
    }
  });
};

// Get Nearby Parking Lots
exports.getNearbyParking = function(req, res) {
	console.log(req.body);
	console.log(req.body.lat);
	minLat = Math.min(req.body.lat-1, req.body.lat+1);
	maxLat = Math.max(req.body.lat-1, req.body.lat+1);
	minLng = Math.min(req.body.lng-1, req.body.lng+1);
	maxLng = Math.max(req.body.lng-1, req.body.lng+1);
	const q_nearbyLots = 'SELECT * FROM lots  WHERE lat >'+minLat+' AND lat < '+maxLat+' AND lng >'+minLng+' AND lng < '+maxLng+' ORDER BY lot_id ASC';
	pool.query(q_nearbyLots, (error, results) => {
		if (error) {
			console.log("ERROR in getNearbyParking", error);
		} else {
			if (results && results.rows) {
				console.log(results.rows)
				res.send({nearbyParking: results.rows});
			}
		}
	});
}