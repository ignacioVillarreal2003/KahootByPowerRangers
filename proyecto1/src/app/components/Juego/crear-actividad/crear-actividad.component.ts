import { Component } from '@angular/core';
import { IActividad } from '../../services/IActividad';
import { AdminService } from '../../services/HTTPServices/admin.service';

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

  constructor(private adminService: AdminService) { }

  crearActividad(): void {
    if (this.checkDatos()) {
      this.adminService.crearActividad(this.titulo, this.descripcion, this.archivo).subscribe(
        (response: any) => {
          console.log("Actividad creada con exito.");
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
    if (this.archivo === null) {
      this.textoLog = "Requiere imagen.";
      return false;
    }
    return true;
  }

}
