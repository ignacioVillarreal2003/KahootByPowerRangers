import { Component } from '@angular/core';
import { IActividad } from '../services/IActividad';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {

  actividades:any;
  titulo:string='';
  descripcion:string='';
  archivo:any=null;


  crearActividad():void{
    if(this.titulo!="" && this.descripcion!="" && this.archivo!=null)
    {
       const nuevaActividad:IActividad={descripcion:this.descripcion,imagen:this.archivo,titulo:this.titulo,id:'0'};
       this.titulo="";
       this.descripcion="";
       this.archivo=null;
    }


  }


  onFileSelected(event:any){
    if(event.target.files.length>0)
    {
      this.archivo=event.target.files[0];

    }
  }

}
