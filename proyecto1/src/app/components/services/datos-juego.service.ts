import { Injectable } from '@angular/core';
import { IPropuesta } from './interfaces/IPropuesta';

@Injectable({
  providedIn: 'root'
})
export class DatosJuegoService {

  constructor() { }

  pin: string = "";
  link: string = "";
  propuesta: IPropuesta | null = null
  
}
