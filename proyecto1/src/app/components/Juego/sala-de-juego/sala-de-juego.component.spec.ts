import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaDeJuegoComponent } from './sala-de-juego.component';

describe('SalaDeJuegoComponent', () => {
  let component: SalaDeJuegoComponent;
  let fixture: ComponentFixture<SalaDeJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaDeJuegoComponent]
    });
    fixture = TestBed.createComponent(SalaDeJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
