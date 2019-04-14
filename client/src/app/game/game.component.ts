import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from 'src/models/Player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private static DEBUG: boolean = true;

  private static boardLocationIds: string[] = [ 'study', 'hall-1', 'library', 'hall-2','conservatory', 'hall-3','hall-4',
                                         'hall-5','hall','hall-6','billiard-room','hall-7','ballroom','hall-8',
                                         'hall-9','hall-10','lounge','hall-11','dining-room','hall-12','kitchen']
  
  
  private static suggestionPlayerIds: string[] = ['colonelMustard', 'missScarlet', 'mrGreen', 'mrsPeacock','mrWhite','professorPlum'];
  private static suggestionWeaponIds: string[] = ['candlestick', 'revolver', 'knife', 'leapPipe','rope','wrench'];
  private static suggestionRoomIds: string[] = ['suggest-study', 'suggest-hall', 'suggest-lounge', 'suggest-library','suggest-billiardRoom','suggest-diningRoom', 'suggest-conservatory', 'suggest-ballroom', 'suggest-kitchen'];
  

  public static PLAYER_NAME: string;
  
  private playersByPiece: {} = {};
 
  private myPlayerPiece: string;
  private roomId: string;
  private currentStatus: string = 'Awaiting players...';

  private isMyPlayer: boolean = true;
  
  private isMyTurn: boolean = false;

  private hasMoved: boolean = false;
  
  private hasMadeSuggestion: boolean = false;

  private legalMoves: string[] = [];

  // Dependency injection syntax
  constructor(private modalService: NgbModal,
              private socketService: SocketService,
              private toastr: ToastrService) {

  }

  ngOnInit() {

    /**
     * Player selected event from server
     */
    this.socketService.onPlayerSelected().subscribe((msg) => {
      console.log('onPlayerSelected received from game component.');
      this.roomId = msg.roomId;
      const newPlayer = msg.newPlayer;
      
      const socketId = newPlayer.socketId;
      const name = newPlayer.name
      const piece = newPlayer.piece;

      if(GameComponent.DEBUG) {
        console.log(`socketId: ${socketId}`);
        console.log(`name: ${name}`);
        console.log(`piece: ${piece}`);
      }

      this.toastr.success(`${name} is playing as ${piece}`);
      // the first message received will be my player
      if(GameComponent.PLAYER_NAME === name) {
        this.myPlayerPiece = piece;
        console.log(`myPlayerPiece = ${this.myPlayerPiece}`);
      }
    })

    /**
     * Start game event from server
     */
    this.socketService.onStartGame().subscribe((msg) => {
      console.log('onStartGame received from game component.');
        const players = msg.players;
        for(let p of players) {
          const playerPiece = p.piece;
          const mappedPlayer = new Player(p.socketId, p.name, playerPiece, p.currentLocation);
          console.log(mappedPlayer);
          this.playersByPiece[playerPiece] = mappedPlayer;
        }

        const firstPiece = msg.firstPiece;
        this.startGame(firstPiece);
    });


    /**
     * Get legal moves event from server. This is for the current myPlayer only.
     */
    this.socketService.onGetLegalMovesResponse().subscribe((msg) => {
      const moves = msg.legalMoves;
      this.isMyTurn = true;
      
      this.legalMoves = [];
      for(let i = 0; i < moves.length; i++) {
        const move = moves[i];
        this.legalMoves.push(move);
      }

      this.currentStatus = `It is your turn! Select a room and make a suggestion.`;
      for(let i = 0; i < GameComponent.boardLocationIds.length; i++) {
        const location = GameComponent.boardLocationIds[i];
        const node: HTMLElement = document.getElementById(location);
        if(this.legalMoves.indexOf(location) != -1) {
            node.classList.add('selectable-room');
        } else {
            node.classList.remove('selectable-room');
        }
      }
    })

    /**
     * Player moved returned from server.
     */
    this.socketService.onPlayerMoved().subscribe((msg) => {
      const piece = msg.piece;
      const location = msg.location;
      this.movePieceOnGameboard(piece, location);
    })

    /**
     * Suggestion made: FIXME
     */
    this.socketService.onSuggestionMade().subscribe((msg) => {
      const piece = msg.piece;
      const suggestedPlayer = msg.suggestedPlayer;
      const weapon = msg.weapon;
      const room = msg.room;
      if(piece != this.myPlayerPiece) {
        this.toastr.info(`${piece} suggested ${suggestedPlayer} in ${room} with ${weapon}`);
      }
    })

    this.socketService.onNextPlayerUp().subscribe((msg) => {
      const piece = msg.piece;
      this.handleNextPlayerUp(piece);

    })

    
  }
  
  /**
   * Start of the game
   * @param firstPiece 
   */
  private startGame(firstPiece: string) {
    console.log('starting the game');
    
    // iterate over the keys of the object and put the players on the board
    for(let piece in this.playersByPiece) {
      const player: Player = this.playersByPiece[piece];
      
      const node: HTMLElement = player.node;
      const location = player.currentLocation;
      let elm = document.getElementById(player.currentLocation);
      elm.appendChild(node);
    }
    
    console.log('myPlayerPiece: ' + this.myPlayerPiece);
    if(this.myPlayerPiece != firstPiece) {
      this.isMyTurn = false;
      this.currentStatus = `${firstPiece} is making a move...`
      this.toastr.info(`${firstPiece} is first. Please wait for your turn`);
    } else {
      this.toastr.success(`${firstPiece} take your turn!`);
      this.resetStateForMyTurn();
      const myPlayer = this.getMyPlayer();
      const location = myPlayer.currentLocation;
      this.socketService.getLegalMoves(this.roomId, location);
    }
  }

  /**
   * Handle next player up.
   * @param piece 
   */
  private handleNextPlayerUp(piece: string) {
    if(this.myPlayerPiece === piece) {
     this.resetStateForMyTurn();
      const myPlayer = this.getMyPlayer();
      const location = myPlayer.currentLocation;
      this.socketService.getLegalMoves(this.roomId, location);
    } else {
      this.isMyTurn = false;
      this.toastr.success(`${piece}'s turn`);
      this.currentStatus = `${piece} is making a move...`
    }

  }

  private resetStateForMyTurn() {
    this.isMyTurn = true;
    this.hasMoved = false;
    this.hasMadeSuggestion = false;
  }

  boardClicked(elmRef: HTMLElement) {
    // console.log(this.hasMoved)
    if(!this.isMyTurn || this.hasMoved) {
      return;
    }
    const location = elmRef.id;
    if(this.legalMoves.indexOf(location) != -1) {
      const formattedId = location.replace('-', ' ').toLowerCase();
      console.log(formattedId);
      this.currentStatus = `You selected the ${location}`;
      this.hasMoved = true;
      this.socketService.movePlayer(this.roomId, this.myPlayerPiece, location);
      this.resetBoardColors();
    }

  }

  /**
   * A method to handle suggestions from the suggestion modal
   */
  handleSuggestion() {
    let suggestedPlayer;
    for(let suggestionPlayerId of GameComponent.suggestionPlayerIds) {
      let player: any = document.getElementById(suggestionPlayerId);
      if(player.checked) {
        suggestedPlayer = player.value;
      }
    }
    console.log(suggestedPlayer);
    if(suggestedPlayer === undefined) {
      return;
    }

    let suggestedWeapon;
    for(let suggestionWeaponId of GameComponent.suggestionWeaponIds) {
      let weapon: any = document.getElementById(suggestionWeaponId);
      if(weapon.checked) {
        suggestedWeapon = weapon.value;
      }
    }
    console.log(suggestedWeapon);
    if(suggestedWeapon === undefined) {
      return;
    }

    let suggestedRoom;
    for(let suggestionRoom of GameComponent.suggestionRoomIds) {
      let room: any = document.getElementById(suggestionRoom);
      if(room.checked) {
        suggestedRoom = room.value;
      }
    }
    console.log(suggestedRoom);
    if(suggestedRoom === undefined) {
      return;
    }

    this.currentStatus = `You suggested ${suggestedPlayer} in ${suggestedRoom} with ${suggestedWeapon}`;
    this.socketService.makeSuggestion(this.roomId, this.myPlayerPiece, suggestedPlayer, suggestedWeapon, suggestedRoom);
    this.modalService.dismissAll();
  }

  /**
   * A method to handle suggestions from the suggestion modal
   */
  handleAccusation() {
    let accusedPlayer;
    for(let suggestionPlayerId of GameComponent.suggestionPlayerIds) {
      let player: any = document.getElementById(suggestionPlayerId);
      if(player.checked) {
        accusedPlayer = player.value;
      }
    }
    console.log(accusedPlayer);
    if(accusedPlayer === undefined) {
      return;
    }

    let accusedWeapon;
    for(let suggestionWeaponId of GameComponent.suggestionWeaponIds) {
      let weapon: any = document.getElementById(suggestionWeaponId);
      if(weapon.checked) {
        accusedWeapon = weapon.value;
      }
    }
    console.log(accusedWeapon);
    if(accusedWeapon === undefined) {
      return;
    }

    let accusedRoom;
    for(let suggestionRoom of GameComponent.suggestionRoomIds) {
      let room: any = document.getElementById(suggestionRoom);
      if(room.checked) {
        accusedRoom = room.value;
      }
    }
    console.log(accusedRoom);
    if(accusedRoom === undefined) {
      return;
    }

    // this.currentStatus = `You suggested ${suggestedPlayer} in ${suggestedRoom} with ${suggestedWeapon}`;
    // this.socketService.makeSuggestion(this.roomId, this.myPlayerPiece, suggestedPlayer, suggestedWeapon, suggestedRoom);
    this.modalService.dismissAll();
  }

  resetBoardColors() {
    for(let i = 0; i < GameComponent.boardLocationIds.length; i++) {
      const location = GameComponent.boardLocationIds[i];
      const node: HTMLElement = document.getElementById(location);
      if(node.classList.contains('selectable-room')) {
          node.classList.remove('selectable-room');
      }
    }
  }

  private movePieceOnGameboard(piece: string, location: string) {
    const player = this.playersByPiece[piece];
    
    // The player image
    const node = player.node;

    // remove from old locationn
    const currentLocation = player.currentLocation;
    const currElm = document.getElementById(currentLocation);
    currElm.removeChild(node);

    // move to new location
    player.currentLocation = location;
    const newElm = document.getElementById(location);
    newElm.appendChild(node);
  }

  
  private getMyPlayer() {
    return this.playersByPiece[this.myPlayerPiece];
  }
  
  openModal(content) {
    this.modalService.open(content, {
      size: 'lg',
    });
  }
}
