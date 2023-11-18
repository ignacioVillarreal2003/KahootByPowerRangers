import { Component } from '@angular/core';
import { DatosJugadorService } from '../services/datos-jugador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  pin: string = "";

  savePin(){
    this.datosJugadorService.pin = this.pin;
    this.router.navigate([`/nombreJugador/${this.pin}`])
  }

  constructor(private datosJugadorService: DatosJugadorService, private router: Router){}

  
}
