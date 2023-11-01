import { Component } from '@angular/core';
import { DatosJugadorService } from '../../services/datos-jugador.service';
import { UserService } from '../../services/HTTPServices/user.service';

@Component({
  selector: 'app-nombre-jugador',
  templateUrl: './nombre-jugador.component.html',
  styleUrls: ['./nombre-jugador.component.css']
})
export class NombreJugadorComponent {

  nombreJugador: string = "";

  savePlayer(){
    this.datosJugadorService.nombre = this.nombreJugador;
    this.userService.agregarUsuarioEnPantalla();
  }

  constructor (private datosJugadorService: DatosJugadorService, private userService: UserService){}
}
