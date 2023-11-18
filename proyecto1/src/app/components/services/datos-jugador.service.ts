import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosJugadorService {

  pin: string = "";
  nombre: string = "";
  imagen: string = ""

  constructor() { }
}
