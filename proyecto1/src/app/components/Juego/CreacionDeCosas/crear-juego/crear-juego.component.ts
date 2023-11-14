import { Component } from '@angular/core';
import { AdminService } from '../../../services/HTTPServices/admin.service';
import { PropuestasService } from '../../../services/propuestas.service';
import { IPropuesta } from '../../../services/interfaces/IPropuesta';
import { Router } from '@angular/router';
import { DatosJuegoService } from 'src/app/components/services/datos-juego.service';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent {

  constructor(private adminService: AdminService, private propuestasService: PropuestasService, private router: Router, private datosJuegoService: DatosJuegoService) { }

  propuestas: IPropuesta[] = [];
  tituloJuego: string = "";
  codigoSala: string = "";
  linkSala: string = ""
  propuestaSeleccionada: IPropuesta | null = null;
  textoLog: string = "";


  ngOnInit(): void {
    this.propuestasService.propuestas$.subscribe(propuestas => {
      this.propuestas = propuestas;
    });
  }

  seleccionarPropuesta(propuesta: IPropuesta): void {
    if (this.propuestaSeleccionada === propuesta) {
      this.propuestaSeleccionada = null;
    } else {
      const propuestas = document.querySelectorAll('.propuestaParaJuego') as NodeListOf<HTMLInputElement>;
      propuestas.forEach(p => {
        if (p.id !== propuesta.id) {
          p.checked = false;
        }
      });
      const propSeleccionada = document.getElementById(propuesta.id) as HTMLInputElement;
      if (propSeleccionada) {
        this.propuestaSeleccionada = propuesta;
      }
    }
  }

  checkDatos(): boolean {
    if (this.tituloJuego.length === 0) {
      this.textoLog = "Falta el titulo."
      return false;
    }
    if (this.propuestaSeleccionada === null) {
      this.textoLog = "Seleccione una propuesta."
      return false;
    }
    return true;
  }

  crearJuego(): void {
    if (this.checkDatos()) {
      this.generarCodigoSala()
      if (this.propuestaSeleccionada !== null) {
        this.adminService.crearJuego(this.tituloJuego, this.codigoSala, this.linkSala, this.propuestaSeleccionada).subscribe(
          (response: any) => {
            this.textoLog = response.message;
            console.log(response);
            this.datosJuegoService.pin = this.codigoSala;
            this.router.navigate(['/salaDeJuego'])
          },
          (error: any) => {
            if (error === "TokenExpiredError") {
              this.router.navigate(['/login']);
            } else {
              this.textoLog = error;
              console.log(error);
            }
          }
        );
      }
    }
  }



  generarCodigoSala() {
    let resultado = '';
    const longitud = 6;
    for (let i = 0; i < longitud; i++) {
      const digito = Math.floor(Math.random() * 10);
      resultado += digito.toString();
    }
    this.codigoSala = resultado;
  }

}
