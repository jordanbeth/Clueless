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

const DEBUG_MODE = true;

module.exports.initSockets = function (server) {
  // register the server connection with socket.io
  io = require('socket.io').listen(server);

  /**
   * Socket events
   */
  io.sockets.on('connection', socket => {
    // Util.logVar('New socket connected', socket.id); 

    // Listen for create game event
    createGame(socket);

    // Listen for join game event
    joinGame(socket);

    // Listen for select player event
    selectPlayer(socket);

    // Listen for legal moves event to give a player their legal moves
    getLegalMoves(socket);

    // Listen for move player event
    movePlayer(socket);

    // Listen for make suggestion event
    makeSuggestion(socket);

    // Listen for make accusation event
    makeAccusation(socket);

    // Listen for end turn event
    endTurn(socket);

    // Listen for get clue from player
    getClueFromPlayer(socket);

    // Listen for offer clue event
    offerClue(socket);

    // Listen for reject offer clue event
    rejectOfferClue(socket);

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

    if (DEBUG_MODE) {
      console.log('\'create-game\' received from client');
      console.log('===============');
      Util.logVar('room-id', roomId);
      Util.logVar('name', name);
      Util.logVar('numPlayers', numPlayers);
      console.log('===============\n');
    }

    const game = new Game(roomId, numPlayers);
    addNewGame(roomId, game);

    socket.emit('new-game-created', {
      roomId: roomId,
      name: name,
      numPlayers: numPlayers
    });
  });
}

/**
 * User selects character, this may trigger the game to start
 */
function selectPlayer(socket) {
  socket.on('select-player', data => {
    const roomId = data.roomId;
    const name = data.name;
    const piece = data.piece;

    if (DEBUG_MODE) {
      console.log('\'select-player\' received from client');
      console.log('===============');
      Util.logVar('room-id', roomId);
      Util.logVar('name', name);
      Util.logVar('piece', piece);
      console.log('===============\n');
    }

    const game = getGame(roomId);
    const currentLocation = game.getStartingLocationForPiece(piece);
    const newPlayer = new Player(socket.id, name, piece, currentLocation);
    game.addPlayer(newPlayer);

    if (DEBUG_MODE) {
      console.log('*Request game module to print players*');
      console.log('===============');
      game.printPlayersForServerLogs();
      console.log('===============\n');
    }

    game.printBoardState();

    /**
     * Emit this to everyone in the game
     */
    io.in(roomId).emit('player-selected', {
      roomId: roomId,
      newPlayer: newPlayer,
    });

    const gameStarted = game.isStarted();

    // If the game is started send a start game event
    if (gameStarted) {
      // call the rest of the code and have it execute after 500 milliseconds
      setTimeout(startGame, 500, roomId);
    }
  })
}

/**
 * Send start game event to all clients in a given room
 */
function startGame(roomId) {
  const game = getGame(roomId);
  const players = game.getPlayers();
  const firstPiece = game.getFirstPiece();

  //Jerry: draw solution
  const gameSolution = game.generateSolutionAndUpdate();

  game.distributeCards();
  for(let p of players) {
    console.log("PLAYER NAME: " + p.name +'\n');
    console.log("PLAYER CARDS: " + p.cards + '\n\n');
  }
  /**
   * Emit this to everyone in the game
   */
  io.in(roomId).emit('start-game', {
    players: players,
    firstPiece: firstPiece,
  });

}

/**
 * Player joins the game
 */
function joinGame(socket) {
  socket.on('player-join-game', data => {
    const name = data.name;
    const roomId = data.roomId;

    if (DEBUG_MODE) {
      console.log('\'player-join-game\' received from client');
      console.log('===============');
      Util.logVar('room-id', roomId);
      Util.logVar('name', name);
      console.log('===============\n');
    }

    const game = getGame(roomId);

    let canJoin = false;
    let takenPieces;

    if (game != undefined) {
      if (game.canPlayerJoin()) {
        socket.join(roomId);
        canJoin = true;
        takenPieces = game.getTakenPieces();
        if (DEBUG_MODE) {
          console.log('*Request taken pieces from game module*');
          console.log('===============');
          console.log('takenPieces: ' + takenPieces);
          console.log('===============\n');
        }
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

/**
 * Get legal moves
 */
function getLegalMoves(socket) {
  socket.on('get-legal-moves', data => {
    const roomId = data.roomId;
    const location = data.location;
    const game = getGame(roomId);
    const legalMoves = game.getLegalMovesForLocation(location);
    if (DEBUG_MODE) {
      console.log('\'get-legal-moves\' received from client');
      console.log('===============');
      Util.logVar('room-id', roomId);
      Util.logVar('location', location);
      Util.logVar('game', game);
      Util.logVar('legalMoves', legalMoves);
      console.log('===============\n');
    }
    socket.emit('get-legal-moves-response', {
      legalMoves: legalMoves
    })
  })
}

/**
 * Move player
 */
function movePlayer(socket) {
  socket.on('move-player', data => {
    const roomId = data.roomId;
    const piece = data.piece;
    const location = data.location;

    if (DEBUG_MODE) {
      console.log('\'move-player\' received from client');
      console.log('===============');
      Util.logVar('room-id', roomId);
      Util.logVar('location', location);
      Util.logVar('piece', piece);
      console.log('===============\n');
    }
    const game = getGame(roomId);
    const isPlayersTurn = game.isPlayersTurn(piece);
    const player = game.getPlayerByPiece(piece);
    console.log('isPlayersTurn: ' + isPlayersTurn);

    if (isPlayersTurn && !player.hasMoved) {
      game.movePlayer(piece, location);
      player.setHasMoved(true);
      /**
       * Emit this to everyone in the game
       */
      io.in(roomId).emit('player-moved', {
        piece: piece,
        location: location,
      });

      // if (player.isTurnOver()) {
      //   player.resetMoveState();
      //   emitNextPlayerUp(roomId);
      // }

    } else {
      console.log('illegal move.. not allowing the player to make the move');
    }

  })
}

/**
 * Make suggestion
 */

function makeSuggestion(socket) {
  socket.on('make-suggestion', data => {
    const roomId = data.roomId;
    const piece = data.piece;
    const suggestedPlayer = data.player;
    const weapon = data.weapon;
    const room = data.room;


    if (DEBUG_MODE) {
      console.log('\'make-suggestion\' received from client');
      console.log('===============');
      Util.logVar('room-id', roomId);
      Util.logVar('piece', piece);
      Util.logVar('suggestedPlayer', suggestedPlayer);
      Util.logVar('weapon', weapon);
      Util.logVar('room', room);
      console.log('===============\n');
    }
    const game = getGame(roomId);
    if (game == undefined){
      return;
    } 
    const isPlayersTurn = game.isPlayersTurn(piece);
    const player = game.getPlayerByPiece(piece);

    if (isPlayersTurn && !player.hasMadeSuggestion) {
      // game.movePlayer(piece, location);
      // player.makeSuggestion(suggestedPlayer);
      player.setHasMadeSuggestion(true);
      game.movePlayer(suggestedPlayer, room);
      /**
       * Emit this to everyone in the game
       */
      io.in(roomId).emit('suggestion-made', {
        piece: piece,
        suggestedPlayer: suggestedPlayer,
        weapon: weapon,
        room: room
        // TODO: suggestion made
        // location: location,
      });

    } else {
      console.log('illegal move.. not allowing the player to make the move');
    }

  })
}

function makeAccusation(socket) {
  socket.on('make-accusation', data => {
    const roomId = data.roomId;
    const piece = data.piece;
    const accusedPlayer = data.player;
    const weapon = data.weapon;
    const room = data.room;


    if (DEBUG_MODE) {
      console.log('\'make-accusation\' received from client');
      console.log('===============');
      Util.logVar('room-id', roomId);
      Util.logVar('piece', piece);
      Util.logVar('accusedPlayer', accusedPlayer);
      Util.logVar('weapon', weapon);
      Util.logVar('room', room);
      console.log('===============\n');
    }
    const game = getGame(roomId);
    const isPlayersTurn = game.isPlayersTurn(piece);
    const player = game.getPlayerByPiece(piece);

    if (isPlayersTurn) {

      player.setHasMadeAccusation();
      /**
       * TODO: check if accusation wins or not
       */
      console.log("Accusation: "+accusedPlayer+", "+weapon+", "+room);       
      const didWin = game.winOrLose(accusedPlayer, weapon, room);
      console.log("The player's accusation is "+didWin);        
      if(didWin == false) {
        game.eliminatePlayer();
        game.removePlayer(piece);
        setTimeout(emitNextPlayerUp, 500, roomId);
      }      


      /**
       * Emit this to everyone in the game
       */
      io.in(roomId).emit('accusation-made', {
        piece: piece,
        accusedPlayer: accusedPlayer,
        weapon: weapon,
        room: room,
        didWin: didWin
      });

    }
  })

}

function endTurn(socket) {
  socket.on('end-turn', data => {
    const roomId = data.roomId;
    const piece = data.piece;

    let game = getGame(roomId);
    let player = game.getPlayerByPiece(piece);

    if (DEBUG_MODE) {
      console.log('\'end-turn\' received from client');
    }

    player.resetMoveState();
    emitNextPlayerUp(roomId);
  })
}

function emitNextPlayerUp(roomId) {
  console.log('turn is over.. next player up');

  const game = getGame(roomId);
  console.log(roomId);
  const player = game.getNextPlayer();
  if(player === undefined) {
    return;
  }

  /**
   * Emit this to everyone in the game
   */
  io.in(roomId).emit('next-player-up', {
    piece: player.piece,
  });
}

function getClueFromPlayer(socket) {
  socket.on('get-clue-from-player', data => {
    const roomId = data.roomId;
    const requestingPlayerSocketId = data.requestingPlayerSocketId;
    const requestedPlayerSocketId = data.requestedPlayerSocketId;

    if (DEBUG_MODE) {
      console.log('\'get-clue-from-player\' received from client');
      Util.logVar('roomId', roomId);
      Util.logVar('requestingPlayerSocketId', requestingPlayerSocketId);
      Util.logVar('requestedPlayerSocketId', requestedPlayerSocketId);
    }

    io.to(requestedPlayerSocketId).emit('request-offer-clue', {
      requestingPlayerSocketId: requestingPlayerSocketId,
      requestedPlayerSocketId: requestedPlayerSocketId
    });

  })
}

function offerClue(socket) {
  socket.on('offer-clue', data => {
    const requestingPlayerSocketId = data.requestingPlayerSocketId;
    const requestedPlayerSocketId = data.requestedPlayerSocketId;
    const card = data.card;

    if (DEBUG_MODE) {
      console.log('\'offer-clue\' received from client');
      Util.logVar('requestingPlayerSocketId', requestingPlayerSocketId);
      Util.logVar('requestedPlayerSocketId', requestedPlayerSocketId);
      Util.logVar('card', card);
    }

    // send the clue back to the socket id that is requesting it
    io.to(requestingPlayerSocketId).emit('clue-offered', {
      requestedPlayerSocketId: requestedPlayerSocketId,
      card: card
    });

  })
}

function rejectOfferClue(socket) {
  socket.on('reject-offer-clue', data => {
    const requestingPlayerSocketId = data.requestingPlayerSocketId;
    const requestedPlayerSocketId = data.requestedPlayerSocketId;

    if (DEBUG_MODE) {
      console.log('\'reject-offer-clue\' received from client');
      Util.logVar('requestingPlayerSocketId', requestingPlayerSocketId);
      Util.logVar('requestedPlayerSocketId', requestedPlayerSocketId);
    }


    // send reject back to the socket id that is requesting it
    io.to(requestingPlayerSocketId).emit('clue-offer-rejected', {
      requestedPlayerSocketId: requestedPlayerSocketId
    });

  })
}

/**
 * Helpers
 */

function addNewGame(roomId, game) {
  GAMES[roomId] = game;
}

function getGame(roomId) {
  return GAMES[roomId];
}
