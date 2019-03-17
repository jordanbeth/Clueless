const express = require('express');
const http = require('http');
const path = require('path');
const app = express();


const PORT = process.env.PORT || 4200;

const APP_ROOT = path.join(__dirname, '../client/dist/Clueless');

app.use(express.static(APP_ROOT));


app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client'));
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit localhost:${PORT}`);
});

const sockets = require('./sockets.js');
sockets.initSockets(server);

