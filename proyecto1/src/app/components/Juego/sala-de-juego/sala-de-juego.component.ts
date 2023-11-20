import { Component } from '@angular/core';
import { DatosJuegoService } from '../../services/datos-juego.service';
import { SocketService } from '../../services/socket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sala-de-juego',
  templateUrl: './sala-de-juego.component.html',
  styleUrls: ['./sala-de-juego.component.css']
})
export class SalaDeJuegoComponent {

  constructor(private datosJuegoService: DatosJuegoService, private socketService: SocketService){}

  private subscription?: Subscription; 
  
  pin: string = this.datosJuegoService.pin;
  link: string = this.datosJuegoService.link;
  usuarios = [{
    nombre: "hola",
    imagen: "avatar1.png"
  }]

  ngOnInit() {
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'player') {
        let player = JSON.parse(message[1]);
        let usuario = {nombre: player.nombre, imagen: player.imagen};
        this.usuarios.push(usuario);
      }
    });
  }

  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }
}

