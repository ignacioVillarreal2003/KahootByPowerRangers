import { Injectable } from '@angular/core';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { IActividad } from '../IActividad';
import { IPropuesta } from '../IPropuesta';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private authInterceptor: AuthInterceptor, private http: HttpClient) { }

  async crearActividad(titulo: string, descripcion: string, imagen: string) {
    const uniqueID = uuidv4();
    try {
      const requestBody: IActividad = {
        id: uniqueID,
        titulo: titulo,
        descripcion: descripcion,
        imagen: imagen,
      }
      const response = await fetch('http://localhost:3001/crearActividad', {
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
        console.error('Hubo un error al crear la actividad: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al crear la actividad: ', error);
    }
  }

  async getActividades() {
    try {
      const response = await fetch('http://localhost:3001/getActividades', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al obtener las actividades: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al obtener las actividades: ', error);
    }
  }

  async getActividad(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/getActividad/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al obtener la actividad: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al obtener la actividad: ', error);
    }
  }

  async crearPropuesta(id: string, titulo: string, listaActividades: string[]) {
    const uniqueID = uuidv4();
    try {
      const requestBody: IPropuesta = {
        id: uniqueID,
        titulo: titulo,
        listaActividades: listaActividades
      }
      const response = await fetch('http://localhost:3001/crearPropuesta', {
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
        console.error('Hubo un error al crear la actividad: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al crear la actividad: ', error);
    }
  }

  async getPropuestas() {
    try {
      const response = await fetch('http://localhost:3001/getPropuestas', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al obtener las propuestas: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al obtener las propuestas: ', error);
    }
  }

  async getPropuesta(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/getPropuesta/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al obtener la propuesta: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al obtener la propuesta: ', error);
    }
  }

  async calificacionActividad(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/calificacionActividad/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al obtener la calificacion de la actividad: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al obtener la calificacion de la actividad: ', error);
    }
  }
 
  async topCalificaciones() {
    try {
      const response = await fetch('http://localhost:3001/topCalificaciones', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al obtener la calificacions top: ', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al obtener la calificacions top: ', error);
    }
  }
 

}
