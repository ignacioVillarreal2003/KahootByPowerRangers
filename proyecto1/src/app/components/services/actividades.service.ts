import { Injectable } from '@angular/core';
import { IActividad } from './IActividad';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  ACTIVIDADES: IActividad[] = [
    {
      id: 1,
      titulo: "Titulo",
      descripcion: "Descripcion",
      imagen: "Foto"
    }
  ]

  getActividades(): Observable<IActividad[]>{
    const actividades = of(this.ACTIVIDADES);
    return actividades;
  }

  constructor() { }
}
