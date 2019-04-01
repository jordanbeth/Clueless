class Game {

  constructor(id, numPlayers) {
    this.id = id;
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

  printPlayers() {
    console.log(`Players in game: ${this.id}`);
    for(let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      console.log(`${i + 1} - ${player.name} playing as ${player.piece}`);
    }
  }
}

// Export the Game class so that it can be imported using require
module.exports = Game;
