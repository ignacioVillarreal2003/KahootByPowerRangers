import { Component } from '@angular/core';
import { SocketService } from 'src/app/components/services/socket.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/components/services/HTTPServices/admin.service';
import { DatosJuegoService } from 'src/app/components/services/datos-juego.service';
import { IPropuesta } from 'src/app/components/services/interfaces/IPropuesta';

@Component({
  selector: 'app-pantalla-carga-juego',
  templateUrl: './pantalla-carga-juego.component.html',
  styleUrls: ['./pantalla-carga-juego.component.css']
})
export class PantallaCargaJuegoComponent {
  constructor(private socketService: SocketService, private router: Router, private adminService: AdminService, private datosJuegoService: DatosJuegoService) {}

  ngOnInit() {
    if (this.propuesta !== null) {
      this.adminService.iniciarJuego(this.propuesta).subscribe();
    }
    this.socketService.getNewMessage().subscribe((message: string) => {
      if(message == 'actividad') {
        this.router.navigate([`/inicioJuego/${this.datosJuegoService.pin}`]);
      }
      if(message == 'fin') {
        this.router.navigate([`/actividadesMasVotadas/${this.datosJuegoService.pin}`]);
      }
    });
  }

  propuesta: IPropuesta | null = this.datosJuegoService.propuesta;
}
