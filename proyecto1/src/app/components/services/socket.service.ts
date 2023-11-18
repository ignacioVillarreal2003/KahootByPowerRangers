import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { IActividad } from './IActividad';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {} 

  socket = io('http://localhost:3002');

  private actividadActual?: IActividad = undefined;

  public getNewMessage = () => {
    this.socket.on('actividad', (actividad: IActividad) =>{
      this.message$.next('actividad');
      this.actividadActual = actividad;
    });

    this.socket.on('fin', () => {
      this.message$.next('fin');
    });

    this.socket.on('delay', () => {
      this.message$.next('delay');
    });

    return this.message$.asObservable();
  };

  public getActividadId(): string {
    return this.actividadActual?.id as string;
  }

  public getActividad(): IActividad {
    return this.actividadActual as IActividad;
  }

  public cerrarSocket() {
    this.socket.disconnect();
  }
}