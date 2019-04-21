import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SocketService } from './../socket.service';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  // @Output() landingPageStatusChange = new EventEmitter();

  private creatorPlayerName: string = '';
  private numberOfPlayers: number;
  private createGameError: boolean = false;
  private createGameErrorMessage: string = '';

  private joiningPlayerName: string = '';
  private roomId: string = '';
  private joinGameError: boolean = false;
  private joinGameErrorMessage: string = '';

  // Dependency injection syntax
  constructor(private socketService: SocketService) {   
  }

  ngOnInit() {
  }

  createGame(): void {
    if(this.creatorPlayerName === '') {
      this.createGameErrorMessage = 'Please enter your name.';
      this.createGameError = true;
      return;
    }

    if(this.numberOfPlayers === undefined) {
      this.createGameErrorMessage ='Please enter the number of players.';
      this.createGameError = true;
      return;
    }

    this.createGameError = false;
    GameComponent.PLAYER_NAME = this.creatorPlayerName;
    this.socketService.createGame(this.creatorPlayerName, this.numberOfPlayers);
  }

  joinGame(): void {
    if(this.joiningPlayerName === '') {
      this.joinGameErrorMessage = 'Please enter your name.';
      this.joinGameError = true;
      return;
    }

    if(this.roomId === '') {
      this.joinGameErrorMessage = 'Please enter the room id.';
      this.joinGameError = true;
      return;
    }

    this.joinGameError = false;

    GameComponent.PLAYER_NAME = this.joiningPlayerName;
    this.socketService.joinGame(this.joiningPlayerName, this.roomId);

    // const event = new JoinGame(this.joiningPlayerName, this.roomId);
    // this.landingPageStatusChange.emit(event);
  }

}
