import { Component } from '@angular/core';
import { AdminService } from '../../services/HTTPServices/admin.service';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  constructor(private adminService: AdminService, private actividadesService: ActividadesService){}

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

}
