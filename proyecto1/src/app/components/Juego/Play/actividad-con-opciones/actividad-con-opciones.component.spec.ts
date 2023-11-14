import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadConOpcionesComponent } from './actividad-con-opciones.component';

describe('ActividadConOpcionesComponent', () => {
  let component: ActividadConOpcionesComponent;
  let fixture: ComponentFixture<ActividadConOpcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadConOpcionesComponent]
    });
    fixture = TestBed.createComponent(ActividadConOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
