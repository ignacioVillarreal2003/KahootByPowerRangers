import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-final-jugador',
  templateUrl: './final-jugador.component.html',
  styleUrls: ['./final-jugador.component.css']
})
export class FinalJugadorComponent {
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.cerrarSocket();
  }
}
