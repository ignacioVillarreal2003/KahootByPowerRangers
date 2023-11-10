import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-sala-de-juego',
  templateUrl: './sala-de-juego.component.html',
  styleUrls: ['./sala-de-juego.component.css']
})
export class SalaDeJuegoComponent {
  constructor(private socketService: SocketService) {}
}
