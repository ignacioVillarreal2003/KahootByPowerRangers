import { Component } from '@angular/core';
import { SocketService } from 'src/app/components/services/socket.service';

@Component({
  selector: 'app-actividades-mas-votadas',
  templateUrl: './actividades-mas-votadas.component.html',
  styleUrls: ['./actividades-mas-votadas.component.css']
})
export class ActividadesMasVotadasComponent {
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.cerrarSocket();
  }
}
