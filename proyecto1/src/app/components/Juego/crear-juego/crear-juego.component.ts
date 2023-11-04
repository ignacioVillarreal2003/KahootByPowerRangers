import { Component } from '@angular/core';
import { AdminService } from '../../services/HTTPServices/admin.service';
import { PropuestasService } from '../../services/propuestas.service';
import { IPropuesta } from '../../services/IPropuesta';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent {
  
  constructor(private adminService: AdminService, private propuestasService: PropuestasService) { }

  propuestas: IPropuesta[] = [];

  tituloJuego: string = "";

  ngOnInit(): void {
    this.propuestasService.propuestas$.subscribe(propuestas => {
      this.propuestas = propuestas;
    });
  }


  propuestaSeleccionada: IPropuesta|null = null;


  checkDatos(){
    if (this.propuestaSeleccionada === null){
      return false;
    }
    if (this.tituloJuego.length === 0){
      return false;
    }
    return true;
  }

  crearJuego(): void {   
    if (this.checkDatos()) {
      
    }
  }

}
