import { Component } from '@angular/core';
import { IActividad } from '../../services/IActividad';
import { AdminService } from '../../services/HTTPServices/admin.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {

  actividades: any;
  titulo: string = '';
  descripcion: string = '';
  archivo: any = null;

  constructor(private adminService: AdminService) { }

  crearActividad(): void {
    if (this.titulo != "" && this.descripcion != "" && this.archivo != null) {
      this.adminService.crearActividad(this.titulo, this.descripcion, "ASdas").subscribe((message: string) => {
        console.log(message);
      })
    }


  }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.archivo = event.target.files[0];

    }
  }

}
