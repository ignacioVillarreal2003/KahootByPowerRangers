import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pregunta-terminada-jugador',
  templateUrl: './pregunta-terminada-jugador.component.html',
  styleUrls: ['./pregunta-terminada-jugador.component.css']
})
export class PreguntaTerminadaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'actividad') {
        this.router.navigate(['/opcionesVotarJuegoJugador']);
      }
      if(message[0] == 'fin') {
        this.router.navigate(['/finalJugador']);
      }
    });
  }

  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }
}
