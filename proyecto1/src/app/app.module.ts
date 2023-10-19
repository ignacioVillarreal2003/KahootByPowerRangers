import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SalaEsperaJugadorComponent } from './components/Jugador/sala-espera-jugador/sala-espera-jugador.component';
import { PantallaCargaJugadorComponent } from './components/Jugador/pantalla-carga-jugador/pantalla-carga-jugador.component';
import { InicioJuegoComponent } from './components/Juego/inicio-juego/inicio-juego.component';
import { VotosJuegoComponent } from './components/Juego/votos-juego/votos-juego.component';
import { PantallaCargaJuegoComponent } from './components/Juego/pantalla-carga-juego/pantalla-carga-juego.component';
import { NombreJugadorComponent } from './components/Jugador/nombre-jugador/nombre-jugador.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SalaEsperaJugadorComponent,
    PantallaCargaJugadorComponent,
    InicioJuegoComponent,
    VotosJuegoComponent,
    PantallaCargaJuegoComponent,
    NombreJugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
