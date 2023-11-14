import { Injectable } from '@angular/core';
import { IActividad } from './interfaces/IActividad';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private actividadesSubject: BehaviorSubject<IActividad[]> = new BehaviorSubject<IActividad[]>([]);

  actividades$ = this.actividadesSubject.asObservable();

  setActividades(actividades: IActividad[]): void {
    this.actividadesSubject.next(actividades);
  }

  constructor() { }
}
