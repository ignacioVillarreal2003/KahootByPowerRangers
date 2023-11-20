import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-despues-cada-pregunta-jugador',
  templateUrl: './despues-cada-pregunta-jugador.component.html',
  styleUrls: ['./despues-cada-pregunta-jugador.component.css']
})
export class DespuesCadaPreguntaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'delay') {
        this.router.navigate(['/preguntaTerminadaJugador']);
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
