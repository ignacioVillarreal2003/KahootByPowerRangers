import { Component } from '@angular/core';
import { IActividad } from '../../services/IActividad';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-inicio-juego',
  templateUrl: './inicio-juego.component.html',
  styleUrls: ['./inicio-juego.component.css']
})
export class InicioJuegoComponent {

  actividades : IActividad[] = [];

  constructor (private actividadesService: ActividadesService){}

  ngOnInit(): void {
    this.getActividades();
  }

  getActividades(): void {
    this.actividadesService.getActividades()
        .subscribe(act => this.actividades = act);
  }
}
