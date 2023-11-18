import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta-terminada-jugador',
  templateUrl: './pregunta-terminada-jugador.component.html',
  styleUrls: ['./pregunta-terminada-jugador.component.css']
})
export class PreguntaTerminadaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'actividad') {
        this.router.navigate(['/opcionesVotarJuegoJugador']);
      }
      if(message == 'fin') {
        this.router.navigate(['/finalJugador']);
      }
    });
  }
}
