import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


   // Dependency injection syntax
   constructor(private socketService: SocketService, 
               private toastr: ToastrService) { 
    
  }

  ngOnInit() {
   
  }

  showToaster(){
    console.log('show toast');
    this.toastr.success('Hello, I\'m the toastr message.')
 }

}
