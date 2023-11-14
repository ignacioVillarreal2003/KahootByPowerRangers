import { Component } from '@angular/core';
import { AdminService } from '../../../services/HTTPServices/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {

  titulo: string = '';
  descripcion: string = '';
  archivo: any = null;
  textoLog: string = "";

  constructor(private adminService: AdminService, private router: Router) { }

  crearActividad(): void {
    if (this.checkDatos()) {
      this.adminService.crearActividad(this.titulo, this.descripcion, this.archivo).subscribe(
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
          } else{
            this.textoLog = error;
            console.log(error);
          }
        }
      );
    }
  }

  respuestaVerdadera(p: HTMLElement, btnAceptar: HTMLInputElement){
    p.style.color = 'red';
    this.textoLog = "";
    btnAceptar.disabled = false;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Obtener el archivo de la lista de archivos seleccionados

    if (file) {
      this.getBase64(file).then((data: string) => {
        this.archivo = data; // Establecer la URL de la imagen para mostrarla en la vista
      });
    }
  }

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }


  checkDatos() {
    if (this.titulo.length === 0) {
      this.textoLog = "Requiere titulo.";
      return false;
    }
    if (this.descripcion.length === 0) {
      this.textoLog = "Requiere descripcion.";
      return false;
    }
    return true;
  }

}
