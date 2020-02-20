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

// Display list of all Events.
exports.getDevicesForLot = function(req, res) {
  console.log(req.params.lot_id);
  pool.query('SELECT * FROM devices ORDER BY device_id ASC', (error, results) => {
    if (error) {
      console.log('ERROR', error);
    } else {
      if (results && results.rows) {
        var list = results.rows;
        console.log(list);
        res.send({devices: list});
      }
    }
  })
  // console.log('EXECUTE LIST EVENT');
  // pool.query('SELECT * FROM event', (error, results) => {
  //   if (error) {
  //     console.log('ERROR', error);
  //   } else {

  //     if (results && results.rows) {
  //       var list = results.rows;
  //       console.log(list);
  //       res.send({events: list});
  //     }
  //   }

  // });
};

// Create Event
// exports.createEvent = function(req, res) {
//   const { deviceId, detected } = req.body;

//   //node-postgres will convert JS date objects to expected format
//   var timestamp = new Date();

//   // pool.query('INSERT INTO event (device_id, time, detected) VALUES ($1, $2, $3)', [], (error, results) = {
//   //   if (error) {
//   //   }
//   // });
// };
// //https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/