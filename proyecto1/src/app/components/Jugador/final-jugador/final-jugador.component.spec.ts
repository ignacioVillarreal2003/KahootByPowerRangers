import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalJugadorComponent } from './final-jugador.component';

describe('FinalJugadorComponent', () => {
  let component: FinalJugadorComponent;
  let fixture: ComponentFixture<FinalJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalJugadorComponent]
    });
    fixture = TestBed.createComponent(FinalJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
