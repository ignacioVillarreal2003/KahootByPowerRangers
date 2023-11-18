import { Component } from '@angular/core';
import { DatosJugadorService } from '../../services/datos-jugador.service';
import { UserService } from '../../services/HTTPServices/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nombre-jugador',
  templateUrl: './nombre-jugador.component.html',
  styleUrls: ['./nombre-jugador.component.css']
})
export class NombreJugadorComponent {

  nombreJugador: string = "";
  url: string = "";
  salaPin: string = "";

  ngOnInit() {
    const currentUrl = this.location.path();
    this.url = "http://localhost:4200" + currentUrl;

    this.route.paramMap.subscribe(params => {
      const pinParam = params.get('pin');
      this.salaPin = typeof pinParam === 'string' ? pinParam : "";
    });

    this.foto = this.randomAvatar();
    this.datosJugadorService.imagen = this.foto;
  }

  

  savePlayer() {
    this.datosJugadorService.nombre = this.nombreJugador;
    if (this.datosJugadorService.pin.length === 0){
      this.datosJugadorService.pin = this.salaPin
    }
    this.userService.entrarAJuego(this.url, this.foto).subscribe(
      (response: any) => {
        console.log(123);
        
        this.router.navigate(['/salaEsperaJugador'])
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  listaAvatares: string[] = ["avatar1.png","avatar2.png","avatar3.png","avatar4.png","avatar5.png","avatar6.png"]
  
  foto ?: string;

  randomAvatar(): string{
    return this.listaAvatares[Math.floor(Math.random() * this.listaAvatares.length)]
  }



  constructor(private datosJugadorService: DatosJugadorService, private userService: UserService, private location: Location, private route: ActivatedRoute, private router: Router) { }
}
