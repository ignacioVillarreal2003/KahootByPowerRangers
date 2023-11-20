import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/HTTPServices/user.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-opciones-votar-juego-jugador',
  templateUrl: './opciones-votar-juego-jugador.component.html',
  styleUrls: ['./opciones-votar-juego-jugador.component.css']
})
export class OpcionesVotarJuegoJugadorComponent {
  constructor (private socketService: SocketService, private userService: UserService, private router: Router) {}

  savePin(){}

  private subscription?: Subscription;

  actividadId? : string = undefined;
  conteo?: number[] = undefined;

  ngOnInit(){
    this.actividadId = this.socketService.getActividadId();
    this.conteo = this.socketService.getNumActividad();
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

  mandarVoto(voto: number) {
    this.userService.calificarActividad(this.actividadId as string, voto, "pin");
  }

}
