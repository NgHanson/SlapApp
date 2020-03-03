const express = require('express');
const http = require("http");
const bodyParser = require('body-parser');
const socketIO = require("socket.io");

const ttnConfig = require('../../config')['development']['ttn'];
const ttn = require("ttn");
const APP_ID = ttnConfig['appId'];
const ACCESS_KEY = ttnConfig['accessKey'];

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const eventRouter = require('./routes/eventRouter');
const parkingAreaRouter = require('./routes/parkingAreaRouter');
const deviceRouter = require('./routes/deviceRouter');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use('/api/event', eventRouter);
app.use('/api/parking', parkingAreaRouter);
app.use('/api/devices', deviceRouter);

app.get('/api/emit', function (req, res) {
  io.emit('DEVICE_DATA', {app_id: 'slap'});
  res.send('Test Socket IO Emit');
})

// Socket IO
io.on('connection', function (socket) {
  socket.emit('testing', { data: 'hello world' });
});

// The Things Network
// https://www.thethingsnetwork.org/docs/applications/nodejs/quick-start.html
// https://www.thethingsnetwork.org/docs/applications/nodejs/api.html
ttn.data(APP_ID, ACCESS_KEY)
  .then(function (client) {
    // listens to all uplinks from all devices
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID);
      console.log(payload);
      // use ttn_uplink model
      // INSERT INTO event (device_id, time, detected) VALUES (53, '2020-03-03 19:10:25', TRUE)
      query_string = ''
      io.emit('DEVICE_DATA', payload);

      //JS Date() auto convert to local time.
      var local_time = new Date(payload['metadata']['time']);
      console.log(payload.payload_fields.parkState)
      console.log(local_time)
      var event = {
    event_id: id,
    device_id: deviceId,
    time: time,
    detected: detected
}
      //pretty sure the date is UTC time (its +5 hrs from local)
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    //process.exit(1)
  });

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));