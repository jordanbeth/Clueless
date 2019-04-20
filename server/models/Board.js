const util = require('util');

class Board {
  constructor() {
    this.init();
  }

  init() {
    this.empty = ''

    this.boardState = {
      'study': [],
      'hall-1': [],
      'library': [],
      'hall-2': [],
      'conservatory': [],
      'hall-3': [],
      'hall-4': [],
      'hall-5': [],
      'hall': [],
      'hall-6': [],
      'billiard-room': [],
      'hall-7': [],
      'ballroom': [],
      'hall-8': [],
      'hall-9': [],
      'hall-10': [],
      'lounge': [],
      'hall-11': [],
      'dining-room': [],
      'hall-12': [],
      'kitchen': []
    }
  }

  printBoard() {
    util.log(this.boardState);
  }

  isHallWayAndIsBlocked(location) {
    let isHallWayAndIsBlocked = false;
    if (this.isHallway(location)) {
      const hallway = this.boardState[location];
      if (hallway.length > 0) {
        isHallWayAndIsBlocked = true;
      }
    }
    return isHallWayAndIsBlocked;
  }

  isHallway(location) {
    if (location.includes("hall-")) {
      return true;
    } else {
      return false;
    }
  }

  movePlayerOnBoard(piece, location) {
    const oldLocation = Object.keys(this.boardState).find(key => this.boardState[key].includes(piece));
    if (oldLocation === undefined) {
      console.warn(`Piece [${piece}] does not exist on the board!`);
      return;
    }

    const oldIdx = this.boardState[oldLocation].indexOf(piece);

    this.boardState[oldLocation].splice(oldIdx, 1);

    if (!this.isHallWayAndIsBlocked(location)) {
      this.boardState[location].push(piece);
    }

    this.printBoard();
  }

  addPieceToStartingLocation(piece, startingLocation) {
    this.boardState[startingLocation].push(piece);
  }
}

module.exports = Board;
