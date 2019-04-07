class LegalMoves{
    constructor() {
        this.legalMoves = {
            'study': ['hall-1', 'hall-3', 'kitchen'],
            'hall-1': ['study', 'library'],
            'library': ['hall-1', 'hall-2', 'hall-4'],
            'hall-2': ['library', 'conservatory'],
            'conservatory': ['hall-2', 'hall-5', 'lounge'],
            'hall-3': ['study', 'hall'],
            'hall-4': ['study', 'hall'],
            'hall-5': ['conservatory', 'ballroom'],
            'hall': ['hall-3', 'hall-6', 'hall-8'],
            'hall-6': ['hall', 'billiard-room'],
            'billiard-room': ['hall-4', 'hall-6', 'hall-7', 'hall-9'],
            'hall-7': ['billiard-room', 'ballroom'],
            'ballroom': ['hall-5', 'hall-7', 'hall-10'],
            'hall-8': ['hall', 'lounge'],
            'hall-9': ['billiard-room', 'dining-room'],
            'hall-10': ['ballroom', 'kitchen'],
            'lounge': ['hall-8', 'hall-11', 'conservatory'],
            'hall-11': ['lounge', 'dining-room'],
            'dining-room': ['hall-9', 'hall-11', 'hall-12'],
            'hall-12': ['dining-room', 'kitchen'],
            'kitchen': ['hall-10', 'hall-12', 'study']
          }
    }

    getLegalMovesForLocation(location) {
        return this.legalMoves[location];
    }
}

module.exports = LegalMoves;