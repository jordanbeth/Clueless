import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  // Dependency injection syntax
  constructor(private modalService: NgbModal,
    private socketService: SocketService,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.socketService.onNewGameCreated().subscribe((msg) => {
      console.log('newGame received from game component.');
      // const name = msg.name;
      // const roomId = msg.roomId;
      // console.log(`name: ${name}`);
      // console.log(`roomId: ${roomId}`);
      this.toastr.success("A new game was created: " + msg.roomId);
    })

    this.socketService.onPlayerSelected().subscribe((msg) => {
      console.log('onPlayerSelected received from game component.');
      const player = msg.player;
      
      const socketId = player.socketId;
      const name = player.name
      const piece = player.piece;
      console.log(`socketId: ${socketId}`);
      console.log(`name: ${name}`);
      console.log(`piece: ${piece}`);
      this.toastr.success(`${name} is playing as ${piece}`);
    })
  }

  showToaster() {
    console.log('show toast');
    this.toastr.success('Hello, I\'m the toastr message.')
  }

  /**
   * A method to handle suggestions from the suggestion modal
   */
  handleSuggestion() {

  }

  openModal(content) {
    this.modalService.open(content, {
      size: 'lg',
    });
  }

}
