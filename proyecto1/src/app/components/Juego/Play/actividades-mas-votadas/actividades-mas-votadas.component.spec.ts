import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesMasVotadasComponent } from './actividades-mas-votadas.component';

describe('ActividadesMasVotadasComponent', () => {
  let component: ActividadesMasVotadasComponent;
  let fixture: ComponentFixture<ActividadesMasVotadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesMasVotadasComponent]
    });
    fixture = TestBed.createComponent(ActividadesMasVotadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
