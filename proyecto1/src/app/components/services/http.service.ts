import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  async registrarUsuario(username: string, password: string) {
    try {
      const requestBody = { username: username, password: password };
      const response = await fetch('http://localhost:3001/registrarUsuario', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        alert(token);
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al registrar el usuario:', errorData.message);
      }
    } catch (error) {
      console.error('Hubo un error al registrar el usuario:', error);
    }
  }

  async loguearUsuario(username: string, password: string): Promise<boolean> {
    try {
      const requestBody = { username: username, password: password };
      const response = await fetch('http://localhost:3001/loguearUsuario', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        return true;
      } else {
        const errorData = await response.json();
        console.error('Hubo un error al logear el usuario:', errorData.message);
        return false;
      }
    } catch (error) {
      console.error('Hubo un error al logear el usuario:', error);
      return false;
    }
  }


}
