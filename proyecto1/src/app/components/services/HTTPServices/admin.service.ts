import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { IActividad } from '../IActividad';
import { IPropuesta } from '../IPropuesta';
import { Observable, of, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend retornó un código de error
      errorMessage = `Código: ${error.status}, Mensaje: ${error.error.message}`;
    }
    // Devuelve un mensaje de error observable
    return throwError(errorMessage);
  }

  crearActividad(titulo: string, descripcion: string, imagen: string): Observable<any> {
    const uniqueID = uuidv4();
    const requestBody: IActividad = {
      id: uniqueID,
      titulo: titulo,
      descripcion: descripcion,
      imagen: imagen,
    };
    return this.http.post<any>('http://localhost:3001/crearActividad', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getActividades(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/getActividades', this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  getActividad(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/getActividad/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  crearPropuesta(id: string, titulo: string, listaActividades: string[]): Observable<any> {
    const uniqueID = uuidv4();
    const requestBody: IPropuesta = {
      id: uniqueID,
      titulo: titulo,
      listaActividades: listaActividades
    }
    return this.http.post<any>("http://localhost:3001/crearPropuesta", this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  getPropuestas(): Observable<any> {
    return this.http.get<any>("http://localhost:3001/getPropuestas", this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getPropuesta(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/getPropuesta/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  calificacionActividad(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/calificacionActividad/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  topCalificaciones(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/topCalificaciones', this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
