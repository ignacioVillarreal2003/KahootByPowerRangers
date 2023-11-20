import { Component } from '@angular/core';
import { IActividad } from '../../../services/interfaces/IActividad';
import { SocketService } from 'src/app/components/services/socket.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  actividad?: IActividad = undefined;
  conteo?: number[] = undefined;

  private subscription?: Subscription;

  ngOnInit() {
    this.actividad = this.socketService.getActividad();
    this.conteo = this.socketService.getNumActividad();
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'fin') {
        this.router.navigate(['/actividadesMasVotadas']);
      }
      if(message[0] == 'delay') {
        this.router.navigate(['/pantallaCargaJuego']);
      }
    })
  }
  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }
}
