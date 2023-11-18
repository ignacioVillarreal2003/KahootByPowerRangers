import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despues-cada-pregunta-jugador',
  templateUrl: './despues-cada-pregunta-jugador.component.html',
  styleUrls: ['./despues-cada-pregunta-jugador.component.css']
})
export class DespuesCadaPreguntaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    this.socketService.getNewMessage().subscribe((message) => {
      if(message == 'delay') {
        this.router.navigate(['/preguntaTerminadaJugador']);
      }
      if(message == 'fin') {
        this.router.navigate(['/finalJugador']);
      }
    });
  }
}
