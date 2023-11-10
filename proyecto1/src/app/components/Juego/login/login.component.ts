import { Component } from '@angular/core';
import { HttpService } from '../../services/HTTPServices/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpService: HttpService, private router: Router) { }

  usuario: string = "";
  contra: string = "";
  textoLog: string = "";


  registrarUsuario(): void {
    if (this.checkDatos()) {
      this.httpService.registrarUsuario(this.usuario, this.contra).subscribe(
        (response: any) => {
          localStorage.setItem('token', response);
          this.router.navigate(['/crear']);
        },
        (error: any) => {
          if (error === "Error: 400 El usuario ya está registrado.") {
            this.textoLog = 'El usuario ya está registrado.';
          }
          else {
            this.textoLog = error;
          }
        }
      );
    }
  }

  loguearUsuario(): void {
    if (this.checkDatos()) {
      this.httpService.loguearUsuario(this.usuario, this.contra).subscribe(
        (response: any) => {
          localStorage.setItem('token', response);
          this.router.navigate(['/crear']);
        },
        (error: any) => {
          if (error === "Error: 400 El usuario no está registrado.") {
            this.textoLog = 'El usuario no está registrado.';
          }
          else if (error === "Error: 400 Contraseña incorrecta.") {
            this.textoLog = 'Contraseña incorrecta.';
          }
          else {
            this.textoLog = error;
          }
        }
      );
    }
  }

  checkDatos() {
    if (this.usuario.length < 8) {
      this.textoLog = "Requiere usuario de 8 caracteres";
      return false;
    }
    if (this.contra.length < 8) {
      this.textoLog = "Requiere contraseña de 8 caracteres";
      return false;
    }
    return true;
  }

}
