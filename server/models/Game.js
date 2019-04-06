class Game {

  constructor(id, numPlayers) {
    this.id = id;
    this.numPlayers = numPlayers;
    this.players = [];
  }

  canPlayerJoin() {
    return this.players.length < this.numPlayers;
  }

  addPlayer(player) {
    console.log(player);
    if (this.canPlayerJoin()) {
      this.players.push(player);
    } else {
      console.log('Error. Cannot add more players to the game.')
    }
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

  printPlayers() {
    for (player of this.players) {
      console.log(player.name);
    }
  }


  printPlayersForServerLogs() {
    console.log(`Players in game: ${this.id}`);
    for(let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      console.log(`${i + 1} - ${player.name} playing as ${player.piece}`);
    }
  }
}

// Export the Game class so that it can be imported using require
module.exports = Game;
