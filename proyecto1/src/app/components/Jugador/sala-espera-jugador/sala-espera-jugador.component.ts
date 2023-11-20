import { Component } from '@angular/core';
import { DatosJugadorService } from '../../services/datos-jugador.service';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sala-espera-jugador',
  templateUrl: './sala-espera-jugador.component.html',
  styleUrls: ['./sala-espera-jugador.component.css']
})
export class SalaEsperaJugadorComponent {
  
  private subscription?: Subscription;

  nombre: string = this.datosJugadorService.nombre;
  
  foto: string = this.datosJugadorService.imagen;

  ngOnInit(){
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'delay') {
        this.router.navigate(['/pantallaCargaJugador']);
      }
      if(message[0] == 'fin') {
        this.router.navigate(['/finalJugador']);
      }
    });
  }

  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }

  constructor (private datosJugadorService: DatosJugadorService, private socketService: SocketService, private router: Router){}

}
