import { JoinGame } from 'src/messages/JoinGame';
import { CreateGame } from './../messages/CreateGame';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title: String = 'Clue-Less';
  private isConnectedToGame: boolean;

  constructor() {}

  ngOnInit() {
    this.isConnectedToGame = false;
  }

  handleLandingPageStatusChange(event) {
    console.log(event);
    if(event instanceof CreateGame) {

    } else if (event instanceof JoinGame) {

    }

    this.isConnectedToGame = true;
  }

}
