import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-regresiva-jugador',
  templateUrl: './cuenta-regresiva-jugador.component.html',
  styleUrls: ['./cuenta-regresiva-jugador.component.css']
})
export class CuentaRegresivaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'actividad') {
        this.router.navigate(['/opcionesVotarJuegoJugador']);
      }
      if(message == 'fin') {
        this.router.navigate(['/calificacion']);
      }
    });
  }
}
