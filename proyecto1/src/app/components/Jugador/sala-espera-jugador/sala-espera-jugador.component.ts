import { Component } from '@angular/core';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-sala-espera-jugador',
  templateUrl: './sala-espera-jugador.component.html',
  styleUrls: ['./sala-espera-jugador.component.css']
})
export class SalaEsperaJugadorComponent {
  nombre: string = this.datosJugadorService.nombre;
  
  foto: string = this.datosJugadorService.imagen;


  constructor (private datosJugadorService: DatosJugadorService){}

}
