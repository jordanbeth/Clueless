const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(path.join(__dirname, '../client/dist/Clueless')))

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname, '../client'));
});


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit localhost:${PORT}`);
});

const io = require("socket.io").listen(server);

/**
 * Socket events
 */
io.sockets.on('connection', function (socket) {
  console.log('Socket connected');
  
});

