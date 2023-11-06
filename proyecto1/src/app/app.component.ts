import { Component } from '@angular/core';
import { SocketService } from './components/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private socketService: SocketService){
  }

  ngOnInit(){   
    
  }
}
