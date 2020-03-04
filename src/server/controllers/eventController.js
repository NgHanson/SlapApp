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
exports.listEvent = function(req, res) {
  console.log('EXECUTE LIST EVENT');
  pool.query('SELECT * FROM event', (error, results) => {
    if (error) {
      console.log('ERROR', error);
    } else {

      if (results && results.rows) {
        var list = results.rows;
        console.log(list);
        res.send({events: list});
      }
    }

  });
};

// Create Event
exports.insertEvent = function(req, res) {
  const { deviceId, detected, time} = req.body;
  console.log('backend insert event', req.body);
  let query = `INSERT INTO event (device_id, time, detected) VALUES (${deviceId}, ${time}, ${detected})`;
  pool.query(query, (error, results) => {
    if (error) {
      console.error('EVENT INSERT ERR', error);
    } else {
      console.error('event insert good', results);
    }
  });
};
//https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/