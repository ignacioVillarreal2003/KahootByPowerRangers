import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/HTTPServices/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-votar-juego-jugador',
  templateUrl: './opciones-votar-juego-jugador.component.html',
  styleUrls: ['./opciones-votar-juego-jugador.component.css']
})
export class OpcionesVotarJuegoJugadorComponent{

  constructor (private socketService: SocketService, private userService: UserService, private router: Router) {}

  savePin(){
    
  }

  actividadId? : string = undefined;

  ngOnInit(){
    this.actividadId = this.socketService.getActividadId();
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'delay') {
        this.router.navigate(['/preguntaTerminadaJugador']);
      }
      if(message == 'fin') {
        this.router.navigate(['/finalJugador']);
      }
    });
  }

  mandarVoto(voto: number) {
    this.userService.calificarActividad(this.actividadId as string, voto);
  }
}
