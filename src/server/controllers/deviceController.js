const Pool = require('pg').Pool

const dbConfig = require('../../../config')['development']['database'];

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

let { dbQuery } = require('./db');

// Display list of all Events.
exports.getDevicesForLot = function(req, res) {
  console.log(req.params.lot_id);
  pool.query('SELECT * FROM devices WHERE lot_id = '+req.params.lot_id+' ORDER BY device_id ASC', (error, results) => {
    if (error) {
      console.log('ERROR', error);
    } else {
      if (results && results.rows) {
        var list = results.rows;
        console.log(list[0]);
        res.send({devices: list});
      }
    }
  });
};

// ENDPOINTS NOT CALLED BY FRONTEND
exports.findDeviceLot = async function(deviceId) {
  let query = `SELECT lot_id FROM devices where device_id = ${deviceId}`;
  let lotId = await dbQuery(query);
  return lotId;
}

exports.findOccupancyValues = async function(lotId) {
  let query = `SELECT COUNT(*) as capacity,count(CASE WHEN occupied = false THEN 1 END) as freeCount FROM devices WHERE lot_id = ${lotId}`;
  let results = await dbQuery(query);
  return results;
}

exports.updateDeviceStatus = async function(deviceId, detected ) {
  let query = `UPDATE devices SET occupied = ${detected} WHERE device_id = ${deviceId}`;
  await dbQuery(query);
}

// //https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/