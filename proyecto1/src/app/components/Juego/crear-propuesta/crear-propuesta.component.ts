import { Component } from '@angular/core';
import { IActividad } from '../../services/IActividad';

@Component({
  selector: 'app-crear-propuesta',
  templateUrl: './crear-propuesta.component.html',
  styleUrls: ['./crear-propuesta.component.css']
})
export class CrearPropuestaComponent {
  listados:any;
  actividades:IActividad[]=[{descripcion:"this.descripcion",imagen:"this.archivo",titulo:"this.titulo",id:'0'},{descripcion:"this.descripcion",imagen:"this.archivo",titulo:"this.titulo",id:'0'},{descripcion:"this.descripcion",imagen:"this.archivo",titulo:"this.titulo",id:'0'}];
  

  guardarPropuesta():void
  {

  }
  onSelectionChange(event:any){
      const options=event.target.options;
      this.listados=[];
      for(let i=0;i<options.length;i++)
      {
        if(options[i].selected)
        {
          this.listados.push(options[i].value);
        }
      }


  }

}


