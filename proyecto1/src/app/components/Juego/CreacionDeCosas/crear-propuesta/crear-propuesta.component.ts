import { Component } from '@angular/core';
import { IActividad } from '../../../services/interfaces/IActividad';
import { AdminService } from '../../../services/HTTPServices/admin.service';
import { ActividadesService } from '../../../services/actividades.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-propuesta',
  templateUrl: './crear-propuesta.component.html',
  styleUrls: ['./crear-propuesta.component.css']
})
export class CrearPropuestaComponent {

  constructor(private adminService: AdminService, private actividadesService: ActividadesService, private router: Router) { }

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
          this.textoLog = response.message;
          let p = document.querySelector('.textoLog') as HTMLElement;
          const btnAceptar = document.querySelector('.aceptar') as HTMLInputElement;
          p.style.color = 'green';
          btnAceptar.disabled = true;
          console.log(response);
          setTimeout(() => {
            this.respuestaVerdadera(p,btnAceptar);
          }, 4000);
        },
        (error: any) => {
          if (error === "TokenExpiredError"){
            this.router.navigate(['/login']);
          }
          this.textoLog = error;
          console.log(error);
        }
      );
    }
  }
  
  respuestaVerdadera(p: HTMLElement, btnAceptar: HTMLInputElement){
    p.style.color = 'red';
    this.textoLog = "";
    btnAceptar.disabled = false;
  }
}


