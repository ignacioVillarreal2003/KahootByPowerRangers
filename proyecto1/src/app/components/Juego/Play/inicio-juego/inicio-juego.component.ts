import { Component } from '@angular/core';
import { IActividad } from '../../../services/interfaces/IActividad';
import { SocketService } from 'src/app/components/services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  actividad?: IActividad = undefined;

  ngOnInit() {
    this.actividad = this.socketService.getActividad();
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'fin') {
        this.router.navigate(['/actividadesMasVotadas']);
      }
      if(message == 'delay') {
        this.router.navigate(['/pantallaCargaJuego']);
      }
    })
  }
}
