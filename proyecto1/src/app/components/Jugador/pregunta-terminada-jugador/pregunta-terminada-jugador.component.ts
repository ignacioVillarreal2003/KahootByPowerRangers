import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-pregunta-terminada-jugador',
  templateUrl: './pregunta-terminada-jugador.component.html',
  styleUrls: ['./pregunta-terminada-jugador.component.css']
})
export class PreguntaTerminadaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router, private datosJugadorService: DatosJugadorService) {}

  ngOnInit() {
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'actividad') {
        this.router.navigate([`/opcionesVotarJuegoJugador/${this.datosJugadorService.pin}`]);
      }
      if(message == 'fin') {
        this.router.navigate([`/finalJugador/${this.datosJugadorService.pin}`]);
      }
    });
    this.nombre = this.datosJugadorService.nombre;
    this.imagen = this.datosJugadorService.imagen;
  }

  nombre: string = "";
  imagen: string = "";
}
