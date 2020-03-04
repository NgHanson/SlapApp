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

const eventController = require('./controllers/eventController');
const deviceController = require('./controllers/deviceController');

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
      console.error("Received uplink from ", devID, payload);

      //io.emit('DEVICE_DATA', payload);

      //JS Date() auto convert to local time.
      //pretty sure the date is UTC time (its +5 hrs from local)
      //store in db as GMT time
      let deviceId = payload['dev_id'];
      let time = new Date(payload['metadata']['time']);
      let timeString = `${time.getFullYear()}-${time.getMonth()}-${time.getDay()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      let detected = payload['payload_fields']['parkState'] ? true : false;
      var event = {
        deviceId: deviceId,
        time: timeString,
        detected: detected,
      }

      eventController.insertEvent(event);
      deviceController.updateDeviceStatus({deviceId: deviceId, detected: detected});
    });
  })
  .catch(function (error) {
    console.error("Error", error)
    //process.exit(1)
  });

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));