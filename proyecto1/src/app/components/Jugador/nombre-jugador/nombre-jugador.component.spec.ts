import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreJugadorComponent } from './nombre-jugador.component';

describe('NombreJugadorComponent', () => {
  let component: NombreJugadorComponent;
  let fixture: ComponentFixture<NombreJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NombreJugadorComponent]
    });
    fixture = TestBed.createComponent(NombreJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
