import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPropuestaComponent } from './crear-propuesta.component';

describe('CrearPropuestaComponent', () => {
  let component: CrearPropuestaComponent;
  let fixture: ComponentFixture<CrearPropuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPropuestaComponent]
    });
    fixture = TestBed.createComponent(CrearPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
