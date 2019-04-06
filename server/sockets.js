const Player = require('./models/Player');
const Game = require('./models/Game');
const Util = require('./util.js');

/**
 * UUID for room
 */
let roomNumber = 0;

/**
 * Global games object
 */
const GAMES = {};

/**
 * Global reference to socket.io
 */
let io;

module.exports.initSockets = function (server) {
  // register the server connection with socket.io
  io = require('socket.io').listen(server);

  /**
   * Socket events
   */
  io.sockets.on('connection', socket => {
    // Util.logVar('New socket connected', socket.id); 

    // Listen for create game events
    createGame(socket);

    // Listen for join game events
    joinGame(socket);

    // Listen for select player events
    selectPlayer(socket);

  });
}

/**
 * User creates game
 */
function createGame(socket) {
  socket.on('create-game', data => {
    roomNumber++;
    const roomId = `room-${roomNumber}`;
    socket.join(roomId);

    const name = data.name;
    const numPlayers = data.numPlayers;
    console.log('\'create-game\' received from client');
    console.log('===============');
    Util.logVar('room-id', roomId);
    Util.logVar('name', name);
    Util.logVar('numPlayers', numPlayers);
    console.log('===============\n');

    const game = new Game(roomId, numPlayers);
    addNewGame(roomId, game);

    socket.emit('new-game-created', {
      roomId: roomId,
      name: name
    });
  });
}

/**
 * User selects character
 */
function selectPlayer(socket) {
  socket.on('select-player', data => {
    const name = data.name;
    const roomId = data.roomId;
    const piece = data.piece;

    console.log('\'select-player\' received from client');
    console.log('===============');
    Util.logVar('room-id', roomId);
    Util.logVar('name', name);
    Util.logVar('piece', piece);
    console.log('===============\n');

    const player = new Player(socket.id, name, piece);
    const game = getGame(roomId);
    game.addPlayer(player);

    console.log('*Request game module to print players*');
    console.log('===============');
    game.printPlayersForServerLogs();
    console.log('===============\n');

    const gameStarted = game.isStarted();

    /**
     * Emit this to everyone in the game
     */
    io.in(roomId).emit('player-selected', {
      player: player,
      gameStarted: gameStarted
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

    console.log('\'player-join-game\' received from client');
    console.log('===============');
    Util.logVar('room-id', roomId);
    Util.logVar('name', name);
    console.log('===============\n');

    const game = getGame(roomId);

    let canJoin = false;
    let takenPieces;

    if (game != undefined) {
      if (game.canPlayerJoin()) {
        socket.join(roomId);
        canJoin = true;
        console.log('*Request taken pieces from game module*');
        takenPieces = game.getTakenPieces();
        console.log('===============');
        console.log('takenPieces: ' + takenPieces);
        console.log('===============\n');
      } else {
        console.log('Error: game is full!');
      }
    } else {
      console.log('Error: game is undefined');
    }

    socket.emit('player-joined-game', {
      name: name,
      roomId: roomId,
      canJoin: canJoin,
      takenPieces: takenPieces
    })
    
  })
}

function addNewGame(roomId, game) {
  GAMES[roomId] = game;
}

function getGame(roomId) {
  return GAMES[roomId];
}
