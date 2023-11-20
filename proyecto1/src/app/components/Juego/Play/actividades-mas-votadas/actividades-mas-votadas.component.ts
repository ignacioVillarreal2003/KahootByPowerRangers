import { Component } from '@angular/core';
import { SocketService } from 'src/app/components/services/socket.service';
import { AdminService } from 'src/app/components/services/HTTPServices/admin.service';
import { DatosJuegoService } from 'src/app/components/services/datos-juego.service';

@Component({
  selector: 'app-actividades-mas-votadas',
  templateUrl: './actividades-mas-votadas.component.html',
  styleUrls: ['./actividades-mas-votadas.component.css']
})
export class ActividadesMasVotadasComponent {
  constructor(private socketService: SocketService, private adminService: AdminService, private datosJuegoService: DatosJuegoService) {}

  ngOnInit() {
    this.socketService.cerrarSocket();
    this.obtenerVotos()
  }

  listaTopCalificaciones: any[] = [];

  obtenerVotos(){
    this.adminService.topCalificaciones(this.datosJuegoService.pin).subscribe(
      (response: any) => {
        console.log(response);
        this.listaTopCalificaciones = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
