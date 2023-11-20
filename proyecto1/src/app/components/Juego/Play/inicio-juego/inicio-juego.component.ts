import { Component } from '@angular/core';
import { IActividad } from '../../../services/interfaces/IActividad';
import { SocketService } from 'src/app/components/services/socket.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DatosJuegoService } from 'src/app/components/services/datos-juego.service';


@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent {
  constructor(private socketService: SocketService, private router: Router, private datosJuegoService: DatosJuegoService) {}

  actividad?: IActividad = undefined;
  conteo?: number[] = undefined;

  private subscription?: Subscription;

  ngOnInit() {
    this.actividad = this.socketService.getActividad();
    this.conteo = this.socketService.getNumActividad();
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'fin') {
        this.router.navigate([`/actividadesMasVotadas/${this.datosJuegoService.pin}`]);
      }
      if(message[0] == 'delay') {
        this.router.navigate([`/pantallaCargaJuego/${this.datosJuegoService.pin}`]);

      }
    })
  }
  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }
}
