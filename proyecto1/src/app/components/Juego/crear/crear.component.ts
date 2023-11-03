import { Component } from '@angular/core';
import { AdminService } from '../../services/HTTPServices/admin.service';
import { ActividadesService } from '../../services/actividades.service';
import { PropuestasService } from '../../services/propuestas.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  constructor(private adminService: AdminService, private actividadesService: ActividadesService, private propuestaService : PropuestasService){}

  getActividades(): void {
    this.adminService.getActividades().subscribe(
      (response: any) => {
        this.actividadesService.setActividades(response);
        console.log("Actividades obtenidas con exito.");
      },
      (error: any) => {
        if (error === "Error: 500 Error al conectar a la BD.") {
          console.log('Error al conectar a la BD.');
        }
        else {
          console.log(error);
        }
      }
    );

  }

  getPropuestas(): void {
    this.adminService.getPropuestas().subscribe(
      (response: any) => {
        this.propuestaService.setPropuestas(response);
        console.log("Propuestas obtenidas con exito.");
      },
      (error: any) => {
        if (error === "Error: 500 Error al conectar a la BD.") {
          console.log('Error al conectar a la BD.');
        }
        else {
          console.log(error);
        }
      }
    );

  }

}
