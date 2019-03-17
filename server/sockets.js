const Player = require('./models/Player');
const Game = require('./models/Game');
const Util = require('./util.js');

let socketsConnected = 1;
let rooms = 0;

const GAMES = {};
exports.initSockets = function(server) {
    const io = require('socket.io').listen(server);
   
    /**
     * Socket events
     */
    io.sockets.on('connection', socket => {

        Util.logVar("New socket connected", socketsConnected++);

        socket.on('send-message', msg => {
            // get the text frmo the message
            console.log(`msg == ${msg.text}`);
        })

        socket.on('create-game', data => {
            rooms++;
            const roomId = `room-${rooms}`;

            socket.join(roomId);
            Util.logVar("data.name", data.name);
            Util.logVar("data.numPlayers", data.numPlayers);
            
            const player = new Player(data.name);
            const game = new Game(data.numPlayers);
            game.addPlayer(player);

            GAMES.roomId = game;
            
            socket.emit('new-game-created', { name: data.name, roomId: roomId });
        })

        socket.on('player-join-game', data => {
            Util.logVar("data.name:", data.name);
            Util.logVar("data.roomId:", data.roomId);
            const game = getGame(roomId);
        })

        socket.on('playerJoinGame', function(name) {
            //Should this function check for 6 players or does the client?
            // putsMessage(['clientPlayerJoinGame', name]); //Prints message to console
            // //This function shall add the new player to the global players array
            // aPlayer = new Player(name,socket.id,'player');
            // gameState.notReadyPlayers++;
            // gameState.totalPlayers++;
            // gameState.addPlayer(aPlayer);
            // io.sockets.emit('bdcstPlayerJoinedGame', aPlayer);
            // //io.sockets.socket(socket.id).emit('availablePieces', gameState.pieces);
            // printDebug('Numer of Players: '+ gameState.notReadyPlayers);
            // printDebug(inspect(gameState.players));
        });
        
    });
}

function getGame(roomName) {
    return GAMES[roomName];
}