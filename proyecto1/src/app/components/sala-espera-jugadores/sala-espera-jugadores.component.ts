import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sala-espera-jugadores',
  templateUrl: './sala-espera-jugadores.component.html',
  styleUrls: ['./sala-espera-jugadores.component.css']
})
export class SalaEsperaJugadoresComponent implements OnInit {
  jugadores: any[] = [
    { nombre: 'Ignacio', avatar: '../../../../assets/avatars/avatar1.png' },
    // Agrega más jugadores si es necesario
  ];

  codigoPartida: string = 'ABC123'; // Asigna el código de la partida

  constructor() { }

  ngOnInit(): void {
    // Puedes realizar inicializaciones o cargar datos aquí si es necesario
  }

  empezarPartida() {
    // Lógica para empezar la partida
  }
}
