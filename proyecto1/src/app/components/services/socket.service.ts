import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Router } from '@angular/router';
import { IActividad } from './IActividad';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private Router: Router) {} 

  socket = io('http://localhost:3002');

  actividadActual?: IActividad = undefined;
  actividadId?: number = undefined;

  public getActividadJugador = () => {
    this.socket.on('actividad', (actividad) => {
      this.Router.navigate(['/opcionesVotarJuegoJugador']);
      this.actividadId = actividad.id;
    });

    this.socket.on('fin', () => {
      this.Router.navigate(['/calificacionJugador']);
    });
  }

  public getActividadAdmin = () => {
    this.socket.on('actividad', (actividad) => {
      this.Router.navigate(['/opcionesVotarJuego']);
      this.actividadActual = actividad;
    });

    this.socket.on('fin', () => {
      this.Router.navigate(['/calificacionAdmin']);
    });
  }

  public cerrarSocket() {
    this.socket.disconnect();
  }
}