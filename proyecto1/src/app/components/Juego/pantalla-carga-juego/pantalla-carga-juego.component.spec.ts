import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaCargaJuegoComponent } from './pantalla-carga-juego.component';

describe('PantallaCargaJuegoComponent', () => {
  let component: PantallaCargaJuegoComponent;
  let fixture: ComponentFixture<PantallaCargaJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaCargaJuegoComponent]
    });
    fixture = TestBed.createComponent(PantallaCargaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
