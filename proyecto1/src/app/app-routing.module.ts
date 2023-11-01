import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaEsperaJugadorComponent } from './components/Jugador/sala-espera-jugador/sala-espera-jugador.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NombreJugadorComponent } from './components/Jugador/nombre-jugador/nombre-jugador.component';
import { CrearComponent } from './components/Juego/crear/crear.component';
import { LoginComponent } from './components/Juego/login/login.component';
import { CrearActividadComponent } from './components/crear-actividad/crear-actividad.component';
import { CrearPropuestaComponent } from './components/crear-propuesta/crear-propuesta.component';
import { CrearJuegoComponent } from './components/crear-juego/crear-juego.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'esperaJugador', component: SalaEsperaJugadorComponent },
  { path: 'nombreJugador', component: NombreJugadorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'crearActividad', component: CrearActividadComponent},
  { path: 'crearPropuesta', component: CrearPropuestaComponent},
  { path: 'crearJuego', component: CrearJuegoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
