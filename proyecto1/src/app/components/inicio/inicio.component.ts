import { Component } from '@angular/core';
import { DatosJugadorService } from '../services/datos-jugador.service';

import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  pin: string = "";

  savePin(){
    this.datosJugadorService.pin = this.pin;
  }

  constructor(private datosJugadorService: DatosJugadorService, private socketService: SocketService){}
}
