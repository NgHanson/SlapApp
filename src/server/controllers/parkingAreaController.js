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
  pool.query('SELECT * FROM parkingarea', (error, results) => {
    if (error) {
      console.log("ERROR", error);
    } else {
      if (results && results.rows) {
        var list = results.rows;
        console.log(list);
      }
    }
  });
};