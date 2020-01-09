const express = require('express');
const os = require('os');

const app = express();
const eventRouter = require('./routes/eventRouter');

app.use(express.static('dist'));
app.use('/api/event', eventRouter);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
