import { TestBed } from '@angular/core/testing';

import { PropuestasService } from './propuestas.service';

describe('PropuestasService', () => {
  let service: PropuestasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropuestasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
