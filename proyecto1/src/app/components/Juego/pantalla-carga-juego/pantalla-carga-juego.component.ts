import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/HTTPServices/admin.service';

@Component({
  selector: 'app-pantalla-carga-juego',
  templateUrl: './pantalla-carga-juego.component.html',
  styleUrls: ['./pantalla-carga-juego.component.css']
})
export class PantallaCargaJuegoComponent {
  constructor(private socketService: SocketService, private router: Router, private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.iniciarJuego();
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'actividad') {
        this.router.navigate(['/inicioJuego']);
      }
      if(message == 'fin') {
        this.router.navigate(['/actividadesMasVotadas']);
      }
    });
  }
}
