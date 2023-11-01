import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaEsperaJugadoresComponent } from './sala-espera-jugadores.component';

describe('SalaEsperaJugadoresComponent', () => {
  let component: SalaEsperaJugadoresComponent;
  let fixture: ComponentFixture<SalaEsperaJugadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaEsperaJugadoresComponent]
    });
    fixture = TestBed.createComponent(SalaEsperaJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
