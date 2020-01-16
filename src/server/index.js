const express = require('express');

const ttnConfig = require('../../config')['development']['ttn'];
const ttn = require("ttn");
const APP_ID = ttnConfig.APP_ID;
const ACCESS_KEY = ttnConfig.ACCESS_KEY;

const app = express();
const eventRouter = require('./routes/eventRouter');

app.use(express.static('dist'));
app.use('/api/event', eventRouter);

// The Things Network
// https://www.thethingsnetwork.org/docs/applications/nodejs/quick-start.html
// https://www.thethingsnetwork.org/docs/applications/nodejs/api.html
ttn.data(APP_ID, ACCESS_KEY)
  .then(function (client) {
    // listens to all uplinks from all devices
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
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
