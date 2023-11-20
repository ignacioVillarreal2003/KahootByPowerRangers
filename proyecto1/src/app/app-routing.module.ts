import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaEsperaJugadorComponent } from './components/Jugador/sala-espera-jugador/sala-espera-jugador.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NombreJugadorComponent } from './components/Jugador/nombre-jugador/nombre-jugador.component';
import { CrearComponent } from './components/Juego/CreacionDeCosas/crear/crear.component';
import { LoginComponent } from './components/Juego/login/login.component';
import { CrearActividadComponent } from './components/Juego/CreacionDeCosas/crear-actividad/crear-actividad.component';
import { CrearPropuestaComponent } from './components/Juego/CreacionDeCosas/crear-propuesta/crear-propuesta.component';
import { CrearJuegoComponent } from './components/Juego/CreacionDeCosas/crear-juego/crear-juego.component';
import { InicioJuegoComponent } from './components/Juego/Play/inicio-juego/inicio-juego.component';
import { PantallaCargaJuegoComponent } from './components/Juego/Play/pantalla-carga-juego/pantalla-carga-juego.component';
import { VotosJuegoComponent } from './components/Juego/Play/votos-juego/votos-juego.component';
import { FinalJugadorComponent } from './components/Jugador/final-jugador/final-jugador.component';
import { PantallaCargaJugadorComponent } from './components/Jugador/pantalla-carga-jugador/pantalla-carga-jugador.component';
import { PreguntaTerminadaJugadorComponent } from './components/Jugador/pregunta-terminada-jugador/pregunta-terminada-jugador.component';
import { DespuesCadaPreguntaJugadorComponent } from './components/Jugador/despues-cada-pregunta-jugador/despues-cada-pregunta-jugador.component';
import { CuentaRegresivaJugadorComponent } from './components/Jugador/cuenta-regresiva-jugador/cuenta-regresiva-jugador.component';
import { OpcionesVotarJuegoJugadorComponent } from './components/Jugador/opciones-votar-juego-jugador/opciones-votar-juego-jugador.component';
import { SalaDeJuegoComponent } from './components/Juego/sala-de-juego/sala-de-juego.component';
import { ActividadConOpcionesComponent } from './components/Juego/Play/actividad-con-opciones/actividad-con-opciones.component';
import { ActividadesMasVotadasComponent } from './components/Juego/Play/actividades-mas-votadas/actividades-mas-votadas.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'crearActividad', component: CrearActividadComponent},
  { path: 'crearJuego', component: CrearJuegoComponent},
  { path: 'crearPropuesta', component: CrearPropuestaComponent},
  { path: 'inicioJuego/:pin', component: InicioJuegoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pantallaCargaJuego/:pin', component: PantallaCargaJuegoComponent },
  { path: 'votosJuego', component: VotosJuegoComponent },
  { path: 'cuentaRegresivaJugador/:pin', component: CuentaRegresivaJugadorComponent },
  { path: 'despuesCadaPreguntaJugador/:pin', component: DespuesCadaPreguntaJugadorComponent},
  { path: 'finalJugador/:pin', component: FinalJugadorComponent },
  { path: 'opcionesVotarJuegoJugador/:pin', component: OpcionesVotarJuegoJugadorComponent },
  { path: 'pantallaCargaJugador/:pin', component: PantallaCargaJugadorComponent },
  { path: 'preguntaTerminadaJugador/:pin', component: PreguntaTerminadaJugadorComponent },
  { path: 'salaEsperaJugador/:pin', component: SalaEsperaJugadorComponent },
  { path: 'salaDeJuego/:pin', component: SalaDeJuegoComponent},
  { path: 'actividadConOpciones', component: ActividadConOpcionesComponent},
  { path: 'actividadesMasVotadas/:pin', component: ActividadesMasVotadasComponent},
  { path: 'nombreJugador/:pin', component: NombreJugadorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
