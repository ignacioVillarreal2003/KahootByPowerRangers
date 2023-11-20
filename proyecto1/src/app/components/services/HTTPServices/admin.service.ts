import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { IActividad } from '../interfaces/IActividad';
import { IPropuesta } from '../interfaces/IPropuesta';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IJuego } from '../interfaces/IJuego';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';  
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = error.error.message;
    } else if (error.status) {
      // Error devuelto por el servidor
      errorMessage = error.error.message;
    }
    // Devuelve un mensaje de error observable
    return throwError(errorMessage);
  }

  iniciarJuego(propuesta: IPropuesta): Observable<any> {
    const uniqueID = uuidv4();
    const requestBody = {
      id: uniqueID,
      propuesta: propuesta
    };
    return this.http.post<any>('http://localhost:3001/administrador/iniciarJuego', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  crearActividad(titulo: string, descripcion: string, imagen: any): Observable<any> {
    const uniqueID = uuidv4();
    const requestBody: IActividad = {
      id: uniqueID,
      titulo: titulo,
      descripcion: descripcion,
      imagen: imagen,
    };
    return this.http.post<any>('http://localhost:3001/administrador/crearActividad', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getActividades(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/administrador/getActividades', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.actividades) {
          return response.actividades; 
        }
        return null; 
      })
    );
  }
  
  getActividad(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/administrador/getActividad/${id}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.actividadEncontrada) {
          return response.actividadEncontrada; 
        }
        return null;
      })
    );
  }

  crearPropuesta(titulo: string, listaActividades: IActividad[]): Observable<any> {
    const uniqueID = uuidv4();
    const requestBody: IPropuesta = {
      id: uniqueID,
      titulo: titulo,
      listaActividades: listaActividades
    } 
    return this.http.post<any>("http://localhost:3001/administrador/crearPropuesta", requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  getPropuestas(): Observable<any> {
    return this.http.get<any>("http://localhost:3001/administrador/getPropuestas",  this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.propuestas) {
          return response.propuestas; 
        }
        return null;
      })
    );
  }

  getPropuesta(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/administrador/getPropuesta/${id}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.propuestaEncontrada) {
          return response.propuestaEncontrada; 
        }
        return null;
      })
    );
  }

  crearJuego(titulo: string, pin: string, link: string, propuesta: IPropuesta): Observable<any> {
    const requestBody: IJuego = {
      titulo: titulo,
      pin: pin,
      link: link,
      propuesta: propuesta
    };
    return this.http.post<any>('http://localhost:3001/administrador/crearJuego', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  calificacionActividad(id: string, pin: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/administrador/calificacionActividad/${id}?pin=${pin}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.total) {
          return response.total; 
        }
        return null;
      })
    );
  }

  topCalificaciones(pin: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/administrador/topCalificaciones/${pin}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.actividadesTop) {
          return response.actividadesTop; 
        }
        return null;
      })
    );
  }

}
