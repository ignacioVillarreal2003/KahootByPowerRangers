import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpService: HttpService){}

  usuario: string = "";
  contra: string = "";

  loguearUsuario(){
    this.httpService.loguearUsuario(this.usuario, this.contra)
  }

  registrarUsuario(){
    this.httpService.registrarUsuario(this.usuario, this.contra)
  }

}
