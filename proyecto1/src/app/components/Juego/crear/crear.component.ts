import { Component } from '@angular/core';
import { AdminService } from '../../services/HTTPServices/admin.service';
import { ActividadesService } from '../../services/actividades.service';
import { PropuestasService } from '../../services/propuestas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  constructor(private adminService: AdminService, private actividadesService: ActividadesService, private propuestasService: PropuestasService, private router: Router){}

  getActividades(): void {
    this.adminService.getActividades().subscribe(
      (response: any) => {
        this.actividadesService.setActividades(response);
      },
      (error: any) => {
        if (error === "TokenExpiredError"){
          this.router.navigate(['/login']);
        } else{
          console.log(error);
        }
      }
    );
  }

  getPropuestas(): void {
    this.adminService.getPropuestas().subscribe(
      (response: any) => {
        this.propuestasService.setPropuestas(response);
      },
      (error: any) => {
        if (error === "TokenExpiredError"){
          this.router.navigate(['/login']);
        } else{
          console.log(error);
        }
      }
    );
  }


}
