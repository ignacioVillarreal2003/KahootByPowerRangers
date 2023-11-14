import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioJuegoComponent } from './inicio-juego.component';

describe('InicioJuegoComponent', () => {
  let component: InicioJuegoComponent;
  let fixture: ComponentFixture<InicioJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioJuegoComponent]
    });
    fixture = TestBed.createComponent(InicioJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
