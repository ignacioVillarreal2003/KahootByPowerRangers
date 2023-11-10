import { Component } from '@angular/core';
import { IActividad } from '../../services/IActividad';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent {
  constructor(private socketService: SocketService) {}
  
}
