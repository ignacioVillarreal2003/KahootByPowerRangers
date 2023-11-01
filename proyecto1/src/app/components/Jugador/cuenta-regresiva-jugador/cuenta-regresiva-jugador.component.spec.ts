import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaRegresivaJugadorComponent } from './cuenta-regresiva-jugador.component';

describe('CuentaRegresivaJugadorComponent', () => {
  let component: CuentaRegresivaJugadorComponent;
  let fixture: ComponentFixture<CuentaRegresivaJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaRegresivaJugadorComponent]
    });
    fixture = TestBed.createComponent(CuentaRegresivaJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
