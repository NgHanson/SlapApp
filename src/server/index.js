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

const delay = ms => new Promise(res => setTimeout(res, ms));

const emitDeviceData = async (socket) => {
  while (true) {
    socket.emit('DEVICE_LOT_DATA', 
            {'DEVICE_DATA': { device_id: 53, active: true, occupied: true },
             'LOT_DATA': { lot_id: 3, capacity: 3, freeCount: 2 }
          });
    await delay(5000);
                  socket.emit('DEVICE_LOT_DATA', 
            {'DEVICE_DATA': { device_id: 53, active: true, occupied: false },
             'LOT_DATA': { lot_id: 3, capacity: 3, freeCount: 3 }
          });
    await delay(5000);
  }
};

const emitLotData = async (socket) => {
  while (true) {
    socket.emit('LOT_DATA', { lot_id: 3, capacity: 3, freeCount: 0 })
    await delay(5000);
    socket.emit('LOT_DATA', { lot_id: 3, capacity: 3, freeCount: 1 })
    await delay(5000);
    socket.emit('LOT_DATA', { lot_id: 3, capacity: 3, freeCount: 2 })
    await delay(5000);
  }
}

// Socket IO
io.on('connection', async function (socket) {
  // emitDeviceData(socket)
  // emitLotData(socket)
});

// The Things Network
// https://www.thethingsnetwork.org/docs/applications/nodejs/quick-start.html
// https://www.thethingsnetwork.org/docs/applications/nodejs/api.html
ttn.data(APP_ID, ACCESS_KEY)
  .then(function (client) {
    // listens to all uplinks from all devices
    client.on("uplink", function (devID, payload) {
      console.error("Received uplink from ", devID, payload);

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

      eventController.insertEvent(deviceId, detected, timeString).then( () => {

        deviceController.updateDeviceStatus(deviceId, detected).then( () => {

          deviceController.findDeviceLot(deviceId).then((data) => {

            let lotId = data[0]['lot_id'];
            deviceController.findOccupancyValues(lotId).then((data) => {

              //ADD ERROR CHECKS
              let capactiy = data[0]['capacity'];
              let freecount = data[0]['freecount'];
              // NOTE SENDING 2 SOCKET UPDATES IN A ROW IS SLOW - MAY NEED TO PUT INTO ONE MESSAGE
              io.emit('DEVICE_LOT_DATA', 
                {'DEVICE_DATA': { device_id: deviceId, active: true, occupied: detected },
                 'LOT_DATA': { lot_id: lotId, capacity: capactiy, freeCount: freecount }
              });
              
            });
          });
        });

      });

    });
  })
  .catch(function (error) {
    console.error("Error", error)
    //process.exit(1)
  });

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));