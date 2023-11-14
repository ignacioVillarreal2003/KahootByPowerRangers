import { Component } from '@angular/core';
import { DatosJuegoService } from '../../services/datos-juego.service';
import { IUsuario } from '../../services/interfaces/IUsuario';

@Component({
  selector: 'app-sala-de-juego',
  templateUrl: './sala-de-juego.component.html',
  styleUrls: ['./sala-de-juego.component.css']
})
export class SalaDeJuegoComponent {

  constructor(private datosJuegoService: DatosJuegoService){}

  pin: string = this.datosJuegoService.pin;
  usuarios = []

  

}
