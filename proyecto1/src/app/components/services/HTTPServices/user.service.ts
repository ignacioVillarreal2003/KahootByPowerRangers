import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosJugadorService } from '../datos-jugador.service';
import { ICalificarActividad } from '../ICalificarActividad';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private datosJugadorService: DatosJugadorService) { }

  async agregarUsuarioEnPantalla() {
    try {
      const requestBody = {
        nombreUsuario: this.datosJugadorService.nombre
      };
      const response = await fetch('http://localhost:3001/agregarUsuario', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al agregar usuario: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al agregar usuario: ', error);
    }
  }

  async calificarActividad(idActividad: string, calificacion: number) {
    try {
      const requestBody: ICalificarActividad = {
        idActividad: idActividad,
        calificacion: calificacion
      }
      const response = await fetch('http://localhost:3001/calificarActividad', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al agregar usuario: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al agregar usuario: ', error);
    }
  }
}
