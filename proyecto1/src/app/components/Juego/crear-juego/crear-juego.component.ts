import { Component } from '@angular/core';
import { IPropuesta } from '../../services/IPropuesta';
import { AdminService } from '../../services/HTTPServices/admin.service';
import { PropuestasService } from '../../services/propuestas.service';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent {

  constructor(private adminService: AdminService, private propuestasService : PropuestasService) { }

  listados: any;

  propuesta ? : IPropuesta;

  tituloJuego: string = "";

  propuestas : IPropuesta[] = [];

  ngOnInit(): void {
    this.propuestasService.propuestas$.subscribe(propuestas => {
      this.propuestas = propuestas;
    });
  }
  
  guardarPropuesta() {
    if (this.checkDatos()){
      
    }
  }

  checkDatos(){
    if (this.tituloJuego.length === 0){
      return false;
    }
    if (this.propuesta === null){
      return false;
    }
    return true;
  }

  seleccionarPropuesta(event: IPropuesta) {
    this.propuesta = event;
  }
}
