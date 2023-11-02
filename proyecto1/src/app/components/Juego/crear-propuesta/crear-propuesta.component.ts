import { Component } from '@angular/core';
import { IActividad } from '../../services/IActividad';
import { AdminService } from '../../services/HTTPServices/admin.service';
import { interval } from 'rxjs';
import { ActividadesService } from '../../services/actividades.service';


@Component({
  selector: 'app-crear-propuesta',
  templateUrl: './crear-propuesta.component.html',
  styleUrls: ['./crear-propuesta.component.css']
})
export class CrearPropuestaComponent {

  constructor(private adminService: AdminService, private actividadesService: ActividadesService) { }

  listados: any;

  actividades: IActividad[] = [];

  tituloPropuesta: string = "";

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

  guardarPropuesta() {
    if (this.checkDatos()){
      console.log('Actividades seleccionadas:', this.actividadesSeleccionadas); // llamar al servidor
    }
  }

  checkDatos(){
    if (this.tituloPropuesta.length === 0){
      return false;
    }
    if (this.actividadesSeleccionadas.length === 0){
      return false;
    }
    return true;
  }

}


