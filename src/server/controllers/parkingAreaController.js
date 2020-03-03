var { exHigherTraffic9To5, exBusierOnWeekdays, exMoralsNearDinner, exBusierOnValentines } = require('../../constants/examples.js');
var { exBody9to5, exBodyWeekday, exBodyDinner, exBodyValentines } = require('../../constants/example_post_requests.js');

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
exports.getNearbyParking = async (req, res) => {
	const body = req.body;
	let nearbyParking = await getNearbyParkingLots(body);
	for (let i = 0; i < nearbyParking.length; i++) {
		let capacity = await dbQuery('SELECT COUNT(*) FROM devices WHERE lot_id = ' + nearbyParking[i].lot_id);
		let free = await dbQuery('SELECT COUNT(*) FROM devices WHERE lot_id = ' + nearbyParking[i].lot_id + ' AND active = TRUE AND occupied = FALSE');
		nearbyParking[i].capacity = capacity[0]['count'];
		nearbyParking[i].free = free[0]['count'];
	}
	console.log(nearbyParking);
	res.send({nearbyParking: nearbyParking});
};

// https://stackoverflow.com/questions/48626761/node-js-mysql-pool-connection-with-async-await
exports.getParkingAnalyticsForTimeRange = async (req, res) => {
	const body = req.body;
	// Example lot
	if (body.lot_id === "1") {
		const answer = await getExampleAnalyticsQueries(body);
		res.send({devices: answer});
	} else {
		console.log("NEED TO IMPLEMENT getParkingAnalyticsForTimeRange for different lots!! ======================================")
	}
}

async function getNearbyParkingLots(body) {
	minLat = Math.min(body.lat-1, body.lat+1);
	maxLat = Math.max(body.lat-1, body.lat+1);
	minLng = Math.min(body.lng-1, body.lng+1);
	maxLng = Math.max(body.lng-1, body.lng+1);
	const q_nearbyLots = 'SELECT * FROM lots  WHERE lat >'+minLat+' AND lat < '+maxLat+' AND lng >'+minLng+' AND lng < '+maxLng+' ORDER BY lot_id ASC';
	const nearbyLots = await dbQuery(q_nearbyLots);
	return nearbyLots
}

async function getExampleAnalyticsQueries(body) {
	const q_lot = 'SELECT * FROM devices WHERE lot_id = ' + body.lot_id + ' ORDER BY device_id ASC';
	let curr_response = await dbQuery(q_lot);
	for (var i = 0; i < curr_response.length; i++) {
		if (JSON.stringify(body.analyticsSelections) === JSON.stringify(exBody9to5)) {
			console.log("9 to 5 example");
			curr_response[i]['analytics_percentage'] = exHigherTraffic9To5.lotValues[results.rows[i].device_id];
		} else if (JSON.stringify(body.analyticsSelections) === JSON.stringify(exBodyWeekday)) {
			console.log("weekday example body")
			curr_response[i]['analytics_percentage'] = exBusierOnWeekdays.lotValues[results.rows[i].device_id];
		} else if (JSON.stringify(body.analyticsSelections) === JSON.stringify(exBodyDinner)) {
			console.log("morals example body")
			curr_response[i]['analytics_percentage'] = exMoralsNearDinner.lotValues[results.rows[i].device_id];
		} else if (JSON.stringify(body.analyticsSelections) === JSON.stringify(exBodyValentines)) {
			console.log("valentines example body")
			curr_response[i]['analytics_percentage'] = exBusierOnValentines.lotValues[results.rows[i].device_id];
		}
	}
	return curr_response
	console.log("done")
}

async function dbQuery(queryString) {
	return new Promise((resolve) => {
		pool.query(queryString, (error, results) => {
			if (error) {
				console.log("ERROR IN QUERY: ", queryString)
				console.log(error)
			} else {
				if (results && results.rows) {
					resolve(results.rows);
				}
			}
		})
	})
}
