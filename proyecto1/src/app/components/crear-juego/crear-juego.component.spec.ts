import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearJuegoComponent } from './crear-juego.component';

describe('CrearJuegoComponent', () => {
  let component: CrearJuegoComponent;
  let fixture: ComponentFixture<CrearJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearJuegoComponent]
    });
    fixture = TestBed.createComponent(CrearJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
