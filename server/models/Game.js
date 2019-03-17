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
}

module.exports = Game;
