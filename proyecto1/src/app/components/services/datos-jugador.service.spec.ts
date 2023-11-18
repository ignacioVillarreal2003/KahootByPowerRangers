import { TestBed } from '@angular/core/testing';

import { DatosJugadorService } from './datos-jugador.service';

describe('DatosJugadorService', () => {
  let service: DatosJugadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosJugadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
