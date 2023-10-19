import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaEsperaJugadorComponent } from './sala-espera-jugador.component';

describe('SalaEsperaJugadorComponent', () => {
  let component: SalaEsperaJugadorComponent;
  let fixture: ComponentFixture<SalaEsperaJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaEsperaJugadorComponent]
    });
    fixture = TestBed.createComponent(SalaEsperaJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
