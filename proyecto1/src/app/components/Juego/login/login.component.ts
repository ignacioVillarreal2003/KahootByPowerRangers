import { Component } from '@angular/core';
import { HttpService } from '../../services/HTTPServices/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpService: HttpService, private router: Router){}

  usuario: string = "";
  contra: string = "";
  textoLog: string = "";

  async loguearUsuario() {
    try {
      const loginResult = await this.httpService.loguearUsuario(this.usuario, this.contra);
      if (loginResult) {
        console.log('¡Inicio de sesión exitoso!');
        this.router.navigate(['/crear']);
      } else {
        console.log('Hubo un error durante el inicio de sesión.');
        this.textoLog = 'Hubo un error durante el inicio de sesión.'
      }
    } catch (error) {
      console.error('Error general al iniciar sesión:', error);
    }
  }
  

  async registrarUsuario(){
    await this.httpService.registrarUsuario(this.usuario, this.contra)
  }

}
