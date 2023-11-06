import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { IActividad } from '../../services/IActividad';

@Component({
  selector: 'app-opciones-votar-juego-jugador',
  templateUrl: './opciones-votar-juego-jugador.component.html',
  styleUrls: ['./opciones-votar-juego-jugador.component.css']
})
export class OpcionesVotarJuegoJugadorComponent{

  constructor (private socketService: SocketService) {}

  savePin(){
    
  }

  actividad: IActividad = {id:'', titulo:'', descripcion:'', imagen:''};

  ngOnInit(){
    this.socketService.getActividad().subscribe((actividad: IActividad) => {
      this.actividad = actividad;
    })
  }
}
