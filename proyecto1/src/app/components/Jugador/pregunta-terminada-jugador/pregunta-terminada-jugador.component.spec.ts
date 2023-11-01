import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaTerminadaJugadorComponent } from './pregunta-terminada-jugador.component';

describe('PreguntaTerminadaJugadorComponent', () => {
  let component: PreguntaTerminadaJugadorComponent;
  let fixture: ComponentFixture<PreguntaTerminadaJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntaTerminadaJugadorComponent]
    });
    fixture = TestBed.createComponent(PreguntaTerminadaJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
