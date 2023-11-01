import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaEsperaJugadorComponent } from './components/Jugador/sala-espera-jugador/sala-espera-jugador.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NombreJugadorComponent } from './components/Jugador/nombre-jugador/nombre-jugador.component';
import { CrearComponent } from './components/crear/crear.component';
import { LoginComponent } from './components/login/login.component';
import { CrearActividadComponent } from './components/crear-actividad/crear-actividad.component';
import { CrearJuegoComponent } from './components/crear-juego/crear-juego.component';
import { CrearPropuestaComponent } from './components/crear-propuesta/crear-propuesta.component';
import { SalaEsperaJugadoresComponent } from './components/sala-espera-jugadores/sala-espera-jugadores.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'esperaJugador', component: SalaEsperaJugadorComponent },
  { path: 'nombreJugador', component: NombreJugadorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear', component: CrearComponent },
  {path:'actividad',component: CrearActividadComponent},
  {path:'crearJuego', component: CrearJuegoComponent},
  {path:'crearPropuesta', component: CrearPropuestaComponent},
  {path: 'jugadoresEsperandoPartida', component: SalaEsperaJugadoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
