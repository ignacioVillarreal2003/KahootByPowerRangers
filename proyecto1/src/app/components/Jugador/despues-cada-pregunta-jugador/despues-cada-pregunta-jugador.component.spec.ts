import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespuesCadaPreguntaJugadorComponent } from './despues-cada-pregunta-jugador.component';

describe('DespuesCadaPreguntaJugadorComponent', () => {
  let component: DespuesCadaPreguntaJugadorComponent;
  let fixture: ComponentFixture<DespuesCadaPreguntaJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespuesCadaPreguntaJugadorComponent]
    });
    fixture = TestBed.createComponent(DespuesCadaPreguntaJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
