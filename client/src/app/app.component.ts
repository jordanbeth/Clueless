import { SocketService } from './socket.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title: string = 'Clue-Less';
  private isConnectedToGame: boolean;
  private roomId: string;
  private name: string;

  private showRoomId: boolean;

  constructor(private modalService: NgbModal,
              private socketService: SocketService) {

  }

  ngOnInit() {
    this.isConnectedToGame = false;
    this.showRoomId = false;
    // when a new game is created
    this.socketService.onNewGameCreated().subscribe((msg) => {
      console.log('onNewGameCreated received from app component.');
      this.name = msg.name;
      this.roomId = msg.roomId;
      this.showRoomId = true;
      // console.log(`name: ${this.name}`);
      // console.log(`roomId: ${this.roomId}`);
      this.showSelectCharacterModal();
      
    });

    // when a new game is joined
    this.socketService.onGameJoined().subscribe((msg) => {
      console.log('onGameJoined received from app component.');
      this.name = msg.name;
      this.roomId = msg.roomId;
      const canJoin = msg.canJoin;
      const takenPieces = msg.takenPieces;
      this.showRoomId = true;
      if(!canJoin) {
        alert('Unable to join game');
      } else {
        this.showSelectCharacterModal(takenPieces);
      }
      // console.log(`name: ${this.name}`);
      // console.log(`roomId: ${this.roomId}`);
    });
  }

  showSelectCharacterModal(takenPieces: string = undefined) {
    console.log(takenPieces);
    if(takenPieces == undefined) {
      document.getElementById('select-character-modal').click();
    } else {
      document.getElementById('select-character-modal').click(); 
      for(let piece of takenPieces) {
        let elm: any = document.getElementById(piece);
        if(elm != undefined) {
          elm.disabled = true;
        }
      }
    }
    this.isConnectedToGame = true;
  }

  private openModal(content) {
    this.modalService.open(content, {size: 'lg',backdrop: 'static', keyboard: false});
  }

  private handleCharacterSelected() {
    let colonlel: any = document.getElementById('colonelMustard');
    let missScarlet: any = document.getElementById('missScarlet');
    let mrGreen: any = document.getElementById('mrGreen');
    let mrsPeacock: any = document.getElementById('mrsPeacock');
    let mrWhite: any = document.getElementById('mrWhite');
    let professorPlum: any = document.getElementById('professorPlum');

    let selectedCharacter;
    if(colonlel.checked) {
      selectedCharacter = 'colonelMustard';
    } else if (missScarlet.checked) {
      selectedCharacter = 'missScarlet';
    } else if(mrGreen.checked) {
      selectedCharacter = 'mrGreen';
    } else if(mrsPeacock.checked) {
      selectedCharacter = 'mrsPeacock';
    } else if(mrWhite.checked) {
      selectedCharacter = 'mrWhite';
    } else if(professorPlum.checked) {
      selectedCharacter = 'professorPlum';
    }

    console.log('Player selected: ' + selectedCharacter);
    if(selectedCharacter != undefined) {
      this.socketService.choosePlayer(this.roomId, this.name, selectedCharacter);
      // if an elemnent is selected dismiss modal
      this.modalService.dismissAll();
    }
    
  }
}
