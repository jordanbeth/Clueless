import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
// import { Message } from '../model/message';
// import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket: SocketIOClient.Socket;
  messages: any[];
  constructor() { 
    this.socket = io.connect();
  }

  private init() {
    this.messages = [];
    this.socket.on('message-received', (msg: any) => {
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
    })

    this.socket.emit('event1', { 
      msg: 'client to server, can you hear me server?';
    })

    this.socket.on('event2', (data: any) => {
      console.log(data.msg);
      this.socket.emit('event3', {
          msg: 'Yes, its working for me!!'
      });
    });

    this.socket.on('event4', (data: any) => {
      console.log(data.msg);
  });
  }

  sendMessage(messageText: String) {
    const message = {
      text: messageText
    };
    this.socket.emit('send-message', message);
    // console.log(message.text);
    messageText = '';
  }
  //https://stackoverflow.com/questions/47161589/how-to-use-socket-io-client-in-angular-4
}
