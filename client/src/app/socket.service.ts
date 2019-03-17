import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

/**
 * Singleton service
 */
@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket: SocketIOClient.Socket;
  private messages: any[];

  constructor() {
    this.messages = [];
    this.socket = io.connect();
    this.init();
  }

  private init() {
    console.log('initializing sockets');
    this.socket.on('connect', (msg: any) => {
      // this.messages.push(msg);
      console.log('connection received from server...');

    })

    // this.socket.emit('event1', { 
    //   msg: 'client to server, can you hear me server?';
    // })

    // this.socket.on('event2', (data: any) => {
    //   console.log(data.msg);
    //   this.socket.emit('event3', {
    //       msg: 'Yes, its working for me!!'
    //   });
    // });
    this.socket.on('new-game-created', (msg:any) => {
      console.log('new game created...');

      const name = msg.name;
      const roomName = msg.roomName;
      console.log(`name: ${name}`);
      console.log(`roomName: ${roomName}`);
    })
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

  sendMessage(messageText: string) {
    const message = {
      text: messageText
    };
    this.socket.emit('send-message', message);
    // console.log(message.text);
  }
  //https://stackoverflow.com/questions/47161589/how-to-use-socket-io-client-in-angular-4
}
