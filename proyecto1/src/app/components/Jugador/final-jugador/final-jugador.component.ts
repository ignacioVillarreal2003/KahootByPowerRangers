import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { DatosJugadorService } from '../../services/datos-jugador.service';

@Component({
  selector: 'app-final-jugador',
  templateUrl: './final-jugador.component.html',
  styleUrls: ['./final-jugador.component.css']
})
export class FinalJugadorComponent {
  constructor(private socketService: SocketService, private datosJugadorService: DatosJugadorService) {}

  ngOnInit() {
    this.socketService.cerrarSocket();
    this.nombre = this.datosJugadorService.nombre;
    this.imagen = this.datosJugadorService.imagen;
  }

  nombre: string = "";
  imagen: string = "";
}
