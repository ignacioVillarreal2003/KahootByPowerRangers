import { Injectable } from '@angular/core';
import { DatosJugadorService } from '../datos-jugador.service';
import { ICalificarActividad } from '../interfaces/ICalificarActividad';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private datosJugadorService: DatosJugadorService) { }

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

  entrarAJuego(link: string, imagen: string | undefined): Observable<any> {
    const requestBody = {
      nombreUsuario: this.datosJugadorService.nombre,
      pin: this.datosJugadorService.pin,
      link: link,
      imagen: imagen
    };        
    return this.http.post<any>('http://localhost:3001/usuario/entrarAJuego', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  calificarActividad(idActividad: string, calificacion: number, pin: string): Observable<any> {
    const requestBody: ICalificarActividad = {
      idActividad: idActividad,
      calificacion: calificacion,
      pin: pin
    }
    return this.http.post<any>('http://localhost:3001/usuario/calificarActividad', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


}
