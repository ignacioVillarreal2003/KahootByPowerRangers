import { Component } from '@angular/core';
import { IActividad } from '../../services/IActividad';
import { AdminService } from '../../services/HTTPServices/admin.service';
import { interval } from 'rxjs';
import { ActividadesService } from '../../services/actividades.service';
import { IPropuesta } from '../../services/IPropuesta';


@Component({
  selector: 'app-crear-propuesta',
  templateUrl: './crear-propuesta.component.html',
  styleUrls: ['./crear-propuesta.component.css']
})
export class CrearPropuestaComponent {

  constructor(private adminService: AdminService, private actividadesService: ActividadesService) { }

  actividades: IActividad[] = [];
  tituloPropuesta: string = "";
  textoLog: string = "";


  ngOnInit(): void {
    this.actividadesService.actividades$.subscribe(actividades => {
      this.actividades = actividades;
    });
  }


  actividadesSeleccionadas: IActividad[] = [];
  toggleActividad(act: IActividad) {
    const index = this.actividadesSeleccionadas.indexOf(act);
    if (index === -1) {
      this.actividadesSeleccionadas.push(act); // Si se selecciona, agregue el ID a la lista
    } else {
      this.actividadesSeleccionadas.splice(index, 1); // Si se deselecciona, elimine el ID de la lista
    }
  }

  checkDatos(){
    if (this.tituloPropuesta.length === 0){
      this.textoLog = "Falta el titulo."
      return false;
    }
    if (this.actividadesSeleccionadas.length === 0){
      this.textoLog = "Seleccione actividades."
      return false;
    }
    return true;
  }

  crearPropuesta(): void {   
    if (this.checkDatos()) {
      this.adminService.crearPropuesta(this.tituloPropuesta, this.actividadesSeleccionadas).subscribe(
        (response: any) => {
          console.log("Propuesta creada con éxito.");
        },
        (error: any) => {
          if (error === "Error: 500 Error al conectar a la BD.") {
            console.log('Error al conectar a la BD.');
          } else {
            console.log(error);
          }
        }
      );
    }
  }
}


