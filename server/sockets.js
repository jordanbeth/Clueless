const Player = require('./models/Player');
const Game = require('./models/Game');
const Util = require('./util.js');

let socketsConnected = 1;
let rooms = 0;

const GAMES = {};
module.exports.initSockets = function (server) {
  const io = require('socket.io').listen(server);

  /**
   * Socket events
   */
  io.sockets.on('connection', socket => {

    Util.logVar('New socket connected', socketsConnected++);
    
    createGame(socket);
    
    joinGame(socket);
    
    selectPlayer(socket, io);

  });
}

/**
 * User creates game
 */
function createGame(socket) {
  socket.on('create-game', data => {
    rooms++;
    const roomId = `room-${rooms}`;
    socket.join(roomId);

    const name = data.name;

    console.log('===============');
    Util.logVar('name', data.name);
    Util.logVar('numPlayers', data.numPlayers);
    console.log('===============');

    const game = new Game(data.numPlayers);
    GAMES[roomId] = game;

    socket.emit('new-game-created', {
      name: name,
      roomId: roomId
    });
  });
}

/**
 * User selects character
 */
function selectPlayer(socket, io) {
  socket.on('select-player', data => {
    const name = data.name;
    const roomId = data.roomId;
    const piece = data.piece;

    console.log('===============');
    Util.logVar('roomId', roomId);
    Util.logVar('name', name);
    Util.logVar('player', piece);
    console.log('===============');

    const player = new Player(socket.id, data.name, data.piece);
    const game = getGame(roomId);
    game.addPlayer(player);

    /**
     * Emit this to everyone in the game
     */
    io.in(roomId).emit('player-selected', {
      player: player
    });
  })
}

/**
 * Player joins the game
 */
function joinGame(socket) {
  socket.on('player-join-game', data => {
    const name = data.name;
    const roomId = data.roomId;

    console.log('===============');
    Util.logVar('name', name);
    Util.logVar('roomId', roomId);
    console.log('===============');

    const game = getGame(roomId);

    let canJoin = false;
    let takenPieces;

    if (game != undefined) {
      socket.join(roomId);
      if (game.canPlayerJoin()) {
        canJoin = true;
        takenPieces = game.getTakenPieces();
        console.log('===============');
        console.log('takenPieces: ' + takenPieces);
        console.log('===============');
      } else {
        console.log('game is full');
      }
    }

    socket.emit('player-joined-game', {
      name: name,
      roomId: roomId,
      canJoin: canJoin,
      takenPieces: takenPieces
    })
  })
}

function getGame(roomId) {
  return GAMES[roomId];
}
