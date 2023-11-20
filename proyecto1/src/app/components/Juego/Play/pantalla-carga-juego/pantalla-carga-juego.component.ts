import { Component } from '@angular/core';
import { SocketService } from 'src/app/components/services/socket.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/components/services/HTTPServices/admin.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pantalla-carga-juego',
  templateUrl: './pantalla-carga-juego.component.html',
  styleUrls: ['./pantalla-carga-juego.component.css']
})
export class PantallaCargaJuegoComponent {
  constructor(private socketService: SocketService, private router: Router, private adminService: AdminService) {}

  private subscription?: Subscription;

  ngOnInit() {
    this.adminService.iniciarJuego().subscribe();
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'actividad') {
        this.router.navigate(['/inicioJuego']);
      }
      if(message[0] == 'fin') {
        this.router.navigate(['/actividadesMasVotadas']);
      }
    });
  }

  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }
}
