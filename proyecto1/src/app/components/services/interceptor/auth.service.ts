import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logout(){
    console.log('Sesion finalizada');
    localStorage.removeItem('token');
  }

  getToken(): string {
    const storedData = localStorage.getItem('token');
    if (!storedData) {
      return "TokenGenericoDeUsuario";
    }
    return storedData;
  }
  
  constructor() { }
}
