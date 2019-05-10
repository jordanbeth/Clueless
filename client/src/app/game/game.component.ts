import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from 'src/models/Player';
import { CardHelper } from 'src/models/CardHelper';
import { InactivePieces } from 'src/models/InactivePieces';

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
  
  
  private static suggestionPlayerIds: string[] = ['modalColonelMustard', 'modalMissScarlet', 'modalMrGreen', 'modalMrsPeacock','modalMrWhite','modalProfessorPlum'];
  private static suggestionWeaponIds: string[] = ['candlestick', 'revolver', 'knife', 'leadPipe','rope','wrench'];
  private static suggestionRoomIds: string[] = ['suggest-study', 'suggest-hall', 'suggest-lounge', 'suggest-library','suggest-billiardRoom','suggest-diningRoom', 'suggest-conservatory', 'suggest-ballroom', 'suggest-kitchen'];
  
  private accusationBtn: string = "accusation-btn";
  private suggestionBtn: string = "suggestion-btn";
  private endBtn: string = "end-turn-btn";

  public static PLAYER_NAME: string;
  
  // Pieces each first letter inn piece are uppercase, i.e. Colonel Mustard, Mr. White
  private playersByPiece: {} = {};

  private opponents: Player[] = [];
  private opponentsIndex = 0;
 
  private myPlayerPiece: string;
  private roomId: string;
  private currentStatus: string = 'Awaiting players...';

  private isMyPlayer: boolean = true;
  
  private isMyTurn: boolean = false;

  private hasMoved: boolean = false;
  private hasMadeSuggestion: boolean = false;
  private hasMadeAccusation: boolean = false;

  private myCards: any[] = [];

  private legalMoves: string[] = [];

  private requestingPlayerSocketId: string;

  private lastSuggestion: string;

  private currentLocation: string = '';

  private wasMovedBySuggestion: boolean = false;

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

      this.toastr.success(`${name} is playing as ${piece}`, 'Player Joined');
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
          const cards = p.cards;
          const mappedPlayer = new Player(p.socketId, p.name, playerPiece, p.currentLocation, cards);
          console.log(mappedPlayer);
          this.playersByPiece[playerPiece] = mappedPlayer;
          if(playerPiece != this.myPlayerPiece) {
            this.opponents.push(mappedPlayer);
          } else {

            for(let i = 0; i < cards.length; i++) {
              const card = cards[i];
              const id = CardHelper.getCardHtmlId(card);
              this.myCards[i] = {id: id, value: card}
            }

            // console.log(this.myCards);
          }
        }
        const inactivePlayersPieces = msg.inactivePlayersPieces;
        console.log(inactivePlayersPieces);
        InactivePieces.assignLocations(inactivePlayersPieces);
        console.log('can we get here 3'); 
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
      if(this.legalMoves.length == 0) { // no legal moves are available
        alert('You have no legal moves avaialble. Either make an accusation or end your turn.');
        // lose turn or make an accusation
        document.getElementById(this.suggestionBtn).setAttribute('diabled', 'true');
        document.getElementById(this.accusationBtn).click();

        this.currentStatus = 'You have no legal moves available. Either make an accusation or end your turn.';

      } else {
        this.currentStatus = `It is your turn ${this.myPlayerPiece}! Select a room.`;
        for(let i = 0; i < GameComponent.boardLocationIds.length; i++) {
          const location = GameComponent.boardLocationIds[i];
          const node: HTMLElement = document.getElementById(location);
          if(this.legalMoves.indexOf(location) != -1) {
              node.classList.add('selectable-room');
          } else {
              node.classList.remove('selectable-room');
          }
        }
      }

    })

    /**
     * Player moved returned from server.
     */
    this.socketService.onPlayerMoved().subscribe((msg) => {
      const piece = msg.piece;
      const location = msg.location;
      if(piece == this.myPlayerPiece) {
        this.currentLocation = location;
      }
      this.movePieceOnGameboard(piece, location);
    })

    /**
     * Suggestion made
     */
    this.socketService.onSuggestionMade().subscribe((msg) => {
      const piece = msg.piece; // Colonel Mustard ... etc
      const suggestedPlayer = msg.suggestedPlayer;
      const weapon = msg.weapon;
      const room = msg.room;
      this.lastSuggestion = `${piece} suggested '${suggestedPlayer}' in '${room}' with '${weapon}'`
      if(piece != this.myPlayerPiece) {
        this.currentStatus = this.lastSuggestion;
      } else {
        this.currentStatus = `You suggested '${suggestedPlayer}' in '${room}' with '${weapon}'`;
        this.getCluesFromOtherPlayer();
      }

      if(suggestedPlayer === this.myPlayerPiece) {
        this.wasMovedBySuggestion = true;
      }

      this.toastr.info(this.currentStatus, 'Suggestion Made', {
        disableTimeOut:  false
      });
      this.movePieceOnGameboard(suggestedPlayer, room);
    })

    /**
     * Next player up
     */
    this.socketService.onNextPlayerUp().subscribe((msg) => {
      const piece = msg.piece;
      this.handleNextPlayerUp(piece);
    })


    /**
     * Accusation made
     */
    this.socketService.onAccusationMade().subscribe((msg) => {
      const piece = msg.piece; // Colonel Mustard ... etc
      const accusedPlayer = msg.accusedPlayer;
      const weapon = msg.weapon;
      const room = msg.room;

      const didWin = msg.didWin;

      this.toastr.info(`${piece} accused ${accusedPlayer} in ${room} with ${weapon}`, 'Accusation Made', {
        disableTimeOut:  true
      });
      
      if(didWin) {
        if(piece === this.myPlayerPiece) {
          alert('Game Over. You win the game!!!');
        } else {
          alert(`Game Over. ${piece} won the game :(`);
        }
        setTimeout(location.reload, 3000);
      } else {
        if(piece === this.myPlayerPiece) {
          this.currentStatus = 'You\'re accusation was wrong you may only watch now.';
        } 
        this.toastr.error(`${piece}'s accusation was wrong`, 'Accusation incorrect');
        console.log('Reaching to a point before deleting the player on board');
        // Jerry: we will keep the player's piece on board
        // this.removePlayerFromBoard(piece);
        this.movePieceOnGameboard(piece, 'billiard-room');
        this.resetBoardColors();
      }
    })


    /**
     * Offer clue
     */
     this.socketService.onRequestOfferClue().subscribe((msg) => {
       console.log('You must offer a clue or reject the offer');

       this.requestingPlayerSocketId = msg.requestingPlayerSocketId;
       document.getElementById('offer-clue-modal-btn').click();
     })

     /**
      * 
      */
     this.socketService.onClueOfferRejected().subscribe((msg) => {
        
        this.getCluesFromOtherPlayer();
     })

     this.socketService.onClueOffered().subscribe((msg) => {
      const requestedPlayerSocketId = msg.requestedPlayerSocketId;
      const clue = msg.card;

      const opponent = this.getOpponentBySocketId(requestedPlayerSocketId);
      this.toastr.success(`${opponent.piece} offered ${clue}`, 'Clue Offered');
     })
    
  }
  
    /**
   * Start of the game
   * @param inactivePlayersPieces 
   */
  //private placeInactivePieces(inactivePlayersPieces: string[]) {
  //  console.log('place all inactive pieces in middle of the board (Billiard Room)');
  //  new InactivePieces()
  //}


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
      this.toastr.success(`${firstPiece} is first. Please wait for your turn`, 'Game Started');
    } else {
      this.toastr.success(`${firstPiece} take your turn!`, 'Game Started');
      this.resetStateForMyTurn();
      const myPlayer = this.getMyPlayer();
      this.currentLocation = myPlayer.currentLocation;
      this.socketService.getLegalMoves(this.roomId, this.currentLocation);
    }
  }

  /**
   * Handle next player up.
   * @param piece 
   */
  private handleNextPlayerUp(piece: string) {

    let toastrMessage;
    if(this.myPlayerPiece === piece) {
     this.resetStateForMyTurn();
      const myPlayer = this.getMyPlayer();
      const location = myPlayer.currentLocation;
      toastrMessage = `Its your turn`
      this.socketService.getLegalMoves(this.roomId, location);
    } else {
      toastrMessage = `${piece}'s turn`;
      this.isMyTurn = false;
      this.currentStatus = `${piece} is making a move...`
    }
    this.toastr.success(toastrMessage, 'Next player up');

  }

  private resetStateForMyTurn() {
    this.isMyTurn = true;
    this.hasMoved = false;
    this.hasMadeSuggestion = false;
    this.hasMadeAccusation = false;
    this.opponentsIndex = 0;
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
      this.currentLocation = location;
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
      if(player == undefined) continue;

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

    let suggestedRoom = this.getMyPlayer().currentLocation;

    console.log(this.playersByPiece)
    this.socketService.makeSuggestion(this.roomId, this.myPlayerPiece, suggestedPlayer, suggestedWeapon, suggestedRoom);
    this.modalService.dismissAll();
    this.hasMadeSuggestion = true;
  }

  /**
   * A method to handle suggestions from the suggestion modal
   */
  handleAccusation() {
    let accusedPlayer;
    for(let suggestionPlayerId of GameComponent.suggestionPlayerIds) {
      let player: any = document.getElementById(suggestionPlayerId);
      if(player == undefined) continue;

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

    this.currentStatus = `You accused ${accusedPlayer} in ${accusedRoom} with ${accusedWeapon}`;
    this.socketService.makeAccusation(this.roomId, this.myPlayerPiece, accusedPlayer, accusedWeapon, accusedRoom);
    this.modalService.dismissAll();
    this.hasMadeAccusation = true;
  }

  endTurn() {
    this.socketService.endTurn(this.roomId, this.myPlayerPiece);
    this.wasMovedBySuggestion = false;
    this.resetBoardColors();
  }

  resetBoardColors(): void {
    for(let i = 0; i < GameComponent.boardLocationIds.length; i++) {
      const location = GameComponent.boardLocationIds[i];
      const node: HTMLElement = document.getElementById(location);
      if(node.classList.contains('selectable-room')) {
          node.classList.remove('selectable-room');
      }
    }
  }

  private movePieceOnGameboard(piece: string, location: string): void {
    const player = this.playersByPiece[piece];
    console.log("player : " + player)
    console.log("location : " + location);
    if(player === undefined) {
      console.log("it is reached here");
      let elmToRemove = document.getElementById(InactivePieces.lookUpPieceId(piece));
      elmToRemove.remove();
      const node: HTMLElement = document.createElement('IMG');
      node.setAttribute('id', InactivePieces.lookUpPieceId(piece));
      node.setAttribute('src', InactivePieces.lookUpImageUrl(piece));
      node.setAttribute('width', '50px');
      let newElm = document.getElementById(location);
      newElm.appendChild(node);   
      return;
    }
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

  /**
   * Get clues from other player.
   */
  private getCluesFromOtherPlayer(): void {
    if(this.opponentsIndex >= this.opponents.length) {
      alert('All players could not offer a clue');
      return;
    }
    const opponent = this.opponents[this.opponentsIndex];
    const socketId = opponent.socketId;
    const myPlayerSocketId = this.getMyPlayer().socketId;
    this.socketService.getClueFromPlayer(this.roomId, myPlayerSocketId, socketId);
    this.opponentsIndex++;
  }

  /**
   * Get my player.
   */
  private getMyPlayer(): Player {
    return this.playersByPiece[this.myPlayerPiece];
  }
  
  /**
   * Open Suggestion modal
   * @param content 
   */
  openModalSuggestion(content) {
    this.modalService.open(content, {
      size: 'lg',
    });

    // const player: Player = this.getMyPlayer();
    // const playerId = player.playerId;
    // console.log(playerId);

    // const elm: HTMLElement = document.getElementById(playerId);
    // elm.parentElement.parentElement.remove();
  }

  /**
   * Open Accusation modal
   * @param content 
   */
  openModalAccusation(content) {
    this.modalService.open(content, {
      size: 'lg',
    });

    // const player: Player = this.getMyPlayer();
    // const playerId = player.playerId;
    // console.log(playerId)
    // const elm: HTMLElement = document.getElementById(playerId);
    // elm.parentElement.parentElement.remove();
  }

  /**
   * Open My cards modal
   * @param content 
   */
  openMyCardsModal(content) {
    this.modalService.open(content, {
      size: 'lg',
    });
  }

  /**
   * Open Offer clue
   * @param content 
   */
  openOfferClueModal(content) {
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  handleOfferClue() {
    for(let card of this.myCards) {
      let id = card.id;

    }
    const elm: any = document.getElementById('offerClueSelectDropdown');
    let card = elm.value;
    console.log("card offered: " + card);
    this.socketService.offerClue(this.requestingPlayerSocketId, this.getMySocketId(), card);
    this.modalService.dismissAll();
  }

  handleRejectOfferClue() {
    this.socketService.rejectOfferClue(this.requestingPlayerSocketId, this.getMySocketId());
    this.modalService.dismissAll();
  }

  private getMySocketId() {
    return this.getMyPlayer().socketId;
  }

  private getOpponentBySocketId(socketId: string): Player {
    for(let opp of this.opponents) {
      if(opp.socketId === socketId) {
        return opp;
      }
    }
  }

  disableSuggestionButton() {
    console.log("this.wasMovedBySuggestion === " + this.wasMovedBySuggestion);
    if(!this.isMyTurn) {
      return true;
    } else if(this.currentLocation.includes('hall-')) {
      return true;
    } else if (!(this.hasMoved || this.wasMovedBySuggestion)) {
      return true;
    } else if(this.hasMadeSuggestion) {
      return true;
    }
    
    return false;
  }

  private removePlayerFromBoard(piece: string) {
    const removedPlayer: Player = this.playersByPiece[piece];
    const removedPlayerId = removedPlayer.playerId;

    console.log("removedPlayerId: " + removedPlayerId);

    let elm: HTMLElement = document.getElementById(removedPlayerId);
    elm.parentElement.removeChild(elm);
  }
}
