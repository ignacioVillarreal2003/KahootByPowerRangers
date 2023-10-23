import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logout(){
    console.log('Sesion finalizada');
    localStorage.removeItem('token');
  }

  getTimeToken(){
    const storedData: any = JSON.parse(localStorage.getItem("token")!);
    if (storedData && storedData.time != null) {
      return storedData.time;
    } else {
      return null;
    }
  }

  getToken(){
    const storedData: any = JSON.parse(localStorage.getItem('token')!);
    if (storedData && storedData.token != null) {
      return storedData.token;
    } else {
      return null;
    }
  }
  
  constructor() { }
}
