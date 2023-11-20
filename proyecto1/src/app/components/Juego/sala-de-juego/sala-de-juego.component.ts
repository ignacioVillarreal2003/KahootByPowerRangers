import { Component } from '@angular/core';
import { DatosJuegoService } from '../../services/datos-juego.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-sala-de-juego',
  templateUrl: './sala-de-juego.component.html',
  styleUrls: ['./sala-de-juego.component.css']
})
export class SalaDeJuegoComponent {

  constructor(private datosJuegoService: DatosJuegoService, private socketService: SocketService){}

  pin: string = this.datosJuegoService.pin;
  link: string = this.datosJuegoService.link;
  usuarios = [{
    nombre: "hola",
    imagen: "avatar1.png"
  }]

  ngOnInit() {
    this.socketService.getNewMessage().subscribe((message) => {
      let player = JSON.parse(message);
      let usuario = {nombre: player.nombre, imagen: player.imagen};
      this.usuarios.push(usuario);
    });
  }
  
  
}

