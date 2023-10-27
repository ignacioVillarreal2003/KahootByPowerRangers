import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  registrarUsuario(username: string) {
    const requestBody = { username: username };
    this.http.post<any>('http://localhost:3000/registrarUsuario', requestBody).subscribe(
      (response: any) => {
        // Guardar la respuesta en el localStorage
        localStorage.setItem('token', response);
        return response;
      },
      (error: any) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }

  loguearUsuario(username: string) {
    const requestBody = { username: username };
    this.http.post<any>('http://localhost:3000/loguearUsuario', requestBody).subscribe(
      (response: any) => {
        // Guardar la respuesta en el localStorage
        localStorage.setItem('token', response);
        return response;
      },
      (error: any) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }


}
