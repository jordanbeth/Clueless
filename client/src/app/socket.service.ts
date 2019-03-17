import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

/**
 * Singleton service
 */
@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect();
    this.init();
  }

  /**
   * Socket events from server.
   */
  private init() {
    console.log('initializing sockets');
    this.socket.on('connect', (msg: any) => {
      console.log('connection received from server...');
    })
  }

  onNewGameCreated() {
    return new Observable<any>(observer => {
      this.socket.on('new-game-created', (msg: any) => {
        // console.log('new game created...');
        observer.next(msg);
      })
    })
  }

  onGameJoined() {
    return new Observable<any>(observer => {
      this.socket.on('player-joined-game', (msg: any) => {
        // console.log('new game created...');
        observer.next(msg);
      })
    })
  }

  onPlayerSelected() {
    return new Observable<any>(observer => {
      this.socket.on('player-selected', (msg: any) => {
        // console.log('player selected...');
        observer.next(msg);
      })
    })
  }


  /**
   * Socket events to server.
   */
  
  choosePlayer(roomId: string, name: string, player: string) {
    const message = {
      roomId: roomId,
      name: name,
      piece: player
    }
    this.socket.emit('select-player', message);
  }

  createGame(name: string, numPlayers: number) {
    const message = {
      name: name,
      numPlayers: numPlayers
    }

    this.socket.emit('create-game', message);
  }

  joinGame(name: string, roomId: string) {
    const message = {
      name: name,
      roomId: roomId
    }

    this.socket.emit('player-join-game', message);
  }

  //https://stackoverflow.com/questions/47161589/how-to-use-socket-io-client-in-angular-4
  // sendMessage(messageText: string) {
  //   const message = {
  //     text: messageText
  //   };
  //   this.socket.emit('send-message', message);
  //   // console.log(message.text);
  // }
}
