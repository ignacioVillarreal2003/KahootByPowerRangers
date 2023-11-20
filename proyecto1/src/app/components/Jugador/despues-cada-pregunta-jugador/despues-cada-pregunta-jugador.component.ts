import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-despues-cada-pregunta-jugador',
  templateUrl: './despues-cada-pregunta-jugador.component.html',
  styleUrls: ['./despues-cada-pregunta-jugador.component.css']
})
export class DespuesCadaPreguntaJugadorComponent {
  constructor(private socketService: SocketService, private router: Router, private datosJugadorService: DatosJugadorService) {}

  ngOnInit() {
    this.socketService.getNewMessage().subscribe((message) => {
      if(message == 'delay') {
        this.router.navigate([`/preguntaTerminadaJugador/${this.datosJugadorService.pin}`]);
      }
      if(message == 'fin') {
        this.router.navigate([`/finalJugador/${this.datosJugadorService.pin}`]);
      }
    });
    this.nombre = this.datosJugadorService.nombre;
    this.imagen = this.datosJugadorService.imagen
  }

  nombre: string = "";
  imagen: string = "";
}
