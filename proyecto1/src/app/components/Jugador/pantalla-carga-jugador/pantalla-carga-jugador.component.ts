import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-pantalla-carga-jugador',
  templateUrl: './pantalla-carga-jugador.component.html',
  styleUrls: ['./pantalla-carga-jugador.component.css']
})
export class PantallaCargaJugadorComponent {
  constructor(private socketService: SocketService) {}
}
