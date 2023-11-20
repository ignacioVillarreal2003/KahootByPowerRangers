import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-pregunta-terminada-jugador',
  templateUrl: './pregunta-terminada-jugador.component.html',
  styleUrls: ['./pregunta-terminada-jugador.component.css']
})
export class PreguntaTerminadaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router, private datosJugadorService: DatosJugadorService) {}

  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'actividad') {
        this.router.navigate([`/opcionesVotarJuegoJugador/${this.datosJugadorService.pin}`]);
      }
      if(message[0] == 'fin') {
        this.router.navigate([`/finalJugador/${this.datosJugadorService.pin}`]);
      }
    });
    this.nombre = this.datosJugadorService.nombre;
    this.imagen = this.datosJugadorService.imagen;
  }

  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }

  nombre: string = "";
  imagen: string = "";
}
