import { Injectable } from '@angular/core';
import { IPropuesta } from './interfaces/IPropuesta';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

  private propuestasSubject: BehaviorSubject<IPropuesta[]> = new BehaviorSubject<IPropuesta[]>([]);

  propuestas$ = this.propuestasSubject.asObservable();

  setPropuestas(propuestas: IPropuesta[]): void {
    this.propuestasSubject.next(propuestas);
  }

  constructor() { }
}
