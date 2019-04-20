class Card {
    //    constructor(type, value) {
    //        this.type = type;
    //        this.value = value;
    //    }
    // Jerry: updated, this class serves as a collection of card functions.
    constructor() {
    }
    
    shuffleCards(cardstoshuffle) {
      let cardsShuffled = shuffle(cardstoshuffle);
      return cardsShuffled

    }

    drawOneRandomCards(cardsToDrawFrom) {
      let oneRandomCard = cardsToDrawFrom[Math.floor(Math.random() * cardsToDrawFrom.length)];
      return oneRandomCard;
    }

    removeOneCard(cardSet, cardToRemove) {
      let newCardSet = [];
      for (let i = 0; i < cardSet.length; i++) {
        if (cardSet[i] !== cardToRemove) {
          newCardSet.push(cardSet[i]);
        }
      }
      return newCardSet;
    }
 
    combineSets(cardSet1, cardSet2, cardSet3) {
      let combinedSet = cardSet1.concat(cardSet2).concat(cardSet3);
      return combinedSet
    }
    
    distributeCards(cardsToDistribute, numberOfPlayer, playerIndex) {
      let cardsForPlayer = [];
      for (let i = playerIndex; i < cardsToDistribute.length; i+=numberOfPlayer) {
        cardsForPlayer.push(cardsToDistribute[i]);
      }
      return cardsForPlayer;
    }
}
    
module.exports = Card;