import { Component } from '@angular/core';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-sala-espera-jugador',
  templateUrl: './sala-espera-jugador.component.html',
  styleUrls: ['./sala-espera-jugador.component.css']
})
export class SalaEsperaJugadorComponent {
  nombre: any = this.datosJugadorService.nombre || "Unamed"; /* Borrar unamed despues */
  
  listaAvatares: string[] = ["avatar1.png","avatar2.png","avatar3.png","avatar4.png","avatar5.png","avatar6.png"]
  
  foto ?: string;

  randomAvatar(): string{
    return this.listaAvatares[Math.floor(Math.random() * this.listaAvatares.length)]
  }

  ngOnInit(){
    this.foto = this.randomAvatar();
  }

  constructor (private datosJugadorService: DatosJugadorService){}

}
