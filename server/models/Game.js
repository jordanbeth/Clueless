const Board = require('./Board');
const LegalMoves = require('./LegalMoves');
const Card = require('./Card');

class Game {

  constructor(id, numPlayers) {
    this.id = id;
    this.numPlayers = numPlayers;
    this.init();
  }

  init() {
    this.legalMoves = new LegalMoves();
    this.board = new Board();
    this.players = [];
    this.currentPlayer = undefined;
    this.currentPlayerIdx = undefined;

    //Jerry: a variable that stors the solutions
    this.solutionCards = [];

    //Jerry: new card class that contains functions.
    this.cardFunctions = new Card();

    this.startingLocationMap = {
      'Colonel Mustard': 'hall-11',
      'Miss Scarlet': 'hall-8',
      'Mrs. Peacock': 'hall-2',
      'Mr. Green': 'hall-5',
      'Mrs. White': 'hall-10',
      'Professor Plum': 'hall-1'
    }

    // Jerry: initialize decks
    this.suspectCards = ['Colonel Mustard','Miss Scarlet','Mrs. Peacock','Mr. Green','Mr. White','Professor Plum'];
    this.weaponCards = ['Candle Stick','Dagger','Lead Pipe','Revolver','Rope','Wrench'];
    this.roomCards = ['Study','Library','Conservatory','Hall','Billiard Room','Ballroom','Lounge','Dining Room','Kitchen'];

  }

  //Jerry: pull out solutions and update the decks
  generateSolutionAndUpdate() {
    let theSolution = [];
    let suspectSolution = this.cardFunctions.drawOneRandomCards(this.suspectCards);
    let weaponSolution = this.cardFunctions.drawOneRandomCards(this.weaponCards);
    let roomSolution = this.cardFunctions.drawOneRandomCards(this.roomCards); 
    this.suspectCards = this.cardFunctions.removeOneCard(this.suspectCards, suspectSolution);
    this.weaponCards = this.cardFunctions.removeOneCard(this.weaponCards, weaponSolution);
    this.roomCards = this.cardFunctions.removeOneCard(this.roomCards, roomSolution);  
    console.log("The Game solution is: "+suspectSolution+", "+weaponSolution+", "+roomSolution);  
    this.solutionCards.push(suspectSolution, weaponSolution, roomSolution);
    return theSolution = theSolution.push(suspectSolution, weaponSolution, roomSolution);
  }

  //Jerry: check if accusation is correct or not, player wins if correct
  winOrLose(accusedPlayer, accusedWeapon, accusedRoom) {
    console.log("Solution: "+this.solutionCards[0]+", "+this.solutionCards[1]+", "+this.solutionCards[2]);
    console.log("Comparing player accusation: "+accusedPlayer+", "+accusedWeapon+", "+accusedRoom
                +" with the Game solution: "+this.solutionCards[0]+", "+this.solutionCards[1]+", "+this.solutionCards[2]);    
    return (accusedPlayer === this.solutionCards[0]) && (accusedWeapon === this.solutionCards[1]) && (accusedRoom === this.solutionCards[2]);
  }

  //Jerry: remove player if lost, go to next player in turn
  gameOver() {
    return true;
  }


  //Jerry: distribute card to each player
  distributeCards() {
    let combinedSet = this.cardFunctions.combineSets(this.suspectCards, this.weaponCards, this.roomCards);
    let randomCombinedSet = this.cardFunctions.shuffleCards(combinedSet);
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      player.cards = this.cardFunctions.distributeCards(randomCombinedSet, this.players.length, i);
    }    
  }

  //Jerry: eliminate the player in the players array
  eliminatePlayer() {
    console.log("this.currentPlayerIdx: "+this.currentPlayerIdx)
    this.players.splice(this.currentPlayerIdx, 1);
    console.log("new this.players.length: "+this.players.length)
    if (this.currentPlayerIdx > 0) {
      this.currentPlayerIdx--;
    }
    else {
      this.currentPlayerIdx = this.players.length - 1;
    }
    console.log("new this.currentPlayerIdx: "+this.currentPlayerIdx)  
  }

  getNextPlayer() {
    if (this.currentPlayerIdx + 1 < this.players.length) {
      this.currentPlayerIdx++;
    } else {
      this.currentPlayerIdx = 0;
    }

    if(this.players.length == 0) {
      console.log("No more players!!! Game over.");
    }
    this.currentPlayer = this.players[this.currentPlayerIdx];
    return this.currentPlayer;
  }

  getPlayerByPiece(piece) {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.piece === piece) {
        return player;
      }
    }
  }

  isPlayersTurn(piece) {
    if (this.currentPlayer != undefined) {
      return this.currentPlayer.piece === piece;
    }
  }

  movePlayer(piece, location) {
    this.board.movePlayerOnBoard(piece, location);
  }

  //Jerry: remove player piece on the board
  removePlayer(piece) {
    this.board.removePlayerOnBoard(piece);
  }

  getLegalMovesForLocation(location) {
    const moves = this.legalMoves.getLegalMovesForLocation(location);
    const legalMoves = [];
    for (let move of moves) {
      console.log(move);
      if (!this.board.isHallWayAndIsBlocked(move)) {
        legalMoves.push(move);
      };
    }
    return legalMoves;
  }


  getStartingLocationForPiece(piece) {
    return this.startingLocationMap[piece];
  }

  canPlayerJoin() {
    return this.players.length < this.numPlayers;
  }

  addPlayer(player) {
    if (this.canPlayerJoin()) {
      this.players.push(player);

      const piece = player.piece;
      const location = this.getStartingLocationForPiece(piece);
      this.board.addPieceToStartingLocation(piece, location);
    } else {
      console.log('Error. Cannot add more players to the game.');
    }
  }

  getFirstPiece() {
    let rndIndex = Math.floor(Math.random() * this.players.length);
    let rndPlayer = this.players[rndIndex];
    this.currentPlayerIdx = rndIndex;
    this.currentPlayer = rndPlayer;
    return rndPlayer.piece;
  }

  getTakenPieces() {
    let takenPieces = [];
    for (let player of this.players) {
      takenPieces.push(player.piece);
    }
    return takenPieces;
  }

  isStarted() {
    return this.players.length == this.numPlayers;
  }

  getPlayers() {
    return this.players;
  }

  printBoardState() {
    console.log(this.board.printBoard());
  }
  printPlayers() {
    for (player of this.players) {
      console.log(player.name);
    }
  }

  printPlayersForServerLogs() {
    console.log(`Players in game: ${this.id}`);
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      console.log(`${i + 1} - ${player.name} playing as ${player.piece}`);
    }
  }
}

// Export the Game class so that it can be imported using require
module.exports = Game;
