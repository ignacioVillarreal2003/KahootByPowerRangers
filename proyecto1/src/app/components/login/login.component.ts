import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string = "";
  contra: string = "";

  guardarDatosUsuario(){
    this.loginService.usuario = this.usuario;
    this.loginService.contra = this.contra;
  }

  constructor(private loginService: LoginService){}
}
