class Game {

  constructor(numPlayers) {
    this.numPlayers = numPlayers;
    this.players = [];
  }

  addPlayer(player) {
    if (this.players.length < this.numPlayers) {
      this.players.push(player);
    } else {
      console.log("Error. Cannot add more players to the game.")
    }
  }

  canPlayerJoin() {
    return this.players.length <= this.numPlayers;
  }

  printPlayers() {
    for (player of this.players) {
      console.log(player.name);
    }
  }

  getTakenPieces() {
    let takenPieces = [];
    for (let player of this.players) {
      takenPieces.push(player.piece);
    }
    return takenPieces;
  }
}

module.exports = Game;
