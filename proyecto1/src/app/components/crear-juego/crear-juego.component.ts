import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent {
  propuestaSeleccionada:string='';
  propuestas:any;
  aceptar():void{
    
  }

}
