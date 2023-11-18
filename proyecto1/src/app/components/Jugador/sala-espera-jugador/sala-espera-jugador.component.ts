import { Component } from '@angular/core';
import { DatosJugadorService } from '../../services/datos-jugador.service';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala-espera-jugador',
  templateUrl: './sala-espera-jugador.component.html',
  styleUrls: ['./sala-espera-jugador.component.css']
})
export class SalaEsperaJugadorComponent {
  nombre: string = this.datosJugadorService.nombre;
  
  foto: string = this.datosJugadorService.imagen;

  ngOnInit(){
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'delay') {
        this.router.navigate(['/pantallaCargaJugador']);
      }
      if(message == 'fin') {
        this.router.navigate(['/finalJugador']);
      }
    });
  }

  constructor (private datosJugadorService: DatosJugadorService, private socketService: SocketService, private router: Router){}

}
