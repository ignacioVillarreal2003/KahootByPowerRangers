import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-despues-cada-pregunta-jugador',
  templateUrl: './despues-cada-pregunta-jugador.component.html',
  styleUrls: ['./despues-cada-pregunta-jugador.component.css']
})
export class DespuesCadaPreguntaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router, private datosJugadorService: DatosJugadorService) {}

  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'delay') {
        this.router.navigate([`/preguntaTerminadaJugador/${this.datosJugadorService.pin}`]);
      }
      if(message[0] == 'fin') {
        this.router.navigate([`/finalJugador/${this.datosJugadorService.pin}`]);
      }
    });
    this.nombre = this.datosJugadorService.nombre;
    this.imagen = this.datosJugadorService.imagen
  }

  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }

  nombre: string = "";
  imagen: string = "";
}
