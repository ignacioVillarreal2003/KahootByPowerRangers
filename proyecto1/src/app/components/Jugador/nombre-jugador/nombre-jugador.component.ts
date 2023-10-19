import { Component } from '@angular/core';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-nombre-jugador',
  templateUrl: './nombre-jugador.component.html',
  styleUrls: ['./nombre-jugador.component.css']
})
export class NombreJugadorComponent {

  pin: string = this.datosJugadorService.pin;
  nombre: string = "";

  saveNombre(){
    this.datosJugadorService.nombre = this.nombre;
  }

  constructor (private datosJugadorService: DatosJugadorService){}
}
