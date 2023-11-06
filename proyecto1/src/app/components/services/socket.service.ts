import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Router } from '@angular/router';
import { IActividad } from './IActividad';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public actividad$: BehaviorSubject<IActividad> = new BehaviorSubject({id:'', titulo:'', descripcion:'', imagen:''});
  constructor(private Router: Router) {} 

  socket = io('http://localhost:3001');

  public iniciarJuego(idActividad: string) {
    this.socket.emit('iniciarJuego', idActividad);
  }

  public getActividad = () => {
    this.socket.on('actividad', (actividad) => {
      this.Router.navigate(['/opcionesVotarJuegoJugador']);
      this.actividad$.next(actividad);
    });

    this.socket.on('fin', () => {
      this.Router.navigate(['/login']);
    });

    return this.actividad$.asObservable();
  }
}