class Player {


  constructor(socketId, name, piece, currentLocation) {
    this.socketId = socketId;
    this.name = name;
    this.piece = piece;
    this.currentLocation = currentLocation;
    this.cards = [];
    this.hasMoved = false;
    this.hasMadeSuggestion = false;
  }

  static getPieceForPlayerId(id) {
    const pieceToIdMap = {
      'colonelMustard': 'Colonel Mustard',
      'missScarlet': 'Miss Scarlet',
      'mrGreen': 'Mr. Green',
      'mrsPeacock': 'Mrs. Peacock',
      'mrsWhite': 'Mrs. White',
      'professorPlum': 'Professor Plum'
    }

    return pieceToIdMap[piece];
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

  resetMoveState() {
    this.hasMadeSuggestion = false;
    this.hasMoved = false;
  }
};

module.exports = Player;
