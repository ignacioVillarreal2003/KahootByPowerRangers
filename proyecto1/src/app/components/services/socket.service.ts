import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { IActividad } from './interfaces/IActividad';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public message$: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  constructor() {} 

  socket = io('http://localhost:3002');

  private actividadActual?: IActividad = undefined;
  private conteo: number = 0;
  private numActividades: number = 0;

  public getNewMessage = () => {
    this.socket.on('actividad', (actividad: IActividad, conteo: number) =>{
      this.message$.next(['actividad']);
      this.actividadActual = actividad;
      this.conteo = conteo;
    });

    this.socket.on('numActividades', (numActividades: number) => {
      this.numActividades = numActividades;
    });

    this.socket.on('fin', () => {
      this.message$.next(['fin']);
    });

    this.socket.on('delay', () => {
      this.message$.next(['delay']);
      this.conteo = this.conteo + 0.5;
    });

    this.socket.on('player', (player) => {
      this.message$.next(['player', JSON.stringify(player)]);
    });

    return this.message$.asObservable();
  };

  public getActividadId(): string {
    return this.actividadActual?.id as string;
  }

  public getActividad(): IActividad {
    return this.actividadActual as IActividad;
  }

  public getNumActividad(): number[] {
    return [this.conteo, this.numActividades];
  }

  public cerrarSocket() {
    this.socket.disconnect();
  }
}