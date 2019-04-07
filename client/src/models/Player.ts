export class Player {
  private _socketId: string;
  private _name: string;
  private _piece: string;
  private _currentLocation: string;
  private _imageUrl: string;

  private _node: HTMLElement;

  private pieceToImageMap: {} = {
    'Colonel Mustard': '../../assets/colonelMustard.png',
    'Miss Scarlet': '../../assets/missScarlet.png',
    'Mr. Green': '../../assets/mrGreen.png',
    'Mrs. Peacock': '../../assets/mrsPeacock.png',
    'Mrs. White': '../../assets/mrsWhite.png',
    'Professor Plum': '../../assets/professorPlum.png'
  }

  constructor(socketId: string, name: string, piece: string, currentLocation: string) {
    this._socketId = socketId;
    this._name = name;
    this._piece = piece;
    this._currentLocation = currentLocation;
    this._imageUrl = this.pieceToImageMap[piece];
    this._node = document.createElement('IMG');
    this._node.setAttribute('src', this._imageUrl);
    this._node.setAttribute('width', '50px');
  }

  get node(): HTMLElement {
    return this._node;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set currentLocation(currentLocation: string) {
    this._currentLocation = currentLocation;
  }
  
  get currentLocation(): string {
    return this._currentLocation;
  }

  get socketId(): string {
    return this._socketId;
  }

  get piece(): string {
    return this._piece;
  }

  get name(): string {
    return this._name;
  }

  public toString() {
    return `{ name=${this._name}, piece=${this._piece}, currentLocation=${this._currentLocation}, imgUrl=${this._imageUrl} }`;
  }
}
