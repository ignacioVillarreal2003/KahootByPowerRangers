import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaCargaJugadorComponent } from './pantalla-carga-jugador.component';

describe('PantallaCargaJugadorComponent', () => {
  let component: PantallaCargaJugadorComponent;
  let fixture: ComponentFixture<PantallaCargaJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaCargaJugadorComponent]
    });
    fixture = TestBed.createComponent(PantallaCargaJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
