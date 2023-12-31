import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './components/services/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SalaEsperaJugadorComponent } from './components/Jugador/sala-espera-jugador/sala-espera-jugador.component';
import { PantallaCargaJugadorComponent } from './components/Jugador/pantalla-carga-jugador/pantalla-carga-jugador.component';
import { InicioJuegoComponent } from './components/Juego/Play/inicio-juego/inicio-juego.component';
import { VotosJuegoComponent } from './components/Juego/Play/votos-juego/votos-juego.component';
import { PantallaCargaJuegoComponent } from './components/Juego/Play/pantalla-carga-juego/pantalla-carga-juego.component';
import { NombreJugadorComponent } from './components/Jugador/nombre-jugador/nombre-jugador.component';
import { LoginComponent } from './components/Juego/login/login.component';
import { CrearComponent } from './components/Juego/CreacionDeCosas/crear/crear.component';
import { CrearActividadComponent } from './components/Juego/CreacionDeCosas/crear-actividad/crear-actividad.component';
import { CrearPropuestaComponent } from './components/Juego/CreacionDeCosas/crear-propuesta/crear-propuesta.component';
import { CrearJuegoComponent } from './components/Juego/CreacionDeCosas/crear-juego/crear-juego.component';
import { PreguntaTerminadaJugadorComponent } from './components/Jugador/pregunta-terminada-jugador/pregunta-terminada-jugador.component';
import { FinalJugadorComponent } from './components/Jugador/final-jugador/final-jugador.component';
import { CuentaRegresivaJugadorComponent } from './components/Jugador/cuenta-regresiva-jugador/cuenta-regresiva-jugador.component';
import { OpcionesVotarJuegoJugadorComponent } from './components/Jugador/opciones-votar-juego-jugador/opciones-votar-juego-jugador.component';
import { DespuesCadaPreguntaJugadorComponent } from './components/Jugador/despues-cada-pregunta-jugador/despues-cada-pregunta-jugador.component';
import { SalaDeJuegoComponent } from './components/Juego/sala-de-juego/sala-de-juego.component';
import { ActividadConOpcionesComponent } from './components/Juego/Play/actividad-con-opciones/actividad-con-opciones.component';
import { ActividadesMasVotadasComponent } from './components/Juego/Play/actividades-mas-votadas/actividades-mas-votadas.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SalaEsperaJugadorComponent,
    PantallaCargaJugadorComponent,
    InicioJuegoComponent,
    VotosJuegoComponent,
    PantallaCargaJuegoComponent,
    NombreJugadorComponent,
    LoginComponent,
    CrearComponent,
    CrearActividadComponent,
    CrearPropuestaComponent,
    CrearJuegoComponent,
    CuentaRegresivaJugadorComponent,
    OpcionesVotarJuegoJugadorComponent,
    DespuesCadaPreguntaJugadorComponent,
    SalaDeJuegoComponent,
    ActividadConOpcionesComponent,
    ActividadesMasVotadasComponent,
    PreguntaTerminadaJugadorComponent,
    FinalJugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
