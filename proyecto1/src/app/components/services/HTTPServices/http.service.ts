import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '../IUsuario';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.status} ${error.error.message}`;
    } else if (error.status) {
      // Error devuelto por el servidor
      errorMessage = `Error: ${error.status} ${error.error.message}`;
    }
    // Devuelve un mensaje de error observable
    return throwError(errorMessage);
  }

  registrarUsuario(username: string, password: string): Observable<any> {
    const requestBody: IUsuario = { username: username, password: password };
    return this.http.post<any>('http://localhost:3001/registrarUsuario', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token) {
          return response.token; // Devuelve solo el token
        }
        // Maneja cualquier otro tipo de respuesta aquí si es necesario
        return null; // O devuelve algo más si se requiere
      })
    );
  }

  loguearUsuario(username: string, password: string): Observable<any> {
    const requestBody: IUsuario = { username: username, password: password };
    return this.http.post<any>('http://localhost:3001/loguearUsuario', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token) {
          return response.token; // Devuelve solo el token
        }
        // Maneja cualquier otro tipo de respuesta aquí si es necesario
        return null; // O devuelve algo más si se requiere
      })
    );
  }

}
