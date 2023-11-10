import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { IActividad } from '../../services/IActividad';
import { UserService } from '../../services/HTTPServices/user.service';

@Component({
  selector: 'app-opciones-votar-juego-jugador',
  templateUrl: './opciones-votar-juego-jugador.component.html',
  styleUrls: ['./opciones-votar-juego-jugador.component.css']
})
export class OpcionesVotarJuegoJugadorComponent{

  constructor (private socketService: SocketService, private userService: UserService) {}

  savePin(){
    
  }

  actividadId? : string = undefined;

  ngOnInit(){
    this.socketService.getActividadJugador().subscribe((actividad: IActividad) => {
      this.actividadId = actividad.id;
    });
  }

  mandarVoto(voto: number) {
    this.userService.calificarActividad(this.actividadId as string, voto);
  }
}
