import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesVotarJuegoJugadorComponent } from './opciones-votar-juego-jugador.component';

describe('OpcionesVotarJuegoJugadorComponent', () => {
  let component: OpcionesVotarJuegoJugadorComponent;
  let fixture: ComponentFixture<OpcionesVotarJuegoJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpcionesVotarJuegoJugadorComponent]
    });
    fixture = TestBed.createComponent(OpcionesVotarJuegoJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
