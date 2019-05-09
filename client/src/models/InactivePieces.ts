export class InactivePieces {

    private static pieceToImageMap: {} = {
      'Colonel Mustard': '../../assets/colonelMustard.png',
      'Miss Scarlet': '../../assets/missScarlet.png',
      'Mr. Green': '../../assets/mrGreen.png',
      'Mrs. Peacock': '../../assets/mrsPeacock.png',
      'Mr. White': '../../assets/mrWhite.png',
      'Professor Plum': '../../assets/professorPlum.png'
    }
  
    private static pieceToIdMap: {} = {
      'Colonel Mustard': 'colonelMustard',
      'Miss Scarlet': 'missScarlet',
      'Mr. Green': 'mrGreen',
      'Mrs. Peacock': 'mrsPeacock',
      'Mr. White': 'mrWhite',
      'Professor Plum': 'professorPlum'
    }
  
    static assignLocations(inactivePieces: string[]): void {
      for(let piece of inactivePieces) {
        console.log('now in the assignLocations loop');
        let imageUrl = this.pieceToImageMap[piece];
        console.log(imageUrl);
        let playerId = this.pieceToIdMap[piece];
        const node: HTMLElement = document.createElement('IMG');
        node.setAttribute('id', playerId);
        node.setAttribute('src', imageUrl);
        node.setAttribute('width', '50px');
        console.log('we are here now');
        let elm = document.getElementById('billiard-room');
        console.log('can we get here 1');
        elm.appendChild(node);   
        console.log('can we get here 2'); 
      }  
    }

    static lookUpPieceId(piece: string): string {
      let pieceId = this.pieceToIdMap[piece];
      return pieceId;
    }

    static lookUpImageUrl(piece: string): string {
      let imageUrl = this.pieceToImageMap[piece];
      return imageUrl;
    }    

  }