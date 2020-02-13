const express = require('express');
var bodyParser = require('body-parser')

const ttnConfig = require('../../config')['development']['ttn'];
const ttn = require("ttn");
const APP_ID = ttnConfig['appId'];
const ACCESS_KEY = ttnConfig['accessKey'];

const app = express();
const eventRouter = require('./routes/eventRouter');
const parkingAreaRouter = require('./routes/parkingAreaRouter');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('dist'));
app.use('/api/event', eventRouter);
app.use('/api/parking', parkingAreaRouter)

// The Things Network
// https://www.thethingsnetwork.org/docs/applications/nodejs/quick-start.html
// https://www.thethingsnetwork.org/docs/applications/nodejs/api.html
ttn.data(APP_ID, ACCESS_KEY)
  .then(function (client) {
    // listens to all uplinks from all devices
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)

      // SAMPLE OUTPUT -> put this into a model?
      // [0] Received uplink from  dot1
      // [0] {
      // [0]   app_id: 'slap',
      // [0]   dev_id: 'dot1',
      // [0]   hardware_serial: '006FA2FD087753A2',
      // [0]   port: 1,
      // [0]   counter: 82,
      // [0]   payload_raw: <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>,
      // [0]   payload_fields: { myTestValue: 'Hello, world!' },
      // [0]   metadata: {
      // [0]     time: '2020-02-01T02:42:22.276849379Z',
      // [0]     frequency: 914.9,
      // [0]     modulation: 'LORA',
      // [0]     data_rate: 'SF9BW125',
      // [0]     airtime: 205824000,
      // [0]     coding_rate: '4/5',
      // [0]     gateways: [ [Object] ]
      // [0]   }
      // [0] }

      //JS Date() auto convert to local time.
      var local_time = new Date(payload['metadata']['time']);
      //pretty sure the date is UTC time (its +5 hrs from local)
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    //process.exit(1)
  })

// Do we want the front end to listen to device uplinks?
// or
// On refresh the fresh data is pulled
// In both the device uplink causes an event table update...

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
