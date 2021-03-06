class Player {


  constructor(socketId, name, piece, currentLocation) {
    this.socketId = socketId;
    this.name = name;
    this.piece = piece;
    this.currentLocation = currentLocation;
    this.cards = [];
    this.hasMoved = false;
    this.hasMadeSuggestion = false;
    this.hasMadeAccusation = false;
  }

  isTurnOver() {
    return this.hasMadeSuggestion && this.hasMoved
  }

  setHasMadeSuggestion(hasMadeSuggestion) {
    this.hasMadeSuggestion = hasMadeSuggestion;
  }

  setHasMoved(hasMoved) {
    this.hasMoved = hasMoved;
  }

  setHasMadeAccusation() {
      this.hasMadeAccusation = true;
  }

  resetMoveState() {
    this.hasMadeSuggestion = false;
    this.hasMoved = false;
  }
};

module.exports = Player;
